import type { ChangeEvent, FC, ReactNode, SelectHTMLAttributes } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export interface SelectItem {
	value: string;
	label: string;
	disabled?: boolean;
}

export interface SelectProps
	extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
		StylingProps {
	data?: (string | SelectItem)[];
	label?: ReactNode;
	description?: ReactNode;
	error?: ReactNode;
	variant?: 'filled' | 'unstyled';
	leftSection?: ReactNode;
	rightSection?: ReactNode;
}

const Select: FC<SelectProps> = ({
	data = [],
	label,
	description,
	error,
	variant = 'filled',
	leftSection,
	rightSection,
	className = '',
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
		radius: radius || 'md',
		shadow,
	});

	// Size defaults
	// h-9 = 36px (sm), h-10 = 40px (md)
	let heightClass = 'h-10 text-sm';
	let labelSize = 'text-sm';
	if (size === 'xs') {
		heightClass = 'h-8 text-xs';
		labelSize = 'text-xs';
	}
	if (size === 'sm') {
		heightClass = 'h-9 text-sm';
		labelSize = 'text-sm';
	}
	if (size === 'md') {
		heightClass = 'h-10 text-sm';
		labelSize = 'text-base';
	}
	if (size === 'lg') {
		heightClass = 'h-12 text-base';
		labelSize = 'text-lg';
	}
	if (size === 'xl') {
		heightClass = 'h-14 text-lg';
		labelSize = 'text-xl';
	}

	const baseInputStyles = `
        w-full bg-transparent border-0 outline-none focus:ring-0 px-0 appearance-none
        disabled:cursor-not-allowed disabled:opacity-50
    `;

	// Container styles
	const containerBase = `
        relative flex items-center transition-colors
        bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700
        focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500
    `;

	// Add error styles
	const errorClasses = error
		? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500'
		: '';

	const disabledClasses = disabled
		? 'bg-zinc-50 dark:bg-zinc-900 opacity-60 cursor-not-allowed'
		: '';

	const inputId =
		props.id || `select-${Math.random().toString(36).substring(2, 9)}`;

	return (
		<div className={`${stylingClasses} ${className}`}>
			{(label || description) && (
				<div className="flex flex-col mb-1">
					{label && (
						<label
							htmlFor={inputId}
							className={`font-medium ${labelSize} text-zinc-900 dark:text-zinc-100`}
						>
							{label}
						</label>
					)}
					{description && (
						<p className={'text-zinc-500 dark:text-zinc-400 text-xs'}>
							{description}
						</p>
					)}
				</div>
			)}

			<div
				className={`${variant === 'unstyled' ? '' : containerBase} ${errorClasses} ${disabledClasses} ${variant === 'unstyled' ? '' : heightClass} ${variant === 'unstyled' ? '' : `px-3 rounded-${radius || 'md'}`}`}
			>
				{leftSection && (
					<div className="mr-2 text-zinc-500 flex items-center h-full">
						{leftSection}
					</div>
				)}

				<select
					id={inputId}
					className={`${baseInputStyles} ${variant === 'unstyled' ? heightClass : 'h-full'} `}
					disabled={disabled}
					{...props}
				>
					{data.map((item, index) => {
						if (typeof item === 'string') {
							return (
								<option key={index} value={item}>
									{item}
								</option>
							);
						}
						return (
							<option key={index} value={item.value} disabled={item.disabled}>
								{item.label}
							</option>
						);
					})}
					{!data.length && props.children}
				</select>

				{rightSection || (
					<div className="ml-2 text-zinc-500 pointer-events-none flex items-center h-full">
						<svg
							className="w-4 h-4 opacity-50"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							role="img"
							aria-label="Select arrow"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</div>
				)}
			</div>

			{error && typeof error !== 'boolean' && (
				<p className="text-red-600 text-xs mt-1">{error}</p>
			)}
		</div>
	);
};

export default Select;
