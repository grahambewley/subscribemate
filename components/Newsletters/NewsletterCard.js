import React from 'react';
import CategoryIcon from '../_App/CategoryIcon';
import { Label, Icon} from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faThumbsUp, faCalendarDay} from '@fortawesome/free-solid-svg-icons';

const NewsletterCard = ({ newsletter }) => {
    const [liked, setLiked] = React.useState(false);

    function handleLikeButtonClick() {
        setLiked(!liked);
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

    return (<>
        <div className='CardContainer'>
            <div className='CardImageContainer'>
                <Label corner="right">
                    <Icon name='thumbs up' onClick={handleLikeButtonClick} color={liked ? 'teal' : null}/>
                </Label>
                {/*
                <div className='CardLikeContainer'>
                <span className="fa-layers fa-fw">
                    <FontAwesomeIcon size='2x' onClick={handleLikeButtonClick} icon={faCircle} color='white'/>
                    <FontAwesomeIcon size='2x' onClick={handleLikeButtonClick} icon={faThumbsUp} color={ liked ? '#00B5AD' : '#ccc'} transform='shrink-6' />
                </span>
                </div>
                */}
                {/*<CategoryIcon category={newsletter.categories[0]}/>*/}
            </div>
            <div className='CardDetails'>
                <h3 className='CardName'>{newsletter.name}</h3>
                <p className='CardDescription'>{newsletter.description}</p>
                <div className='CardFrequencyContainer'>
                    <FontAwesomeIcon style={{marginRight:'6px'}} icon={faCalendarDay} color='#aaa'/>
                    <span className='CardFrequency'>{getFrequencyText(newsletter.frequency)}</span>
                </div>
            </div>
            <div className='CardAuthorContainer'>
                { newsletter.authors.map((author) => {
                    return (
                        <div key={author.twitter_username} className='CardAuthor'>
                            <img className='CardAuthorImage' src={author.twitter_thumbnailUrl} />
                            <h4 className='CardAuthorName'>{author.name}</h4>
                            <h4 className='CardAuthorTwitterUsername'>{author.twitter_username}</h4>
                        </div>
                    );
                })}
            </div>
        </div>
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
            background-image: url("${newsletter.imageUrl}");
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
            grid-column: 2 / span 1;
            grid-row: 2 / span 1;
            margin: 0;
            opacity: .75;
        }
        `}</style>
    </>);
}

export default NewsletterCard;