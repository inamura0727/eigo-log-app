'use server';
import { createClient } from '@/app/lib/supabase/server';
import { redirect } from 'next/navigation';

async function login() {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: 'http://localhost:3000//auth/callback',
		},
	});
	if (data.url) {
		redirect(data.url);
	}
}

export default login;
