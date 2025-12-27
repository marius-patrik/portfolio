import type { FC, InputHTMLAttributes, ReactNode } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export interface CheckboxProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
		StylingProps {
	label?: ReactNode;
	description?: ReactNode;
	error?: ReactNode;
	indeterminate?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({
	label,
	description,
	error,
	indeterminate,
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
		radius: radius || 'sm',
		shadow,
	});

	// Size mapping
	let sizeClass = 'w-4 h-4';
	let labelSize = 'text-sm';
	if (size === 'xs') {
		sizeClass = 'w-3 h-3';
		labelSize = 'text-xs';
	}
	if (size === 'sm') {
		sizeClass = 'w-4 h-4';
		labelSize = 'text-sm';
	}
	if (size === 'md') {
		sizeClass = 'w-5 h-5';
		labelSize = 'text-base';
	}
	if (size === 'lg') {
		sizeClass = 'w-6 h-6';
		labelSize = 'text-lg';
	}
	if (size === 'xl') {
		sizeClass = 'w-8 h-8';
		labelSize = 'text-xl';
	}

	const inputId =
		id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

	return (
		<div className={`flex items-start gap-2 ${stylingClasses} ${className}`}>
			<div className="relative flex items-center">
				<input
					id={inputId}
					type="checkbox"
					disabled={disabled}
					className={`
                        appearance-none border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 
                        checked:bg-blue-600 checked:border-blue-600 
                        focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900
                        disabled:opacity-50 disabled:cursor-not-allowed
                        cursor-pointer transition-all
                        ${sizeClass}
                        ${getStylingClasses({ radius: radius || 'sm' })}
                    `}
					{...props}
				/>
				{/* Custom checkmark/indeterminate icon handling could go here, relying on CSS appearance-none usually requires an SVG sibling or background image */}
				<svg
					className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 ${
						size === 'xs'
							? 'w-2 h-2'
							: size === 'sm'
								? 'w-3 h-3'
								: 'w-3.5 h-3.5'
					}`}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<polyline points="20 6 9 17 4 12" />
				</svg>
			</div>

			{(label || description || error) && (
				<div className="flex flex-col">
					{label && (
						<label
							htmlFor={inputId}
							className={`font-medium ${labelSize} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} text-zinc-900 dark:text-zinc-100`}
						>
							{label}
						</label>
					)}
					{description && (
						<p className={'text-zinc-500 dark:text-zinc-400 text-xs mt-0.5'}>
							{description}
						</p>
					)}
					{error && <p className="text-red-600 text-xs mt-0.5">{error}</p>}
				</div>
			)}
		</div>
	);
};

export default Checkbox;
