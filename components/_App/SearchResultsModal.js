import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import CardStrip from './CardStrip';

const SearchResultsModal = ({ entities, closeModal }) => {
    
    const results = entities.map(entity => {
        return (<CardStrip entity={entity} />);
    })

    return <>
        <div className='Backdrop' onClick={closeModal}>
            <div className='ResultsContainer'>
                <div className='ModalClose' onClick={closeModal}>
                    <FontAwesomeIcon style={{fontSize: '2.5rem'}} icon={faTimes} color='white'/>
                </div>
                <h2 className='ResultsHeader'>Search Results:</h2>
                <h4 className='ResultsShowingLabel'>Showing {entities.length} of {entities.length}</h4>
                <div className='ResultsWrapper'>
                    { results }
                </div>
            </div>
        </div>

        <style jsx>{`
        .Backdrop {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0,0,0,.8);
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 200;
        }

        .ResultsContainer {
            position: relative;
            width: 768px;
            padding: 2rem;
            background-color: white;
            border-radius: 10px;
        }
        .ModalClose {
            position: absolute;
            top: 0;
            right: 1rem;
            cursor: pointer;
            z-index: 210;
            transform: translateY(-3rem);
            color: white;
        }
        .ResultsHeader {
            margin-top: 0;
            margin-bottom: 10px;
        }
        .ResultsShowingLabel {
            font-weight: 400;
            opacity: .9;
            margin-top: 0;
            margin-bottom: 2rem;
        }
        .ResultsWrapper {
            display: grid;
            grid-gap: 32px;
        }

        @media(max-width: 820px) {
            .ResultsContainer {
                width: 100%;
                max-height: 80%;
                overflow-y: auto;
            }
        }
        `}</style>    
    </>;
}

export default SearchResultsModal;