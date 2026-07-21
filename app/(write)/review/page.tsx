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

		return { ...CorrectionData, target: parsedSavedResult.target };
	});

	if (!result) {
		return <p>No Result</p>;
	}

	const originalText = result.originalText;
	const correctedEnglish = result.correctedEnglish;
	const betterVocabulary = result.betterVocabulary;
	const usefulExpressions = result.usefulExpressions;
	const grammar = result.grammar;
	const questions = result.questions;
	const target = result.target;

	const handleSaveReview = async () => {
		try {
			const saveWritingEntry = await axios.post('api/write', {
				id: result.entry_id,
				original_text: originalText,
				target: target,
				status: true,
			});
			const entry_id = saveWritingEntry.data.id;

			const res = await axios.post('api/review', {
				entry_id: entry_id,
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
	const questionList = questions.map((item) => ({
		question_text: item,
	}));

	const reviewResultPorps = {
		original_text: originalText,
		corrected_text: correctedEnglish,
		betterVocabulary: betterVocabulary,
		usefulExpressions: usefulExpressions,
		grammar: grammar,
		questions: questionList,
		handleSaveReview: handleSaveReview,
	};

	return <ReviewResult {...reviewResultPorps} />;
}

export default ReviewPage;
