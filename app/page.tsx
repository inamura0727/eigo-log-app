import React, { Suspense } from 'react';
import WritingEntrylist from './components/writingEntrylist';
import HistoryList from './components/historyList';

const page = () => {
	return (
		<div>
			<h1>NextJS</h1>
			<Suspense fallback={<p>Loading...</p>}>
				<div className="flex justify-center items-center">
					<WritingEntrylist />
					<HistoryList />
				</div>
			</Suspense>
		</div>
	);
};

export default page;
