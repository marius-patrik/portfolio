import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { useState } from 'react';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
	hideByDefault?: boolean;
	variant?: 'desktop' | 'page';
}

const Footer: FC<PropsWithChildren<FooterProps>> = ({
	hideByDefault = false,
	variant = 'desktop',
	children,
	className = '',
	...props
}) => {
	const [isHovered, setIsHovered] = useState(false);

	if (variant === 'page') {
		return (
			<div className={`w-full ${className}`} {...props}>
				{children}
			</div>
		);
	}

	if (hideByDefault) {
		return (
			<>
				{/* Invisible hover trigger zone at the bottom of the screen */}
				<div
					className="fixed bottom-0 left-0 right-0 h-8 z-40"
					onMouseEnter={() => setIsHovered(true)}
				/>
				{/* Footer that appears on hover */}
				<div
					className={`system-overlay-50 bottom-2 max-w-[95vw] left-1/2 -translate-x-1/2 flex flex-row gap-3 p-2 glass rounded-2xl overflow-x-auto transition-all duration-300 ${
						isHovered
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-full pointer-events-none'
					} ${className}`}
					onMouseLeave={() => setIsHovered(false)}
					{...props}
				>
					{children}
				</div>
			</>
		);
	}

	return (
		<div
			className={`system-overlay-50 bottom-2 max-w-[95vw] left-1/2 -translate-x-1/2 flex flex-row gap-3 p-2 glass rounded-2xl overflow-x-auto ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

export default Footer;
