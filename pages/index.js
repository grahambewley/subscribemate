import HeroCarousel from '../components/_App/HeroCarousel';
import HomeGrid from '../components/Index/HomeGrid';
import baseUrl from '../utils/baseUrl';
import baseCraftUrl from '../utils/baseCraftUrl';
import axios from 'axios';
import { parseCookies } from 'nookies';

const Home = ({ likes, user, initNewsletters, initPodcasts, initBlogs }) => {
    
    const [newsletters, setNewsletters] = React.useState(initNewsletters);
    const [podcasts, setPodcasts] = React.useState(initPodcasts);
    const [blogs, setBlogs] = React.useState(initBlogs);
    
    const featured = [
        {
            type: 'newsletter',
            name: 'Indie Hackers',
            twitter: '@indiehackers',
            authors: [
                {
                    name: 'Courtland Allen',
                    twitter: '@csallen'
                }
            ],
            categories: ['entrepreneurship'],
            frequency: '3w',
            backgroundPattern: 'funky-lines',
            imageUrl: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwj-gJnO15PnAhXJaM0KHdhuAAwQjRx6BAgBEAQ&url=https%3A%2F%2Ftwitter.com%2Findiehackers&psig=AOvVaw3Ebn2Y5Vy9XCJFjSW-nWi9&ust=1579661444770048',
            description: `We compile the top interviews, posts, and articles for the week in each issue, as determined by what the community is upvoting. We don't include sponsored links, advertisements, or direct requests.`,
            actionUrl: 'https://www.indiehackers.com/newsletters'
        },
        {
            type: 'podcast',
            name: 'Shop Talk Show',
            authors: [
                {
                    name: 'Dave Rupert',
                    twitter: '@davatron5000'
                },
                {
                    name: 'Chris Coyier',
                    twitter: '@chriscoyier'
                }
            ],
            categories: ['design', 'development'],
            frequency: '1w',
            backgroundPattern: 'doodles',
            imageUrl: 'https://is3-ssl.mzstatic.com/image/thumb/Podcasts113/v4/01/f1/9f/01f19f03-a486-8a03-289b-65e728c3a741/mza_2487052099784590113.png/268x0w.png',
            description: `A podcast about building websites starring Dave Rupert and Chris Coyier. Development, design, performance, accessibility, tooling, a little bit of everything!`,
            actionUrl: 'https://shoptalkshow.com/'
        }
    ];

    function handleFilterChange(dateSpan, categories) {
        console.log("Date span to use is", dateSpan);
        console.log("Categories to filter on are", categories);
    }

    return (<>
        <HeroCarousel featured={featured}></HeroCarousel>

        <HomeGrid
            likes={likes}
            user={user}
            newsletters={newsletters}
            podcasts={podcasts}
            blogs={blogs}
            handleFilterChange={handleFilterChange}
        />
    </>);
}

// GET INITIAL PROPS
Home.getInitialProps = async ctx => {
    // Get top newsletters from 7 days to display
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
    
    const newslettersByIdPayload = { params: new URLSearchParams({ id: topNewslettersResponse.data }) };
    const podcastsByIdPayload = { params: new URLSearchParams({ id: topPodcastsResponse.data }) };
    const blogsByIdPayload = { params: new URLSearchParams({ id: topBlogsResponse.data }) };

    const newslettersByIdResponse = await axios.get(newslettersByIdUrl, newslettersByIdPayload);
    const podcastsByIdResponse = await axios.get(podcastsByIdUrl, podcastsByIdPayload);
    const blogsByIdResponse = await axios.get(blogsByIdUrl, blogsByIdPayload);

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
        initBlogs: blogsByIdResponse.data.blogs
    }
}
    

// Get featured
// Get top newsletters, pods, etc.
export default Home;