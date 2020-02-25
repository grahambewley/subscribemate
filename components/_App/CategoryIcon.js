import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBinoculars, faLightbulb, faPenNib, faCode, faMicrochip, faBriefcase, faWalking, faHeart, faMoneyBillWaveAlt } from '@fortawesome/free-solid-svg-icons';

const CategoryIcon = ({ category }) => {

    function getIconFromCategory(category) {
        
        const lowercaseCategory = category.toLowerCase();


        switch(lowercaseCategory) {
            case 'business':
                return faBriefcase;
            case 'design':
                return faPenNib;
            case 'development':
                return faCode;
            case 'entrepreneurship':
                return faLightbulb;
            case 'health': 
                return faHeart;
            case 'lifestyle':
                return faWalking;
            case 'personal-finance':
                return faMoneyBillWaveAlt;    
            case 'technology':
                return faMicrochip;

            default: 
                return faBinoculars;
        }
    }

    function getColorFromCategory(category) {

        // All complimentary to #3DAEAC

        const lowercaseCategory = category.toLowerCase();

        switch(lowercaseCategory) {
            case 'business':
                return '#08415C';               // Dark Blue
            case 'design':
                return '#0C7489';               // Deep Sea Blue
            case 'development':
                return '#ED9B40';               // Carrot Orange
            case 'entrepreneurship':
                return '#FF9F1C';               // Dandelion Yellow
            case 'health': 
                return '#BA3B46;';              // Deep Red
            case 'lifestyle':
                return '#CC2936';               // Super Red
            case 'personal-finance':
                return '#4A7C59';               // Forest Green    
            case 'technology':
                return '#13505B';               // Deep Teal

            default: 
                return '#3DAEAC';               // LOGO TEAL
        }
    }

    return (<>
        <div className='CategoryIconContainer'>
            <FontAwesomeIcon className='CategoryIcon' icon={getIconFromCategory(category)} color='white' style={{fontSize:'.85rem'}}/> 
        </div>

        <style jsx>{`
        .CategoryIconContainer {
            background-color: ${getColorFromCategory(category)};
            height: 1.6rem;
            width: 1.6rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .CategoryIconContainer:not(:last-child) {
            margin-right: 4px;
        }
        
        `}</style>
    </>);
}

export default CategoryIcon;