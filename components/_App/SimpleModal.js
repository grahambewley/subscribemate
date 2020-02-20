import SimpleButton from './SimpleButton';
import { CommentAction } from 'semantic-ui-react';

const SimpleModal = ({ title, body, buttons }) => {
    
    const buttons = buttons.map(button => {
        return <SimpleButton text={button.text} status={button.status} action={button.action} />;
    });

    return (
        <>
            <div className='Backdrop'>
                <div className='ModalContainer'>
                    <div className='ModalTitle'>
                        <h2>{ title }</h2>
                    </div>
                    <div className='ModalBody'>
                        <p>{ body }</p>
                    </div>
                    <div className='ModalActions'>
                        { buttons }
                    </div>
                </div>
            </div>

            <style jsx> {`
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
            .ModalContainer {
                position: relative;
                max-width: 640px;
                background-color: white;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0,0,0,.3);
                overflow: hidden;
                display: grid;
                grid-template-rows: min-content 1fr min-content;
            }
            .ModalTitle {
                background-color: #f0f0f0;
                padding: 1.5rem 2rem;
                border-bottom: 1px solid #eee;
            }
            .ModalBody {
                padding: 1.5rem 2rem 2rem 2rem;
                font-size: 1.2rem;
            }
            .ModalActions {
                padding: 1.5rem 2rem;
                display: flex;
                justify-content: flex-end;
            }
            `}</style> 
        </>
    )
}

export default SimpleModal;