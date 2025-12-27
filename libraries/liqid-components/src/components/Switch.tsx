import type { FC, InputHTMLAttributes, ReactNode } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export interface SwitchProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
		StylingProps {
	label?: ReactNode;
	description?: ReactNode;
	error?: ReactNode;
	onLabel?: ReactNode;
	offLabel?: ReactNode;
}

const Switch: FC<SwitchProps> = ({
	label,
	description,
	error,
	onLabel,
	offLabel,
	className = '',
	id,
	disabled,
	// Styling props
	m,
	mt,
	mb,
	ml,
	mr,
	mx,
	my,
	p,
	pt,
	pb,
	pl,
	pr,
	px,
	py,
	radius,
	shadow,
	size,
	...props
}) => {
	const stylingClasses = getStylingClasses({
		m,
		mt,
		mb,
		ml,
		mr,
		mx,
		my,
		p,
		pt,
		pb,
		pl,
		pr,
		px,
		py,
		radius: radius || 'full',
		shadow,
	});

	// Size defaults
	// sm: w-8 h-4, md: w-10 h-6
	let trackSize = 'w-10 h-6';
	let thumbSize = 'w-4 h-4';
	let translate = 'translate-x-4';
	let fontSize = 'text-sm';

	if (size === 'xs') {
		trackSize = 'w-6 h-3.5';
		thumbSize = 'w-2.5 h-2.5';
		translate = 'translate-x-2.5';
		fontSize = 'text-xs';
	}
	if (size === 'sm') {
		trackSize = 'w-8 h-5';
		thumbSize = 'w-3.5 h-3.5';
		translate = 'translate-x-3';
		fontSize = 'text-sm';
	}
	if (size === 'md') {
		trackSize = 'w-11 h-6';
		thumbSize = 'w-5 h-5';
		translate = 'translate-x-5';
		fontSize = 'text-base';
	}
	if (size === 'lg') {
		trackSize = 'w-14 h-8';
		thumbSize = 'w-6 h-6';
		translate = 'translate-x-6';
		fontSize = 'text-lg';
	}
	if (size === 'xl') {
		trackSize = 'w-16 h-9';
		thumbSize = 'w-7 h-7';
		translate = 'translate-x-7';
		fontSize = 'text-xl';
	}

	const inputId = id || `switch-${Math.random().toString(36).substring(2, 9)}`;

	return (
		<div className={`flex items-start gap-3 ${stylingClasses} ${className}`}>
			<div className="relative inline-flex items-center cursor-pointer">
				<input
					id={inputId}
					type="checkbox"
					className="peer sr-only"
					disabled={disabled}
					{...props}
				/>

				<div
					className={`
                    ${trackSize} bg-zinc-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 
                    rounded-full peer dark:bg-zinc-700 peer-checked:bg-blue-600 transition-colors
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
				/>

				<div
					className={`
                    absolute left-1 top-1/2 -translate-y-1/2 bg-white rounded-full transition-transform 
                    peer-checked:${translate} ${thumbSize} shadow-sm flex items-center justify-center
                `}
				>
					{/* Icons logic could go here */}
				</div>
			</div>

			{(label || description || error) && (
				<div className="flex flex-col">
					{label && (
						<label
							htmlFor={inputId}
							className={`font-medium ${fontSize} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} text-zinc-900 dark:text-zinc-100`}
						>
							{label}
						</label>
					)}
					{description && (
						<p className={'text-zinc-500 dark:text-zinc-400 text-xs mt-0.5'}>
							{description}
						</p>
					)}
					{error && typeof error !== 'boolean' && (
						<p className="text-red-600 text-xs mt-0.5">{error}</p>
					)}
				</div>
			)}
		</div>
	);
};

export default Switch;
