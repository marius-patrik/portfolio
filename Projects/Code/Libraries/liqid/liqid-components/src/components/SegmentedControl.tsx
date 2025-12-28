import type { FC, HTMLAttributes, ReactNode } from 'react';
import { useState } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export interface SegmentedControlItem {
	value: string;
	label: ReactNode;
	disabled?: boolean;
}

export interface SegmentedControlProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>,
		StylingProps {
	data: (string | SegmentedControlItem)[];
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	fullWidth?: boolean;
	color?: string; // bg color for active state
	name?: string;
}

const SegmentedControl: FC<SegmentedControlProps> = ({
	data,
	value: controlledValue,
	defaultValue,
	onChange,
	fullWidth,
	color = 'white', // Default active bg is white (shadowed) usually
	name,
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
		p: p || 'xs', // default p-1 is roughly xs
		pt,
		pb,
		pl,
		pr,
		px,
		py,
		radius: radius || 'md',
		shadow,
	});

	const [uncontrolledValue, setUncontrolledValue] = useState(
		defaultValue ||
			(typeof data[0] === 'string' ? data[0] : data[0]?.value) ||
			'',
	);
	const isControlled = controlledValue !== undefined;
	const activeValue = isControlled ? controlledValue : uncontrolledValue;

	const handleChange = (val: string) => {
		if (!isControlled) {
			setUncontrolledValue(val);
		}
		onChange?.(val);
	};

	// Normalize data
	const items = data.map((item) =>
		typeof item === 'string' ? { value: item, label: item } : item,
	);

	// Styling
	let fontSize = 'text-sm';
	if (size === 'xs') fontSize = 'text-xs';
	if (size === 'lg') fontSize = 'text-lg';

	return (
		<div
			className={`
                bg-zinc-100 dark:bg-zinc-800 
                flex p-1 relative
                ${fullWidth ? 'w-full' : 'inline-flex w-auto'}
                ${stylingClasses} ${className}
            `}
			{...props}
		>
			{items.map((item) => {
				const isActive = activeValue === item.value;
				return (
					<button
						key={item.value}
						type="button"
						disabled={item.disabled}
						onClick={() => !item.disabled && handleChange(item.value)}
						className={`
                            relative z-10 
                            ${fullWidth ? 'flex-1' : 'px-4'}
                            py-1.5 
                            text-center transition-all duration-200 ease-in-out
                            ${fontSize} font-medium
                            rounded-${radius || 'md'}
                            ${
															isActive
																? 'text-zinc-900 dark:text-zinc-100 shadow-sm bg-white dark:bg-zinc-700'
																: 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
														}
                            ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        `}
					>
						{item.label}
					</button>
				);
			})}
			{/* 
               Better animation: Use framer-motion or absolute div for the active tab indicator sliding.
               Simplified: just active class styling above. 
            */}
		</div>
	);
};

export default SegmentedControl;
