import Link from 'next/link';
import React from 'react';

const sidebar = () => {
	return (
		<nav className="flex flex-col gap-7 text-4xl">
			<Link href="/">Home</Link>
			<Link href="/write">Write</Link>
			<Link href="/history">History</Link>
			<Link href="/settings">Setting</Link>
		</nav>
	);
};

export default sidebar;
