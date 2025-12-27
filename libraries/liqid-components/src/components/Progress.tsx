import type { FC, HTMLAttributes } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export interface ProgressProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	value: number; // 0-100
	color?: string;
	striped?: boolean;
	animated?: boolean;
}

const Progress: FC<ProgressProps> = ({
	value,
	color = 'blue',
	striped,
	animated,
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
		// Padding usually not used on progress container, but let's allow overrides
		p,
		pt,
		pb,
		pl,
		pr,
		px,
		py,
		radius: radius || 'full',
		shadow,
	});

	// Size mapping for height
	let heightClass = 'h-2';
	if (size === 'xs') heightClass = 'h-1';
	if (size === 'sm') heightClass = 'h-2';
	if (size === 'md') heightClass = 'h-4';
	if (size === 'lg') heightClass = 'h-6';
	if (size === 'xl') heightClass = 'h-8';

	// Color mapping - simplified
	// This assumes tailwind classes like bg-blue-600 exist.
	// If color is a hex, we'd need style={{ backgroundColor: color }}.
	// We'll trust the user to pass a valid color string for tailwind or style it via className if needed.
	// Actually standard Mantine `color` is a theme color. We'll map standard ones.
	const validColors = [
		'blue',
		'red',
		'green',
		'yellow',
		'cyan',
		'pink',
		'gray',
		'zinc',
		'orange',
		'teal',
		'indigo',
		'purple',
	];
	const safeColor = validColors.includes(color) ? color : 'blue';
	const bgClass = `bg-${safeColor}-600`;

	return (
		<div
			className={`w-full bg-zinc-100 dark:bg-zinc-700 overflow-hidden ${heightClass} ${stylingClasses} ${className}`}
			role="progressbar"
			aria-valuenow={value}
			aria-valuemin={0}
			aria-valuemax={100}
			{...props}
		>
			<div
				className={`
                    h-full transition-all duration-300 ease-in-out ${bgClass}
                    ${striped ? 'bg-size-[1rem_1rem] bg-linear-to-br from-transparent via-white/20 to-transparent' : ''}
                    ${animated ? 'animate-progress-stripes' : ''}
                `}
				style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
			/>
		</div>
	);
};

export default Progress;
