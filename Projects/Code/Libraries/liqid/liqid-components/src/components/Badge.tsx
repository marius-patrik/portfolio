import type { FC, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export type BadgeVariant = 'filled' | 'light' | 'outline' | 'dot';

export interface BadgeProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	variant?: BadgeVariant;
	leftSection?: ReactNode;
	rightSection?: ReactNode;
	fullWidth?: boolean;
	color?: string; // Simplified
}

const variantStyles: Record<BadgeVariant, string> = {
	filled: 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900',
	light: 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100',
	outline:
		'border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100',
	dot: 'bg-transparent border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 pl-2', // Dot handled in render
};

const Badge: FC<PropsWithChildren<BadgeProps>> = ({
	children,
	variant = 'light',
	leftSection,
	rightSection,
	fullWidth,
	className = '',
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

	// Size mapping
	let sizeClass = 'h-5 text-xs px-2';
	if (size === 'xs') sizeClass = 'h-4 text-[10px] px-1.5';
	if (size === 'sm') sizeClass = 'h-5 text-xs px-2';
	if (size === 'md') sizeClass = 'h-6 text-sm px-2.5';
	if (size === 'lg') sizeClass = 'h-8 text-base px-3';
	if (size === 'xl') sizeClass = 'h-10 text-lg px-4';

	return (
		<div
			className={`inline-flex items-center justify-center font-bold uppercase tracking-wider ${fullWidth ? 'w-full flex' : ''} ${variantStyles[variant]} ${sizeClass} ${stylingClasses} ${className}`}
			{...props}
		>
			{variant === 'dot' && (
				<span className="w-2 h-2 rounded-full bg-zinc-500 mr-2" />
			)}
			{leftSection && (
				<span className="mr-1 flex items-center">{leftSection}</span>
			)}
			<span>{children}</span>
			{rightSection && (
				<span className="ml-1 flex items-center">{rightSection}</span>
			)}
		</div>
	);
};

export default Badge;
