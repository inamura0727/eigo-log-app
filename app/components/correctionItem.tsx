import React from 'react';
import { CorrectionItemType } from '../lib/supabase';

function CorrectionItem({ item }: { item: CorrectionItemType }) {
	return (
		<div key={item.id}>
			<p>{item.original}</p>
			<p>{item.corrected}</p>
			<p>{item.explanation}</p>
		</div>
	);
}

export default CorrectionItem;
