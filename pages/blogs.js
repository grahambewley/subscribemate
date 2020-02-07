import { Container } from 'semantic-ui-react';
import HeroCarousel from '../components/_App/HeroCarousel';
import PageGrid from '../components/Subpage/PageGrid';
import FilterStrip from '../components/_App/FilterStrip';
import Modal from '../components/_App/DetailModal';
import baseUrl from '../utils/baseUrl';
import baseCraftUrl from '../utils/baseCraftUrl';
import axios from 'axios';
import cookie from 'js-cookie';
import { parseCookies } from 'nookies';

const Blogs = ({ user, topBlogs, latestBlogs, initLikes, initFeatured }) => {
    // ENTITIES STATE
    const [top, setTop] = React.useState(topBlogs);
    const [latest, setLatest] = React.useState(latestBlogs);
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

    function handleCategoryClick(e, { value }) {
        if(categories.includes(value)) {
            // If categories already includes this, remove it
            setCategories(categories.filter((element) => {
                return element != value
            }))
        } else {
            // Otherwise, add to categories
            setCategories(categories.concat(value))
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

        // Get array of top blog IDs in order using last X days
        const apiTopUrl = `${baseUrl}/api/top`;
        const apiTopPayload = {
            params: { secId: 1, days: daysToSearch }
        };
        const apiTopResponse = await axios.get(apiTopUrl, apiTopPayload);

        // Request the entries matching these IDs from CMS, filtered by categories
        const topUrl = `${baseCraftUrl}/blogs.json`;
        const topPayload = { params: new URLSearchParams({ id: apiTopResponse.data, categories: categories }) };
        const topResponse = await axios.get(topUrl, topPayload);

        // Request the latest blogs, filtered by categories
        const latestUrl = `${baseCraftUrl}/blogs/latest.json`;
        const latestPayload = { params: new URLSearchParams({ categories: categories }) };
        const latestResponse = await axios.get(latestUrl, latestPayload);

        setTop(topResponse.data.blogs);
        setLatest(latestResponse.data.blogs); 
    }

    async function handleEntityLike(entity) {
        // Add entity to likes array
        const newLikes = likes;
        newLikes.push(parseInt(entity.id));
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
        console.log("Triggering modal with entity:", entity);
        setDetailModalEntity(entity);
        setDetailModalOpen(true);
    }

    return (<>
        {/*
        <HeroCarousel featured={initFeatured}></HeroCarousel>
        */}
        <Container>
            <h1 style={{marginTop: '4rem'}}>Blogs</h1>
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
    </>);
}

Blogs.getInitialProps = async ctx => {
    const topUrl = `${baseUrl}/api/top`;
    const topBlogsPayload = {
        params: {
            secId: 2,
            days: 7
        }
    };
    
    // Get array of the top liked blogs in the last 7 days from Mongo database
    const topBlogsResponse = await axios.get(topUrl, topBlogsPayload);
    // Get those blogs from CMS
    const blogsByIdUrl = `${baseCraftUrl}/blogs.json`;
    const blogsByIdPayload = { params: new URLSearchParams({ id: topBlogsResponse.data }) };
    const blogsByIdResponse = await axios.get(blogsByIdUrl, blogsByIdPayload);
    
    // Get most recently added blogs from CMS
    const latestBlogsUrl = `${baseCraftUrl}/blogs/latest.json`;
    const latestBlogsResponse = await axios.get(latestBlogsUrl);

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

    // Getting featured entries to display in hero carousel
    const featuredAllUrl = `${baseCraftUrl}/featured.json`;
    const featuredAllResponse = await axios.get(featuredAllUrl);
    
    return {
        initLikes: likeArray,
        topBlogs: blogsByIdResponse.data.blogs || [],
        latestBlogs: latestBlogsResponse.data.blogs || [],
        initFeatured: featuredAllResponse.data.data
    }
}

export default Blogs;