import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import {
	type Spacing,
	type StylingProps,
	getStylingClasses,
} from '../utils/styles';

export type FlexDirection = 'row' | 'col';
export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch';
export type FlexGap = Spacing | 'none'; // Use Spacing from utils + none

export interface FlexProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	direction?: FlexDirection;
	justify?: FlexJustify;
	align?: FlexAlign;
	gap?: FlexGap;
	wrap?: boolean;
}

const directionStyles: Record<FlexDirection, string> = {
	row: 'flex-row',
	col: 'flex-col',
};

const justifyStyles: Record<FlexJustify, string> = {
	start: 'justify-start',
	center: 'justify-center',
	end: 'justify-end',
	between: 'justify-between',
};

const alignStyles: Record<FlexAlign, string> = {
	start: 'items-start',
	center: 'items-center',
	end: 'items-end',
	stretch: 'items-stretch',
};

// Map Spacing to gap-* classes
const gapStyles: Record<string, string> = {
	none: 'gap-0',
	xs: 'gap-0.5',
	sm: 'gap-2',
	md: 'gap-4',
	lg: 'gap-6',
	xl: 'gap-8',
	'2xl': 'gap-12',
	'3xl': 'gap-16',
};

const Flex: FC<PropsWithChildren<FlexProps>> = ({
	direction = 'row',
	justify = 'start',
	align = 'stretch',
	gap = 'md',
	wrap = false,
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
	});

	return (
		<div
			className={`flex ${directionStyles[direction]} ${justifyStyles[justify]} ${alignStyles[align]} ${gapStyles[gap] || ''} ${wrap ? 'flex-wrap' : ''} ${stylingClasses} ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

export default Flex;
