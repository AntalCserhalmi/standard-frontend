import '../styles/globals.css';
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
    return (
        <MoralisProvider initializeOnMount={false} >
            <NotificationProvider>
                <Component {...pageProps} />
            </NotificationProvider>
        </MoralisProvider>
    );
}

export default App;
