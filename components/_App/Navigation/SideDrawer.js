import Link from "next/link";
import { useRouter } from "next/router";
import { handleLogout } from '../../../utils/auth';

const SideDrawer = ({ user, open, closeDrawer }) => {
    
    const router = useRouter();

    function isActive(route) {
        return route === router.pathname;
    }

    function handleSidebarClick(e) {
        if (e.target.classList.contains('SidebarContainer')) {
            return;
        } else {
            closeDrawer();
        }
    }

    return (<>

        <div className='SidebarBackdrop' style={open ? { transform: 'translateX(0)'} : null} onClick={ handleSidebarClick }>
            <div className='SidebarContainer' style={open ? {transform: 'translateX(0)' } : null}>
                <div className='SidebarCloseButton' onClick={closeDrawer}></div>

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

                <div className='PageNavigation'>
                        <Link href='/newsletters'>
                            <div className='NavigationItem' style={isActive('/newsletters') ? {backgroundColor: 'rgba(61, 174, 172,.2'} : null}>Newsletters</div>
                        </Link>
                        <Link href='/podcasts'>
                            <div className='NavigationItem' style={isActive('/podcasts') ? {backgroundColor: 'rgba(61, 174, 172,.2'} : null}>Podcasts</div>
                        </Link>
                        <Link href='/blogs'>
                            <div className='NavigationItem' style={isActive('/blogs') ? {backgroundColor: 'rgba(61, 174, 172,.2'} : null}>Blogs</div>
                        </Link>
                </div>

            </div>
        </div>
        
        <style jsx>{`
        .SidebarBackdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,.6);
            z-index: 300;
            transform: translateX(100%);
        }
        .SidebarContainer {
            position: fixed;
            width: 280px;
            max-width: 70%;
            height: 100%;
            right: 0;
            top: 0;
            z-index: 301;
            background-color: white;
            transform: translateX(100%);
            transition: all .4s;

            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 8rem 1rem 1rem 1rem;
        }
        .SidebarCloseButton {
            position: absolute;
            top: .5rem;
            right: 3rem;
            width: 2px;
            height: 2.5rem;
            transform-origin: bottom;
            transform: rotate(45deg);
            background-color: #3DAEAC;
        }
        .SidebarCloseButton::after {
            content: '';
            position: absolute;
            top: 0px;
            width: 2px;
            height: 2.5rem;
            transform-origin: center;
            transform: rotate(-90deg);
            background-color: #3DAEAC;
        }

        .AccountNavigation {
            display: flex;
            align-items: center;
        }
        .Greeting {
            color: #3DAEAC;
            font-weight: 200;
            margin-right: 1rem;
        }
        .AccountLink {
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            font-size: .9rem;
            line-height: 1;
            margin-right: 1rem;
            margin-top: 1px;
        }
        .AccountButton {
            padding: 8px 18px;
            border-radius: 200px;
            color: #3DAEAC;
            text-transform: uppercase;
            letter-spacing: 1px;
            line-height: 1;
            background-color: rgba(61, 174, 172,.2);
            transition: all .2s;
            cursor: pointer;
        }

        .PageNavigation {
            margin-top: 4rem;
        }
        .NavigationItem {
            font-size: 1.4rem;
            text-align: center;
            color: #3DAEAC;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            padding: 8px 18px;
            border-radius: 200px;
        }
        .NavigationItem:not(:last-child) {
            margin-bottom: 2rem;
        }

        @media(min-width: 768px) {
            .SidebarBackdrop, 
            .SidebarContainer {
                display: none;
            }
        }
        `}</style>
    </>);
}

export default SideDrawer;