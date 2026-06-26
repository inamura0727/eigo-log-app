'use client';
import React, { useState } from 'react';
import { CorrectionDetail, CorrectionItemType } from '../lib/supabase';
import CorrectionItem from './correctionItem';

type Props = {
	title: string;
	result: CorrectionItemType[] | CorrectionDetail[];
};

function CorrectionSection({ title, result }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<section className="w-full rounded-[20px] p-3 border border-[#c6c6c6] mt-4">
			<div className="min-h-20 flex items-center justify-center ">
				<div className="flex size-10 items-center justify-center rounded-full bg-sky-200">
					A
				</div>
				<h2 className="flex-1 text-lg font-bold">{title}</h2>
				<div>
					<span className="rounded bg-gray-100 p-2 text-sm">{result.length} items</span>
				</div>
				<div>
					<button
						type="button"
						aria-expanded={isOpen}
						onClick={() => setIsOpen((pre) => !pre)}
						className="rounded-lg border border-gray-300 px-4 py-2"
					>
						{isOpen ? 'Show less' : 'Show more'}
					</button>
				</div>
			</div>
			{isOpen && (
				<section>
					<ul className="list-disc space-y-3 pl-6">
						{result.map((item, i) => (
							<li key={i}>
								<CorrectionItem item={item} />
							</li>
						))}
					</ul>
				</section>
			)}
		</section>
	);
}

export default CorrectionSection;
