import React from 'react';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';
import { Container, Icon } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const DetailModal = ({ user, likes, handleEntityLike, handleEntityUnlike, opened, entity, close }) => {
    const [liked, setLiked] = React.useState(false);
    
    React.useEffect(() => {
        if(opened && entity != undefined) {
            console.log("Opened, set the like button...");
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

    return(<>
        { opened ?
        <div className='Backdrop' onClick={handleBackdropClick}>
            <Container text>
            <div className='ModalContainer'>
                <div className='ModalClose' onClick={close}>
                    <FontAwesomeIcon style={{fontSize: '2rem'}} icon={faTimes} color='#ccc'/>
                </div>
                <div className='ModalDetails'>
                    <div className='ModalLeft'>
                        <div className='EntityImage'>
                            <div className='EntryLikeContainer' onClick={handleLikeButtonClick}>
                                <Icon className='CardLikeIcon' style={{cursor: 'pointer', margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }} name='thumbs up' color={liked ? 'teal' : "grey"}/>
                            </div>
                        </div>
                        { entity.websiteUrl && <a target='_blank' className='EntityButton' href={entity.websiteUrl}>Visit Website</a>  }
                    </div>
                    <div className='EntityDetailsContainer'>
                        
                        <span className='EntityTypeLabel'>{sectionNameFromId(entity.sectionId)}</span>
                        <h2 className='EntityName'>{entity.title}</h2>
                        <p className='EntityDescription'>{entity.description}</p>
                        <div className='AuthorContainer'>
                            { entity.authors.map((author) => {
                                return (
                                    <div key={author.authorTwitterUsername} className='Author'>
                                        <img className='AuthorImage' src={author.authorTwitterProfileImageUrl} />
                                        <h4 className='AuthorName'>{author.authorName}</h4>
                                        <a className='AuthorTwitterUsername' target='_blank' href={getTwitterProfileUrl(author.authorTwitterUsername)}><h4>@{author.authorTwitterUsername}</h4></a>
                                    </div>
                                );
                            })}
                        </div>
                        
                    </div>
                </div>
                
            </div>
            </Container>
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
                padding: 10px;
            }
            .ModalContainer {
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
                top: 1rem;
                right: 1rem;
                cursor: pointer;
                z-index: 5;
            }

            .ModalDetails {
                display: flex;
            }
            
            .EntityImage {
                min-height: 150px;
                min-width: 150px;
                border-radius: 10px;
                margin-right: 2rem;
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
                height: 25px;
                width: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .EntityTypeLabel {
                font-size: 1rem;
                text-transform: uppercase;
                font-weight: 200;
                letter-spacing: 1px;
                opacity: .9;
            }
            .EntityName {
                margin: 0;
                font-size: 2.4rem;
                margin-bottom: 1rem;
            }
            .EntityDescription {
                font-size: 1.2rem;
            }

            .AuthorContainer {
                display: flex;
                margin-bottom: 1rem;
            }
            .Author {
                border-radius: 10px;
                background-color: #f2f2f2;
                padding: 10px;
                display: grid;
                grid-template-columns: 36px 1fr;
                grid-template-rows: 1fr 1fr;
                grid-column-gap: 10px;
            }
            .Author:not(:last-child) {
                margin-right: 5px;
            }
            .AuthorImage {
                grid-column: 1 / span 1;
                grid-row: 1 / span 2;
                width: 100%;
                border-radius: 50%;
                border: 1px solid #ddd;
            }
            .AuthorName {
                grid-column: 2 / span 1;
                grid-row: 1 / span 1;
                margin: 0;
            }
            .AuthorTwitterUsername {
                color: inherit;
                grid-column: 2 / span 1;
                grid-row: 2 / span 1;
                margin: 0;
                opacity: .75;
            }
            .AuthorTwitterUsername:hover {
                text-decoration: underline;
            }

            .EntityButton {
                display: inline-block;
                padding: 8px 16px;
                border-radius: 200px;
                background-color: rgba(60,174,163);
                text-transform: uppercase;
                font-weight: 100;
                color: white;
                letter-spacing: 1px;
                transition: all .15s;
            }
            .EntityButton:hover {
                transform: translateY(-3px);
                box-shadow: 0 3px 6px rgba(0,0,0,.08);
                background-color: rgba(60,174,163, .9);
            }

            @media(max-width: 991px) {
                .ModalContainer {
                  width: 100%;
                }
                
              }
              @media(max-width: 767px) {
                .ModalContainer {
                    padding: 1.5rem;
                    padding-top: 3rem;
                }
                .ModalDetails {
                    flex-direction: column;
                }
                .EntityImage {
                    margin-right: 0;
                    margin-bottom: 1rem;
                }
                .EntityName {
                    margin: 0;
                    font-size: 1.8rem;
                    margin-bottom: 1rem;
                }
              }
            `}</style>
        </div>
        : null }

        
    </>);
}

export default DetailModal;