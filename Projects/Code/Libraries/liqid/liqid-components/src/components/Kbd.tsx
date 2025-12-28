import type { FC, HTMLAttributes } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export interface KbdProps extends HTMLAttributes<HTMLElement>, StylingProps {}

const Kbd: FC<KbdProps> = ({
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
		radius: radius || 'sm',
		shadow,
	});

	let sizeClass = 'text-xs px-1.5 py-0.5';
	if (size === 'xs') sizeClass = 'text-[10px] px-1 py-0';
	if (size === 'lg') sizeClass = 'text-sm px-2 py-1';

	return (
		<kbd
			className={`
                font-mono font-semibold 
                bg-zinc-100 dark:bg-zinc-800 
                border-b-2 border-zinc-300 dark:border-zinc-600 
                text-zinc-700 dark:text-zinc-300
                rounded-md 
                ${sizeClass} ${stylingClasses} ${className}
            `}
			{...props}
		>
			{children}
		</kbd>
	);
};

export default Kbd;
