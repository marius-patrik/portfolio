import type { ChangeEvent, FC, InputHTMLAttributes, ReactNode } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export interface SliderProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
		StylingProps {
	color?: string;
	label?: ReactNode; // Tooltip label content? Or surrounding label?
	marks?: { value: number; label?: ReactNode }[];
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // Use our Size type actually, but let's be specific for now
}

const Slider: FC<SliderProps> = ({
	color = 'blue',
	label,
	marks,
	className = '',
	disabled,
	min = 0,
	max = 100,
	step = 1,
	value,
	defaultValue,
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
		radius: radius || 'full',
		shadow,
	});

	// Height mapping
	let heightClass = 'h-2';
	if (size === 'xs') heightClass = 'h-1';
	if (size === 'sm') heightClass = 'h-1.5';
	if (size === 'md') heightClass = 'h-2';
	if (size === 'lg') heightClass = 'h-3';
	if (size === 'xl') heightClass = 'h-4';

	// Note: Styling generic range sliders cross-browser is tricky with tailwind only without plugins.
	// We will use standard accent-color for simplicity or custom CSS if needed.
	// accent-color is widely supported now.

	const accentColorClass = `accent-${color}-600`;

	return (
		<div
			className={`relative w-full flex items-center ${stylingClasses} ${className}`}
		>
			<input
				type="range"
				className={`w-full cursor-pointer ${accentColorClass} disabled:opacity-50 disabled:cursor-not-allowed`}
				min={min}
				max={max}
				step={step}
				value={value}
				defaultValue={defaultValue}
				disabled={disabled}
				{...props}
			/>
			{/* Marks rendering would require custom absolute positioning based on value/min/max. Skipped for basic implementation. */}
		</div>
	);
};

export default Slider;
