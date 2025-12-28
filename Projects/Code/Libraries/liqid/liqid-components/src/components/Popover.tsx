import type { FC, ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export interface PopoverProps extends StylingProps {
	target: ReactNode;
	dropdown?: ReactNode; // Make optional to allow empty
	children?: ReactNode; // Can be used for content if dropdown not specified, or if we change API
	opened?: boolean;
	onChange?: (opened: boolean) => void;
	position?: 'bottom' | 'top' | 'left' | 'right';
	withArrow?: boolean;
	width?: number | string;
	trapFocus?: boolean;
	closeOnClickOutside?: boolean;
}

const Popover: FC<PopoverProps> = ({
	target,
	dropdown,
	children,
	opened: controlledOpened,
	onChange,
	position = 'bottom',
	width = 200,
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
	const [uncontrolledOpened, setUncontrolledOpened] = useState(false);
	const isControlled = controlledOpened !== undefined;
	const isOpened = isControlled ? controlledOpened : uncontrolledOpened;

	const containerRef = useRef<HTMLDivElement>(null);

	const toggle = () => {
		if (isControlled) {
			onChange?.(!isOpened);
		} else {
			setUncontrolledOpened(!isOpened);
		}
	};

	const close = useCallback(() => {
		if (isControlled) {
			onChange?.(false);
		} else {
			setUncontrolledOpened(false);
		}
	}, [isControlled, onChange]);

	// Click outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				close();
			}
		};

		if (isOpened) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpened, close]);

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
		radius: radius || 'md',
		shadow: shadow || 'lg',
	});

	// Content
	const content = dropdown || children;

	// Position logic (simplified)
	const posStyles: Record<string, string> = {
		bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
		top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
		left: 'right-full top-1/2 -translate-y-1/2 mr-2',
		right: 'left-full top-1/2 -translate-y-1/2 ml-2',
		'bottom-start': 'top-full left-0 mt-2', // simplified mapping
		'bottom-end': 'top-full right-0 mt-2',
	};

	// We default to bottom-center for 'bottom'.
	// If we want more robust positioning, we need to add more props or logic.
	// For now base off `position`.

	const styles = posStyles[position] || posStyles.bottom;

	return (
		<div className={`relative inline-block ${className}`} ref={containerRef}>
			<button
				type="button"
				onClick={toggle}
				className="cursor-pointer inline-block bg-transparent border-0 p-0"
			>
				{target}
			</button>

			{isOpened && (
				<div
					className={`absolute z-20 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-2 min-w-[200px] ${styles} ${stylingClasses}`}
					style={{ width: width === 'target' ? '100%' : width }}
				>
					{content}
				</div>
			)}
		</div>
	);
};

export default Popover;
