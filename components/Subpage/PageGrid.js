import Card from '../_App/Card';
import { Container } from 'semantic-ui-react';

const PageGrid = ({ user, top, latest, likes }) => {
    return (<>
        
        <Container>
            <h2 className='SectionHeader'>Trending Now</h2>
            <div className='CardGrid' style={{marginBottom:'2rem'}}>
                {top.map(entity => {
                    return (
                        <Card preliked={likes.includes(parseInt(entity.id))} user={user} key={entity.title} entity={entity} />
                    );
                })}
            </div>

            <h2 className='SectionHeader'>Recently Added</h2>
            <div className='CardGrid'>
                {latest.map(entity => {
                    return (
                        <Card preliked={likes.includes(parseInt(entity.id))} user={user} key={entity.title} entity={entity} />
                    );
                })}
            </div>
        </Container>
    
        
        <style jsx>{`
        .SectionHeader {
            margin: 0;
            margin-bottom: 1rem;
        }
        .CardGrid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
            grid-gap: 16px;
        }
    
        
        `}</style>
    </>);
}

export default PageGrid;