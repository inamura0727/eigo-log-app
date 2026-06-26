import Image from 'next/image';
import React from 'react';

type ButtonEl = {
	colour: string;
	text: string;
	icon?: string;
	textColour: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function Button(props: ButtonEl) {
	return (
		<button
			type="button"
			className="flex items-center gap-2 border border-[#c6c6c6] px-3 py-2 rounded-[10px] h-14 text-2xl"
			style={{ backgroundColor: props.colour, color: props.textColour }}
			onClick={props.onClick}
		>
			{props.icon && <Image src={props.icon} alt="" className="h-4 w-4" />}
			{props.text}
		</button>
	);
}

export default Button;
