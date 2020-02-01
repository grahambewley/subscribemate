import { Container } from 'semantic-ui-react';
import HeroCarousel from '../components/_App/HeroCarousel';
import PageGrid from '../components/Subpage/PageGrid';
import FilterStrip from '../components/_App/FilterStrip';
import baseUrl from '../utils/baseUrl';
import baseCraftUrl from '../utils/baseCraftUrl';
import axios from 'axios';
import { parseCookies } from 'nookies';

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

const Newsletters = ({ user, topNewsletters, latestNewsletters, likes }) => {
    const [categories, setCategories] = React.useState([]);
    const [dateSpan, setDateSpan] = React.useState('this week');

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

        const topUrl = `${baseUrl}/api/top`;

        const topNewslettersPayload = {
            params: { secId: 1, days: daysToSearch }
        };
        
        // Get arrays of the top liked newsletters, podcasts, and blogs in the last 7 days
        // e.g. ['230', '249', '206']
        const topNewslettersResponse = await axios.get(topUrl, topNewslettersPayload);

        // Request the entries matching these IDs from CMS
        const nUrl = `${baseCraftUrl}/newsletters.json`;
        
        const nPayload = { params: new URLSearchParams({ id: topNewslettersResponse.data, categories: categories }) };
        
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
        <HeroCarousel featured={featured}></HeroCarousel>
        <Container>
            <h1>Newsletters</h1>
            <FilterStrip 
                    categories={categories}
                    setCategories={setCategories}
                    handleCategoryClick={handleCategoryClick}
                    handleDateSpanChange={handleDateSpanChange} />
        
            <PageGrid 
                user={user}
                top={topNewsletters}
                latest={latestNewsletters}
                likes={likes} />
        </Container>
        
    </>);
}

Newsletters.getInitialProps = async ctx => {
    const topUrl = `${baseUrl}/api/top`;
    const topNewslettersPayload = {
        params: {
            secId: 1,
            days: 7
        }
    };
    
    // Get array of the top liked newsletters in the last 7 days from Mongo database
    const topNewslettersResponse = await axios.get(topUrl, topNewslettersPayload);
    // Get those newsletters from CMS
    const newslettersByIdUrl = `${baseCraftUrl}/newsletters.json`;
    const newslettersByIdPayload = { params: new URLSearchParams({ id: topNewslettersResponse.data }) };
    const newslettersByIdResponse = await axios.get(newslettersByIdUrl, newslettersByIdPayload);
    
    // Get most recently added newsletters from CMS
    const latestNewslettersUrl = `${baseCraftUrl}/newsletters/latest.json`;
    const latestNewslettersResponse = await axios.get(latestNewslettersUrl);

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
        likes: likeArray || [],
        topNewsletters: newslettersByIdResponse.data.newsletters || [],
        latestNewsletters: latestNewslettersResponse.data.newsletters || []
    }
}

export default Newsletters;