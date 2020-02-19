import { Container } from 'semantic-ui-react';

const Footer = () => {
    return (<>
        <div className='FooterContainer'>
            <Container>
                <div className='FooterList'>
                    <p>Built by <a href='https://www.twitter.com/tweetsbygraham' target="_blank">Graham Bewley</a></p>
                </div>
            </Container>

        </div>

    <style jsx>{`
        .FooterContainer {
            bottom: 0;
            width: 100%;
            padding: 3rem 0;
            margin-top: 6rem;
            background-color: #e3e3e3;
        }
        .FooterList {
            display: flex;
            justify-content: center;
        }
    `}</style>
    </>);
}

export default Footer;