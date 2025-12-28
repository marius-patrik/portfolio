import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export type CardVariant = 'glass' | 'glass-highlight' | 'flat' | 'outline';

export interface CardProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	variant?: CardVariant;
	header?: React.ReactNode;
	footer?: React.ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
	glass: 'style-glass rounded-4xl',
	'glass-highlight': 'style-glass-highlight rounded-4xl',
	flat: 'rounded-4xl bg-zinc-100 dark:bg-zinc-800',
	outline:
		'border border-zinc-200 dark:border-zinc-700 bg-transparent rounded-4xl',
};

const Card: FC<PropsWithChildren<CardProps>> = ({
	variant = 'glass',
	header,
	footer,
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

	// Handle size for Card if needed (e.g., padding/spacing scale)
	// Default padding is p-3 gap-2.
	// If size is provided, we can scale these.
	let sizeClasses = '';
	if (size) {
		if (size === 'xs') sizeClasses = 'p-1 gap-1 text-xs';
		if (size === 'sm') sizeClasses = 'p-2 gap-1.5 text-sm';
		if (size === 'md') sizeClasses = 'p-3 gap-2 text-base';
		if (size === 'lg') sizeClasses = 'p-4 gap-3 text-lg';
		if (size === 'xl') sizeClasses = 'p-6 gap-4 text-xl';

		// Override with specific p props if present
		if (p || px || py || pt || pb || pl || pr) {
			sizeClasses = sizeClasses.replace(/p-\S+/g, '');
		}
	}

	return (
		<div
			className={`${variantStyles[variant]} ${stylingClasses} ${sizeClasses} ${!size && 'p-3 gap-2'} flex flex-col ${className}`}
			{...props}
		>
			{header && <div className="style-title-center p-2">{header}</div>}
			<div className="flex flex-col gap-2">{children}</div>
			{footer && (
				<div className="flex flex-col gap-2 md:flex-wrap">{footer}</div>
			)}
		</div>
	);
};

export default Card;
