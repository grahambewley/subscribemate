import HeroCarousel from '../components/_App/HeroCarousel';
import HomeGrid from '../components/Index/HomeGrid';
import baseUrl from '../utils/baseUrl';
import baseCraftUrl from '../utils/baseCraftUrl';
import axios from 'axios';
import { parseCookies } from 'nookies';

const Home = ({ likes, user, initNewsletters, initPodcasts, initBlogs, initLatest, initFeatured }) => {
    
    const [newsletters, setNewsletters] = React.useState(initNewsletters.slice(0,3));
    const [podcasts, setPodcasts] = React.useState(initPodcasts.slice(0,3));
    const [blogs, setBlogs] = React.useState(initBlogs.slice(0,3));
    const [latest, setLatest] = React.useState(initLatest.slice(0,3));
    const [nLoading, setNLoading] = React.useState(false);
    const [pLoading, setPLoading] = React.useState(false);
    const [bLoading, setBLoading] = React.useState(false);
    
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
        const topNewslettersResponse = await axios.get(topUrl, topNewslettersPayload);
        const topPodcastsResponse = await axios.get(topUrl, topPodcastsPayload);
        const topBlogsResponse = await axios.get(topUrl, topBlogsPayload);

        // Request the entries matching these IDs from CMS
        const nUrl = `${baseCraftUrl}/newsletters.json`;
        const pUrl = `${baseCraftUrl}/podcasts.json`;
        const bUrl = `${baseCraftUrl}/blogs.json`;
        
        const nPayload = { params: new URLSearchParams({ id: topNewslettersResponse.data, categories: categories }) };
        const pPayload = { params: new URLSearchParams({ id: topPodcastsResponse.data, categories: categories }) };
        const bPayload = { params: new URLSearchParams({ id: topBlogsResponse.data, categories: categories }) };

        /*
        const nResponse = await axios.get(nUrl, nPayload);
        const pResponse = await axios.get(pUrl, pPayload);
        const bResponse = await axios.get(bUrl, bPayload);
        
        setNewsletters(nResponse);
        setNewsletters(pResponse);
        setNewsletters(bResponse);
        */
    }

    return (<>
        <HeroCarousel featured={initFeatured}></HeroCarousel>

        <HomeGrid
            likes={likes}
            user={user}
            newsletters={newsletters}
            podcasts={podcasts}
            blogs={blogs}
            latest={latest}
            handleFilterChange={handleFilterChange}
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
    const topNewslettersResponse = await axios.get(topUrl, topNewslettersPayload);
    const topPodcastsResponse = await axios.get(topUrl, topPodcastsPayload);
    const topBlogsResponse = await axios.get(topUrl, topBlogsPayload);

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

    const newslettersByIdResponse = await axios.get(newslettersByIdUrl, newslettersByIdPayload);
    const podcastsByIdResponse = await axios.get(podcastsByIdUrl, podcastsByIdPayload);
    const blogsByIdResponse = await axios.get(blogsByIdUrl, blogsByIdPayload);
    const latestAllResponse = await axios.get(latestAllUrl);
    const featuredAllResponse = await axios.get(featuredAllUrl);

    /* If response is less than 3 entities long, fill array with new stuff
    if(newslettersByIdResponse.data.newsletters.length < 3) {
        // Get most recently added newsletters from CMS
        const latestNewslettersUrl = `${baseCraftUrl}/newsletters/latest.json`;
        const latestNewslettersResponse = await axios.get(latestNewslettersUrl);
    }
    */

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
        likes: likeArray,
        initNewsletters: newslettersByIdResponse.data.newsletters,
        initPodcasts: podcastsByIdResponse.data.podcasts,
        initBlogs: blogsByIdResponse.data.blogs,
        initLatest: latestAllResponse.data.data,
        initFeatured: featuredAllResponse.data.data
    }
}

export default Home;