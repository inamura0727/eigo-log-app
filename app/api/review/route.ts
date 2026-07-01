import { CorrectionResult, CorrectionRun } from '@/app/lib/type';
import { createClient } from '@/app/lib/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import React from 'react';
import { Text } from '@/app/constants/text';

type SaveCorrectionResponse = {
	data: CorrectionRun | null;
	error: PostgrestError | null;
};

export async function POST(req: Request) {
	const body: CorrectionResult = await req.json();
	console.log(body);
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	try {
		if (!user) {
			return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
		} else if (user) {
			const { data, error }: SaveCorrectionResponse = await supabase
				.from('correction_run')
				.upsert(
					{
						entry_id: body.entry_id,
						user_id: user.id,
						source_text: body.originalText,
						corrected_text: body.correctedEnglish,
					},
					{
						onConflict: 'entry_id',
					},
				)
				.select()
				.single();
			if (data) {
				console.log(data);
				const correction_run_id = data.id;

				const correctionItems = [
					...body.betterVocabulary.map((item, index) => ({
						correction_run_id: correction_run_id,
						category: Text.Category.VOCABURALY,
						original: item.original,
						corrected: item.corrected,
						explanation: item.explanation,
						display_order: index,
					})),
					...body.usefulExpressions.map((item, index) => ({
						correction_run_id: correction_run_id,
						category: Text.Category.EXPRESSION,
						original: item.original,
						corrected: item.corrected,
						explanation: item.explanation,
						display_order: index,
					})),
					...body.grammar.map((item, index) => ({
						correction_run_id: correction_run_id,
						category: Text.Category.GARMMAR,
						original: item.original,
						corrected: item.corrected,
						explanation: item.explanation,
						display_order: index,
					})),
				];

				await supabase
					.from('correction_item')
					.delete()
					.eq('correction_run_id', correctionItems[0].correction_run_id);
				const { error: saveCorrectionItemError } = await supabase
					.from('correction_item')
					.insert(
						correctionItems.map((item) => ({
							correction_run_id: item.correction_run_id,
							category: item.category,
							original: item.original,
							corrected: item.corrected,
							explanation: item.explanation,
							display_order: item.display_order,
						})),
					);
				if (saveCorrectionItemError) {
					console.log(saveCorrectionItemError);
					return Response.json(
						{ success: false, error: saveCorrectionItemError.message },
						{ status: 500 },
					);
				}
			}

			if (error) {
				console.log(error);
				return Response.json({ success: false, error: error.message }, { status: 500 });
			}
			return Response.json({ success: true, message: 'insert success' });
		}
	} catch (error) {
		console.error(error);
		return Response.json({ success: false, message: 'Server error' }, { status: 500 });
	}
}
