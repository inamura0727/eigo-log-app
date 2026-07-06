'use client';
import React, { useState } from 'react';
import { CorrectionResult } from '@/app/lib/type';
import axios from 'axios';
import ReviewResult from '@/app/components/reviewResult';

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

	const reviewResultPorps = {
		original_text: originalText,
		corrected_text: correctedEnglish,
		betterVocabulary: betterVocabulary,
		usefulExpressions: usefulExpressions,
		grammar: grammar,
		handleSaveReview: handleSaveReview,
	};

	return <ReviewResult {...reviewResultPorps} />;
}

export default ReviewPage;
