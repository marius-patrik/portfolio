import type { FC, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

// Mapping legacy IconSize to new naming if needed, or just supporting the new Size type
export type AppIconProps = HTMLAttributes<HTMLButtonElement> &
	StylingProps & {
		name?: string;
		icon: ReactNode;
		showTitle?: boolean;
	};

const AppIcon: FC<PropsWithChildren<AppIconProps>> = ({
	name,
	icon,
	size = 'md', // Default to md (was small/large before, let's map)
	showTitle = true,
	onClick,
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
	});

	// Size logic:
	// Previously: small (max-w-14) or large (max-w-16).
	// New: scale everything.
	// We'll keep the `icon-*` classes but might need to adjust them or inject styles.

	let containerSize = 'max-w-16';
	let iconClass = 'icon-large'; // Default

	if (size === 'xs' || size === 'sm') {
		containerSize = 'max-w-12';
		iconClass = 'icon-small';
	} else if (size === 'md') {
		containerSize = 'max-w-16';
		iconClass = 'icon-large';
	} else if (size === 'lg') {
		containerSize = 'max-w-20';
		iconClass = 'h-16 w-16 text-3xl'; // Custom for larger
	} else if (size === 'xl' || size === '2xl' || size === '3xl') {
		containerSize = 'max-w-24';
		iconClass = 'h-20 w-20 text-4xl';
	}

	return (
		<button
			type="button"
			className={`flex flex-col items-center gap-1 hover-scale cursor-pointer ${containerSize} ${stylingClasses} ${className}`}
			onClick={onClick}
			{...props}
		>
			<div className={`${iconClass} glass flex items-center justify-center`}>
				{icon}
			</div>

			{showTitle && name && (
				<span className="text-xs font-semibold truncate w-full text-center block">
					{name}
				</span>
			)}
		</button>
	);
};

export default AppIcon;
