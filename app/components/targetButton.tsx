'use client';
import React, { useState } from 'react';

type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

const levels: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

function TargetButton() {
	const [selectedLevel, setSelectedLevel] = useState<CefrLevel>('B1');

	return (
		<div
			className="grid grid-cols-5 overflow-hidden rounded-xl border border-[#c6c6c6] mb-4"
			role="group"
			aria-label="CEFR level"
		>
			{levels.map((level, index) => {
				const isSelected = selectedLevel === level;

				return (
					<button
						key={level}
						type="button"
						aria-pressed={isSelected}
						onClick={() => setSelectedLevel(level)}
						className={[
							'h-14 text-2xl',
							index > 0 ? 'border-l border-[#c6c6c6]' : '',
							isSelected
								? 'bg-[#2D8FC8] font-bold text-white'
								: 'bg-white font-normal text-black hover:bg-gray-50',
						].join(' ')}
					>
						{level}
					</button>
				);
			})}
		</div>
	);
}

export default TargetButton;
