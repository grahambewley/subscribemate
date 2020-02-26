import { NextSeo } from 'next-seo';
import HeroCarousel from '../components/_App/HeroCarousel';
import HomeGrid from '../components/Index/HomeGrid';
import Modal from '../components/_App/DetailModal';
import baseUrl from '../utils/baseUrl';
import baseCraftUrl from '../utils/baseCraftUrl';
import axios from 'axios';
import cookie from 'js-cookie';
import { parseCookies } from 'nookies';

const Home = ({ initLikes, user, initNewsletters, initPodcasts, initBlogs, initLatest, initFeatured }) => {
    const [likes, setLikes] = React.useState(initLikes);    
    
    const [newsletters, setNewsletters] = React.useState(initNewsletters);
    const [displayedNewsletterCount, setDisplayedNewsletterCount] = React.useState(3);
    
    const [podcasts, setPodcasts] = React.useState(initPodcasts);
    const [displayedPodcastCount, setDisplayedPodcastCount] = React.useState(3);
    
    const [blogs, setBlogs] = React.useState(initBlogs);
    const [displayedBlogCount, setDisplayedBlogCount] = React.useState(3);
    
    const [latest, setLatest] = React.useState(initLatest.slice(0,3));

    const [detailModalOpen, setDetailModalOpen] = React.useState(false);
    const [detailModalEntity, setDetailModalEntity] = React.useState();
    
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

        const topUrl = `${baseUrl}/api/top`;

        const topNewslettersPayload = {
            params: { secId: 1, days: daysToSearch }
        };
        const topPodcastsPayload = {
            params: { secId: 2, days: daysToSearch }
        };
        const topBlogsPayload = {
            params: { secId: 3, days: daysToSearch }
        };
        // Get arrays of the top liked newsletters, podcasts, and blogs in the last 7 days
        // e.g. ['230', '249', '206']
        console.log("Running top newsletters (mongodb) GET request");
        const topNewslettersResponse = await axios.get(topUrl, topNewslettersPayload);
        console.log("Running top podcasts (mongodb) GET request");
        const topPodcastsResponse = await axios.get(topUrl, topPodcastsPayload);
        console.log("Running top blogs (mongodb) GET request");
        const topBlogsResponse = await axios.get(topUrl, topBlogsPayload);

        // Request the entries matching these IDs from CMS
        const nUrl = `${baseCraftUrl}/newsletters.json`;
        const pUrl = `${baseCraftUrl}/podcasts.json`;
        const bUrl = `${baseCraftUrl}/blogs.json`;
        
        const nPayload = { params: new URLSearchParams({ id: topNewslettersResponse.data, categories: categories }) };
        const pPayload = { params: new URLSearchParams({ id: topPodcastsResponse.data, categories: categories }) };
        const bPayload = { params: new URLSearchParams({ id: topBlogsResponse.data, categories: categories }) };
        
        console.log("Running top newsletters (Craft) GET request");
        const nResponse = await axios.get(nUrl, nPayload);
        console.log("Running top podcasts (Craft) GET request");
        const pResponse = await axios.get(pUrl, pPayload);
        console.log("Running top blogs (Craft) GET request");
        const bResponse = await axios.get(bUrl, bPayload);
        
        setNewsletters(nResponse.data.newsletters);
        setPodcasts(pResponse.data.podcasts);
        setBlogs(bResponse.data.blogs);
        
    }

    function triggerDetailModal(entity) {
        setDetailModalEntity(entity);
        setDetailModalOpen(true);
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
        console.log("Running axios 'like' post request");
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
        console.log("Running axios 'like' delete request");
        const userUnlikeResponse = await axios.delete(url, payload);
    }

    function handleLoadMoreNewsletters() {
        const newCount = displayedNewsletterCount + 3;
        setDisplayedNewsletterCount(newCount);
    }
    function handleLoadMorePodcasts() {
        const newCount = displayedNewsletterCount + 3;
        setDisplayedPodcastCount(newCount);
    }
    function handleLoadMoreBlogs() {
        const newCount = displayedNewsletterCount + 3;
        setDisplayedBlogCount(newCount);
    }

    return (<>
        <NextSeo
            title="FeedSeek &mdash; Discover Newsletters, Podcasts, and Blogs"
            description="Find and subscribe to new content from creators in the genres you care about. Discover thought leaders and trending authors to add to your feed. New sources added daily."
        />

        <HeroCarousel 
            featured={initFeatured} 
            triggerDetailModal={triggerDetailModal}
        />
        <HomeGrid
            user={user}
            likes={likes}
            
            handleEntityLike={handleEntityLike}
            handleEntityUnlike={handleEntityUnlike}
            
            newsletters={newsletters.slice(0,displayedNewsletterCount)}
            podcasts={podcasts.slice(0,displayedPodcastCount)}
            blogs={blogs.slice(0,displayedBlogCount)}
            
            handleLoadMoreNewsletters={handleLoadMoreNewsletters}
            handleLoadMorePodcasts={handleLoadMorePodcasts}
            handleLoadMoreBlogs={handleLoadMoreBlogs}
            
            latest={latest}
            
            handleFilterChange={handleFilterChange}
            triggerDetailModal={triggerDetailModal}
        />
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

Home.getInitialProps = async ctx => {
    const topUrl = `${baseUrl}/api/top`;
    const topNewslettersPayload = {
        params: {
            secId: 1,
            days: 7
        }
    };
    const topPodcastsPayload = {
        params: {
            secId: 2,
            days: 7
        }
    };
    const topBlogsPayload = {
        params: {
            secId: 3,
            days: 7
        }
    };
    // Get arrays of the top liked newsletters, podcasts, and blogs in the last 7 days
    // e.g. ['230', '249', '206']
    console.log("Running top newsletters (mongodb) GET request");
    const topNewslettersResponse = await axios.get(topUrl, topNewslettersPayload);
    console.log("Running top podcasts (mongodb) GET request");
    const topPodcastsResponse = await axios.get(topUrl, topPodcastsPayload);
    console.log("Running top blogs (mongodb) GET request");
    const topBlogsResponse = await axios.get(topUrl, topBlogsPayload);

    console.log("Top Newsletters Response = ", topNewslettersResponse.data);
    console.log("Top Podcasts Response = ", topPodcastsResponse.data);
    console.log("Top Blogs Response = ", topBlogsResponse.data);

    // Request the entries matching these IDs from CMS

    const newslettersByIdUrl = `${baseCraftUrl}/newsletters.json`;
    const podcastsByIdUrl = `${baseCraftUrl}/podcasts.json`;
    const blogsByIdUrl = `${baseCraftUrl}/blogs.json`;
    // Getting latest entries to display in sidebar
    const latestAllUrl = `${baseCraftUrl}/latest.json`;
    // Getting featured entries to display in hero carousel
    const featuredAllUrl = `${baseCraftUrl}/featured.json`;

    const newslettersByIdPayload = { params: new URLSearchParams({ id: topNewslettersResponse.data }) };
    const podcastsByIdPayload = { params: new URLSearchParams({ id: topPodcastsResponse.data }) };
    const blogsByIdPayload = { params: new URLSearchParams({ id: topBlogsResponse.data }) };

    console.log("Running top newsletters (Craft) GET request");
    const newslettersByIdResponse = await axios.get(newslettersByIdUrl, newslettersByIdPayload);
    console.log("Running top podcasts (Craft) GET request");
    const podcastsByIdResponse = await axios.get(podcastsByIdUrl, podcastsByIdPayload);
    console.log("Running top blogs (Craft) GET request");
    const blogsByIdResponse = await axios.get(blogsByIdUrl, blogsByIdPayload);
    console.log("Running latest entities (Craft) GET request");
    const latestAllResponse = await axios.get(latestAllUrl);
    console.log("Running featured entities (Craft) GET request");
    const featuredAllResponse = await axios.get(featuredAllUrl);

    // Get likes, to display appropriate thumbs-ups    
    const { token } = parseCookies(ctx);
    let likeArray;
    if(token) {
        const url = `${baseUrl}/api/like`;
        const payload = { headers: { Authorization: token } };
        console.log("Running likes (mongodb) GET request");
        const getLikesResponse = await axios.get(url, payload);
        likeArray = getLikesResponse.data.map(like => {
            return( like.entity );
        });
    } else {
        likeArray = [];
    }
    

    return {
        initLikes: likeArray,
        initNewsletters: newslettersByIdResponse.data.newsletters,
        initPodcasts: podcastsByIdResponse.data.podcasts,
        initBlogs: blogsByIdResponse.data.blogs,
        initLatest: latestAllResponse.data.data,
        initFeatured: featuredAllResponse.data.data
    }
}

export default Home;