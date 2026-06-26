'use client';
import React, { useState } from 'react';
import { Text } from '@/app/constants/text';
import CorrectionSection from '@/app/components/correctionSection';
import { CorrectionResult } from '@/app/lib/supabase';

function ReviewPage() {
	const [result] = useState<CorrectionResult>(() => {
		const savedResult = sessionStorage.getItem('correctionResult');

		if (!savedResult) {
			return null;
		}

		const parsedSavedResult = JSON.parse(savedResult);

		return JSON.parse(parsedSavedResult.result);
	});

	if (!result) {
		return <p>結果がありません。</p>;
	}

	console.log(result);

	const originalText = result.originalText;
	const correctedEnglish = result.correctedEnglish;
	const betterVocabulary = result.betterVocabulary;
	const usefulExpressions = result.usefulExpressions;
	const grammar = result.grammar;
	const questions = result.questions;

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
		</div>
	);
}

export default ReviewPage;
