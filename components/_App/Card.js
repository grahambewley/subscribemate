import React from 'react';
import { Label, Icon, Modal, Header, Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';
import cookie from 'js-cookie';

const Card = ({ entity, user }) => {
    const [liked, setLiked] = React.useState(false);
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
                console.log(userLikeResponse);
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
                console.log(userUnlikeResponse);
            }

        }
    }

    function getFrequencyText(shorthand) {

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
                <h4 style={{fontSize: '.8em', color: '#ccc', margin: '0', position: 'absolute', top: '5px', left: '5px'}}>ID: {entity.id}</h4>
                <Label as='a' corner="right" onClick={handleLikeButtonClick}>
                    <Icon style={{cursor: 'pointer'}} name='thumbs up' color={liked ? 'teal' : null}/>
                </Label>
            </div>
            <div className='CardDetails'>
                
                <h3 className='CardName'>{entity.title}</h3>
                <p className='CardDescription'>{entity.description}</p>
                <div className='CardFrequencyContainer'>
                    <FontAwesomeIcon style={{marginRight:'6px'}} icon={faCalendarDay} color='#aaa'/>
                    <span className='CardFrequency'>{getFrequencyText(entity.frequency)}</span>
                </div>
            </div>
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
            basic
            size='small'
        >
            <Header icon='browser' content='Cookies policy' />
            <Modal.Content>
                <h3>You must be logged in to do that.</h3>
            </Modal.Content>
            <Modal.Actions>
            <Button color='green' onClick={() => setLoginPromptOpen(false)} inverted>
                <Icon name='checkmark'/> Got It
            </Button>
            </Modal.Actions>
      </Modal>
        <style jsx>{`
        .CardContainer {
            border: 1px solid #eee;
            border-radius: 2px;
            overflow: hidden;
            margin-bottom: 20px;
            box-shadow: 0 1px 2px rgba(0,0,0,.1);
            transition: all .15s;
            cursor:pointer;
            
        }
        .CardContainer i {
            z-index: 40;
        }
        .CardContainer:hover {
            transform: translateY(-3px);
            box-shadow: 0 2px 3px rgba(0,0,0,0.08);
        }
        .CardContainer:active {
            transform: translateY(0);
            box-shadow: 0 1px 2px rgba(0,0,0,.1);
        }
        .CardImageContainer {
            position: relative;
            height: 120px;
            overflow: hidden;
            background-image: url("${entity.imageUrl}");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 85%);
        }
        .CardLikeContainer {
            position: absolute;
            top: 10px;
            right: 10px;
            transform: translateX(-50%);
        }
        .CardCategory {
            position: absolute;
            bottom: 5px;
            left: 5px;
            display: inline-block;
            font-size: .9rem;
            line-height: 1;
            text-transform: uppercase;
            padding: 6px;
            background-color: #FFD700;
            border-radius: 5px;
            opacity: .9;
        }
        .CardStarToggle {
            position: absolute;
            bottom: 5px;
            right: 5px;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        .CardDetails {
            padding: 6px 10px;
        }
        .CardName {
            font-weight: 600;
            letter-spacing: 1px;
            margin-bottom: 5px;
        }
        .CardFrequencyContainer {
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        .CardFrequency {
            text-transform: uppercase;
            font-size: .8rem;
            font-weight: 200;
            letter-spacing: 1px;
            opacity: .9
        }
        .CardAuthorContainer {
            background-color: #f8f8f8;
            border-top: 1px solid #eee;
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
        `}</style>
    </>);
}

export default Card;