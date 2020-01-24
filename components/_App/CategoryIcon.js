import { Popup } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCode, faPaintBrush, faMoneyBill, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const categories = {
    design: {
        icon: faPaintBrush,
        color: "#BEEE62"
    },
    development: {
        icon: faCode,
        color: "#F4743B"
    },
    entrepreneurship: {
        icon: faLightbulb,
        color: "#548687"
    },
    personalFinance: {
        icon: faMoneyBill,
        color: '#6DA34D'
    }
}


const CategoryIcon = ({ category }) => {
    
    return (<>

    <span className="fa-layers fa-fw">
        <Popup
            trigger={<FontAwesomeIcon style={{display: 'block', margin: '0 auto'}} size='2x' icon={faCircle} color={categories[`${category}`].color}/>}
            content={category}
            size='mini'
        />
         <Popup
            trigger={<FontAwesomeIcon style={{display: 'block', margin: '0 auto'}} size='2x' icon={categories[`${category}`].icon} inverse transform="shrink-6" />}
            content={category}
            size='mini'
        />
        
    </span>
    
    
    <style jsx>{`
    .CategoryIcon {
        position: relative;
    }
    `}</style>
    </>);
}

export default CategoryIcon;