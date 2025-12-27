import type { FC, HTMLAttributes, ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import {
	type Radius,
	type StylingProps,
	getStylingClasses,
} from '../utils/styles';

interface AccordionContextValue {
	value: string | null;
	onChange: (value: string) => void;
	icon?: ReactNode; // Default icon
	radius?: Radius;
	variant?: 'default' | 'contained' | 'filled' | 'separated';
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export interface AccordionProps extends StylingProps {
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	children: ReactNode;
	variant?: 'default' | 'contained' | 'filled' | 'separated';
	radius?: Radius;
	className?: string; // Explicit
}

const Accordion: FC<AccordionProps> & {
	Item: FC<AccordionItemProps>;
	Control: FC<AccordionControlProps>;
	Panel: FC<AccordionPanelProps>;
} = ({
	value: controlledValue,
	defaultValue,
	onChange,
	children,
	variant = 'default',
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
	const [uncontrolledValue, setUncontrolledValue] = useState<string | null>(
		defaultValue || null,
	);
	const isControlled = controlledValue !== undefined;
	const value = isControlled ? controlledValue! : uncontrolledValue;

	const handleChange = (val: string) => {
		const newValue = value === val ? null : val; // Toggle off if clicked same
		if (!isControlled) {
			setUncontrolledValue(newValue); // Note: newValue can be null
		}
		onChange?.(newValue || ''); // Mantine typically passes null, but our signature says string. Let's fix signature downstream if needed.
	};

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

	return (
		<AccordionContext.Provider
			value={{ value: value || null, onChange: handleChange, variant, radius }}
		>
			<div className={`${stylingClasses} ${className}`}>{children}</div>
		</AccordionContext.Provider>
	);
};

interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
	value: string;
}

const Item: FC<AccordionItemProps> = ({
	value,
	children,
	className = '',
	...props
}) => {
	const ctx = useContext(AccordionContext);
	if (!ctx) throw new Error('Accordion.Item must be used within Accordion');

	// Pass value down via context or clone?
	// Clone is tricky.
	// Let's use ItemContext.

	const isActive = ctx.value === value;

	const borderClass =
		ctx.variant === 'default'
			? 'border-b border-zinc-200 dark:border-zinc-700 last:border-0'
			: ctx.variant === 'contained'
				? 'border border-zinc-200 dark:border-zinc-700 mb-[-1px] first:rounded-t last:rounded-b'
				: ctx.variant === 'filled'
					? 'bg-zinc-50 dark:bg-zinc-900 rounded-md mb-2'
					: '';

	return (
		<AccordionItemContext.Provider value={{ value }}>
			<div
				className={`${borderClass} ${isActive ? 'is-active' : ''} ${className}`}
				{...props}
			>
				{children}
			</div>
		</AccordionItemContext.Provider>
	);
};

const AccordionItemContext = createContext<{ value: string } | null>(null);

interface AccordionControlProps extends HTMLAttributes<HTMLButtonElement> {
	icon?: ReactNode;
}

const Control: FC<AccordionControlProps> = ({
	children,
	icon,
	className = '',
	onClick,
	...props
}) => {
	const ctx = useContext(AccordionContext);
	const itemCtx = useContext(AccordionItemContext);

	if (!ctx || !itemCtx)
		throw new Error('Accordion.Control must be used within Accordion.Item');

	const isActive = ctx.value === itemCtx.value;

	return (
		<button
			type="button"
			onClick={(e) => {
				onClick?.(e);
				ctx.onChange(itemCtx.value);
			}}
			className={`w-full flex items-center justify-between p-4 text-left font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-zinc-900 dark:text-zinc-100 ${className}`}
			{...props}
		>
			<div className="flex items-center gap-3">
				{icon && <span className="text-zinc-500">{icon}</span>}
				{children}
			</div>
			<span
				className={`text-zinc-400 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<polyline points="6 9 12 15 18 9" />
				</svg>
			</span>
		</button>
	);
};

interface AccordionPanelProps extends HTMLAttributes<HTMLDivElement> {}

const Panel: FC<AccordionPanelProps> = ({
	children,
	className = '',
	...props
}) => {
	const ctx = useContext(AccordionContext);
	const itemCtx = useContext(AccordionItemContext);

	if (!ctx || !itemCtx)
		throw new Error('Accordion.Panel must be used within Accordion.Item');

	const isActive = ctx.value === itemCtx.value;

	if (!isActive) return null;

	return (
		<div
			className={`p-4 pt-0 text-sm text-zinc-600 dark:text-zinc-300 ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

Accordion.Item = Item;
Accordion.Control = Control;
Accordion.Panel = Panel;

export default Accordion;
