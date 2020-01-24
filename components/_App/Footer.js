import { Container } from 'semantic-ui-react';

const Footer = () => {
    return (<>
        <div className='FooterContainer'>
            <Container>
                <h3>FOOTER CONTENT</h3>
            </Container>

        </div>

    <style jsx>{`
        .FooterContainer {
            position: absolute;
            bottom: 0;
            width: 100%;
            margin-top: 60px;
            background-color: #f7f7f7;
        }
    `}</style>
    </>);
}

export default Footer;