import React from 'react';
import { createClient } from '../lib/supabase/server';
import { GetHistoryResponse } from '../lib/type';
import { formatDate } from './writingEntrylist';
import Link from 'next/link';

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
							<li key={item.id} className="border-b pb-4 pt-4 border-[#c6c6c6]">
								<p className="line-clamp-2 mb-2"> {item.corrected_text}</p>
								<p className="line-clamp-2 mb-2">{item.source_text}</p>
								<p>{formatDate(item.created_at)}</p>
								<div className="flex justify-end">
									<Link href={`/review/${item.id}`}>
										<button className="border border-[#3C7DFF] text-[#0080FF] rounded-[5px] px-5">
											View
										</button>
									</Link>
								</div>
							</li>
						))}
					</ul>
				</div>
			);
		} else if (error) {
			return <p>Failed to get history</p>;
		}
	}
}
