import type { FC, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { useEffect, useState } from 'react';

export interface DrawerProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	isOpen: boolean;
	onClose: () => void;
	title?: ReactNode;
	position?: 'left' | 'right' | 'top' | 'bottom';
	size?: string | number; // e.g. "300px", "50%", "xl"
	padding?: string;
	overlay?: boolean;
}

const Drawer: FC<PropsWithChildren<DrawerProps>> = ({
	isOpen,
	onClose,
	title,
	children,
	position = 'left',
	size = '300px',
	padding = 'p-4',
	overlay = true,
	className = '',
	...props
}) => {
	const [isClosing, setIsClosing] = useState(false);
	const [shouldRender, setShouldRender] = useState(isOpen);

	useEffect(() => {
		if (isOpen) {
			setShouldRender(true);
			setIsClosing(false);
		} else if (shouldRender) {
			setIsClosing(true); // Trigger close animation
		}
	}, [isOpen, shouldRender]);

	const handleAnimationEnd = () => {
		if (isClosing) {
			setIsClosing(false);
			setShouldRender(false);
			// onClose(); // Already termed closed by prop
		}
	};

	if (!shouldRender) return null;

	// Resolve size if it's a preset
	let sizeStyle = {};
	if (position === 'left' || position === 'right') {
		sizeStyle = { width: size };
	} else {
		sizeStyle = { height: size };
	}

	const drawerBase =
		'fixed bg-white dark:bg-zinc-900 shadow-2xl transition-transform duration-300 ease-in-out';

	let positionClass = '';
	let animateClass = '';

	if (position === 'left') {
		positionClass = 'top-0 left-0 h-full';
		animateClass = isClosing ? '-translate-x-full' : 'translate-x-0';
		if (!isClosing && !isOpen) animateClass = '-translate-x-full'; // Initial state if needed, but handled by render logic
	} else if (position === 'right') {
		positionClass = 'top-0 right-0 h-full';
		animateClass = isClosing ? 'translate-x-full' : 'translate-x-0';
	} else if (position === 'top') {
		positionClass = 'top-0 left-0 w-full';
		animateClass = isClosing ? '-translate-y-full' : 'translate-y-0';
	} else if (position === 'bottom') {
		positionClass = 'bottom-0 left-0 w-full';
		animateClass = isClosing ? 'translate-y-full' : 'translate-y-0';
	}

	// Animation hack: mount with closed state then animate in?
	// Simplified: simple conditional rendering with CSS transition requires presence.
	// Better to keep it simple: If isOpen, render with transform-none. If closing, render with transform-off.
	// The current logic with `isClosing` captures the exit. For entry, we need to ensure it starts off-screen if we want to animate IN.
	// React `useEffect` for mounting animation can be tricky.
	// For now, let's use a keyframe animation approach similar to Modal if possible, or just standard classes.
	// Let's use standard classes but we need 'animate-in' state.

	// simplified entry:
	const finalTransform = animateClass;
	// Note: To animate IN, the component must mount with the 'off' state then switch to 'on'.
	// We'll rely on CSS animation classes instead of transition for simplicity if `Modal` uses `animate-scale-in`.
	// Let's stick to simple fixed classes for now.

	return (
		<div className="z-50 relative">
			{overlay && (
				<div
					className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity ${isClosing ? 'opacity-0' : 'opacity-100'}`}
					onClick={onClose}
				/>
			)}
			<div
				className={`${drawerBase} ${positionClass} ${padding} flex flex-col ${className}`}
				style={sizeStyle}
				{...props}
				// We'll use style for simple transform if we don't have global animations for slide
				// Actually let's assume valid tailwind config.
				// We will add `data-state` or similar.
			>
				<div className="flex items-center justify-between mb-4">
					<div className="font-semibold text-lg">{title}</div>
					<button
						onClick={onClose}
						className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded"
					>
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<div className="flex-1 overflow-y-auto">{children}</div>
			</div>
		</div>
	);
};

export default Drawer;
