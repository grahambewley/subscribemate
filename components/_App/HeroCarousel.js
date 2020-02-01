import React from 'react';
import { Container, Segment, Label } from 'semantic-ui-react';

const Hero = ({ featured }) => {
  const [displaySlide, setDisplaySlide] = React.useState(0);
  
  React.useEffect(() => {
    const wrapper = document.querySelector('.HeroWrapper');
    if(displaySlide == 0) {
      window.setTimeout(() => {
        wrapper.style.transition = 'all 0s';
        wrapper.style.transform = `translateX(-${displaySlide*100}vw)`;
      }, 1000);
      
    } else {
      wrapper.style.transition = 'all .4s';
      wrapper.style.transform = `translateX(-${displaySlide*100}vw)`;
    }
    
    // If we're on the last slide, jump immediately back to slide 0
    if(displaySlide == featured.length) {
      setDisplaySlide(0);
    } 
    // Otherwise, 
    else {
      window.setTimeout(() => setDisplaySlide(displaySlide+1), 10000);
    }
    
  }, [displaySlide]);

  const slides = featured.map(feature => {
    return generateSlide(feature);
  });
  slides.push(generateSlide(featured[0]));

  function generateSlide(feature) {
    function sectionNameFromId(sectionId) {
      switch(sectionId) {
        case '1':
            return 'Newsletter';
        case '2':
            return 'Podcast';
        case '3':
            return 'Blog';
      }
      return;
    }
    function getFrequencyText(shorthand) {
      // If the frequency is nothing, just return from this function
      if(!shorthand) {
          return;
      }
      if(shorthand === '7w'){
          return "Daily";
      } else {
        let text = '';
        const number = shorthand.slice(0, 1);
        const range = shorthand.slice(1);

        switch(number) {
            case '1':
                break;
            case '2':
                text += "Twice ";
                break;
            default: 
                text += number + ' Times ';
                break;    
        }

        switch(range) {
            case 'w':
                text += "Weekly";
                break;
            case 'm':
                text += "Monthly";
                break;
            default: 
                break;
        }
        return text;
      }
    }

    return (<>
      <div className='HeroSlide'>
        <Container>
          <div className='DetailsContainer'>
            <div className='FeatureImage'>
              
            </div>
            <div className='DetailsInnerContainer'>
              <span className='FeatureLabel'>Featured {sectionNameFromId(feature.sectionId)}</span>
              <h2 className='FeatureTitle'>{feature.title}</h2>
              <p className='FeatureDescription'>{feature.description}</p>
              {feature.frequency ? <p className='FeatureFrequency'>Released {getFrequencyText(feature.frequency)}</p> : null}
            </div>
          </div>
        </Container>

      </div>
      <style jsx>{`
      .HeroSlide {
        position: relative;
        height: 100%;
        width: 100vw; 
        display: flex;
        align-items: center;
      }
      .HeroSlide::before {
        content: '';
        position: absolute;
        z-index: -1;
        left: -50%;
        top: -50%;
        height: 200%;
        width: 200%;
        background-image: url('${feature.imageUrl}');
        background-position: center;
        background-size: cover;
        filter: contrast(175%) blur(85px) brightness(80%);
        animation: 15s filterShift ease-in-out infinite;
      }

      @keyframes filterShift {
        0% {
          filter: contrast(100%) blur(85px) brightness(80%) sepia(0);
          transform: translateX(-5%);
        }

        50% {
          filter: contrast(175%) blur(85px) brightness(80%) sepia(60%);
          transform: translateX(5%);
        }

        100% {
          filter: contrast(100%) blur(85px) brightness(80%) sepia(0);
          transform: translateX(-5%);
        }
      }
      .DetailsContainer {
        width: 100%;
        height: 100%;
        color: white;
        display: flex;
        align-items: center;
      }
      .FeatureImage {
        height: 250px;
        width: 33%;
        border-radius: 10px;
        margin-right: 2rem;
        background-image: url('${feature.imageUrl}');
        background-position: center;
        background-size: cover;
      }
      .FeatureLabel {
        display: inline-block;
        padding: 1px 6px;
        margin-bottom: 5px;
        border-radius: 200px;
        background-color: rgba(255,255,255,.2);
        font-size: .8rem;
        text-transform: uppercase;
        font-weight: 200;
        letter-spacing: 1px;
        opacity: .9;
      }
      .FeatureTitle {
        margin: 0;
        font-size: 2.4rem;
        margin-bottom: 1rem;
      }
      .FeatureFrequency {
        text-transform: uppercase;
        font-size: .8rem;
        position: relative;
        transform: translateX(calc(1.5rem + 2px));
      }
      .FeatureFrequency::before {
        content: '';
        position: absolute;
        height: 1px;
        width: 1.5rem;
        margin-right: 2px;
        background-color: white;
        left: 0;
        top: 50%;
        transform: translateX(calc(-100% - 2px));
      }
      .FeatureDescription {
        font-size: 1.1rem;
      }

      @media(max-width: 991px) {
        .FeatureImage {
          width: 50%;
        }
      }
      @media(max-width: 767px) {
        .DetailsContainer {
          flex-direction: column;
        }
        .FeatureImage {
          align-self: flex-start;
          height: 150px;
          margin-right: 0;
          margin-bottom: 1rem;
        }
        
      }
      `}</style>
    </>);
  }
  
  return (<>
    <div className='HeroContainer'> 
      <div className='HeroWrapper'>
        { slides }
      </div>
    </div>
    <style jsx>{`

    .HeroContainer {
      height: 40vh;
      border-bottom: 1px solid #eee;
      margin-bottom: 2rem;
      overflow: hidden;
    }
    .HeroWrapper {
      height: 100%;
      width: max-content;
      display: flex;
      overflow: hidden;
    }
    `}</style>
    </>);
}

export default Hero;