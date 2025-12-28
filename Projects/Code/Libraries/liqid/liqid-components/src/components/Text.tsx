import type { ElementType, FC, HTMLAttributes, ReactNode } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export interface TextProps extends HTMLAttributes<HTMLElement>, StylingProps {
	variant?: 'text' | 'link' | 'gradient';
	dimmed?: boolean;
	gradient?: { from: string; to: string; deg?: number };
	span?: boolean;
	fw?: number | string; // font-weight
	component?: ElementType; // Polymorphic 'as'
	truncate?: boolean;
	lineClamp?: number;
	align?: 'left' | 'center' | 'right' | 'justify';
}

const Text: FC<TextProps> = ({
	variant = 'text',
	dimmed,
	gradient,
	span,
	fw,
	component,
	truncate,
	lineClamp,
	align,
	children,
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
		radius,
		shadow,
		size,
	});

	const Component = component || (span ? 'span' : 'div');

	let sizeClass = '';
	if (size === 'xs') sizeClass = 'text-xs';
	if (size === 'sm') sizeClass = 'text-sm';
	if (size === 'md') sizeClass = 'text-base';
	if (size === 'lg') sizeClass = 'text-lg';
	if (size === 'xl') sizeClass = 'text-xl';

	// Custom font weights could be mapped
	let fwClass = '';
	if (fw) fwClass = `font-[${fw}]`; // Simplified, usually use font-bold etc.
	if (fw === 700 || fw === 'bold') fwClass = 'font-bold';
	if (fw === 500 || fw === 'medium') fwClass = 'font-medium';

	const alignClass = align ? `text-${align}` : '';

	let variantClass = 'text-zinc-900 dark:text-zinc-100';
	if (dimmed) variantClass = 'text-zinc-500 dark:text-zinc-400';
	if (variant === 'link')
		variantClass = 'text-blue-600 hover:underline cursor-pointer';
	if (variant === 'gradient' && gradient) {
		variantClass = `bg-gradient-to-r from-${gradient.from}-500 to-${gradient.to}-500 bg-clip-text text-transparent`;
	}

	const truncateClass = truncate ? 'truncate' : '';
	const lineClampClass = lineClamp ? `line-clamp-${lineClamp}` : '';

	return (
		<Component
			className={`${sizeClass} ${fwClass} ${alignClass} ${variantClass} ${truncateClass} ${lineClampClass} ${stylingClasses} ${className}`}
			{...props}
		>
			{children}
		</Component>
	);
};

export default Text;
