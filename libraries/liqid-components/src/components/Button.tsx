import type { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import { Link as WouterLink } from 'wouter';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export type ButtonVariant =
	| 'glass'
	| 'glass-highlight'
	| 'icon'
	| 'text'
	| 'outline';
export type ButtonType = 'button' | 'link';

export interface ButtonProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
		StylingProps {
	variant?: ButtonVariant;
	as?: ButtonType;
	href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
	glass: 'style-glass',
	'glass-highlight': 'style-glass-highlight',
	icon: 'hover:scale-101 active:scale-101 transition-transform',
	text: 'style-link',
	outline:
		'border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors',
};

const Button: FC<PropsWithChildren<ButtonProps>> = ({
	variant = 'glass',
	as = 'button',
	href = '',
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
	// Generate utility classes
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

	// Size adjustments (if `size` affects button scale specifically beyond padding)
	const sizeClasses = size ? `btn-${size}` : '';
	// Note: We might need to define these btn-* classes in CSS or handle them here.
	// For now, let's assume 'p' props handle spacing, but we can add text sizing:
	let dynamicSize = '';
	if (size === 'xs') dynamicSize = 'text-xs px-2 py-1';
	if (size === 'sm') dynamicSize = 'text-sm px-3 py-1.5';
	if (size === 'md') dynamicSize = 'text-base px-4 py-2';
	if (size === 'lg') dynamicSize = 'text-lg px-6 py-3';
	if (size === 'xl') dynamicSize = 'text-xl px-8 py-4';

	// If specific padding props are provided, they override the size default padding
	if (p || px || py || pt || pb || pl || pr) {
		dynamicSize = dynamicSize.replace(/p[xyltrb]?-\S+/g, '');
	}

	const styles = `${variantStyles[variant]} ${stylingClasses} ${dynamicSize} ${sizeClasses} ${className}`;

	if (as === 'link') {
		return (
			<WouterLink href={href} className={styles}>
				{children}
			</WouterLink>
		);
	}

	return (
		<button type="button" className={styles} {...props}>
			{children}
		</button>
	);
};

export default Button;
