import type { FC, HTMLAttributes, ReactNode } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export interface DividerProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	orientation?: 'horizontal' | 'vertical';
	label?: ReactNode;
	labelPosition?: 'left' | 'center' | 'right';
	color?: string; // Currently handled via text color inheritance or strict class?
}

const Divider: FC<DividerProps> = ({
	orientation = 'horizontal',
	label,
	labelPosition = 'center',
	color,
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
		size,
	});

	// Size for thickness?
	let thicknessClass = 'border-t'; // default 1px
	if (orientation === 'vertical') thicknessClass = 'border-l h-full mx-2';

	// Label handling (only horizontal)
	if (label && orientation === 'horizontal') {
		// Left: Label -----
		// Center: --- Label ---
		// Right: ----- Label
		return (
			<div
				className={`flex items-center text-xs text-zinc-500 ${stylingClasses} ${className}`}
				{...props}
			>
				{labelPosition === 'left' && (
					<>
						<span className="mr-2 font-semibold">{label}</span>
						<div className="flex-1 border-t border-zinc-200 dark:border-zinc-700" />
					</>
				)}
				{labelPosition === 'center' && (
					<>
						<div className="flex-1 border-t border-zinc-200 dark:border-zinc-700" />
						<span className="mx-2 font-semibold">{label}</span>
						<div className="flex-1 border-t border-zinc-200 dark:border-zinc-700" />
					</>
				)}
				{labelPosition === 'right' && (
					<>
						<div className="flex-1 border-t border-zinc-200 dark:border-zinc-700" />
						<span className="ml-2 font-semibold">{label}</span>
					</>
				)}
			</div>
		);
	}

	return (
		<div
			className={`${thicknessClass} border-zinc-200 dark:border-zinc-700 ${stylingClasses} ${className}`}
			{...props}
		/>
	);
};

export default Divider;
