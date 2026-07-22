import React from 'react';
import { createClient } from '@/app/lib/supabase/server';
import { CorrectionItemType, CorrectionRun } from '@/app/lib/type';
import { PostgrestError } from '@supabase/supabase-js';
import ReviewResult from '@/app/components/reviewResult';

type Params = {
	id: string;
};

async function page(props: { params: Params }) {
	const { id } = await props.params;
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
	} else {
		const {
			data: correctionRun,
			error,
		}: { data: CorrectionRun | null; error: PostgrestError | null } = await supabase
			.from('correction_run')
			.select('*')
			.eq('id', id)
			.maybeSingle();

		if (error) {
			return Response.json({ success: false, error: error.message }, { status: 500 });
		}

		const { data: correctionItem }: { data: CorrectionItemType[] | null } = await supabase
			.from('correction_item')
			.select('*')
			.eq('correction_run_id', id);

		// Organize correction items by categoty
		if (correctionItem) {
			const betterVocabulary = correctionItem
				.filter((item) => item.category === 'vocabulary')
				.map((item) => ({
					original: item.original,
					corrected: item.corrected,
					explanation: item.explanation,
				}));
			const usefulExpressions = correctionItem
				.filter((item) => item.category === 'expression')
				.map((item) => ({
					original: item.original,
					corrected: item.corrected,
					explanation: item.explanation,
				}));
			const grammar = correctionItem
				.filter((item) => item.category === 'grammar')
				.map((item) => ({
					original: item.original,
					corrected: item.corrected,
					explanation: item.explanation,
				}));

			const { data: questions, error: questionError } = await supabase
				.from('question')
				.select('*')
				.eq('correction_run_id', id);

			if (questionError) {
				return Response.json(
					{ success: false, error: questionError.message },
					{ status: 500 },
				);
			}

			if (correctionRun) {
				const reviewResultProps = {
					original_text: correctionRun.source_text,
					corrected_text: correctionRun.corrected_text,
					betterVocabulary: betterVocabulary,
					usefulExpressions: usefulExpressions,
					grammar: grammar,
					questions: questions,
				};

				return (
					<div>
						<ReviewResult {...reviewResultProps} />
					</div>
				);
			}
		}
	}
}

export default page;
