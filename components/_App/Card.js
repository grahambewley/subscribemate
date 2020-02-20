import React from 'react';
import { useRouter } from 'next/router';
import { Icon, Modal, Header, Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay} from '@fortawesome/free-solid-svg-icons';

const Card = ({ preliked, handleEntityLike, handleEntityUnlike, entity, user, triggerDetailModal }) => {
    const [liked, setLiked] = React.useState(preliked);
    const [loginPromptOpen, setLoginPromptOpen] = React.useState(false);

    const router = useRouter();

    function handleCardClick(e) {
        // If the thing clicked was the like button, do nothing here
        if (e.target.classList.contains('CardLikeContainer') || e.target.classList.contains('CardLikeIcon')) {
            return;
        } 
        // Otherwise, trigger the details modal
        else {
            triggerDetailModal(entity);
        }
    }

    function handleLikeButtonClick() {
        if(!user) {
            setLoginPromptOpen(true);
        } 
        else {
            if(!liked) {
                // Flip the thumbs up right away
                setLiked(!liked);
                handleEntityLike(entity);
            } 
            else {
                // Flip the thumbs up right away
                setLiked(!liked)
                handleEntityUnlike(entity)
            }
        }
    }

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

    return (<>
        <div className='CardContainer' onClick={handleCardClick}>
            <div className='CardImageContainer'>
                <div className='CardLikeContainer' style={liked ? {opacity: '1'} : null} onClick={handleLikeButtonClick}>
                    <Icon className='CardLikeIcon' style={{cursor: 'pointer', margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }} name='thumbs up' color={liked ? 'teal' : "grey"}/>
                </div>
            </div>
            <div className='CardDetails'>
                <h3 className='CardName'>{entity.title}</h3>
                { entity.description.length > 120 ?
                <p className='CardDescription'>{entity.description.slice(0,120)}...</p>
                : 
                <p className='CardDescription'>{entity.description}</p> }
            </div>

            { entity.frequency ?
            <div className='CardFrequencyContainer'>
                <FontAwesomeIcon style={{marginRight:'6px'}} icon={faCalendarDay} color='#aaa'/>
                <span className='CardFrequency'>{getFrequencyText(entity.frequency)}</span>
            </div>
            : null }

            { entity.authors.length > 0 ?
            <div className='CardAuthorContainer'>
                { entity.authors.map((author) => {
                    return (
                        <div key={author.authorTwitterUsername} className='CardAuthor'>
                            <img className='CardAuthorImage' src={author.authorTwitterProfileImageUrl} />
                            <h4 className='CardAuthorName'>{author.authorName}</h4>
                            <a className='CardAuthorTwitterUsername' target='_blank' href={getTwitterProfileUrl(author.authorTwitterUsername)}>@{author.authorTwitterUsername}</a>
                        </div>
                    );
                })}
            </div>
            : null }
        </div>
        <Modal
            open={loginPromptOpen}
            onClose={() => setLoginPromptOpen(false)}
            size='small'
            style={{transform:'translateY(-50%)'}}
        >
            <Header content='Please Log In' />
            <Modal.Content>
                <h3>Sorry, you have to be logged in to do that.</h3>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => router.push('/login')}>
                    Log In
                </Button>
                <Button color='green' onClick={() => router.push('/signup')}>
                    Sign Up
                </Button>
            </Modal.Actions>
      </Modal>
        <style jsx>{`
        .CardContainer {
            box-shadow: 0 1px 1px rgba(0,0,0,.04),
                        0 2px 2px rgba(0,0,0,.04),
                        0 4px 4px rgba(0,0,0,.04),
                        0 8px 8px rgba(0,0,0,.04);
            border-radius: 10px;
            overflow: hidden;
            transition: all .17s;
            cursor:pointer;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            -webkit-tap-highlight-color: transparent;
            background-color: white;
            display: grid;
            grid-template-rows: 120px 1fr repeat(3, min-content);
        }
        .CardContainer:hover {
            transform: translateY(-5px);
            box-shadow: 0 1px 1px rgba(0,0,0,0.05), 
                        0 2px 2px rgba(0,0,0,0.05), 
                        0 4px 4px rgba(0,0,0,0.05), 
                        0 8px 8px rgba(0,0,0,0.05);
                        0 16px 16px rgba(0,0,0,0.05),
                        0 32px 32px rgba(0,0,0,0.05);
        }
        .CardContainer:active {
            transform: translateY(0);
            box-shadow: 0 1px 1px rgba(0,0,0,.04),
                        0 2px 2px rgba(0,0,0,.04),
                        0 4px 4px rgba(0,0,0,.04),
                        0 8px 8px rgba(0,0,0,.04);
        }
        .CardImageContainer {
            position: relative;
            overflow: hidden;
            background-color: white;
            background-image: url("${entity.imageUrl}");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 85%);
        }
        .CardLikeContainer {
            position: absolute;
            top: 5px;
            right: 5px;
            background-color: #f7f7f7;
            border-radius: 50%;
            height: 30px;
            width: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: all .25s;
        }
        @media(min-width: 768px){
            .CardContainer:hover .CardLikeContainer {
                opacity: 1;
            }
        }
        .CardDetails {
            padding: 6px 10px;
        }
        .CardName {
            font-weight: 600;
            margin-bottom: 5px;
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
        .CardAuthorContainer {
            margin: 5px;
            margin-top: 0;
            border-radius: 10px;
            background-color: #f0f0f0;
            padding: 8px;
        }
        .CardAuthor {
            display: grid;
            grid-template-columns: 32px 1fr;
            grid-template-rows: 1fr 1fr;
            grid-column-gap: 10px;
        }
        .CardAuthor:not(:last-child) {
            margin-bottom: 8px;
        }
        .CardAuthorImage {
            grid-column: 1 / span 1;
            grid-row: 1 / span 2;
            align-self: center;
            width: 100%;
            border-radius: 50%;
            border: 1px solid #edf2f2;
        }
        .CardAuthorName {
            grid-column: 2 / span 1;
            grid-row: 1 / span 1;
            align-self: center;
            margin: 0;
            font-size: 1rem;
            line-height: 1;
        }
        .CardAuthorTwitterUsername {
            color: inherit;
            grid-column: 2 / span 1;
            grid-row: 2 / span 1;
            align-self: center;
            margin: 0;
            opacity: .9;
            font-size: .9rem;
            line-height: 1;
        }
        .CardAuthorTwitterUsername:hover {
            text-decoration: underline;
        }

        @media(max-width: 767px) {
            .CardContainer {
                display: grid;
                grid-template-columns: 1fr 3fr;
                grid-template-rows: repeat(2, min-content) 1fr;
            }
            .CardContainer:hover {
                transform: inherit;
                box-shadow: inherit;
            }
            .CardContainer:active {
                transform: inherit;
                box-shadow: inherit;
            }
            .CardImageContainer {
                grid-column: 1 / span 1;
                grid-row: 1 / -1;
                clip-path: none;
                border-right: 1px solid #ddd;
            }
            .CardLikeContainer {
                left: 5px;
                right: initial;
                width: 30px;
                height: 30px;
                opacity: 1;
            }
            .CardName {
                font-size: 1.35rem;
            }
            .CardDescription {
                font-size: 1.1rem;
            }
            .CardFrequencyContainer {
                display: none;
            }
            .CardAuthorContainer {
                padding: 10px 12px;
                margin: 0;
                border-radius: 0;
            }
            .CardAuthor {
                display: flex;
                justify-content: space-between;
            }
            .CardAuthorName {
                font-size: 1.1rem;
            }
            .CardAuthorImage {
                display: none;
            }
        }
        `}</style>
    </>);
}

export default Card;