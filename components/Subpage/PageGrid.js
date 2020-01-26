import RecommendedRow from './RecommendedRow';
import { Container } from 'semantic-ui-react';

const PageGrid = () => {
    return (<>
        <div className='RecommendedContainer'>
            <Container>
                <h2>Recommended For You:</h2>
                <RecommendedRow/>
            </Container>
        </div>
        <Container>
            

        </Container>

        <style jsx>{`
        .RecommendedContainer {
            background-color: #f7f7f7;
            padding: 2rem 0;
        }
        `}</style>
    </>);
}

export default PageGrid;