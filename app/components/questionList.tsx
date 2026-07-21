import React from 'react';
import { Question } from '../lib/type';

type Props = {
	questions: Question[];
};

function QuestionList({ questions }: Props) {
	return (
		<section className="w-full  rounded-[20px] p-3 border border-[#c6c6c6] ">
			<div className="min-h-20 flex items-center justify-center ">
				<div className="flex size-10 items-center justify-center rounded-full bg-sky-200">
					A
				</div>
				<h2 className="flex-1 text-lg font-bold">Questions</h2>
			</div>
			<div>
				<ul>
					{questions.map((item, i) => (
						<li key={i}>
							<div>
								<span>{i}.</span>
								{item.question_text}
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

export default QuestionList;
