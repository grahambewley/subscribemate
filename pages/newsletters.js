import HeroCarousel from '../components/_App/HeroCarousel';
import PageGrid from '../components/Subpage/PageGrid';

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

const Newsletters = () => {
    return (<>
        <HeroCarousel featured={featured}></HeroCarousel>
        <PageGrid/>
    </>);
}

export default Newsletters;