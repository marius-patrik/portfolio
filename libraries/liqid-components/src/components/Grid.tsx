import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import {
	type Spacing,
	type StylingProps,
	getGapClass,
	getStylingClasses,
} from '../utils/styles';

export type GridCols = 1 | 2 | 3 | 4;
export type GridGap = Spacing | 'none';

export interface GridProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	cols?: GridCols;
	gap?: GridGap;
}

const colStyles: Record<GridCols, string> = {
	1: 'grid-cols-1',
	2: 'grid-cols-1 sm:grid-cols-2',
	3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
	4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4',
};

const Grid: FC<PropsWithChildren<GridProps>> = ({
	cols = 2,
	gap = 'md',
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
			className={`grid ${colStyles[cols]} ${getGapClass(gap)} ${stylingClasses} ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

export default Grid;
