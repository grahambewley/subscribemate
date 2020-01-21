import React from 'react';
import Link from 'next/link';
import { Container, Menu } from "semantic-ui-react";
import NewsletterCard from '../Newsletters/NewsletterCard';

const Grid = ({ topNewsletters, topPodcasts, topBlogs }) => {
    const [activeItem, setActiveItem] = React.useState('all')

    return (
        <Container>
        <div className='LayoutContainer'>
            
            <main>
                <Menu 
                    size='small'
                    widths={6} 
                    pointing 
                    secondary
                >
                    <Menu.Item
                        name='all'
                        color='teal'
                        active={activeItem === 'all'}
                        onClick={() => setActiveItem('all')}
                    />
                    <Menu.Item
                        name='design'
                        color='violet'
                        active={activeItem === 'design'}
                        onClick={() => setActiveItem('design')}
                    />
                    <Menu.Item
                        name='entrepreneurship'
                        color='orange'
                        active={activeItem === 'entrepreneurship'}
                        onClick={() => setActiveItem('entrepreneurship')}
                    />
                    <Menu.Item
                        name='development'
                        color='yellow'
                        active={activeItem === 'development'}
                        onClick={() => setActiveItem('development')}
                    />
                    <Menu.Item
                        name='tech'
                        color='blue'
                        active={activeItem === 'tech'}
                        onClick={() => setActiveItem('tech')}
                    />
                    <Menu.Item
                        name='personal-finance'
                        color='green'
                        active={activeItem === 'personal-finance'}
                        onClick={() => setActiveItem('personal-finance')}
                    />
                </Menu>
                <div className='ColumnContainer'>
                    <div className='Column'>
                        <h2 className='ColumnHeader'>Fresh Newsletters</h2>
                        {topNewsletters.map(newsletter => {
                            return (
                                <NewsletterCard newsletter={newsletter} />
                            );
                        })}
                        <Link href='/newsletters'><a>More Newsletters</a></Link>
                    </div>
                    <div className='Column'>
                        <h2 className='ColumnHeader'>Fresh Podcasts</h2>
                    </div>
                    <div className='Column'>
                        <h2 className='ColumnHeader'>Fresh Blogs</h2>
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
                .LayoutContainer {
                    display: grid;
                    grid-template-columns: 1fr 310px;
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
                    font-family: 'Heebo', sans-serif;
                    font-weight: 400;
                    letter-spacing: 2px;
                    opacity: .6;
                    text-transform: uppercase;
                    font-size: 1rem;
                }
                

                .SidebarWrapper {
                    grid-column: 2 / span 1;
                    padding: 1rem;
                }
                .Sidebar {
                    border-radius: 5px;
                    background-color: #f7f7f7;
                    padding: 10px;
                }
            `}</style>
        </div>
        </Container>
    );
}

export default Grid;