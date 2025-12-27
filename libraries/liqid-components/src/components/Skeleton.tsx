import type { FC, HTMLAttributes } from 'react';
import { type StylingProps, getStylingClasses } from '../utils/styles';

export interface SkeletonProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	visible?: boolean;
	height?: number | string;
	width?: number | string;
	circle?: boolean;
	animate?: boolean;
}

const Skeleton: FC<SkeletonProps> = ({
	visible = true,
	height,
	width,
	circle,
	animate = true,
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
		radius: radius || (circle ? 'full' : 'md'),
		shadow,
	});

	if (!visible) return <>{children}</>;

	const style = {
		height: height,
		width: width,
		...props.style,
	};

	return (
		<div
			className={`
                bg-zinc-200 dark:bg-zinc-700
                ${animate ? 'animate-pulse' : ''}
                ${children ? '' : 'min-h-[1em]'} 
                ${stylingClasses} 
                ${className}
            `}
			style={style}
			{...props}
		>
			{/* If children are present, we might want to overlay or wrap them. 
                Standard Skeleton usually replaces content. 
                If children are passed, Mantine usually renders Skeleton overlaying or replacing them? 
                Actually typical Skeelton usage is standalone OR wrapping. 
                For wrapping: `visible` toggles between skeleton and content.
            */}
			{/* If children exist and visible is true, usually we don't render children to avoid layout shift, unless we want to match size.
                Simplest: Render skeleton div only.
            */}
		</div>
	);
};

export default Skeleton;
