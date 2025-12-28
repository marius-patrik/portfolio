import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export interface TooltipProps extends StylingProps {
	label: ReactNode;
	children: ReactNode;
	position?: 'top' | 'right' | 'bottom' | 'left';
	withArrow?: boolean;
	opened?: boolean; // Controlled
}

const Tooltip: FC<TooltipProps> = ({
	label,
	children,
	position = 'top',
	withArrow = true,
	opened,
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
}) => {
	const [hovered, setHovered] = useState(false);

	// Check strict explicit 'opened' prop vs hover state
	const isVisible = opened !== undefined ? opened : hovered;

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
		shadow: shadow || 'sm',
	});

	// Position styles
	const posStyles: Record<string, string> = {
		top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
		bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
		left: 'right-full top-1/2 -translate-y-1/2 mr-2',
		right: 'left-full top-1/2 -translate-y-1/2 ml-2',
	};

	const arrowStyles: Record<string, string> = {
		top: 'top-full left-1/2 -translate-x-1/2 border-t-zinc-800 border-x-transparent border-b-transparent border-4',
		bottom:
			'bottom-full left-1/2 -translate-x-1/2 border-b-zinc-800 border-x-transparent border-t-transparent border-4',
		left: 'left-full top-1/2 -translate-y-1/2 border-l-zinc-800 border-y-transparent border-r-transparent border-4',
		right:
			'right-full top-1/2 -translate-y-1/2 border-r-zinc-800 border-y-transparent border-l-transparent border-4',
	};

	return (
		<div
			className="relative inline-block"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{children}

			{isVisible && (
				<div
					className={`absolute z-30 whitespace-nowrap bg-zinc-800 text-white text-xs px-2 py-1 pointer-events-none ${posStyles[position]} ${stylingClasses} ${className}`}
				>
					{label}
					{withArrow && (
						<div className={`absolute w-0 h-0 ${arrowStyles[position]}`} />
					)}
				</div>
			)}
		</div>
	);
};

export default Tooltip;
