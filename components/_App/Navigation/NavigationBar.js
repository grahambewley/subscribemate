import Link from "next/link";
import NProgress from "nprogress";
import Router, { useRouter } from "next/router";
import { Container } from 'semantic-ui-react';
import { handleLogout } from '../../../utils/auth';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Navigation = ({ user, openDrawer }) => {
    const router = useRouter();

    function isActive(route) {
        return route === router.pathname;
    }

    return (<>
        <nav className='NavigationContainer'>
            {/*
            <Container style={{height: '100%'}}>
            */}
                <div className='NavigationWrapper'>
                    <Link href='/'>
                        <div className='Logo'>
                            <img src='/static/logo_horizontal.png'/>
                        </div>
                    </Link>
                    <div className='PageNavigation'>
                        <Link href='/newsletters'>
                            <div className='NavigationItem' style={isActive('/newsletters') ? {backgroundColor: 'rgba(255,255,255,.4'} : null}>Newsletters</div>
                        </Link>
                        <Link href='/podcasts'>
                            <div className='NavigationItem' style={isActive('/podcasts') ? {backgroundColor: 'rgba(255,255,255,.4'} : null}>Podcasts</div>
                        </Link>
                        <Link href='/blogs'>
                            <div className='NavigationItem' style={isActive('/blogs') ? {backgroundColor: 'rgba(255,255,255,.4'} : null}>Blogs</div>
                        </Link>
                    </div>
                    <div className='AccountNavigation'>
                        {user ? (<>
                            <span className='Greeting'>Hi, {user.name}</span>
                            <div className='AccountButton' onClick={handleLogout}>Sign Out</div>
                        </>) : (<>
                            <Link href='/login'>
                                <span className='AccountLink'>Log In</span>
                            </Link>
                            <Link href='/signup'>
                                <div className='AccountButton'>Sign Up</div>
                            </Link>
                        </>)}
                    </div> 
                    <div className='DrawerToggle' onClick={openDrawer}></div>
                </div>
                {/*
                </Container>
                */}
        </nav>
    <style jsx>{`
    .NavigationContainer {
        height: 56px;
        width: 100%;
        background-color: #3DAEA3;
    }

    .NavigationWrapper {
        width: 100%;
        height: 100%;
        padding: 0 2rem;
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        align-items: center;
    }

    .Logo {
        grid-column: 1 / span 1;
        cursor: pointer;
    }
    .Logo img {
        max-height: 28px;
        width: auto;
    }

    .PageNavigation {
        grid-column: 2 / span 1;
        justify-self: center;
        display: flex;
    }
    .NavigationItem {
        font-size: 1.1rem;
        color: white;
        text-transform: uppercase;
        letter-spacing: 1px;
        cursor: pointer;
        transition: all .15s;
        padding: 8px 18px;
        border-radius: 200px;
    }
    .NavigationItem:not(:last-child) {
        margin-right: .5rem;
    }
    .NavigationItem:hover {
        background-color: rgba(255,255,255,.25);
    }

    .AccountNavigation {
        grid-column: 3 / span 1;
        justify-self: end;
        display: flex;
        align-items: center;
    }
    .Greeting {
        color: white;
        font-weight: 200;
        margin-right: 1rem;
    }
    .AccountLink {
        text-transform: uppercase;
        letter-spacing: 1px;
        cursor: pointer;
        color: white;
        font-size: .9rem;
        line-height: 1;
        margin-right: 1rem;
        margin-top: 1px;
    }
    .AccountButton {
        padding: 8px 18px;
        border-radius: 200px;
        color: white;
        text-transform: uppercase;
        letter-spacing: 1px;
        line-height: 1;
        background-color: rgba(255,255,255,.25);
        transition: all .2s;
        cursor: pointer;
    }
    .AccountButton:hover {
        background-color: rgba(255,255,255,.35);
    }

    .DrawerToggle {
        grid-columns: 2 / span 1;
        display: none;
        height: 2px;
        width: 2rem;
        background-color: white;
        position: relative;
    }
    .DrawerToggle::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: white;
        top: 0;
        left: 0;
        transform: translateY(-8px);
    }
    .DrawerToggle::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: white;
        top: 0;
        left: 0;
        transform: translateY(8px);
    }

    @media(max-width: 767px) {
        .NavigationWrapper {
            grid-template-columns: 1fr min-content;
            padding: 0 1rem;
        }
        .AccountNavigation {
            display: none;
        }
        .PageNavigation {
            display: none;
        }
        .DrawerToggle {
            display: block;
        }
    }

    `}</style>
    </>);
}

export default Navigation;