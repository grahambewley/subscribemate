import HeroCarousel from '../components/_App/HeroCarousel';
import HomeGrid from '../components/Index/HomeGrid';

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
            frequency: '7w',
            imageUrl: 'https://i.imgur.com/xNI9f9h.png',
            description: `The 5 best design links, every day.`,
            actionUrl: 'https://sidebar.io/'
        },
        {
            type: 'newsletter',
            name: 'This Week in Web Design & Development',
            twitter_username: '@css',
            authors: [
                {
                    name: 'CSS Tricks',
                    twitter_username: '@css',
                    twitter_thumbnailUrl: 'https://pbs.twimg.com/profile_images/1080202898372362240/akqRGyta_400x400.jpg',
                    twitter_profileUrl: 'https://twitter.com/css'
                }
            ],
            categories: ['design', 'development'],
            frequency: '1w',
            imageUrl: 'https://css-tricks.com/wp-content/uploads/2014/03/css-tricks-star.png',
            description: `Ever wonder to yourself: how do I stay up to date with all the new stuff in this fast-moving industry? We hope our newsletter is part of an answer to that for you.`,
            actionUrl: 'https://css-tricks.com/newsletters'
        }
    ];

    const topPodcasts = [];
    const topBlogs = [];

    return (<>
        <HeroCarousel featured={featured}></HeroCarousel>
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