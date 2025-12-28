import type { ReactNode } from 'react';
import { Footer } from './Footer/Footer';
import { Main } from './Main/Main';
import { Navbar } from './Navbar/Navbar';

interface PageProps {
	children: ReactNode;
}

export function Page({ children }: PageProps) {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<Main>{children}</Main>
			<Footer />
		</div>
	);
}
