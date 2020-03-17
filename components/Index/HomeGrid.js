import React from 'react';
import Link from 'next/link';
import { Container } from "semantic-ui-react";
import Card from '../_App/Card';
import Sidebar from './Sidebar/Sidebar';
import FilterStrip from '../_App/FilterStrip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faEnvelopeOpenText, faMicrophoneAlt} from '@fortawesome/free-solid-svg-icons';

const Grid = ({ user, likes, 
                latest,
                newsletters, podcasts, blogs, 
                handleEntityLike, handleEntityUnlike,
                handleLoadMoreNewsletters, handleLoadMorePodcasts, handleLoadMoreBlogs,
                handleFilterChange, triggerDetailModal }) => {
    const [categories, setCategories] = React.useState([]);
    const [dateSpan, setDateSpan] = React.useState('this week');
    const [mobileColumnVisible, setMobileColumnVisible] = React.useState('newsletters');

    // Initializing didMount as false
    const [didMount, setDidMount] = React.useState(false)
    // Setting didMount to true upon mounting
    React.useEffect(() => setDidMount(true), []);

    React.useEffect(() => {
        // checking for didMount keeps this from running on first render
        if(didMount) {
            // Send updated dateSpan and categories back to index.js for handling
            handleFilterChange(dateSpan, categories);    
        }
    }, [categories, dateSpan])
    
    function handleCategoryClick(category) {
        if(categories.includes(category)) {
            // If categories already includes this, remove it
            setCategories(categories.filter((element) => {
                return element != category
            }))
        } else {
            // Otherwise, add to categories
            setCategories(categories.concat(category))
        }
    }

    function handleDateSpanChange(e, { value }) {
        setDateSpan(value);
    }

    return (

        <Container>
        <div className='LayoutContainer'>
            <div className='FilterContainer'>
                <FilterStrip 
                    categories={categories}
                    setCategories={setCategories}
                    handleCategoryClick={handleCategoryClick}
                    handleDateSpanChange={handleDateSpanChange} 
                    mobileColumn={mobileColumnVisible} />
            </div>
            <div className='MobileColumnSelector'>
                <button className='MobileColumnButton' onClick={() => setMobileColumnVisible('newsletters')}>
                    <FontAwesomeIcon icon={faEnvelopeOpenText} style={{ fontSize: '1.8rem' }} color='white'/>
                </button>
                <button className='MobileColumnButton' onClick={() => setMobileColumnVisible('podcasts')}>
                    <FontAwesomeIcon icon={faMicrophoneAlt} style={{ fontSize: '1.8rem' }} color='white'/>
                </button>
                <button className='MobileColumnButton' onClick={() => setMobileColumnVisible('blogs')}>
                    <FontAwesomeIcon icon={faNewspaper} style={{ fontSize: '1.8rem' }} color='white'/>
                </button>
            </div>
            <main>
                {/* <div className='TrendingHeaderContainer'>Trending</div> */}
                <div className='ColumnContainer'>
                    <div className='Column' style={ mobileColumnVisible === 'newsletters' ? {display:'block'} : null }>
                        <Link href='/newsletters'>
                            <div className='ColumnHeader'>
                                <FontAwesomeIcon 
                                    icon={faEnvelopeOpenText}
                                    color='#3daeac'
                                    style={{ fontSize: '1.8rem' }}/>
                                <h2 className='ColumnHeaderText'>Newsletters</h2>
                            </div>
                        </Link>
                        <div className='CardColumn'>
                            {newsletters.map(newsletter => {
                                return (
                                    <Card 
                                        likes={likes}
                                        handleEntityLike={handleEntityLike}
                                        handleEntityUnlike={handleEntityUnlike}
                                        user={user} 
                                        key={newsletter.id} 
                                        entity={newsletter}
                                        triggerDetailModal={triggerDetailModal} />
                                );
                            })}
                        </div>
                        <div className='LoadMoreButton' onClick={handleLoadMoreNewsletters}>Load More</div>
                        <Link href='/newsletters'><a className='SubpageLink'>All Newsletters</a></Link>
                    </div>
                    
                    <div className='Column' style={ mobileColumnVisible === 'podcasts' ? {display:'block'} : null }>
                        <Link href='/podcasts'>
                        <div className='ColumnHeader'>
                                <FontAwesomeIcon 
                                    icon={faMicrophoneAlt}
                                    color='#3daeac'
                                    style={{ fontSize: '1.8rem' }}/>
                                <h2 className='ColumnHeaderText'>Podcasts</h2>
                            </div>
                        </Link>
                        <div className='CardColumn'>
                            {podcasts.map(podcast => {
                                return (
                                    <Card 
                                        likes={likes}
                                        handleEntityLike={handleEntityLike}
                                        handleEntityUnlike={handleEntityUnlike}
                                        user={user}
                                        key={podcast.id}
                                        entity={podcast}
                                        triggerDetailModal={triggerDetailModal} />
                                );
                            })}
                        </div>
                        <div className='LoadMoreButton' onClick={handleLoadMorePodcasts}>Load More</div>
                        <Link href='/podcasts'><a className='SubpageLink'>All Podcasts</a></Link>
                    </div>
                    
                    
                    <div className='Column' style={ mobileColumnVisible === 'blogs' ? {display:'block'} : null }>
                        <Link href='/blogs'>
                            <div className='ColumnHeader'>
                                <FontAwesomeIcon 
                                    icon={faNewspaper}
                                    color='#3daeac'
                                    style={{ fontSize: '1.8rem' }}/>
                                <h2 className='ColumnHeaderText'>Blogs</h2>
                            </div>
                        </Link>
                        <div className='CardColumn'>
                            {blogs.map(blog => {
                                return (
                                    <Card
                                        likes={likes}
                                        handleEntityLike={handleEntityLike}
                                        handleEntityUnlike={handleEntityUnlike}
                                        user={user}
                                        key={blog.id}
                                        entity={blog}
                                        triggerDetailModal={triggerDetailModal} />
                                );
                            })}
                        </div>
                        <div className='LoadMoreButton' onClick={handleLoadMoreBlogs}>Load More</div>
                        <Link href='/blogs'><a className='SubpageLink'>All Blogs</a></Link>
                    </div>
                </div>
            </main>

            <Sidebar latest={latest} triggerDetailModal={triggerDetailModal} />

            <style jsx>{`
                .LayoutContainer {
                    display: grid;
                    grid-template-columns: 3fr 1fr;
                    grid-column-gap: 32px;
                    grid-row-gap: 32px;
                }

                @media(max-width: 991px) {
                    .LayoutContainer {
                        grid-template-columns: 1fr;
                    }
                }

                .FilterContainer {
                    grid-column: 1 / -1;
                }

                .MobileColumnSelector {
                    display: none;
                }
                .MobileColumnButton {
                    background-color: #3daeac;
                    padding: .5rem;
                    border-radius: 2px;
                    border: none;
                }

                main {
                    grid-column: 1 / span 1;
                }
                .TrendingHeaderContainer {
                    font-size: 1.2rem;
                    font-weight: 200;
                    padding: 5px 1rem;
                    border-radius: 5px;
                    background-color: rgba(60,174,163, .2);
                    margin-bottom: 1rem;
                }
                .ColumnContainer {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-gap: 32px;
                }

                .CardColumn {
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-gap: 20px;
                }
                .Column {
                    position: relative;
                }
                .ColumnHeader {
                    cursor: pointer;
                    margin-bottom: 1.4rem;
                    padding-left: 10px;
                    display: flex;
                    align-items: center;
                }
                .ColumnHeaderText {
                    margin-top: 0;
                    margin-left: .8rem;
                    font-size: 1.8rem;
                    font-family: 'Bebas Neue', sans-serif;
                    line-height: 1;
                    letter-spacing: 1px;
                    color: #3daeac;
                    margin-top: 3px;
                }
                .LoadMoreButton {
                    display: block;
                    margin: 1rem 10px;
                    text-align: center;
                    color: white;
                    background-color: #3daea3;
                    border-radius: 500px;
                    padding: 3px 0;
                    text-transform: uppercase;
                    transition: all .2s;
                    cursor: pointer;
                }
                .LoadMoreButton:hover {
                    transform: translate3d(0, -2px, 0);
                    box-shadow: 0 2px 3px rgba(0,0,0,0.08);
                }
                .LoadMoreButton:active {
                    transform: translate3d(0, -1px, 0);
                    box-shadow: 0 1px 1px rgba(0,0,0,.1);
                }   
                .SubpageLink {
                    display: inline-block;
                    margin: 0 auto;
                    color: black;
                    opacity: .7;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                }
                @media(max-width: 767px) {
                    .LayoutContainer {
                        grid-row-gap: 1rem;
                    }
                    .MobileColumnSelector {
                        grid-row: 2 / span 1;
                        grid-column: 1 / -1;
    
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        grid-gap: 4px;
                    }
                    
                    .ColumnContainer {
                        grid-template-columns: 1fr;
                    }

                    .Column {
                        display: none;
                    }

                    .LoadMoreButton {
                        font-size: 1.2rem;
                        letter-spacing: 1px;
                        padding: 10px 0;
                        margin-top: 2rem;
                    }
                } 
            `}</style>
        </div>
        </Container>
    );
}

export default Grid;