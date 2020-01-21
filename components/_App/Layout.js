import Head from 'next/head';
import { Container } from 'semantic-ui-react';
import Header from './Navigation';
import HeadContent from './HeadContent';

function Layout({ children }) {
 
    return (
        <>
            <Head>
                <HeadContent />
                <link
                    rel="stylesheet"
                    href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
                />
                
                <title>SubscribeMate &mdash; The Freshest Newsletters, Podcasts, and Blogs</title>
                
            </Head>
            <Header />
            <>
                { children }
            </>
        </>
    )
}

export default Layout;