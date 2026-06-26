'use client';

import React, { useState } from 'react';
import Sidebar from './sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const toggleSidebar = () => {
		setIsSidebarOpen((current) => !current);
	};

	return (
		<div className="flex">
			{isSidebarOpen && (
				<aside id="sidebar" className="min-h-screen w-64 p-4 bg-[#D2ECF2]">
					<div className="flex justify-end">
						<button type="button" onClick={toggleSidebar}>
							×
						</button>
					</div>
					<Sidebar />
				</aside>
			)}

			<div className="flex min-w-0 flex1 flex-col">
				{!isSidebarOpen && (
					<header className="p-4">
						<div className="fixed left-4 top-4 z-50">
							{/* outside the sidebar when hidden */}
							<button type="button" onClick={toggleSidebar}>
								☰
							</button>
						</div>
					</header>
				)}
			</div>
			<main className="mx-auto w-full max-w-6xl px-4">{children}</main>
		</div>
	);
}
