import { Container } from 'semantic-ui-react';
import PageGrid from '../components/Subpage/PageGrid';
import FilterStrip from '../components/_App/FilterStrip';
import Modal from '../components/_App/DetailModal';
import baseUrl from '../utils/baseUrl';
import baseCraftUrl from '../utils/baseCraftUrl';
import axios from 'axios';
import cookie from 'js-cookie';
import { parseCookies } from 'nookies';

const Podcasts = ({ user, topPodcasts, latestPodcasts, initLikes, initFeatured }) => {
    // ENTITIES STATE
    const [top, setTop] = React.useState(topPodcasts);
    const [latest, setLatest] = React.useState(latestPodcasts);
    const [likes, setLikes] = React.useState(initLikes);

    // FILTER STATE
    const [categories, setCategories] = React.useState([]);
    const [dateSpan, setDateSpan] = React.useState('this week');
    
    // DETAIL MODAL STATE
    const [detailModalOpen, setDetailModalOpen] = React.useState(false);
    const [detailModalEntity, setDetailModalEntity] = React.useState();

    // Initializing didMount as false
    const [didMount, setDidMount] = React.useState(false)
    // Setting didMount to true upon mounting
    React.useEffect(() => setDidMount(true), []);

    React.useEffect(() => {
        // checking for didMount keeps this from running on first render
        if(didMount) {
            // Send updated dateSpan and categories back to index.js for handling
            handleFilterChange(dateSpan, categories);    
        }
    }, [categories, dateSpan])

    function handleCategoryClick(category) {
        if(categories.includes(category)) {
            // If categories already includes this, remove it
            setCategories(categories.filter((element) => {
                return element != category
            }))
        } else {
            // Otherwise, add to categories
            setCategories(categories.concat(category))
        }
    }

    function handleDateSpanChange(e, { value }) {
        setDateSpan(value);
    }

    async function handleFilterChange(dateSpan, categories) {

        let daysToSearch = null;
        switch(dateSpan) {
            case 'this week':
                daysToSearch = 7;
                break;
            case 'this month': 
                daysToSearch = 30;
            default:
                break;
        }

        // Get array of top podcast IDs in order using last X days
        const apiTopUrl = `${baseUrl}/api/top`;
        const apiTopPayload = {
            params: { secId: 2, days: daysToSearch }
        };
        const apiTopResponse = await axios.get(apiTopUrl, apiTopPayload);

        // Request the entries matching these IDs from CMS, filtered by categories
        const topUrl = `${baseCraftUrl}/podcasts.json`;
        const topPayload = { params: new URLSearchParams({ id: apiTopResponse.data, categories: categories }) };
        const topResponse = await axios.get(topUrl, topPayload);

        // Request the latest podcasts, filtered by categories
        const latestUrl = `${baseCraftUrl}/podcasts/latest.json`;
        const latestPayload = { params: new URLSearchParams({ categories: categories }) };
        const latestResponse = await axios.get(latestUrl, latestPayload);

        setTop(topResponse.data.podcasts);
        setLatest(latestResponse.data.podcasts); 
    }

    async function handleEntityLike(entity) {
        // Add entity to likes array
        const newLikes = [...likes, parseInt(entity.id)];
        setLikes(newLikes);

        // Add like to the likes collection
        const url = `${baseUrl}/api/like`;
        const payload = { entity };
        const token = cookie.get('token');
        // Sending user token along with this reqest to only allow authorized users to like stuff
        const headers = { headers: { Authorization: token } };
        const userLikeResponse = await axios.post(url, payload, headers);
    }
    
    async function handleEntityUnlike(entity) {
        // Remove entity from likes array
        const newLikes = likes.filter(element => {
            return (element != parseInt(entity.id));
        });
        setLikes(newLikes);

        // Remove like from likes collection
        const url = `${baseUrl}/api/like`;
        const token = cookie.get('token');
        const entityId = entity.id;
        const payload = { 
            params: { entityId },
            headers: { Authorization: token } 
        };
        const userUnlikeResponse = await axios.delete(url, payload);
    }

    function triggerDetailModal(entity) {
        setDetailModalEntity(entity);
        setDetailModalOpen(true);
    }

    return (<>
        <Container>
            <div className='PageLayout'>
                <h1 className='Header'>Podcasts</h1>
                <FilterStrip 
                        categories={categories}
                        setCategories={setCategories}
                        handleCategoryClick={handleCategoryClick}
                        handleDateSpanChange={handleDateSpanChange} />
            
                <PageGrid 
                    user={user}
                    top={top}
                    latest={latest}
                    likes={likes} 
                    handleEntityLike={handleEntityLike}
                    handleEntityUnlike={handleEntityUnlike}
                    triggerDetailModal={triggerDetailModal}/>
            </div>
        </Container>
        
        <Modal 
            user={user}
            opened={detailModalOpen}
            close={() => setDetailModalOpen(false)}
            entity={detailModalEntity}
            likes={likes}
            handleEntityLike={handleEntityLike}
            handleEntityUnlike={handleEntityUnlike}
        />

        <style jsx>{`
        .PageLayout {
            display: grid;
            grid-gap: 1rem;
            margin-top: 4rem;
        }
        .Header {
            margin: 0;
        }

        @media (max-width: 767px) {
            .PageLayout {
                margin-top: 1rem;
            }
        }
        `}</style>
    </>);
}

Podcasts.getInitialProps = async ctx => {
    const topUrl = `${baseUrl}/api/top`;
    const topPodcastsPayload = {
        params: {
            secId: 2,
            days: 7
        }
    };
    
    // Get array of the top liked podcasts in the last 7 days from Mongo database
    const topPodcastsResponse = await axios.get(topUrl, topPodcastsPayload);
    // Get those podcasts from CMS
    const podcastsByIdUrl = `${baseCraftUrl}/podcasts.json`;
    const podcastsByIdPayload = { params: new URLSearchParams({ id: topPodcastsResponse.data }) };
    const podcastsByIdResponse = await axios.get(podcastsByIdUrl, podcastsByIdPayload);
    
    // Get most recently added podcasts from CMS
    const latestPodcastsUrl = `${baseCraftUrl}/podcasts/latest.json`;
    const latestPodcastsResponse = await axios.get(latestPodcastsUrl);

    // Get likes, to display appropriate thumbs-ups    
    const { token } = parseCookies(ctx);
    let likeArray;
    if(token) {
        const url = `${baseUrl}/api/like`;
        const payload = { headers: { Authorization: token } };
        const getLikesResponse = await axios.get(url, payload);
        likeArray = getLikesResponse.data.map(like => {
            return( like.entity );
        });
    } else {
        likeArray = [];
    }

    return {
        initLikes: likeArray,
        topPodcasts: podcastsByIdResponse.data.podcasts || [],
        latestPodcasts: latestPodcastsResponse.data.podcasts || [],
    }
}

export default Podcasts;