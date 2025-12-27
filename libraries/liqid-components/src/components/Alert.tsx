import type { FC, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export type AlertVariant = 'light' | 'filled' | 'outline' | 'transparent';

export interface AlertProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'color'>,
		StylingProps {
	title?: ReactNode;
	variant?: AlertVariant;
	icon?: ReactNode;
	withCloseButton?: boolean;
	onClose?: () => void;
	color?: string; // For now simplified, could be specific scheme
}

const variantStyles: Record<AlertVariant, string> = {
	light: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100',
	filled: 'bg-blue-500 text-white',
	outline:
		'border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100',
	transparent: 'bg-transparent text-zinc-900 dark:text-zinc-100',
};

const Alert: FC<PropsWithChildren<AlertProps>> = ({
	title,
	children,
	variant = 'light',
	icon,
	withCloseButton,
	onClose,
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
		radius: radius || 'md', // Default radius
		shadow,
	});

	// Default padding if not specified
	const hasPadding = p || px || py || pt || pb || pl || pr;
	const paddingClass = hasPadding ? '' : 'p-4';

	return (
		<div
			role="alert"
			className={`relative overflow-hidden flex gap-3 ${variantStyles[variant]} ${paddingClass} ${stylingClasses} ${className}`}
			{...props}
		>
			{icon && <div className="shrink-0 w-5 h-5">{icon}</div>}

			<div className="flex-1">
				{title && <div className="font-bold mb-1 text-sm">{title}</div>}
				<div className="text-sm">{children}</div>
			</div>

			{withCloseButton && (
				<button
					type="button"
					onClick={onClose}
					className="text-inherit opacity-70 hover:opacity-100 cursor-pointer"
					aria-label="Close alert"
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
						role="img"
						aria-label="Close"
					>
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>
			)}
		</div>
	);
};

export default Alert;
