import type { FC, HTMLAttributes, ReactNode } from 'react';
import type React from 'react';
import { createContext, useContext, useState } from 'react';
import { getStylingClasses } from '../utils/styles';
import type { PopoverProps } from './Popover';

interface MenuContextValue {
	closeOnItemClick: boolean;
	close: () => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

export interface MenuProps extends PopoverProps {
	closeOnItemClick?: boolean;
	trigger?: 'click' | 'hover';
}

const MenuInternalState = createContext({
	opened: false,
	toggle: () => {},
	open: () => {},
	close: () => {},
	trigger: 'click' as 'click' | 'hover',
});

const Menu: FC<MenuProps> & {
	Target: FC<{ children: ReactNode }>;
	Dropdown: FC<{ children: ReactNode; className?: string }>;
	Item: FC<MenuItemProps>;
	Label: FC<HTMLAttributes<HTMLDivElement>>;
	Divider: FC<Record<string, never>>;
} = ({
	children,
	closeOnItemClick = true,
	trigger = 'click',
	className = '',
	...props
}) => {
	const [opened, setOpened] = useState(false);
	const toggle = () => setOpened(!opened);
	const close = () => setOpened(false);
	const open = () => setOpened(true);

	return (
		<MenuContext.Provider value={{ closeOnItemClick, close }}>
			<div
				className={`relative inline-block text-left ${className}`}
				onMouseLeave={trigger === 'hover' ? close : undefined}
				onMouseEnter={trigger === 'hover' ? open : undefined}
				{...(props as HTMLAttributes<HTMLDivElement>)}
			>
				<MenuInternalState.Provider
					value={{ opened, toggle, open, close, trigger }}
				>
					{children}
				</MenuInternalState.Provider>
			</div>
		</MenuContext.Provider>
	);
};

const Target: FC<{ children: ReactNode }> = ({ children }) => {
	const { toggle, open, trigger } = useContext(MenuInternalState);
	return (
		<div
			onClick={trigger === 'click' ? toggle : undefined}
			onKeyDown={(e) => {
				if (trigger === 'click' && (e.key === 'Enter' || e.key === ' ')) {
					e.preventDefault();
					toggle();
				}
			}}
			role={trigger === 'click' ? 'button' : undefined}
			tabIndex={trigger === 'click' ? 0 : undefined}
			className="inline-block"
		>
			{children}
		</div>
	);
};

const Dropdown: FC<{ children: ReactNode; className?: string }> = ({
	children,
	className = '',
}) => {
	const { opened } = useContext(MenuInternalState);
	if (!opened) return null;

	return (
		<div
			className={`
                absolute z-50 mt-2 min-w-[200px] bg-white dark:bg-zinc-800 
                border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg 
                p-1 origin-top-left
                ${className}
            `}
		>
			{children}
		</div>
	);
};

interface MenuItemProps extends HTMLAttributes<HTMLButtonElement> {
	icon?: ReactNode;
	color?: string;
	disabled?: boolean;
}

const Item: FC<MenuItemProps> = ({
	children,
	icon,
	color,
	disabled,
	className = '',
	onClick,
	...props
}) => {
	const context = useContext(MenuContext);
	if (!context) {
		throw new Error('Menu.Item must be used within Menu component');
	}
	const { close, closeOnItemClick } = context;

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (disabled) return;
		onClick?.(e);
		if (closeOnItemClick) close();
	};

	const colorClass =
		color === 'red'
			? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
			: 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700';

	return (
		<button
			type="button"
			className={`
                w-full text-left px-3 py-2 text-sm rounded-sm flex items-center gap-2
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${colorClass}
                ${className}
            `}
			disabled={disabled}
			onClick={handleClick}
			{...props}
		>
			{icon && <span className="w-4 h-4">{icon}</span>}
			<span className="flex-1">{children}</span>
		</button>
	);
};

const Label: FC<HTMLAttributes<HTMLDivElement>> = ({
	children,
	className = '',
	...props
}) => (
	<div
		className={`px-3 py-1 text-xs font-semibold text-zinc-500 uppercase tracking-wider ${className}`}
		{...props}
	>
		{children}
	</div>
);

const Divider: FC<Record<string, never>> = () => (
	<div className="my-1 border-t border-zinc-200 dark:border-zinc-700" />
);

Menu.Target = Target;
Menu.Dropdown = Dropdown;
Menu.Item = Item;
Menu.Label = Label;
Menu.Divider = Divider;

export default Menu;
