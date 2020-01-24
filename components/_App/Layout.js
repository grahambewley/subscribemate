import Head from 'next/head';
import Header from './Navigation';
import Footer from './Footer';
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
                
                <title>Feed Seek &mdash; The Freshest Newsletters, Podcasts, and Blogs</title>
                
            </Head>
            <Header />
            <>
                { children }
                
            </>
            {/*
            <Footer />
            */}
        </>
    )
}

export default Layout;