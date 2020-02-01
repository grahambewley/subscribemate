import { Label, Dropdown } from 'semantic-ui-react';

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
]

const FilterStrip = ({ categories, setCategories, handleCategoryClick, handleDateSpanChange }) => {
    return(
        <div className='FilterContainer'>
            <Label.Group>
                <Label 
                    style={{marginBottom: '0'}}
                    as='a' 
                    name='all'
                    color={categories.length == 0 ? 'teal' : null}
                    onClick={() => setCategories([])}>
                All
                </Label>
                <Label 
                    style={{marginBottom: '0'}}
                    as='a'
                    name='development'
                    value='194'
                    color={categories.includes('194') ? 'teal' : null}
                    onClick={handleCategoryClick}>
                Development
                </Label>
                <Label 
                    style={{marginBottom: '0'}}
                    as='a'
                    name='design'
                    value='193'
                    color={categories.includes('193') ? 'teal' : null}
                    onClick={handleCategoryClick}>
                Design
                </Label>
                <Label 
                    style={{marginBottom: '0'}}
                    as='a'
                    name='entrepreneurship'
                    value='195'
                    color={categories.includes('195') ? 'teal' : null}
                    onClick={handleCategoryClick}>
                Entrepreneurship
                </Label>
                <Label 
                    style={{marginBottom: '0'}}
                    as='a'
                    name='technology'
                    value='196'
                    color={categories.includes('196') ? 'teal' : null}
                    onClick={handleCategoryClick}>
                Technology
                </Label>
                <Label 
                    style={{marginBottom: '0'}}
                    as='a'
                    name='personalFinance'
                    value='199'
                    color={categories.includes('199') ? 'teal' : null}
                    onClick={handleCategoryClick}>
                Personal Finance
                </Label>
            </Label.Group>
            <Dropdown 
                style={{width: 'fit-content'}}
                defaultValue='this week'
                onChange={handleDateSpanChange}
                options={dateSpanOptions}
            />
            <style jsx>{`
            .FilterContainer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                padding-right: 1rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid rgba(60,174,163, .3);
            }
            `}</style>
        </div>
    )
}

export default FilterStrip;