'use client';
import Button from '@/app/components/button';
import TargetButton, { CefrLevel } from '@/app/components/targetButton';
import TextInput from '@/app/components/textInput';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Write() {
	const [inputText, setInputText] = useState<string>('');
	const [targetLevel, setTargetLevel] = useState<CefrLevel>('B1');
	const [writingEntryId, setWritingEntryId] = useState<string>('');
	const router = useRouter();

	const handleSaveText = async () => {
		if (inputText.trim().length <= 0) {
			console.log('Please enter more characters.');
			return;
		}
		try {
			const res = await axios.post('/api/write', {
				id: writingEntryId,
				original_text: inputText,
				target: targetLevel,
			});
			console.log(res.data);
			if (res.data.id) {
				setWritingEntryId(res.data.id);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleTest = async () => {
		try {
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
			console.log(data);

			sessionStorage.setItem('correctionResult', JSON.stringify(data));

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
					onClick={handleTest}
				/>
			</div>
		</div>
	);
}

export default Write;
