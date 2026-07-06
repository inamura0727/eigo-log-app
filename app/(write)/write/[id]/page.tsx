import WritingForm from '@/app/components/writingForm';
import { createClient } from '@/app/lib/supabase/server';
import { draftItem } from '@/app/lib/type';
import { PostgrestError } from '@supabase/supabase-js';
import React from 'react';
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
			data: draftItems,
			error,
		}: { data: draftItem | null; error: PostgrestError | null } = await supabase
			.from('writing_entry')
			.select('id, original_text, target, created_at')
			.eq('id', id)
			.eq('user_id', user.id)
			.maybeSingle();

		if (draftItems) {
			return (
				<div>
					<WritingForm draftData={draftItems} />
				</div>
			);
		} else if (error) {
			<div>Failed to get Draft Data</div>;
		}
	}
}

export default page;
