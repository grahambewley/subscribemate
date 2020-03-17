import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faEnvelopeOpenText, faMicrophoneAlt} from '@fortawesome/free-solid-svg-icons';

const dateSpanOptions = [
    {
        key: 'this week',
        text: 'This Week',
        value: 'this week'
    },
    {
        key: 'this month',
        text: 'This Month',
        value: 'this month'
    },
    {
        key: 'all time',
        text: 'All Time',
        value: 'All Time'
    }
];

const FilterStrip = ({ categories, setCategories, handleCategoryClick, handleDateSpanChange }) => {

    const [categoriesModalOpen, setCategoriesModalOpen] = React.useState(false);

    function handleBackdropClick(e) {
        if (e.target.classList.contains('CategoriesModal') || e.target.classList.contains('MobileCategoryLabel')) {
            return;
        }
        else {
            setCategoriesModalOpen(false);
        }
    }


    return(<>
        <div className='FilterContainer'>
            <div className='CategorySelectorContainer'>
                <div className='TopCategoryContainer'>
                    <span 
                        className='CategoryLabel'
                        name='all'
                        onClick={() => setCategories([])}
                        style={ categories.length == 0 ? {backgroundColor: 'rgba(60,174,163, .8)', color: 'white'} : null } >
                        All
                    </span>
                    <span 
                        className='CategoryLabel'
                        onClick={() => handleCategoryClick('194')}
                        style={ categories.includes('194') ? {backgroundColor: 'rgba(60,174,163, .8)', color: 'white'} : null } >
                        Development
                    </span>
                    <span 
                        className='CategoryLabel'
                        onClick={() => handleCategoryClick('193')}
                        style={ categories.includes('193') ? {backgroundColor: 'rgba(60,174,163, .8)', color: 'white'} : null } >
                        Design
                    </span>
                    <span 
                        className='CategoryLabel'
                        onClick={() => handleCategoryClick('195')}
                        style={ categories.includes('195') ? {backgroundColor: 'rgba(60,174,163, .8)', color: 'white'} : null } >
                        Entrepreneurship
                    </span>
                    <span 
                        className='CategoryLabel'
                        onClick={() => handleCategoryClick('196')}
                        style={ categories.includes('196') ? {backgroundColor: 'rgba(60,174,163, .8)', color: 'white'} : null } >
                        Technology
                    </span>
                </div>
                <button className='CategoriesButton' onClick={() => setCategoriesModalOpen(true)}>Categories</button>
            </div>
            <div className='DateSelectorContainer'>
                <Dropdown 
                    style={{width: 'fit-content'}}
                    defaultValue='this week'
                    onChange={handleDateSpanChange}
                    options={dateSpanOptions}
                />   
            </div>
        </div>
        { categoriesModalOpen ? 
        <div className='CategoriesModalBackdrop' onClick={handleBackdropClick}>
            <div className='CategoriesModal'>
                <h2>Select Categories:</h2>
                <span 
                    className='MobileCategoryLabel'
                    name='all'
                    onClick={() => setCategories([])}
                    style={ categories.length == 0 ? {backgroundColor: 'rgba(60,174,163, .8)', color: 'white'} : null } >
                    All
                </span>
                <span 
                    className='MobileCategoryLabel'
                    onClick={() => handleCategoryClick('194')}
                    style={ categories.includes('194') ? {backgroundColor: 'rgba(60,174,163, .8)', color: 'white'} : null } >
                    Development
                </span>
                <span 
                    className='MobileCategoryLabel'
                    onClick={() => handleCategoryClick('193')}
                    style={ categories.includes('193') ? {backgroundColor: 'rgba(60,174,163, .8)', color: 'white'} : null } >
                    Design
                </span>
                <span 
                    className='MobileCategoryLabel'
                    onClick={() => handleCategoryClick('195')}
                    style={ categories.includes('195') ? {backgroundColor: 'rgba(60,174,163, .8)', color: 'white'} : null } >
                    Entrepreneurship
                </span>
                <span 
                    className='MobileCategoryLabel'
                    onClick={() => handleCategoryClick('196')}
                    style={ categories.includes('196') ? {backgroundColor: 'rgba(60,174,163, .8)', color: 'white'} : null } >
                    Technology
                </span>
            </div>
        </div>
        : null }
        <style jsx>{`
            .FilterContainer {
                display: grid;
                grid-template-columns: 1fr max-content;
                align-items: center;
                // padding-bottom: 1rem;
                // border-bottom: 2px solid rgba(0,0,0, .1);
            }
            .CategorySelectorContainer {
                grid-column: 1 / span 1;
            }
            .TopCategoryContainer {
                display: flex;
                align-items: center;
            }
            .CategoryLabel {
                display: flex;
                align-items: center;
                cursor: pointer;
                padding: 5px 10px;
                border-radius: 5px;
                background-color: rgba(60,174,163, .2);
                line-height: 1;
                text-transform: uppercase;
                font-size: .9rem;
                letter-spacing: 1px;
                color: rgba(0,0,0,.7);
                transition: all .2s;
            }
            .CategoryLabel:hover {
                background-color: rgba(60,174,163, .35);
            }
            .CategoryLabel:not(:last-child) {
                margin-right: 7px;
            }
            .CategoriesButton {
                display: none;
                padding: 8px 16px;
                line-height: 1;
                text-transform: uppercase;
                font-size: .9rem;
                letter-spacing: 1px;
                color: rgba(0,0,0,.65);
                border: none;
                border-radius: 100px;
                background-color: rgba(60,174,163, .2);
            }

            .CategoriesModalBackdrop {
                position: fixed;
                z-index: 100;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: rgba(0,0,0,.6);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
            }

            .CategoriesModal {
                background-color: white;
                padding: 1rem;
                padding-bottom: calc(1rem - 10px);
                width: 100%;
                border-radius: 10px;
                box-shadow: rgba(0,0,0,.4);
            }
            .MobileCategoryLabel {
                display: inline-block;
                cursor: pointer;
                padding: 8px 16px;
                border-radius: 5px;
                background-color: rgba(60,174,163, .2);
                line-height: 1;
                font-weight: 400;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: rgba(0,0,0,.65);
                margin-bottom: 10px;
            }
            .MobileCategoryLabel:not(:last-child) {
                margin-right: 10px;
            }

            .DateSelectorContainer {
                grid-column: 2 / span 1;
            }
            
            @media(max-width:767px) {
                .FilterContainer {
                    padding-bottom: 0;
                    border: none;
                }
                .CategoriesButton {
                    display: block;
                    font-size: 1.1rem;
                }
                .TopCategoryContainer {
                    display: none;
                }
            }
            `}</style>
    </>)
}

export default FilterStrip;