import React from 'react';
import { createClient } from '../lib/supabase/server';
import { GetHistoryResponse } from '../lib/type';

export default async function HistoryList() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return <p>User is not authorized</p>;
	} else {
		const { data: correctionRun, error }: GetHistoryResponse = await supabase
			.from('correction_run')
			.select()
			.eq('user_id', user.id)
			.order('created_at', { ascending: false })
			.limit(3);

		if (correctionRun) {
			return (
				<div className="flex-1 max-w-3xl px-4 min-h-120 rounded-[20px] p-4 border border-[#c6c6c6] space-y-3">
					<p>History</p>
					<ul>
						{correctionRun.map((item) => (
							<li key={item.id}>{item.corrected_text}</li>
						))}
					</ul>
					<p>表示できたよ</p>
				</div>
			);
		} else if (error) {
			return <p>Failed to get history</p>;
		}
	}
}
