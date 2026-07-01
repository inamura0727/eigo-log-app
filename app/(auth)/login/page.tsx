'use client';
import login from './action';

export default function LoginPage() {
	return (
		<form>
			<button formAction={login}>login</button>
		</form>
	);
}
