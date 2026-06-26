import React from 'react';
import { CorrectionDetail, CorrectionItemType } from '../lib/supabase';

function CorrectionItem({ item }: { item: CorrectionItemType | CorrectionDetail }) {
	return (
		<div>
			<p>{item.original}</p>
			<p>{item.corrected}</p>
			<p>{item.explanation}</p>
		</div>
	);
}

export default CorrectionItem;
