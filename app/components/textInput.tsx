'use client';

type InputText = {
	value: string;
	onChange: (value: string) => void;
};

function TextInput({ value, onChange }: InputText) {
	return (
		<textarea
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder="Write some sentences in English..."
			className="w-full h-100 rounded-[20px] p-4 border border-[#c6c6c6]"
		/>
	);
}

export default TextInput;
