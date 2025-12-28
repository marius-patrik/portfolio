import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export interface AvatarProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	src?: string;
	alt?: string;
	initials?: string;
}

const Avatar: FC<PropsWithChildren<AvatarProps>> = ({
	src,
	alt,
	initials,
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
		radius: radius || 'full', // Default to full circle
		shadow,
	});

	// Size mapping
	let sizeClass = 'w-10 h-10 text-sm';
	if (size === 'xs') sizeClass = 'w-6 h-6 text-xs';
	if (size === 'sm') sizeClass = 'w-8 h-8 text-xs';
	if (size === 'md') sizeClass = 'w-10 h-10 text-sm';
	if (size === 'lg') sizeClass = 'w-16 h-16 text-lg';
	if (size === 'xl') sizeClass = 'w-24 h-24 text-xl';

	// Check if `size` is a custom string that matches tailwind w/h, otherwise fallback or handle extra logic
	// For now we stick to the mapped sizes.

	return (
		<div
			className={`relative inline-flex items-center justify-center bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-200 uppercase font-bold overflow-hidden ${sizeClass} ${stylingClasses} ${className}`}
			{...props}
		>
			{src ? (
				<img
					src={src}
					alt={alt || 'Avatar'}
					className="w-full h-full object-cover"
				/>
			) : (
				initials || (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-3/4 h-3/4 opacity-50"
						role="img"
						aria-label="Default avatar"
					>
						<path
							fillRule="evenodd"
							d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
							clipRule="evenodd"
						/>
					</svg>
				)
			)}
		</div>
	);
};

export default Avatar;
