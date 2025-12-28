import type { FC } from 'react';
import Input, { type InputProps } from './Input';

export interface NumberInputProps extends InputProps {
	min?: number;
	max?: number;
	step?: number;
	hideControls?: boolean; // Not implemented fully, just relies on browser default for now
}

const NumberInput: FC<NumberInputProps> = ({ hideControls, ...props }) => {
	// To hide controls across browsers we need CSS:
	// ::-webkit-inner-spin-button, ::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
	// Firefox: -moz-appearance: textfield;

	// We can add a class if hideControls is true
	const hideClass = hideControls ? 'no-spinners' : '';

	return (
		<>
			{hideControls && (
				<style>{`
                    .no-spinners::-webkit-inner-spin-button, 
                    .no-spinners::-webkit-outer-spin-button { 
                        -webkit-appearance: none; 
                        margin: 0; 
                    }
                    .no-spinners {
                        -moz-appearance: textfield;
                    }
                `}</style>
			)}
			<Input
				type="number"
				className={`${hideClass} ${props.className || ''}`}
				{...props}
			/>
		</>
	);
};

export default NumberInput;
