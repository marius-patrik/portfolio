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
		const beforeClass =
			"before:content-[''] before:flex-1 before:border-t before:border-zinc-200 dark:before:border-zinc-700";
		const afterClass =
			"after:content-[''] after:flex-1 after:border-t after:border-zinc-200 dark:after:border-zinc-700";

		const labelContainerClass = 'flex items-center gap-2';
		if (labelPosition === 'left') {
			// For left, we need before to be short or non-existent?
			// Mantine left: line on right only? Or short line left, long right?
			// Usually: Text -----
			// Center: --- Text ---
			// Right: ----- Text
			// Let's implement simplified approach:
			// We can use flex-1 only on one side.
			return (
				<div
					className={`flex items-center ${stylingClasses} ${className}`}
					{...props}
				>
					{labelPosition !== 'left' && (
						<div className="flex-1 border-t border-zinc-200 dark:border-zinc-700" />
					)}
					<div className={'px-2 text-xs font-semibold text-zinc-500'}>
						{label}
					</div>
					{labelPosition !== 'right' && (
						<div className="flex-1 border-t border-zinc-200 dark:border-zinc-700" />
					)}
				</div>
			);
		}

		return (
			<div
				className={`flex items-center text-xs text-zinc-500 ${stylingClasses} ${className}`}
				{...props}
			>
				{labelPosition === 'left' && (
					<span className="mr-2 font-semibold">{label}</span>
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
				{/* Fallback for explicit left/right with lines if logic above was confusing:
                    Actually the simple flex logic covers it:
                    Left: Label - Line
                    Right: Line - Label
                    Center: Line - Label - Line
                 */}
				{labelPosition === 'left' && (
					<div className="flex-1 border-t border-zinc-200 dark:border-zinc-700" />
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
