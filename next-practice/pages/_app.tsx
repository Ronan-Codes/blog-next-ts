import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
    // continue layout at 28:00 https://www.youtube.com/watch?v=OTuHnVvxTDs
	);
}

export default MyApp;
