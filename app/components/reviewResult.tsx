import React from 'react';
import CorrectionSection from './correctionSection';
import Button from './button';
import { Text } from '@/app/constants/text';
import { ReviewResultProps } from '../lib/type';
import QuestionList from './questionList';
import { diffWordsWithSpace } from 'diff';

function ReviewResult(result: ReviewResultProps) {
	const diffs = diffWordsWithSpace(result.original_text, result.corrected_text);

	return (
		<div>
			<div className="text-4xl font-bold mb-3">Review your Sentences</div>
			<div className="w-full h-full rounded-[20px] p-3 border border-[#c6c6c6] flex">
				<div className="p-4 flex-1">
					<p className="text-2xl text-red-500 font-bold mb-1">Origina sentence</p>
					<p>{result.original_text}</p>
				</div>
				<div className="p-4 flex-1 border-l border-[#c6c6c6]">
					<p className="text-2xl text-[#009DFF] font-bold mb-1">Correct version</p>
					{diffs.map((part, index) => {
						if (part.added) {
							return (
								<span
									key={index}
									className="rounded bg-green-100 px-0.5 text-green-800"
								>
									{part.value}
								</span>
							);
						}
						if (part.removed) {
							return (
								<span
									key={index}
									className="rounded bg-red-100 px-0.5 text-red-700 line-through"
								>
									{part.value}
								</span>
							);
						}

						return <span key={index}>{part.value}</span>;
					})}
				</div>
			</div>
			<div>
				<CorrectionSection
					title={Text.Category.VOCABURALY}
					result={result.betterVocabulary}
				/>
				<CorrectionSection
					title={Text.Category.EXPRESSION}
					result={result.usefulExpressions}
				/>
				<CorrectionSection title={Text.Category.GARMMAR} result={result.grammar} />
			</div>
			<QuestionList questions={result.questions} />
			<div className="flex justify-end">
				<Button
					colour="#fff"
					textColour="#3c3c3c"
					text="Save Review"
					onClick={result.handleSaveReview}
				/>
			</div>
		</div>
	);
}

export default ReviewResult;
