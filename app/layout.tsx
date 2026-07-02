import AppLayout from './components/appLayout';
// app/layout.tsx
import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body suppressHydrationWarning>
				<AppLayout>{children}</AppLayout>
			</body>
		</html>
	);
}
