import type { ReactNode } from 'react';

interface MainProps {
	children: ReactNode;
}

export function Main({ children }: MainProps) {
	return <main className="container mx-auto px-4 py-6">{children}</main>;
}
