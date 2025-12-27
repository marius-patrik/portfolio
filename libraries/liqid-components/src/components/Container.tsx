import type { FC, HTMLAttributes } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export interface ContainerProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	fluid?: boolean;
}

const Container: FC<ContainerProps> = ({
	fluid,
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
		py, // Container usually has default padding
		radius,
		shadow,
		size, // Size usually controls max-width
	});

	// Default padding if no p prop
	const hasPadding = p || px || py || pt || pb || pl || pr;
	const paddingClass = hasPadding ? '' : 'px-4';

	// Size mapping for max-width
	let maxWidthClass = 'max-w-4xl'; // Default ~ md
	if (size === 'xs') maxWidthClass = 'max-w-xs';
	if (size === 'sm') maxWidthClass = 'max-w-xl';
	if (size === 'md') maxWidthClass = 'max-w-4xl';
	if (size === 'lg') maxWidthClass = 'max-w-6xl';
	if (size === 'xl') maxWidthClass = 'max-w-7xl';

	if (fluid) maxWidthClass = 'max-w-full';

	return (
		<div
			className={`mx-auto w-full ${maxWidthClass} ${paddingClass} ${stylingClasses} ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

export default Container;
