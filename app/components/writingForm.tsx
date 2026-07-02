'use client';
import React, { useState } from 'react';
import TargetButton, { CefrLevel } from './targetButton';
import axios from 'axios';
import Button from './button';
import TextInput from './textInput';
import { draftItem, saveWritingEntryResponse } from '../lib/type';
import { useRouter } from 'next/navigation';

function WritingForm({ draftData }: { draftData?: draftItem }) {
	const [inputText, setInputText] = useState<string>(draftData?.original_text ?? '');
	const [targetLevel, setTargetLevel] = useState<CefrLevel>(draftData?.target ?? 'B1');
	const [writingEntryId, setWritingEntryId] = useState<string>(draftData?.id ?? '');
	const router = useRouter();

	const saveWritingEntry = async (): Promise<saveWritingEntryResponse | null> => {
		if (inputText.trim().length <= 0) {
			console.log('Please enter more characters.');
			return null;
		}

		const res = await axios.post('/api/write', {
			id: writingEntryId,
			original_text: inputText,
			target: targetLevel,
		});

		console.log(res);

		if (res.data.id) {
			setWritingEntryId(res.data.id);
		}
		return { entry_id: res.data.id };
	};

	const handleSaveText = async () => {
		try {
			await saveWritingEntry();
		} catch (error) {
			console.error(error);
		}
	};

	const handlePostOpenai = async () => {
		try {
			const saveEntry = await saveWritingEntry();
			if (!saveEntry) return;

			const res = await fetch('/api/write/openai', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					message: inputText,
					selectedLevel: targetLevel,
				}),
			});

			if (!res.ok) {
				throw new Error('Fialed to get response');
			}

			const data = await res.json();

			const reviewData = { ...data, entry_id: saveEntry.entry_id };
			sessionStorage.setItem('correctionResult', JSON.stringify(reviewData));

			router.push('/review/');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div>
				<p>CEFR level</p>
				<p>Choose the level for the correction and explanation...</p>
			</div>
			<div>
				<TargetButton value={targetLevel} onClick={setTargetLevel} />
			</div>
			<div>
				<TextInput value={inputText} onChange={setInputText} />
			</div>
			<div className="flex items-center justify-between">
				<Button
					colour="#fff"
					textColour="#3c3c3c"
					text="Save Draft"
					onClick={handleSaveText}
				/>
				<Button
					colour="#2D8FC8"
					textColour="#fff"
					text="Review my diary"
					onClick={handlePostOpenai}
				/>
			</div>
		</div>
	);
}

export default WritingForm;
