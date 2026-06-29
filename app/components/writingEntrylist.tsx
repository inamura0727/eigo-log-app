import React from 'react';
import { createClient } from '../lib/supabase/server';

export default async function WritingEntrylist() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return <p>User is not authorized</p>;
	} else if (user) {
		const { data, error } = await supabase
			.from('writing_entry')
			.select('id, original_text, target, created_at')
			.eq('user_id', user.id)
			.order('created_at', { ascending: false });

		if (data) {
			return (
				<ul>
					{data.map((item) => (
						<li key={item.id}>{item.original_text}</li>
					))}
				</ul>
			);
		}

		if (error) {
			console.log(error);
			return <p>Failed to get writing entries</p>;
		}
	}
}
