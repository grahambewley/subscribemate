import Card from '../_App/Card';

const PageGrid = ({ user, top, latest, likes, triggerDetailModal, handleEntityLike, handleEntityUnlike }) => {

    const [displayedInRow, setDisplayedInRow] = React.useState(1);
    // Number 1 top entity is shown above sliding row, so we need to start with the second element
    const [startingTop, setStartingTop] = React.useState(1);
    const [startingLatest, setStartingLatest] = React.useState(0);

    React.useEffect(() => {
        calculateDisplayedInRow();
        window.addEventListener("resize", calculateDisplayedInRow.bind(this));
    }, []);

    function calculateDisplayedInRow() {
        const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if(vw > 1199) {
            setDisplayedInRow(4);
        } else if (vw > 991) {
            setDisplayedInRow(3);
        } else if (vw > 767) {
            setDisplayedInRow(2);
        } else {
            setDisplayedInRow(3);
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

    function handleTrendingBackClick() {
        if(startingTop > 1) {
            setStartingTop(startingTop - 1);
        }
    }
    function handleTrendingMoreClick() {
        if(startingTop + displayedInRow < top.length) {
            setStartingTop(startingTop + 1);
        }
    }
    function handleLatestBackClick() {
        if(startingLatest > 0) {
            setStartingLatest(startingLatest - 1);
        }
    }
    function handleLatestMoreClick() {
        if(startingLatest + displayedInRow < latest.length) {
            setStartingLatest(startingLatest + 1);
        }
    }

    return (<>
            { top.length >= 1 ?
            <div className='TrendingContainer'>
                <h2 className='TopTrendingHeader'>Trending</h2>
                <div className='TrendingInnerContainer'>
                    <div className='TopTrendingBox' onClick={() => triggerDetailModal(top[0])}>
                        <div className='TopTrendingLeft'>
                            <div className='TopTrendingImage' style={{backgroundImage: `url('${top[0].imageUrl}')`}}>
                                <div className='TopTrendingNumberOne'>
                                    <span>#1</span>
                                </div>
                            </div>
                        </div>
                        <div className='TopTrendingRight'>
                            <h2 className='TopTrendingTitle'>{top[0].title}</h2>
                            <p className='TopTrendingDescription'>{top[0].description}</p>
                            {top[0].frequency ? <p className='TopTrendingFrequency'>Released {getFrequencyText(top[0].frequency)}</p> : null}
                        
                            <div className='TopTrendingAuthorContainer'>
                                { top[0].authors.map((author) => {
                                    return (
                                        <div key={author.authorTwitterUsername} className='TopTrendingAuthor'>
                                            <img className='TopTrendingAuthorImage' src={author.authorTwitterProfileImageUrl} />
                                            <h4 className='TopTrendingAuthorName'>{author.authorName}</h4>
                                            <a className='TopTrendingAuthorTwitterUsername' target='_blank' href={getTwitterProfileUrl(author.authorTwitterUsername)}>@{author.authorTwitterUsername}</a>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    
                    { top.length > 1 ? <>
                    <div className='SlideControlRow'>
                        <div className='SlideControlLeft' onClick={handleTrendingBackClick}>
                            <img style={{transform: 'rotate(180deg)'}} className='SlideControlArrow' src='/static/arrow.svg'/>
                            <p className='SlideControlLabel'>Go Back</p>
                        </div>

                        <div className='SlideControlRight' onClick={handleTrendingMoreClick}>
                            <p className='SlideControlLabel'>Show More</p>
                            <img className='SlideControlArrow' src='/static/arrow.svg'/>
                        </div>
                    </div>
                    <div className='CardGrid'>
                        {top.slice(startingTop, startingTop+displayedInRow).map(entity => {
                            return (
                                <Card 
                                    preliked={likes.includes(parseInt(entity.id))} 
                                    user={user} 
                                    key={entity.title} 
                                    entity={entity} 
                                    triggerDetailModal={triggerDetailModal}
                                    handleEntityLike={handleEntityLike}
                                    handleEntityUnlike={handleEntityUnlike}/>
                            );
                        })}
                    </div>
                    </> : null }
                </div>
            </div> : null }

            { latest.length >= 1 ?
            <div className='LatestContainer'>
                <div className='SlideControlRow'>
                    <div className='SlideControlLeft' onClick={handleLatestBackClick}>
                        <img style={{transform: 'rotate(180deg)'}} className='SlideControlArrow' src='/static/arrow.svg'/>
                        <p className='SlideControlLabel'>Go Back</p>
                    </div>
                    <h3 className='SlideControlHeader'>Recently Added</h3>
                    <div className='SlideControlRight' onClick={handleLatestMoreClick}>
                        <p className='SlideControlLabel'>Show More</p>
                        <img className='SlideControlArrow' src='/static/arrow.svg'/>
                    </div>
                </div>
                <div className='CardGrid'>
                    {latest.slice(startingLatest, startingLatest+displayedInRow).map(entity => {
                        return (
                            <Card 
                                preliked={likes.includes(parseInt(entity.id))} 
                                user={user} 
                                key={entity.title} 
                                entity={entity} 
                                triggerDetailModal={triggerDetailModal}
                                handleEntityLike={handleEntityLike}
                                handleEntityUnlike={handleEntityUnlike}/>
                        );
                    })}
                </div>
            </div> : null }

    
        
        <style jsx>{`
        .TrendingContainer {
            margin-bottom: 6rem;
            background-color: rgba(61, 174, 172, .15);
            border-radius: 10px;
            box-shadow: 0 1px 1px rgba(0,0,0,.03),
                        0 2px 2px rgba(0,0,0,.03),
                        0 4px 4px rgba(0,0,0,.03);
            overflow: hidden;
        }

        .TopTrendingHeader {
            text-align: center;
            background-color: rgba(61, 174, 172,.12);
            border-bottom: 3px solid rgba(61, 174, 172,.1);
            padding: 1rem 0;
            margin: 0;
        }
        .TrendingInnerContainer {
            padding: 2rem;
        }
        .CardGrid {
            display: grid;
            grid-template-columns: repeat(${displayedInRow}, 1fr);
            grid-gap: 20px;
        }

        .TopTrendingBox {
            display: flex;
            cursor: pointer;
        }
        .TopTrendingLeft,
        .TopTrendingRight {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
        }
        .TopTrendingImage {
            height: 200px;
            width: 250px;
            background-size: cover;
            background-position: center;
            border-radius: 10px;
            margin-right: 2rem;
            position: relative;
        }
        .TopTrendingNumberOne {
            position: absolute;
            top: 5px;
            right: 5px;
            padding: 5px;
            height: 2rem;
            width: 2rem;
            border-radius: 50%;
            background-color: rgba(255,255,255,.8);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .TopTrendingNumberOne span {
            font-size: .9rem;
            font-weight: 600;
            opacity: .7;
            line-height: 1;
        }
        .TopTrendingTitle {
            margin-top: 0;
        }
        .TopTrendingDescription {
            font-size: 1.2rem;
        } 
        .TopTrendingFrequency {
            text-transform: uppercase;
            font-size: 1rem;
            opacity: .9;
            position: relative;
            transform: translateX(calc(1.5rem + 2px));
        }
        .TopTrendingFrequency::before {
            content: '';
            position: absolute;
            height: 1px;
            width: 1.5rem;
            margin-right: 2px;
            background-color: #222;
            left: 0;
            top: 50%;
            transform: translateX(calc(-100% - 2px));
        }

        .TopTrendingAuthorContainer {
            margin-top: 0;
            border-radius: 10px;
            background-color: rgba(255,255,255,.7);
            padding: 5px 10px 5px 5px;
        }
        .TopTrendingAuthor {
            display: grid;
            grid-template-columns: 24px 1fr;
            grid-template-rows: 1fr 1fr;
            grid-column-gap: 8px;
        }
        .TopTrendingAuthor:not(:last-child) {
            margin-bottom: 8px;
        }
        .TopTrendingAuthorImage {
            grid-column: 1 / span 1;
            grid-row: 1 / span 2;
            align-self: center;
            width: 100%;
            border-radius: 50%;
            border: 1px solid #edf2f2;
        }
        .TopTrendingAuthorName {
            grid-column: 2 / span 1;
            grid-row: 1 / span 1;
            margin: 0;
        }

        .TopTrendingAuthorTwitterUsername {
            color: inherit;
            grid-column: 2 / span 1;
            grid-row: 2 / span 1;
            margin: 0;
            opacity: .85;
        }
        .TopTrendingAuthorTwitterUsername:hover {
            text-decoration: underline;
        }

        .SlideControlRow {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin: 1rem 0;
        }
        .SlideControlHeader {
            font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
            letter-spacing: 1px;
            font-weight: 600;
            font-size: 1.8rem;
            margin: 0;
        }
        .SlideControlLeft,
        .SlideControlRight {
            display: flex;
            flex-grow: 1;
            align-items: center;
            cursor: pointer;
        }
        .SlideControlRight {
            justify-content: flex-end;
        }
        .SlideControlLabel {
            display: block;
            margin-bottom: 0;
            font-size: 1.2rem;
            font-weight: 300;
            letter-spacing: 1px;
            opacity: .7;
            font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
        }
        .SlideControlLeft .SlideControlLabel {
            margin-left: 8px;
        }
        .SlideControlRight .SlideControlLabel {
            margin-right: 8px;
        }
        .SlideControlArrow {
            max-height: 1rem;
        }

        @media (max-width: 767px) {
            .TrendingContainer {
                margin-bottom:0;
            }
            .TrendingInnerContainer {
                padding: 1rem;
            }
            .TopTrendingBox {
                flex-direction: column;
            }
            .TopTrendingImage {
                width: 100%;
                height: 125px;
                margin-bottom: 5px;
                margin-right: 0;
            }
            .SlideControlRow {
                margin-top: 1.5rem;
            }
            .CardGrid {
                grid-template-columns: none;
                grid-template-rows: repeat(${Math.min(displayedInRow, top.length-1)}, 1fr);
            }
            .SlideControlLeft,
            .SlideControlRight {
                display: none;
            }
        }
        `}</style>
    </>);
}

export default PageGrid;