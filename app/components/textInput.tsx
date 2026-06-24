'use client';
import React, { useState } from 'react';

function TextInput() {
	const [text, setText] = useState('');
	return (
		<textarea
			value={text}
			onChange={(e) => setText(e.target.value)}
			placeholder="Write some sentences in English..."
			className="w-full h-100 rounded-[20px] p-4 border border-[#c6c6c6]"
		/>
	);
}

export default TextInput;
