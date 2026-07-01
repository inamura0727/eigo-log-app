'use client';
import React, { useState } from 'react';
import { Text } from '@/app/constants/text';
import CorrectionSection from '@/app/components/correctionSection';
import { CorrectionResult } from '@/app/lib/type';
import Button from '@/app/components/button';
import axios from 'axios';

function ReviewPage() {
	const [result] = useState<CorrectionResult>(() => {
		const savedResult = sessionStorage.getItem('correctionResult');

		if (!savedResult) {
			return null;
		}

		const parsedSavedResult = JSON.parse(savedResult);
		const CorrectionData = JSON.parse(parsedSavedResult.result);

		return { ...CorrectionData, entry_id: parsedSavedResult.entry_id };
	});

	if (!result) {
		return <p>結果がありません。</p>;
	}

	const originalText = result.originalText;
	const correctedEnglish = result.correctedEnglish;
	const betterVocabulary = result.betterVocabulary;
	const usefulExpressions = result.usefulExpressions;
	const grammar = result.grammar;
	const questions = result.questions;

	const handleSaveReview = async () => {
		try {
			const res = await axios.post('api/review', {
				entry_id: result.entry_id,
				originalText: originalText,
				correctedEnglish: correctedEnglish,
				betterVocabulary: betterVocabulary,
				usefulExpressions: usefulExpressions,
				grammar: grammar,
				questions: questions,
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			review詳細ページです
			<div className="text-4xl font-bold mb-3">Review your Sentences</div>
			<div className="w-full h-100 rounded-[20px] p-3 border border-[#c6c6c6] flex">
				<div className="p-4 flex-1">
					<p className="text-2xl text-red-500 font-bold mb-1">Origina sentence</p>
					<p>{originalText}</p>
				</div>
				<div className="p-4 flex-1 border-l border-[#c6c6c6]">
					<p className="text-2xl text-[#009DFF] font-bold mb-1">Correct version</p>
					<p>{correctedEnglish}</p>
				</div>
			</div>
			<div>
				<CorrectionSection title={Text.Category.VOCABURALY} result={betterVocabulary} />
				<CorrectionSection title={Text.Category.EXPRESSION} result={usefulExpressions} />
				<CorrectionSection title={Text.Category.GARMMAR} result={grammar} />
			</div>
			<div className="flex justify-end">
				<Button
					colour="#fff"
					textColour="#3c3c3c"
					text="Save Review"
					onClick={handleSaveReview}
				/>
			</div>
		</div>
	);
}

export default ReviewPage;
