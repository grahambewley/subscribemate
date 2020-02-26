import SearchResultsModal from '../SearchResultsModal';
import Link from "next/link";
import NProgress from "nprogress";
import Router, { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { handleLogout } from '../../../utils/auth';
import baseCraftUrl from '../../../utils/baseCraftUrl';
import axios from 'axios';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Navigation = ({ user, openDrawer }) => {
    const [searchQuery, setSearchQuery] = React.useState();
    const [searchModalOpen, setSearchModalOpen] = React.useState(false);
    const [searchResults, setSearchResults] = React.useState();
    const [accountDropdownOpen, setAccountDropdownOpen] = React.useState(false);

    const router = useRouter();

    function isActive(route) {
        return route === router.pathname;
    }

    function handleSearchInputChange(e) {
        setSearchQuery(e.target.value);
    }

    async function handleSearch(e) {
        e.preventDefault();
        console.log("Going to search for ", searchQuery);
        const url = `${baseCraftUrl}/search.json`;
        const payload = { params: new URLSearchParams({ q: searchQuery }) };
        const response = await axios.get(url, payload);
        
        setSearchResults(response.data.data);
        setSearchModalOpen(true);
    }

    return (<>
        { searchModalOpen ? 
            <SearchResultsModal entities={searchResults} closeModal={() => setSearchModalOpen(false)}/>
        : null }

        <nav className='NavigationContainer'>
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
                <div className='RightNavigation'>
                    <div className='SearchBar'>
                        <form onSubmit={handleSearch}>
                            <input onChange={handleSearchInputChange} type='search'/>
                        </form>
                        <FontAwesomeIcon icon={faSearch} style={{fontSize: '1.2rem'}} color='white'/>
                    </div>
                    { user ? 
                    <div className='AccountIconDropdown' onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}>
                        <FontAwesomeIcon icon={faUser} style={{fontSize: '1.2rem', marginRight: '5px'}} color='white'/>
                        <FontAwesomeIcon icon={faCaretDown} style={{fontSize: '1rem'}} color='white'/>
                    
                        { accountDropdownOpen ? 
                        <div className='AccountDropdownContainer'>
                            {user ? (<>
                                <span className='Greeting'>Signed in as {user.name}</span>
                                <div className='AccountLink' onClick={handleLogout}>Sign Out</div>
                            </>) : (<>
                                <Link href='/login'>
                                    <span className='AccountLink'>Log In</span>
                                </Link>
                                <Link href='/signup'>
                                    <div className='AccountLink'>Sign Up</div>
                                </Link>
                            </>)}
                        </div>
                        : null}
                    </div>
                    : 
                    <Link href='/signup'>
                        <div className='AccountButton'>Sign Up</div> 
                    </Link>
                    }

                    {/*
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
                    */}
                </div> 
                <div className='DrawerToggle' onClick={openDrawer}></div>
            </div>
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
        grid-template-columns: 1fr max-content 1fr;
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
        transition: all .4s;
        padding: 8px 18px;
        border-radius: 200px;
    }
    .NavigationItem:not(:last-child) {
        margin-right: .5rem;
    }
    .NavigationItem:hover {
        background-color: rgba(255,255,255,.25);
    }

    .RightNavigation {
        grid-column: 3 / span 1;
        justify-self: end;
        display: flex;
        align-items: center;
        height: 100%;
    }
    .SearchBar {
        background-color: rgba(255,255,255,.25);
        padding: 5px 10px;
        border-radius: 200px;
        display: flex;
        align-items: center;
        margin-right: 1rem;
    }
    .SearchBar input {
        background-color: transparent;
        border: none;
        color: white;
        margin-right: 10px;
    }
    .SearchBar input:focus {
        outline: none;
    }
    .AccountIconDropdown {
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
    }
    .AccountDropdownContainer {
        z-index: 105;
        width: max-content;
        padding: 10px;
        position: absolute;
        top: 0;
        right: 0;
        transform: translateY(61px);
        background-color: white;
        border-radius: 3px;
        border: 1px solid #ddd;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    .AccountDropdownContainer *:not(:last-child) {
        margin-bottom: 10px;
    }

    .Greeting {
        font-weight: 200;
        font-size: .9rem;
        opacity: .9;
    }
    .AccountLink {
        cursor: pointer;
    }
    .AccountButton {
        padding: 8px 18px;
        border-radius: 200px;
        color: white;
        text-transform: uppercase;
        text-align: center;
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
        .SubmitContainer {
            display: none;
        }
        .RightNavigation {
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