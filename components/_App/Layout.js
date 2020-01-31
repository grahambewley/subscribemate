import Head from 'next/head';
import Header from './Navigation';
import Footer from './Footer';
import HeadContent from './HeadContent';

function Layout({ user, children }) {
 
    return (
        <>
            <Head>
                <HeadContent />
                <link
                    rel="stylesheet"
                    href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
                />
                <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png"/>
                <link rel="manifest" href="/static/site.webmanifest"></link>
                
                <title>Feed Seek &mdash; The Freshest Newsletters, Podcasts, and Blogs</title>
                
            </Head>
            <Header user={user}/>
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