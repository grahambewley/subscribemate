import Hero from '../components/Index/Hero';
import HomeGrid from '../components/_App/HomeGrid';
const Home = () => {
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

    const topNewsletters = [
        {
            type: 'newsletter',
            name: 'Indie Hackers',
            twitter_username: '@indiehackers',
            authors: [
                {
                    name: 'Courtland Allen',
                    twitter_username: '@csallen',
                    twitter_thumbnailUrl: 'https://pbs.twimg.com/profile_images/1086465027949776896/yJffWzR9_400x400.jpg',
                    twitter_profileUrl: 'https://twitter.com/csallen?s=20'
                }
            ],
            categories: ['entrepreneurship'],
            frequency: '3w',
            imageUrl: 'https://pbs.twimg.com/media/EJ-OiPSXkAArawg?format=jpg&name=4096x4096',
            description: `We compile the top interviews, posts, and articles for the week in each issue, as determined by what the community is upvoting.`,
            actionUrl: 'https://www.indiehackers.com/newsletters'
        },
        {
            type: 'newsletter',
            name: 'Sidebar',
            twitter_username: '@SidebarIO',
            authors: [
                {
                    name: 'Sacha Greif',
                    twitter_username: '@sachagrief',
                    twitter_thumbnailUrl: 'https://pbs.twimg.com/profile_images/2487116271/j8ehsrukq7v6bh6tswfc_400x400.png',
                    twitter_profileUrl: 'https://twitter.com/SachaGreif?s=20'
                }
            ],
            categories: ['design'],
            frequency: '1d',
            imageUrl: 'https://i.imgur.com/xNI9f9h.png',
            description: `The 5 best design links, every day.`,
            actionUrl: 'https://sidebar.io/'
        }
    ];

    const topPodcasts = [];
    const topBlogs = [];

    return (<>
        <Hero featured={featured}></Hero>
        <HomeGrid
            topNewsletters={topNewsletters}
            topPodcasts={topPodcasts}
            topBlogs={topBlogs}    
        />

    </>);
}

// GET INITIAL PROPS
// Get featured
// Get top newsletters, pods, etc.
export default Home;