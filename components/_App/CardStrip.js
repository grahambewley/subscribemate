import React from 'react';
import { Icon, Modal, Header, Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay} from '@fortawesome/free-solid-svg-icons';

const Card = ({ entity }) => {

    
    // function handleCardClick(e) {
    //     // If the thing clicked was the like button, do nothing here
    //     if (e.target.classList.contains('CardLikeContainer') || e.target.classList.contains('CardLikeIcon')) {
    //         return;
    //     } 
    //     // Otherwise, trigger the details modal
    //     else {
    //         triggerDetailModal(entity);
    //     }
    // }

    // function handleLikeButtonClick() {
    //     if(!user) {
    //         setLoginPromptOpen(true);
    //     } 
    //     else {
    //         if(!liked) {
    //             // Flip the thumbs up right away
    //             setLiked(!liked);
    //             handleEntityLike(entity);
    //         } 
    //         else {
    //             // Flip the thumbs up right away
    //             setLiked(!liked)
    //             handleEntityUnlike(entity)
    //         }
    //     }
    // }

    function getFrequencyText(shorthand) {
        // If the frequency is nothing, just return from this function
        if(!shorthand) {
            return;
        }

        if(shorthand === '7w'){
            return "Daily";
        } else {
            let text = '';
            const number = shorthand.slice(0, 1);
            const range = shorthand.slice(1);

            switch(number) {
                case '1':
                    break;
                case '2':
                    text += "Twice ";
                    break;
                default: 
                    text += number + ' Times ';
                    break;    
            }
    
            switch(range) {
                case 'w':
                    text += "Weekly";
                    break;
                case 'm':
                    text += "Monthly";
                    break;
                default: 
                    break;
            }
            return text;
        }
        
    }

    function getTwitterProfileUrl(username) {
        return ("https://www.twitter.com/" + username);
    }

    function sectionNameFromId(sectionId) {
        switch(sectionId) {
            case '1':
                return 'Newsletter';
            case '2':
                return 'Podcast';
            case '3':
                return 'Blog';
        }
        return;
    }

    return (<>
        <div className='CardContainer'>
            <div className='CardImageContainer'>
                
            </div>
            <div className='CardDetails'>
                <h4 className='TypeLabel'>{sectionNameFromId(entity.sectionId)}</h4>
                <h3 className='CardName'>{entity.title}</h3>

                { entity.authors.length > 0 ?
                <div className='CardAuthorContainer'>
                    
                </div>
                : null }

                { entity.description.length > 120 ?
                <p className='CardDescription'>{entity.description.slice(0,120)}...</p>
                : 
                <p className='CardDescription'>{entity.description}</p> }
                
                <div className='CardBottomRow'>
                    { entity.authors.length > 0 ? 
                        <div className='AuthorContainer'>
                            { entity.authors.map((author) => {
                                return (
                                    <div key={author.authorTwitterUsername} className='Author'>
                                        <div className='AuthorGrid'>
                                            <img className='AuthorImage' src={author.authorTwitterProfileImageUrl} />
                                            <h4 className='AuthorName'>{author.authorName}</h4>
                                            <a className='AuthorTwitterUsername' target='_blank' href={getTwitterProfileUrl(author.authorTwitterUsername)}>@{author.authorTwitterUsername}</a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    : null }

                    { entity.frequency ?
                    <div className='CardFrequencyContainer'>
                        <FontAwesomeIcon style={{marginRight:'6px'}} icon={faCalendarDay} color='#aaa'/>
                        <span className='CardFrequency'>{getFrequencyText(entity.frequency)}</span>
                    </div>
                    : null }
                </div>
            </div>
        </div>
        
        {/* <Modal
            open={loginPromptOpen}
            onClose={() => setLoginPromptOpen(false)}
            size='small'
            centered={false}
        >
            <Header content='Please Log In' />
            <Modal.Content>
                <h3>You must be logged in to do that.</h3>
            </Modal.Content>
            <Modal.Actions>
            <Button color='green' onClick={() => setLoginPromptOpen(false)}>
                <Icon name='checkmark'/> Got It
            </Button>
            </Modal.Actions>
      </Modal> */}
        <style jsx>{`
        .CardContainer {
            display: grid;
            grid-template-columns: 160px 1fr;
            grid-gap: 2rem;
            overflow: hidden;
            cursor:pointer;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            -webkit-tap-highlight-color: transparent;
        }
        .CardImageContainer {
            overflow: hidden;
            background-color: white;
            background-image: url("${entity.imageUrl}");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            border-radius: 10px;
        }
        .TypeLabel {
            margin: 0;
            text-transform: uppercase;
            font-weight: 100;
            letter-spacing: 1px;
            font-size: .8rem;
            opacity: .9;
        }
        .CardName {
            font-weight: 600;
            margin-top: 0;
            margin-bottom: 5px;
        }
        .CardBottomRow {
            display: grid;
            grid-template-columns: 1fr max-content;
        }
        .CardFrequencyContainer {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin: 0 10px 5px 10px;
        }
        .CardFrequency {
            text-transform: uppercase;
            font-size: .8rem;
            font-weight: 200;
            letter-spacing: 1px;
            opacity: .9
        }
        .AuthorContainer {
            grid-column: 1 / span 1;
            display: flex;
        }
        .Author {
            display: inline-block;
            background-color: #f0f0f0;
            padding: 8px;
            border-radius: 5px;
        }
        .Author:not(:last-child) {
            margin-right: 8px;
        }
        .AuthorGrid {
            display: grid;
            grid-template-columns: 32px 1fr;
            grid-template-rows: 1fr 1fr;
            grid-column-gap: 10px;
        }
        .AuthorImage {
            grid-column: 1 / span 1;
            grid-row: 1 / span 2;
            align-self: center;
            width: 100%;
            border-radius: 50%;
            border: 1px solid #edf2f2;
        }
        .AuthorName {
            grid-column: 2 / span 1;
            grid-row: 1 / span 1;
            align-self: center;
            margin: 0;
            font-size: 1rem;
            line-height: 1;
        }
        .AuthorTwitterUsername {
            color: inherit;
            grid-column: 2 / span 1;
            grid-row: 2 / span 1;
            align-self: center;
            margin: 0;
            opacity: .9;
            font-size: .9rem;
            line-height: 1;
        }
        .AuthorTwitterUsername:hover {
            text-decoration: underline;
        }

        @media(max-width: 767px) {
            .CardContainer {
                grid-template-columns: none;
                grid-template-rows: 120px 1fr;
                grid-gap: 1rem;
            }
        }
        `}</style>
    </>);
}

export default Card;