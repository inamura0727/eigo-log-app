import React, { Suspense } from 'react';
import WritingEntrylist from './components/writingEntrylist';

const page = () => {
	return (
		<div>
			<h1>NextJS</h1>
			<Suspense fallback={<p>Loading...</p>}>
				<WritingEntrylist />
			</Suspense>
		</div>
	);
};

export default page;
