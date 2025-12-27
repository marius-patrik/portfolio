import type { FC } from 'react';

export type LoadingVariant = 'bar' | 'spinner';

export interface LoadingProps {
	variant?: LoadingVariant;
}

const Loading: FC<LoadingProps> = ({ variant = 'bar' }) => {
	if (variant === 'spinner') {
		return (
			<div className="w-full flex justify-center items-center py-4">
				<div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	return (
		<div className="w-full flex justify-center items-center py-4">
			<div className="w-32 h-2 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
				<div className="h-2 bg-blue-500 animate-pulse rounded-full w-1/2" />
			</div>
		</div>
	);
};

export default Loading;
