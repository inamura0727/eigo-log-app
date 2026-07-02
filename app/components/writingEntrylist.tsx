import React from 'react';
import { createClient } from '../lib/supabase/server';
import { GetDraftResponse } from '../lib/type';
import Link from 'next/link';

export default async function WritingEntrylist() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('ja-JP', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});
	};

	if (!user) {
		return <p>User is not authorized</p>;
	} else if (user) {
		const { data: draftItems, error: getDraftError }: GetDraftResponse = await supabase
			.from('writing_entry')
			.select('id, original_text, target, created_at')
			.eq('user_id', user.id)
			.order('created_at', { ascending: false })
			.limit(3);

		if (draftItems) {
			return (
				<div className="flex-1 max-w-3xl px-4 min-h-120 rounded-[20px] p-4 border border-[#c6c6c6]">
					<p>Draft</p>
					<ul>
						{draftItems.map((item) => (
							<li key={item.id} className="border-b pb-4 pt-4 border-[#c6c6c6]">
								<p className="line-clamp-2 mb-2">{item.original_text}</p>
								<p>{formatDate(item.created_at)}</p>
								<div className="flex justify-end">
									<Link href={`/write/${item.id}`}>
										<button className="border border-[#3C7DFF] text-[#0080FF] rounded-[5px] px-5">
											Continue
										</button>
									</Link>
								</div>
							</li>
						))}
					</ul>
				</div>
			);
		}

		if (getDraftError) {
			return <p>Failed to get writing entries</p>;
		}
	}
}
