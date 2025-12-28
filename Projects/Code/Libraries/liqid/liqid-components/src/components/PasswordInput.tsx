import type { FC, InputHTMLAttributes, ReactNode } from 'react';
import { useState } from 'react';
import type { StylingProps } from '../utils/styles';
import Input, { type InputProps } from './Input';

export interface PasswordInputProps extends Omit<InputProps, 'type'> {
	visibilityToggleIcon?: (visible: boolean) => ReactNode;
}

const PasswordInput: FC<PasswordInputProps> = ({
	visibilityToggleIcon,
	disabled,
	rightSection,
	className = '',
	...props
}) => {
	const [visible, setVisible] = useState(false);

	const toggle = () => setVisible(!visible);

	const icon = visibilityToggleIcon ? (
		visibilityToggleIcon(visible)
	) : (
		<button
			type="button"
			onClick={toggle}
			disabled={disabled}
			className="focus:outline-none text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 flex items-center justify-center p-1"
		>
			{visible ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="w-4 h-4"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-label="Hide password"
				>
					<title>Hide password</title>
					<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
					<circle cx="12" cy="12" r="3" />
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="w-4 h-4"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-label="Show password"
				>
					<title>Show password</title>
					<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
					<line x1="1" y1="1" x2="23" y2="23" />
				</svg>
			)}
		</button>
	);

	return (
		<Input
			type={visible ? 'text' : 'password'}
			disabled={disabled}
			rightSection={
				rightSection ? (
					<div className="flex gap-1">
						{rightSection}
						{icon}
					</div>
				) : (
					icon
				)
			}
			className={className}
			{...props}
		/>
	);
};

export default PasswordInput;
