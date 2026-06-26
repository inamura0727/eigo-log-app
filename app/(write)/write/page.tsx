'use client';
import Button from '@/app/components/button';
import TargetButton from '@/app/components/targetButton';
import TextInput from '@/app/components/textInput';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Write() {
	const [inputText, setInputText] = useState<string>('');
	const router = useRouter();
	const handleTest = async () => {
		try {
			const res = await fetch('/api/write/openai', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					message: inputText,
				}),
			});

			if (!res.ok) {
				throw new Error('Fialed to get response');
			}

			const data = await res.json();
			console.log(data);

			sessionStorage.setItem('correctionResult', JSON.stringify(data));

			router.push('/review/');
		} catch (error) {
			console.error(error);
		}
	};

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
				<TextInput value={inputText} onChange={setInputText} />
			</div>
			<div className="flex items-center justify-between">
				<Button colour="#fff" textColour="#3c3c3c" text="Save Draft" />
				<Button
					colour="#2D8FC8"
					textColour="#fff"
					text="Review my diary"
					onClick={handleTest}
				/>
			</div>
		</div>
	);
}

export default Write;
