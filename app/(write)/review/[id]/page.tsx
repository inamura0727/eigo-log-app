import React from 'react';

import { correctionRuns } from '../../../../data/mockData';
import { correctionItems } from '../../../../data/mockData';

import { Text } from '@/app/constants/text';
import CorrectionSection from '@/app/components/correctionSection';

const vocabSections = correctionItems.filter((item) => item.category === Text.Category.VOCABURALY);

const usefulPhrasesSections = correctionItems.filter(
	(item) => item.category === Text.Category.EXPRESSION,
);

const grammarSection = correctionItems.filter((item) => item.category === Text.Category.GARMMAR);

function page() {
	return (
		<div>
			review詳細ページです
			<div className="text-4xl font-bold mb-3">Review your Sentences</div>
			<div className="w-full h-100 rounded-[20px] p-3 border border-[#c6c6c6] flex">
				<div className="p-4 flex-1">
					<p className="text-2xl text-red-500 font-bold mb-1">Origina sentence</p>
					<p>{correctionRuns[0].source_text}</p>
				</div>
				<div className="p-4 flex-1 border-l border-[#c6c6c6]">
					<p className="text-2xl text-[#009DFF] font-bold mb-1">Correct version</p>
					<p>{correctionRuns[0].corrected_text}</p>
				</div>
			</div>
			<div>
				<CorrectionSection title={Text.Category.VOCABURALY} result={vocabSections} />
				<CorrectionSection
					title={Text.Category.EXPRESSION}
					result={usefulPhrasesSections}
				/>
				<CorrectionSection title={Text.Category.GARMMAR} result={grammarSection} />
			</div>
		</div>
	);
}

export default page;
