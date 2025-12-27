import type { FC, TextareaHTMLAttributes } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export interface TextareaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement>,
		StylingProps {
	variant?: 'filled' | 'unstyled';
	error?: boolean | React.ReactNode;
	autosize?: boolean; // We won't implement real autosize logic without refs/listeners, just standard for now.
	minRows?: number;
	maxRows?: number;
}

const Textarea: FC<TextareaProps> = ({
	variant = 'filled',
	error,
	autosize,
	minRows,
	maxRows,
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
	let fontSize = 'text-sm';
	if (size === 'xs') fontSize = 'text-xs';
	if (size === 'md') fontSize = 'text-base';
	if (size === 'lg') fontSize = 'text-lg';
	if (size === 'xl') fontSize = 'text-xl';

	const baseStyles = `
        w-full transition-colors appearance-none outline-none
        bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700
        focus:border-blue-500 focus:ring-1 focus:ring-blue-500
        placeholder:text-zinc-400 dark:placeholder:text-zinc-500
        disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-zinc-50
    `;

	const errorClasses = error
		? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900 dark:text-red-100 placeholder:text-red-300'
		: '';

	// If unstyled, remove baseStyles
	const finalStyles =
		variant === 'unstyled'
			? 'bg-transparent outline-none w-full'
			: `${baseStyles} ${errorClasses}`;

	// Padding defaults if not passed
	const paddingDefault =
		p || px || py || pt || pb || pl || pr ? '' : 'px-3 py-2';

	return (
		<textarea
			className={`${finalStyles} ${fontSize} ${paddingDefault} ${stylingClasses} ${className}`}
			disabled={disabled}
			rows={minRows}
			{...props}
		/>
	);
};

export default Textarea;
