import type { FC, HTMLAttributes, ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import {
	type Radius,
	type StylingProps,
	getStylingClasses,
} from '../utils/styles';

interface TabsContextValue {
	value: string | null;
	onChange: (value: string) => void;
	color: string;
	variant: 'default' | 'outline' | 'pills';
	radius?: Radius;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps extends StylingProps {
	defaultValue?: string;
	value?: string;
	onChange?: (value: string) => void;
	color?: string;
	variant?: 'default' | 'outline' | 'pills';
	radius?: Radius; // for pills or outline
	children: ReactNode;
	className?: string; // Add className explicitly to TS defs
}

const Tabs: FC<TabsProps> & {
	List: FC<TabsListProps>;
	Tab: FC<TabProps>;
	Panel: FC<TabsPanelProps>;
} = ({
	defaultValue,
	value: controlledValue,
	onChange,
	color = 'blue',
	variant = 'default',
	radius,
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
	radius: styleRadius, // prioritize prop radius over style prop? Or mix?
	shadow,
	size,
}) => {
	const [uncontrolledValue, setUncontrolledValue] = useState<string | null>(
		defaultValue || null,
	);
	const isControlled = controlledValue !== undefined;
	const value = isControlled ? controlledValue! : uncontrolledValue;

	const handleChange = (val: string) => {
		if (!isControlled) {
			setUncontrolledValue(val);
		}
		onChange?.(val);
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
		radius: styleRadius,
		shadow,
		size,
	});

	return (
		<TabsContext.Provider
			value={{ value, onChange: handleChange, color, variant, radius }}
		>
			<div className={`${stylingClasses} ${className}`}>{children}</div>
		</TabsContext.Provider>
	);
};

// Tabs.List
interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
	grow?: boolean;
	justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
}

const TabsList: FC<TabsListProps> = ({
	children,
	className = '',
	grow,
	justify = 'flex-start',
	...props
}) => {
	const ctx = useContext(TabsContext);
	if (!ctx) throw new Error('Tabs.List must be used within Tabs component');

	const borderClass =
		ctx.variant === 'default'
			? 'border-b border-zinc-200 dark:border-zinc-700'
			: '';

	let justifyClass = 'justify-start';
	if (justify === 'center') justifyClass = 'justify-center';
	if (justify === 'flex-end') justifyClass = 'justify-end';
	if (justify === 'space-between') justifyClass = 'justify-between';

	return (
		<div
			className={`flex flex-wrap ${borderClass} ${justifyClass} ${className}`}
			role="tablist"
			{...props}
		>
			{children}
		</div>
	);
};

// Tabs.Tab
interface TabProps extends HTMLAttributes<HTMLButtonElement> {
	value: string;
	leftSection?: ReactNode;
	rightSection?: ReactNode;
	disabled?: boolean;
}

const Tab: FC<TabProps> = ({
	value,
	children,
	className = '',
	leftSection,
	rightSection,
	disabled,
	...props
}) => {
	const ctx = useContext(TabsContext);
	if (!ctx) throw new Error('Tabs.Tab must be used within Tabs component');

	const isActive = ctx.value === value;

	// Variant styles
	let variantClasses = '';

	if (ctx.variant === 'default') {
		variantClasses = `
            border-b-2 
            ${
							isActive
								? `border-${ctx.color}-600 text-${ctx.color}-600`
								: 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800'
						}
        `;
	} else if (ctx.variant === 'outline') {
		variantClasses = `
            border-t border-l border-r rounded-t-md -mb-px
            ${
							isActive
								? 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900'
								: 'border-transparent text-zinc-500 hover:text-zinc-800' // TODO: Fix hover border logic for outline usually requires more complexity
						}
        `;
		// Simplified outline: Just highlight active
		if (!isActive)
			variantClasses =
				'border-transparent text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-t-md';
	} else if (ctx.variant === 'pills') {
		variantClasses = `
            rounded-${ctx.radius || 'full'}
            ${
							isActive
								? `bg-${ctx.color}-600 text-white`
								: 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
						}
        `;
	}

	return (
		<button
			role="tab"
			aria-selected={isActive}
			disabled={disabled}
			onClick={() => !disabled && ctx.onChange(value)}
			className={`
                px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${variantClasses}
                ${className}
            `}
			{...props}
		>
			{leftSection && <span className="flex items-center">{leftSection}</span>}
			{children}
			{rightSection && (
				<span className="flex items-center">{rightSection}</span>
			)}
		</button>
	);
};

// Tabs.Panel
interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
	value: string;
}

const TabsPanel: FC<TabsPanelProps> = ({
	value,
	children,
	className = '',
	...props
}) => {
	const ctx = useContext(TabsContext);
	if (!ctx) throw new Error('Tabs.Panel must be used within Tabs component');

	if (ctx.value !== value) return null;

	return (
		<div role="tabpanel" className={`py-4 ${className}`} {...props}>
			{children}
		</div>
	);
};

Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panel = TabsPanel;

export default Tabs;
