import type { BlockquoteHTMLAttributes, FC, ReactNode } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export interface BlockquoteProps
	extends BlockquoteHTMLAttributes<HTMLQuoteElement>,
		StylingProps {
	icon?: ReactNode;
	cite?: string;
	color?: string;
}

const Blockquote: FC<BlockquoteProps> = ({
	icon,
	cite,
	color = 'zinc',
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
		radius: radius || 'lg',
		shadow,
	});

	// Use padding default
	const paddingClass = p || px || py || pt || pb || pl || pr ? '' : 'p-6';

	const bgClass = 'bg-zinc-50 dark:bg-zinc-900';

	return (
		<blockquote
			className={`relative ${bgClass} ${paddingClass} ${stylingClasses} ${className}`}
			{...props}
		>
			{icon && (
				<div className="absolute top-0 left-0 -translate-y-1/2 translate-x-4 bg-white dark:bg-zinc-800 p-2 rounded-full shadow-sm text-zinc-400">
					{icon}
				</div>
			)}

			<div className="text-lg italic text-zinc-900 dark:text-zinc-100 leading-relaxed">
				{children}
			</div>

			{cite && (
				<footer className="mt-3 text-sm text-zinc-500 font-semibold">
					— {cite}
				</footer>
			)}
		</blockquote>
	);
};

export default Blockquote;
