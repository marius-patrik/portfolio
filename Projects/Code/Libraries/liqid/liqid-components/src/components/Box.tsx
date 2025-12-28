import type { FC, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export interface BoxProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
		StylingProps {
	title?: ReactNode;
	buttons?: ReactNode;
}

const Box: FC<PropsWithChildren<BoxProps>> = ({
	title,
	children,
	buttons,
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

	// Default padding/margin handling
	const hasPadding = p || px || py || pt || pb || pl || pr;
	const paddingClass = hasPadding ? '' : 'p-3'; // Default p-3

	const hasMargin = m || mx || my || mt || mb || ml || mr;
	const marginClass = hasMargin ? '' : 'mx-4 sm:mx-auto'; // Default mx-4...

	const hasRadius = radius;
	const radiusClass = hasRadius ? '' : 'rounded-4xl';

	return (
		<div
			className={`style-glass ${radiusClass} ${paddingClass} ${marginClass} sm:min-w-md gap-2 flex flex-col max-w-lg ${stylingClasses} ${className}`}
			{...props}
		>
			{title && <div className="style-title-center p-2">{title}</div>}
			<div className="style-description flex flex-col gap-2 mx-2">
				{children}
			</div>
			{buttons && (
				<div className="flex flex-col gap-2 md:flex-wrap">{buttons}</div>
			)}
		</div>
	);
};

export default Box;
