import Link from "next/link";
import SearchResultsModal from '../SearchResultsModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/router";
import { handleLogout } from '../../../utils/auth';
import baseCraftUrl from '../../../utils/baseCraftUrl';
import axios from 'axios';

const SideDrawer = ({ user, open, closeDrawer }) => {
    const [searchQuery, setSearchQuery] = React.useState();
    const [searchModalOpen, setSearchModalOpen] = React.useState(false);
    const [searchResults, setSearchResults] = React.useState();

    const router = useRouter();

    function isActive(route) {
        return route === router.pathname;
    }

    function handleSidebarClick(e) {
        if (e.target.classList.contains('SidebarBackdrop')) {
            closeDrawer();
        } else {
            return;
        }
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
        <div className='SidebarBackdrop' style={open ? { transform: 'translateX(0)'} : null} onClick={ handleSidebarClick }>
            <div className='SidebarContainer' style={open ? {transform: 'translateX(0)' } : null}>
                <div className='SidebarCloseButton' onClick={closeDrawer}></div>

                <div className='SidebarTopContainer'>
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
                    <div className='SearchBar'>
                        <form onSubmit={handleSearch}>
                            <input onChange={handleSearchInputChange} type='search'/>
                        </form>
                        <FontAwesomeIcon icon={faSearch} style={{fontSize: '1.2rem'}} color='#3DAEAC'/>
                    </div>
                </div>

                <div className='PageNavigation'>
                        <Link href='/'>
                            <div className='NavigationItem' style={isActive('/') ? {backgroundColor: 'rgba(61, 174, 172,.15'} : null}>Home</div>
                        </Link>
                        <Link href='/newsletters'>
                            <div className='NavigationItem' style={isActive('/newsletters') ? {backgroundColor: 'rgba(61, 174, 172,.15'} : null}>Newsletters</div>
                        </Link>
                        <Link href='/podcasts'>
                            <div className='NavigationItem' style={isActive('/podcasts') ? {backgroundColor: 'rgba(61, 174, 172,.15'} : null}>Podcasts</div>
                        </Link>
                        <Link href='/blogs'>
                            <div className='NavigationItem' style={isActive('/blogs') ? {backgroundColor: 'rgba(61, 174, 172,.15'} : null}>Blogs</div>
                        </Link>
                </div>

                <div className='SubmitContainer'>
                    <p>Got a Source We're Missing?</p>
                    <Link href='/submit'>
                        <button>Submit It</button>
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
            z-index: 150;
            transform: translateX(100%);
        }
        .SidebarContainer {
            position: fixed;
            width: 280px;
            max-width: 70%;
            height: 100%;
            right: 0;
            top: 0;
            z-index: 160;
            background-color: white;
            transform: translateX(100%);
            transition: all .4s;

            display: grid;
            grid-template-rows: 1fr 3fr 1fr;
            align-items: center;
            padding: 5rem 1rem;
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

        .SidebarTopContainer {
            grid-rows: 1 / span 1;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .AccountNavigation {
            display: flex;
            align-items: center;
            justify-content: center;
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
            background-color: rgba(61, 174, 172,.15);
            transition: all .2s;
            cursor: pointer;
        }
        .SearchBar {
            margin-top: 2rem;
            background-color: rgba(61, 174, 172,.15);
            padding: 5px 10px;
            border-radius: 200px;
            display: flex;
            align-items: center;
        }
        .SearchBar input {
            background-color: transparent;
            border: none;
            margin-right: 10px;
        }
        .SearchBar input:focus {
            outline: none;
        }

        .PageNavigation {
            grid-rows: 2 / span 1;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .NavigationItem {
            font-size: 1.4rem;
            color: #3DAEAC;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            padding: 8px 18px;
            border-radius: 5px;
        }
        .NavigationItem:not(:last-child) {
            margin-bottom: 2rem;
        }
        .SubmitContainer {
            grid-rows: 3 / span 1;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 170;
        }
        .SubmitContainer p {

        }
        .SubmitContainer button {
            border: none;
            margin: 0;
            background-color: rgba(61, 174, 172,.65);
            border-radius: 200px;
            color: white;
            padding: 10px 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 1.1rem;
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