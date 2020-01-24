import React from 'react';
import Link from 'next/link';
import { Container, Menu, Label } from "semantic-ui-react";
import NewsletterCard from '../Newsletters/NewsletterCard';

const Grid = ({ topNewsletters, topPodcasts, topBlogs }) => {
    const [categories, setCategories] = React.useState([]);
    const [activeItem, setActiveItem] = React.useState('fresh')

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
                        name='fresh'
                        active={activeItem === 'fresh'}
                        onClick={() => setActiveItem('fresh')}
                    />
                    <Menu.Item
                        name='this week'
                        active={activeItem === 'this week'}
                        onClick={() => setActiveItem('this week')}
                    />
                    <Menu.Item
                        name='this month'
                        active={activeItem === 'this month'}
                        onClick={() => setActiveItem('this month')}
                    />
                </Menu>

                
                <div className='ColumnContainer'>
                    <div className='Column'>
                        <h2 className='ColumnHeader'>Newsletters</h2>
                        {topNewsletters.map(newsletter => {
                            return (

                                <NewsletterCard key={newsletter.name} newsletter={newsletter} />
                            );
                        })}
                        <Link href='/newsletters'><a className='MoreLink'>More Newsletters</a></Link>
                    </div>
                    <div className='Column'>
                        <h2 className='ColumnHeader'>Podcasts</h2>
                    </div>
                    <div className='Column'>
                        <h2 className='ColumnHeader'>Blogs</h2>
                    </div>
                </div>
            </main>

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

            <style jsx>{`
                body p,
                body h1,
                body h2,
                body h3,
                body h4 {
                    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
                }
                .LayoutContainer {
                    display: grid;
                    grid-template-columns: 1fr 280px;
                    height: 100px;
                }
                .ColumnContainer {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-gap: 24px;
                }
                .Column {
                    height: 100px;
                }
                .ColumnHeader {
                    font-weight: 400;
                    letter-spacing: 2px;
                    opacity: .6;
                    text-transform: uppercase;
                    font-size: 1rem;
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