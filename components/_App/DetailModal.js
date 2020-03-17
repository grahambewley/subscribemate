import React from 'react';
import { Icon, Modal, Header, Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCalendarDay,  } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import Container from './Container';
import CategoryIcon from './CategoryIcon';
import { FormButton } from './Form';

const DetailModal = ({ user, likes, handleEntityLike, handleEntityUnlike, opened, entity, close }) => {
    const [liked, setLiked] = React.useState(false);
    const [loginPromptOpen, setLoginPromptOpen] = React.useState(false);

    React.useEffect(() => {
        if(opened && entity != undefined) {
            setLiked(likes.includes(parseInt(entity.id)));
        }
    }, [opened]);

    function handleBackdropClick(e) {
        if(e.target == document.querySelector('.Backdrop')) {
            close();
        } else {
            return;
        }
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

    async function handleLikeButtonClick() {
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

    function getTwitterProfileUrl(username) {
        return ("https://www.twitter.com/" + username);
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

    return(<>
        { opened ?
        <div className='Backdrop' onClick={handleBackdropClick}>
            <Container>
            <div className='ModalContainer'>
                <div className='ModalClose' onClick={close}>
                    <FontAwesomeIcon style={{fontSize: '2.5rem'}} icon={faTimes} color='white'/>
                </div>
                <div className='ModalDetails'>
                    <div className='ModalLeft'>
                        <div className='EntityImage'>
                            <div className='EntryLikeContainer' onClick={handleLikeButtonClick}>
                                <Icon className='CardLikeIcon' style={{cursor: 'pointer', margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }} name='thumbs up' color={liked ? 'teal' : "grey"}/>
                            </div>
                        </div>
                        <div className={'EntityButtonRow'}>
                        { entity.twitterUsername && 
                            <a className={'EntityTwitterButton'} target='_blank' href={`https://www.twitter.com/${entity.twitterUsername}`}>
                                <FontAwesomeIcon icon={faTwitter} style={{fontSize: '1rem'}} color='white'/>
                            </a>
                        }
                        { entity.websiteUrl && 
                            <a target='_blank' href={entity.websiteUrl}>
                                <FormButton>
                                    Visit Website
                                </FormButton>
                            </a>
                        }
                        </div>

                    </div>
                    <div className='ModalRight'>
                        
                        <span className='EntityTypeLabel'>{sectionNameFromId(entity.sectionId)}</span>
                        <h2 className='EntityName'>{entity.title}</h2>
                        <div className='EntityCategoriesContainer'>
                            { entity.categories.map(category => {
                                return <CategoryIcon key={ category } category={ category }/>;
                            })}
                        </div>
                        <p className='EntityDescription'>{entity.description}</p>
                        <div className='ModalBottomRow'>
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
                            <div className='EntityFrequencyContainer'>
                                <FontAwesomeIcon style={{marginRight:'6px'}} icon={faCalendarDay} color='#aaa'/>
                                <span className='EntityFrequency'>{getFrequencyText(entity.frequency)}</span>
                            </div>
                            : null }
                        </div>
                    </div>
                </div>
                
            </div>
            </Container>

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
            .Backdrop {
                position: fixed;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: rgba(0,0,0,.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 200;
            }
            .ModalContainer {
                max-width: 768px;
                margin: 0 auto;
                background-color: white;
                padding: 2rem;
                border-radius: 10px;
                border: #ddd;
                position: relative;
                animation: fadeInUp .2s;
            }

            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: scale(.5);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
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

            .ModalDetails {
                display: grid;
                grid-template-columns: 3fr 5fr;
                grid-gap: 2rem;
            }
            .ModalLeft {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
            }
            .EntityImage {
                min-height: 150px;
                min-width: 150px;
                border-radius: 10px;
                width: 100%;
                margin-bottom: 1rem;
                background-image: url('${entity.imageUrl}');
                background-position: center;
                background-size: cover;
                position: relative;
            }
            .EntryLikeContainer {
                position: absolute;
                top: 5px;
                right: 5px;
                background-color: #f2f2f2;
                border-radius: 50%;
                height: 30px;
                width: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .EntityButtonRow {
                display: flex;
                align-items: center;
            }
            .EntityButtonRow > *:not(:last-child) {
                margin-right: 1rem;
            }
            .EntityTwitterButton {
                height: 2rem;
                width: 2rem;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #3daeac;
                transition: all .2s;
            }
            .EntityTwitterButton:hover {
                background-color: rgba(60,174,163,.75);
                transform: translateY(-3px);
                box-shadow: 0 2px 6px rgba(0,0,0,.2);
            }
            .EntityTypeLabel {
                font-size: 1rem;
                text-transform: uppercase;
                font-weight: 200;
                letter-spacing: 1px;
                opacity: .9;
                margin-left: 2px;
            }
            .EntityName {
                margin: 0;
                font-size: 2.4rem;
                margin-bottom: .5rem;
            }
            .EntityCategoriesContainer {
                margin-bottom: 1rem;
                display: flex;
            }
            .EntityDescription {
                font-size: 1.2rem;
            }

            .ModalBottomRow {
                display: grid;
                grid-template-columns: 1fr max-content;
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

            .EntityFrequencyContainer {
                grid-column: 2 / span 1;
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
            .EntityFrequency {
                text-transform: uppercase;
                font-weight: 200;
                letter-spacing: 1px;
                opacity: .9
            }

            @media(max-width: 767px) {
                .ModalContainer {
                    padding: 1.5rem;
                }
                .ModalDetails {
                    grid-template-columns: none;
                    grid-template-rows: 1fr min-content;
                }
                .ModalLeft {
                    margin-right: 0;
                    margin-bottom: 1rem;
                    align-items: flex-start;
                }
                .EntryLikeContainer {
                    left: 5px;
                    right: initial;
                    width: 35px;
                    height: 35px;
                }
                .EntityName {
                    margin: 0;
                    font-size: 1.8rem;
                    margin-bottom: 1rem;
                }
                .ModalBottomRow {
                    grid-template-columns: 1fr;
                    grid-template-rows: repeat(2, min-content);
                }
                .AuthorContainer {
                    grid-column: 1 / span 1;
                    grid-row: 1 / span 1;
                }
                .AuthorName {
                    font-size: 1.1rem;
                }
                .EntityFrequencyContainer {
                    grid-column: 1 / span 1;
                    grid-row: 2 / span 1;
                }

            }
            `}</style>
        </div>
        : null }
    </>);
}

export default DetailModal;