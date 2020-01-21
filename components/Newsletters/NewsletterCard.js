import React from 'react';
import { Icon } from 'semantic-ui-react';

const NewsletterCard = ({ newsletter }) => {
    const [liked, setLined] = React.useState(false);

    return (<>
        <div className='CardContainer'>
            <div className='CardImageContainer'>
                {/*<img className='CardImage' src={newsletter.imageUrl}/>*/}
                <span className='CardCategory'>{newsletter.categories[0]}</span>
                <button className='CardStarToggle'>
                    { liked ? <Icon size='large' name='star' color='grey'/> 
                    : <Icon size='large' name='star' color='yellow'/> }
                </button>
            </div>
            <div className='CardDetails'>
                <h3 className='CardName'>{newsletter.name}</h3>
                <p className='CardDescription'>{newsletter.description}</p>
            </div>
            <div className='CardAuthorContainer'>
                { newsletter.authors.map((author) => {
                    return (
                        <div className='CardAuthor'>
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
            border: 1px solid #ddd;
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 20px;
            box-shadow: 0 1px 3px 0 #d4d4d5;
            transition: all .3s;
            cursor:pointer;
        }
        .CardContainer:hover {
            transform: translateY(-3px);
            box-shadow: 0 2px 4px #d4d4d5;
        }
        .CardContainer:active {
            transform: translateY(0);
            box-shadow: 0 1px 3px 0 #d4d4d5;
        }
        .CardImageContainer {
            position: relative;
            height: 140px;
            overflow: hidden;
            background-image: url("${newsletter.imageUrl}");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
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
            padding: 10px;
        }
        .CardName {
            font-family: 'Heebo', sans-serif;
            font-weight: 600;
            letter-spacing: 1px;
        }
        .CardAuthorContainer {
            background-color: #f6f6f6;
            border-top: 1px solid #ddd;
            padding: 10px;
        }
        .CardAuthor {
            display: grid;
            grid-template-columns: 44px 1fr;
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