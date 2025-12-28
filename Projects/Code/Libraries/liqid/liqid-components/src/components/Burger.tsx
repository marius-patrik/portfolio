import type { FC, HTMLAttributes } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export interface BurgerProps
	extends HTMLAttributes<HTMLButtonElement>,
		StylingProps {
	opened: boolean;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // override size type logic slightly
}

const Burger: FC<BurgerProps> = ({
	opened,
	className = '',
	onClick,
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

	// Sizes
	let sizePx = 24; // md
	if (size === 'xs') sizePx = 12;
	if (size === 'sm') sizePx = 18;
	if (size === 'md') sizePx = 24;
	if (size === 'lg') sizePx = 34;
	if (size === 'xl') sizePx = 42;

	// Burger lines
	const lineClass =
		'absolute left-0 w-full h-[10%] bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-300 transform origin-center';

	return (
		<button
			type="button"
			className={`relative flex flex-col justify-between cursor-pointer ${stylingClasses} ${className}`}
			style={{ width: sizePx, height: sizePx }}
			onClick={onClick}
			aria-label={opened ? 'Close navigation' : 'Open navigation'}
			aria-expanded={opened}
			{...props}
		>
			<div
				className={`${lineClass} ${opened ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`}
			/>
			<div
				className={`${lineClass} top-1/2 -translate-y-1/2 ${opened ? 'opacity-0' : 'opacity-100'}`}
			/>
			<div
				className={`${lineClass} ${opened ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-0'}`}
			/>
		</button>
	);
};

export default Burger;
