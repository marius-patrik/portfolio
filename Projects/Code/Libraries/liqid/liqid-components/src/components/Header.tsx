import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
	variant?: 'desktop' | 'page';
}

const Header: FC<PropsWithChildren<HeaderProps>> = ({
	children,
	className = '',
	variant = 'desktop',
	...props
}) => {
	const baseStyles = 'w-full flex flex-row gap-2 px-1 pointer-events-auto';
	const desktopStyles = 'glass';
	const pageStyles = 'bg-transparent';

	return (
		<div
			className={`${baseStyles} ${
				variant === 'desktop' ? desktopStyles : pageStyles
			} ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

export default Header;
