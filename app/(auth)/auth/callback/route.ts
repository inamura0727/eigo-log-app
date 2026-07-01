import { NextResponse } from 'next/server';

// The client you created from the Server-Side Auth instructions
import { createClient } from '@/app/lib/supabase/server';

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get('code');
	// if "next" is in param, use it as the redirect URL
	let next = searchParams.get('next') ?? '/';
	if (!next.startsWith('/')) {
		// if "next" is not a relative URL, use the default
		next = '/';
	}

	if (code) {
		const supabase = await createClient();
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			//  Get User Info
			const result = await supabase.auth.getUser();
			const user = result.data.user;
			try {
				if (user) {
					const { data: existingProfile, error: selectError } = await supabase
						.from('profile')
						.select('id')
						.eq('id', user.id)
						.maybeSingle();
					if (selectError) {
						console.error(`error: ${selectError}`);
					}
					if (!existingProfile) {
						const username = user.user_metadata.name;
						const { error: insertError } = await supabase.from('profile').insert({
							id: user.id,
							username: username,
						});
						if (insertError) {
							console.error(`error* ${insertError}`);
						}
					}
				}
			} catch (error) {
				console.error(error);
			}
			const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
			const isLocalEnv = process.env.NODE_ENV === 'development';
			if (isLocalEnv) {
				// we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
				return NextResponse.redirect(`${origin}${next}`);
			} else if (forwardedHost) {
				return NextResponse.redirect(`https://${forwardedHost}${next}`);
			} else {
				return NextResponse.redirect(`${origin}${next}`);
			}
		}
	}

	// return the user to an error page with instructions
	return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
