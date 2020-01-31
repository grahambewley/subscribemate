import React from 'react';
import Link from 'next/link';
import { Container } from "semantic-ui-react";
import Card from '../_App/Card';
import Sidebar from './Sidebar/Sidebar';
import FilterStrip from '../_App/FilterStrip';

const Grid = ({ likes, user, newsletters, podcasts, blogs, latest, handleFilterChange }) => {
    const [categories, setCategories] = React.useState([]);
    const [dateSpan, setDateSpan] = React.useState('this week');

    // Initializing didMount as false
    const [didMount, setDidMount] = React.useState(false)
    // Setting didMount to true upon mounting
    React.useEffect(() => setDidMount(true), []);

    React.useEffect(() => {
        // checking for didMount keeps this from running on first render
        if(didMount) {
            console.log("Categories or active item changed");
            // Send updated dateSpan and categories back to index.js for handling
            handleFilterChange(dateSpan, categories);    
        }
    }, [categories, dateSpan])
    
    function handleCategoryClick(e, { value }) {
        if(categories.includes(value)) {
            // If categories already includes this, remove it
            setCategories(categories.filter((element) => {
                return element != value
            }))
        } else {
            // Otherwise, add to categories
            setCategories(categories.concat(value))
        }
    }

    function handleDateSpanChange(e, { value }) {
        console.log('date value is ', value);
        setDateSpan(value);
    }

    return (

        <Container>
        <div className='LayoutContainer'>
            <div className='FilterContainer'>
                <h1>Top Newsletters, Podcasts, and Blogs</h1>
                <FilterStrip 
                    categories={categories}
                    setCategories={setCategories}
                    handleCategoryClick={handleCategoryClick}
                    handleDateSpanChange={handleDateSpanChange} />
                
            </div>
            <main>
                <div className='ColumnContainer'>
                    <div className='Column'>
                        <Link href='/newsletters'>
                            <h2 className='ColumnHeader'>Newsletters</h2>
                        </Link>
                        <div className='CardColumn'>
                            {newsletters.map(newsletter => {
                                return (
                                    <Card preliked={likes.includes(parseInt(newsletter.id))} user={user} key={newsletter.title} entity={newsletter} />
                                );
                            })}
                        </div>
                        <Link href='/newsletters'><a className='MoreLink'>More Newsletters</a></Link>
                    </div>
                    
                    <div className='Column'>
                        <Link href='/podcasts'>
                            <h2 className='ColumnHeader'>Podcasts</h2>
                        </Link>
                        <div className='CardColumn'>
                            {podcasts.map(podcast => {
                                return (
                                    <Card preliked={likes.includes(parseInt(podcast.id))} user={user} key={podcast.title} entity={podcast} />
                                );
                            })}
                        </div>
                        <Link href='/podcasts'><a className='MoreLink'>More Podcasts</a></Link>
                    </div>
                    
                    
                    <div className='Column'>
                        <Link href='/blogs'>
                            <h2 className='ColumnHeader'>Blogs</h2>
                        </Link>
                        <div className='CardColumn'>
                            {blogs.map(blog => {
                                return (
                                    <Card preliked={likes.includes(parseInt(blog.id))} user={user} key={blog.title} entity={blog} />
                                );
                            })}
                        </div>
                        <Link href='/blogs'><a className='MoreLink'>More Blogs</a></Link>
                    </div>
                </div>
            </main>

            <Sidebar latest={latest} />

            <style jsx>{`
                .LayoutContainer {
                    display: grid;
                    grid-template-columns: 1fr 240px;
                    grid-column-gap: 24px;
                }

                @media(max-width: 991px) {
                    .LayoutContainer {
                        grid-template-columns: 1fr;
                    }
                }

                .FilterContainer {
                    grid-column: 1 / -1;
                }
                main {
                    grid-column: 1 / span 1;
                }
                .ColumnContainer {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-gap: 24px;
                }

                @media(max-width: 767px) {
                    .ColumnContainer {
                        grid-template-columns: 1fr;
                    }
                } 

                .CardColumn {
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-gap: 16px;
                }

                .ColumnHeader {
                    cursor: pointer;
                    margin-bottom: 10px;
                    font-size: 1.4rem;
                    font-weight: 100;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: #666;
                    padding-left: 5px;
                }
                .MoreLink {
                    display: block;
                    text-align: center;
                    margin-top: 1rem;
                    color: #242424;
                    background-color: #f2f2f2;
                    border-radius: 500px;
                    padding: 5px 0;
                    text-transform: uppercase;
                    transition: all .2s;
                }
                .MoreLink:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 2px 3px rgba(0,0,0,0.08);
                }
                .MoreLink:active {
                    transform: translateY(-1px);
                    box-shadow: 0 1px 1px rgba(0,0,0,.1);
                }   
            `}</style>
        </div>
        </Container>
    );
}

export default Grid;