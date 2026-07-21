import { createClient } from '@/app/lib/supabase/server';

export async function GET() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	try {
		if (!user) {
			return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
		} else if (user) {
			const { data, error } = await supabase
				.from('writing_entry')
				.select('id, original_text, tartget, created_at')
				.eq('user_id', user.id);

			if (error) {
				return Response.json({ success: false, error: error.message }, { status: 500 });
			}

			return Response.json({ success: true, data });
		}
	} catch (error) {
		console.error(error);
		return Response.json({ success: false, message: 'Server error' }, { status: 500 });
	}
}

export async function POST(req: Request) {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const body = await req.json();
	if (!user) {
		return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
	}
	const { id, original_text, target, status } = body;
	try {
		if (user) {
			if (id) {
				const { error } = await supabase
					.from('writing_entry')
					.update({
						original_text: original_text,
						target: target,
						status: status,
					})
					.eq('id', id)
					.eq('user_id', user.id);

				if (error) {
					console.log(error);
					return Response.json({ success: false, error: error.message }, { status: 500 });
				}
				return Response.json({ id: id, success: true, message: 'update success' });
			} else {
				const { data, error } = await supabase
					.from('writing_entry')
					.insert({
						user_id: user.id,
						original_text: original_text,
						target: target,
						status: status,
					})
					.select()
					.single();

				if (error) {
					console.log(error);
					return Response.json({ success: false, error: error.message }, { status: 500 });
				}

				return Response.json({ id: data.id, success: true, message: 'insert success' });
			}
		}
	} catch (error) {
		console.error(error);
		return Response.json({ success: false, message: 'Server error' }, { status: 500 });
	}
}
