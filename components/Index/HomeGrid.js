import React from 'react';
import Link from 'next/link';
import { Container, Menu, Label } from "semantic-ui-react";
import Card from '../_App/Card';

const Grid = ({ likes, user, newsletters, podcasts, blogs, handleFilterChange }) => {
    const [categories, setCategories] = React.useState([]);
    const [dateSpan, setDateSpan] = React.useState('this week')

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
    
    function handleCategoryClick(e, { name }) {
        if(categories.includes(name)) {
            // If categories already includes this, remove it
            setCategories(categories.filter((element) => {
                return element != name
            }))
        } else {
            // Otherwise, add to categories
            setCategories(categories.concat(name))
        }
    }
    return (

        <Container>
        <div className='LayoutContainer'>
            
            <main>
                <Label.Group>
                    <Label 
                        as='a' 
                        name='all'
                        color={categories.length == 0 ? 'teal' : null}
                        onClick={() => setCategories([])}>
                    All
                    </Label>
                    <Label 
                        as='a'
                        name='development'
                        color={categories.includes('development') ? 'teal' : null}
                        onClick={handleCategoryClick}>
                    Development
                    </Label>
                    <Label 
                        as='a'
                        name='design'
                        color={categories.includes('design') ? 'teal' : null}
                        onClick={handleCategoryClick}>
                    Design
                    </Label>
                    <Label 
                        as='a'
                        name='entrepreneurship'
                        color={categories.includes('entrepreneurship') ? 'teal' : null}
                        onClick={handleCategoryClick}>
                    Entrepreneurship
                    </Label>
                    <Label 
                        as='a'
                        name='technology'
                        color={categories.includes('technology') ? 'teal' : null}
                        onClick={handleCategoryClick}>
                    Technology
                    </Label>
                    <Label 
                        as='a'
                        name='personalFinance'
                        color={categories.includes('personalFinance') ? 'teal' : null}
                        onClick={handleCategoryClick}>
                    Personal Finance
                    </Label>
                </Label.Group>
                <Menu 
                    size='small'
                    defaultActiveIndex={0}
                    pointing 
                    secondary
                    color='teal'
                >
                    <Menu.Item
                        name='this week'
                        active={dateSpan === 'this week'}
                        onClick={() => setDateSpan('this week')}
                    />
                    <Menu.Item
                        name='this month'
                        active={dateSpan === 'this month'}
                        onClick={() => setDateSpan('this month')}
                    />
                    <Menu.Item
                        name='all time'
                        active={dateSpan === 'all time'}
                        onClick={() => setDateSpan('all time')}
                    />
                </Menu>

                
                <div className='ColumnContainer'>
                    <div className='Column'>
                        <Link href='/newsletters'>
                            <div className='ColumnHeader'>
                                <h2>Newsletters</h2>
                            </div>
                        </Link>
                        {newsletters.map(newsletter => {
                            return (

                                <Card preliked={likes.includes(parseInt(newsletter.id))} user={user} key={newsletter.title} entity={newsletter} />
                            );
                        })}
                        <Link href='/newsletters'><a className='MoreLink'>More Newsletters</a></Link>
                    </div>
                    
                    <div className='Column'>
                        <Link href='/podcasts'>
                            <div className='ColumnHeader'>
                                <h2>Podcasts</h2>
                            </div>
                        </Link>
                        {podcasts.map(podcast => {
                            return (

                                <Card preliked={likes.includes(parseInt(podcast.id))} user={user} key={podcast.title} entity={podcast} />
                            );
                        })}
                        <Link href='/podcasts'><a className='MoreLink'>More Podcasts</a></Link>
                    </div>
                    
                    
                    <div className='Column'>
                        <Link href='/blogs'>
                        <div className='ColumnHeader'>
                            <h2>Blogs</h2>
                        </div>
                        </Link>
                        {blogs.map(blog => {
                            return (
                                <Card preliked={likes.includes(parseInt(blog.id))} user={user} key={blog.title} entity={blog} />
                            );
                        })}
                        <Link href='/blogs'><a className='MoreLink'>More Blogs</a></Link>
                    </div>
                </div>
            </main>
            {/*
            <div className='SidebarWrapper'>
                <aside className='Sidebar'>
                    <h3>Featured</h3>
                    <ul>
                        <li>Something</li>
                        <li>Different Something</li>
                        <li>Something Else</li>
                    </ul>
                </aside>
            </div>
            */}
            <style jsx>{`
                body p,
                body h1,
                body h2,
                body h3,
                body h4 {
                    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
                }
                .LayoutContainer {
                    padding-top: 1rem;
                    display: grid;
                    grid-template-columns: 1fr;
                    height: 100px;
                }
                .ColumnContainer {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-gap: 48px;
                }
                .Column {
                    height: 100px;
                }
                .ColumnHeader {
                    cursor: pointer;
                    background-color: #84CAE7;
                    border-radius: 2px;
                    padding: 2px 8px;
                    margin-bottom: 10px;
                }
                .ColumnHeader h2 {
                    color: white;
                    font-size: 1.2rem;
                    font-weight: 200;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                }
                .MoreLink {
                    display: block;
                    text-align: center;
                    color: #242424;
                    text-transform: uppercase;
                }

                .SidebarWrapper {
                    grid-column: 2 / span 1;
                    padding: 1rem;
                    width: 100%;
                }
                .Sidebar {
                    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
                    background-color: #f7f7f7;
                    padding: 1rem;
                    width: 100%;
                }
                .Sidebar h3 {
                    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
                }
            `}</style>
        </div>
        </Container>
    );
}

export default Grid;