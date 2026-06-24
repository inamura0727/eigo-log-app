import Button from '@/app/components/button';
import TargetButton from '@/app/components/targetButton';
import TextInput from '@/app/components/textInput';
import React from 'react';

function Write() {
	return (
		<div>
			<div>
				<p>CEFR level</p>
				<p>Choose the level for the correction and explanation...</p>
			</div>
			<div>
				<TargetButton />
			</div>
			<div>
				<TextInput />
			</div>
			<div className="flex items-center justify-between">
				<Button colour="#fff" textColour="#3c3c3c" text="Save Draft" />
				<Button colour="#2D8FC8" textColour="#fff" text="Review my diary" />
			</div>
		</div>
	);
}

export default Write;
