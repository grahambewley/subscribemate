import { Container } from 'semantic-ui-react';

const Footer = () => {
    return (<>
        <div className='FooterContainer'>
            <Container>
                <h3></h3>
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
    `}</style>
    </>);
}

export default Footer;