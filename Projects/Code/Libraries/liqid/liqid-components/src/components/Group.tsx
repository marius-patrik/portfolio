import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import {
	type Spacing,
	type StylingProps,
	getGapClass,
	getStylingClasses,
} from '../utils/styles';

export type GroupGap = Spacing | 'none';

export interface GroupProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	gap?: GroupGap;
}

const Group: FC<PropsWithChildren<GroupProps>> = ({
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
			className={`flex flex-row flex-wrap items-center ${getGapClass(gap)} ${stylingClasses} ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

export default Group;
