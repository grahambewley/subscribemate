import { Container, Segment, Label } from 'semantic-ui-react';
import BigButton from './BigButton';

const Hero = () => {
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
      imageUrl: 'https://i0.wp.com/softwareengineeringdaily.com/wp-content/uploads/2019/10/IndieHackers.jpg',
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
  ]

  const featuredPanes = featured.map((feature) => {
    return (
      <div className='FeatureContainer' style={{backgroundImage: `/static/patterns/${feature.backgroundPattern}.png`}}>
        <Container>
          <div className='FeatureContentContainer'>
            {/*<img className='FeatureImage' src={feature.imageUrl} />*/}
            <div className='FeatureDetails'>
              <span>Featured {feature.type}</span>
              <h2>{feature.name}</h2>
            </div>
          </div>

        </Container>
      </div>
    );
  })
  
  return (<>
    <div className='HeroContainer'> 
      <div className='HeroSlide'>
        <Container style={{height: '100%'}}>
          
        </Container>
        
      </div>
    {/*{ featuredPanes }*/}

    </div>
    <style jsx>{`

    .HeroContainer {
      height: 35vh;
      border-bottom: 1px solid #eee;
      margin-bottom: 2rem;
    }
    .HeroSlide {
      position: relative;
      overflow: hidden;
      height: 100%;
      padding: 4rem 0;
      display: flex;
      align-items: center;
    }
     
    .HeroSlide::before {
      content: '';
      position: absolute;
      height: calc(100% + 10px);
      width: calc(100% + 70px);
      top: -5px;
      left: -35px;
      background-image: url('https://i0.wp.com/softwareengineeringdaily.com/wp-content/uploads/2019/10/IndieHackers.jpg');
      background-position: center;
      background-size: cover;
      filter: brightness(50%) blur(3px);
      z-index: -1;
      animation: 10s slideLeftRight linear;
    }

    @keyframes slideLeftRight {
      from {
        transform: translateX(-30px);
      }
      to {
        transform: translateX(30px);
      }
    }

    .HeroSlideInner {
      height: 100%;
      width: 100%;
      display:flex;
      align-items: center;
    }
    .HeroSlideImageContainer {
      height: 100%;
      width: 360px;
      background-image: url('https://pbs.twimg.com/media/EJ-OiPSXkAArawg?format=jpg&name=4096x4096');
      background-size: cover;
      background-position: center;
      margin-right: 20px;
    }
    .HeroSlideImage {
      height: 100%;
    }
    .HeroSlideLabel {
      text-transform: uppercase;
      font-family: 'Heebo', sans-serif;
      font-weight: 400;
      letter-spacing: 2px;
    }
    .HeroSlideName {
      margin: 10px 0;
    }
    .HeroSlideDescription {
      margin-bottom: 20px;
    }
    .FeatureContentContainer {
      display: flex;
    }
    .FeatureDetails {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    `}</style>
    </>);
}

export default Hero;