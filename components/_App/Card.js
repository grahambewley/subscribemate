import React from 'react';
import { Label, Icon, Modal, Header, Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';
import cookie from 'js-cookie';

const Card = ({ preliked, entity, user }) => {
    const [liked, setLiked] = React.useState(preliked);
    const [loginPromptOpen, setLoginPromptOpen] = React.useState(false);

    async function handleLikeButtonClick() {
        if(!user) {
            setLoginPromptOpen(true);
        } 
        else {
            if(!liked) {
                // Flip the thumbs up right away
                setLiked(!liked);
                // Add like to the likes collection
                const url = `${baseUrl}/api/like`;
                const payload = { entity };
                const token = cookie.get('token');
                // Sending user token along with this reqest to only allow authorized users to like stuff
                const headers = { headers: { Authorization: token } };
                const userLikeResponse = await axios.post(url, payload, headers);
            } 
            else {
                // Flip the thumbs up right away
                setLiked(!liked)
                // Remove like from likes collection
                const url = `${baseUrl}/api/like`;
                const token = cookie.get('token');
                const entityId = entity.id;
                const payload = { 
                    params: { entityId },
                    headers: { Authorization: token } 
                };
                const userUnlikeResponse = await axios.delete(url, payload);
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
        <div className='CardContainer'>
            <div className='CardImageContainer'>
                <div className='CardLikeContainer' onClick={handleLikeButtonClick}>
                    <Icon className='CardLikeIcon' style={{cursor: 'pointer', margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }} name='thumbs up' color={liked ? 'teal' : "grey"}/>
                </div>
            </div>
            <div className='CardDetails'>
                <h3 className='CardName'>{entity.title}</h3>
                <p className='CardDescription'>{entity.description}</p>
            </div>

            { entity.frequency ?
            <div className='CardFrequencyContainer'>
                <FontAwesomeIcon style={{marginRight:'6px'}} icon={faCalendarDay} color='#aaa'/>
                <span className='CardFrequency'>{getFrequencyText(entity.frequency)}</span>
            </div>
            : null }

            <div className='CardAuthorContainer'>
                { entity.authors.map((author) => {
                    return (
                        <div key={author.authorTwitterUsername} className='CardAuthor'>
                            <img className='CardAuthorImage' src={author.authorTwitterProfileImageUrl} />
                            <h4 className='CardAuthorName'>{author.authorName}</h4>
                            <a className='CardAuthorTwitterUsername' target='_blank' href={getTwitterProfileUrl(author.authorTwitterUsername)}><h4>@{author.authorTwitterUsername}</h4></a>
                        </div>
                    );
                })}
            </div>
        </div>
        <Modal
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
      </Modal>
        <style jsx>{`
        .CardContainer {
            border: 1px solid #e1e1e1;
            border-radius: 10px;
            overflow: hidden;
            transition: all .2s;
            cursor:pointer;
            
            display: grid;
            grid-template-rows: 120px 1fr repeat(3, min-content);
        }
        .CardContainer i {
            z-index: 40;
        }
        .CardContainer:hover {
            transform: translateY(-6px);
            box-shadow: 0 6px 8px rgba(0,0,0,0.08);
        }
        .CardContainer:active {
            transform: translateY(-1px);
            box-shadow: 0 1px 2px rgba(0,0,0,.1);
        }
        .CardImageContainer {
            position: relative;
            overflow: hidden;
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
            background-color: #f2f2f2;
            border-radius: 50%;
            height: 25px;
            width: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
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
            background-color: #f2f2f2;
            padding: 10px;
        }
        .CardAuthor {
            display: grid;
            grid-template-columns: 36px 1fr;
            grid-template-rows: 1fr 1fr;
            grid-column-gap: 10px;
        }
        .CardAuthor:not(:last-child) {
            margin-bottom: 8px;
        }
        .CardAuthorImage {
            grid-column: 1 / span 1;
            grid-row: 1 / span 2;
            width: 100%;
            border-radius: 50%;
            border: 1px solid #ddd;
        }
        .CardAuthorName {
            grid-column: 2 / span 1;
            grid-row: 1 / span 1;
            margin: 0;
        }
        .CardAuthorTwitterUsername {
            color: inherit;
            grid-column: 2 / span 1;
            grid-row: 2 / span 1;
            margin: 0;
            opacity: .75;
        }
        .CardAuthorTwitterUsername:hover {
            text-decoration: underline;
        }

        @media(max-width: 767px) {
            .CardContainer {
                display: grid;
                grid-template-columns: 1fr 4fr;
                grid-template-rows: repeat(2, min-content) 1fr;
            }
            .CardImageContainer {
                grid-column: 1 / span 1;
                grid-row: 1 / -1;
                clip-path: none;
            }
            .CardLikeContainer {
                left: 5px;
                right: initial;
                width: 30px;
                height: 30px;
            }
            .CardFrequencyContainer {
                display: none;
            }
            .CardAuthorContainer {
                background-color: inherit;
                padding: 0;
                margin: 0;
            }
            .CardAuthor {
                padding: 0 10px 6px 10px;
                display: flex;
                justify-content: space-between;
            }
            .CardAuthorImage {
                display: none;
            }
        }
        `}</style>
    </>);
}

export default Card;