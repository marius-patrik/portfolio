import type { FC, PropsWithChildren, ReactNode } from 'react';

// -----------------------------------------------------------------------------
// Shell.Desktop
// -----------------------------------------------------------------------------

export interface ShellProps {
	backgroundImage?: string;
	backgroundOverlay?: string;

	variant: 'desktop' | 'app' | 'page';

	header?: ReactNode;
	footer?: ReactNode;
}

const Desktop: FC<PropsWithChildren<ShellProps>> = ({
	backgroundImage,
	backgroundOverlay,

	variant,

	header,
	children,
	footer,
}) => {
	return (
		<div className="fixed inset-0 overflow-hidden w-full h-full select-none">
			{/* Wallpaper Layer */}
			{backgroundImage && (
				<div
					className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-500"
					style={{ backgroundImage: `url(${backgroundImage})` }}
				/>
			)}

			{/* Overlay Layer (Color or Tint) */}
			{backgroundOverlay && (
				<div
					className={`absolute inset-0 z-0 transition-all duration-500 ${backgroundOverlay}`}
				/>
			)}

			{/* Main Content Area (Icons, Windows) */}
			<main className="relative z-10 w-full h-full p-4 block">{children}</main>

			{/* Taskbar / Footer */}
			{footer && (
				<div className="absolute z-50 bottom-0 w-full flex justify-center pointer-events-none mb-2">
					{footer}
				</div>
			)}
		</div>
	);
};

// -----------------------------------------------------------------------------
// Shell.Page
// -----------------------------------------------------------------------------

export interface ShellPageProps {
	header?: ReactNode;
	footer?: ReactNode;
	isMainScrollable?: boolean;
}

const Page: FC<PropsWithChildren<ShellPageProps>> = ({
	children,
	header,
	footer,
	isMainScrollable = true,
}) => {
	return (
		<div className="flex flex-col h-screen w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
			{/* Sticky Header */}
			{header && (
				<div className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-slate-200 dark:border-slate-800">
					{header}
				</div>
			)}

			{/* Main Content */}
			<main
				className={`flex-1 w-full ${
					isMainScrollable ? 'overflow-y-auto' : 'overflow-hidden'
				}`}
			>
				<div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">
					{children}
				</div>
			</main>

			{/* Footer */}
			{footer && (
				<div className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 p-4">
					<div className="container mx-auto max-w-7xl">{footer}</div>
				</div>
			)}
		</div>
	);
};

// -----------------------------------------------------------------------------
// Shell Namespace
// -----------------------------------------------------------------------------

export const Shell = {
	Desktop,
	Page,
};

export default Shell;
