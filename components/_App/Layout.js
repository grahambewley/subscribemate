import Head from 'next/head';
import Navigation from './Navigation/NavigationBar'
import Footer from './Footer';
import HeadContent from './HeadContent';
import SideDrawer from './Navigation/SideDrawer';

function Layout({ user, children }) {
    const [sideDrawerOpen, setSideDrawerOpen] = React.useState(false);

    return (
        <>
            <Head>
                <HeadContent />
                
                <link
                    rel="stylesheet"
                    href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
                />

                <link rel="stylesheet" type="text/css" href="/static/styles.css" />
                <link rel="stylesheet" type="text/css" href="/static/nprogress.css"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png"/>
                <link rel="manifest" href="/static/site.webmanifest"></link>
                
                <title>Feed Seek &mdash; The Freshest Newsletters, Podcasts, and Blogs</title>
                
            </Head>
            <Navigation user={user} openDrawer={() => setSideDrawerOpen(true)}/>
            <SideDrawer user={user} open={sideDrawerOpen} closeDrawer={() => setSideDrawerOpen(false)} />
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