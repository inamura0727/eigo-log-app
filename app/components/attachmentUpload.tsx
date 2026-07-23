import React, { ChangeEvent, useRef, useState } from 'react';

function AttachmentUpload() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File | null>(null);
	const [errorMessage, setErrorMessage] = useState('');

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];

		if (!selectedFile) return;
		const allowedTypes = ['application/pdf', 'text/plain', 'image/jpeg', 'image/png'];

		if (!allowedTypes.includes(selectedFile.type)) {
			setErrorMessage('PDF、JPG、PNG、TXTファイルを選択してください。');
			event.target.value = '';
			return;
		}

		const maxSize = 10 * 1024 * 1024;
		if (selectedFile.size > maxSize) {
			setErrorMessage('file size should be under 10MB');
			event.target.value = '';
			return;
		}

		setFile(selectedFile);
		setErrorMessage('');
	};

	console.log(file);
	return (
		<div className="space-y-2">
			<p className="font-semibold">
				Attachment
				<span className="font-normal text-gray-400">(optional)</span>
			</p>
			<input
				ref={inputRef}
				type="file"
				accept=".pdf, .txt, .jpg, .jpeg, .png, .application/pdf, text/plain, image/jpeg, image/png"
				className="hidden"
				onChange={handleFileChange}
			/>

			<button
				type="button"
				onClick={() => inputRef.current?.click()}
				className="flex w-full items-center justify-center rounded-xl border-2 border-blue-500 px-4 py-2 font-semibold text-blue-700"
			>
				<span>Add a PDF, photo, or text file</span>
			</button>
			<p className="text-center text-sm text-gray-400">PDF, JPG, PNG, or TXT up to 10MB</p>

			{file && (
				<div className="flex items-center justify-between rounded-lg bg-gray-100 p-3">
					<div>
						<p className="text-sm font-medium">{file.name}</p>
						<p className="text-xs text-gray-500">
							{(file.size / 1024 / 1024).toFixed(2)}
						</p>
					</div>
					<button
						type="button"
						onClick={() => {
							setFile(null);
							if (inputRef.current) {
								inputRef.current.value = '';
							}
						}}
						className="text-sm text-red-600"
					>
						Remove
					</button>
				</div>
			)}
			{errorMessage && <p>{errorMessage}</p>}
		</div>
	);
}

export default AttachmentUpload;
