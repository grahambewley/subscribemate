import React from 'react';
import { Segment, Label } from 'semantic-ui-react';
import Container from './Container';
import { usePalette } from 'react-palette';

const Hero = ({ featured, triggerDetailModal }) => {
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

  

  const slides = featured.map((feature, index) => {
    return generateSlide(feature, index);
  });
  slides.push(generateSlide(featured[0]));

  function generateSlide(feature, index) {

    const { data } = usePalette(feature.imageUrl);
    const direction = Math.floor(Math.random()*360) + 'deg';
    console.log("Direction: ", direction);

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

    return (
      <div className='HeroSlide' key={index} onClick={() => triggerDetailModal(feature)}>
        <Container style={{minWidth: '100%'}}>
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

        <style jsx>{`
      .HeroSlide {
        position: relative;
        height: 100%;
        width: 100vw; 
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      .HeroSlide::before {
        content: '';
        position: absolute;
        z-index: -1;
        height: 100%;
        width: 100%;
        background-image: linear-gradient( 45deg,  ${data.vibrant}, ${data.muted});
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
        background-color: rgba(255,255,255,.3);
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
        font-size: .9rem;
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
        font-size: 1.2rem;
      }

      @media(max-width: 991px) {
        .FeatureImage {
          width: 50%;
        }
      }
      @media(max-width: 767px) {
        .DetailsContainer {
          flex-direction: column;
          align-items: flex-start;
        }
        .FeatureImage {
          align-self: flex-start;
          height: 150px;
          min-width: 100%;
          margin-right: 0;
          margin-bottom: 1rem;
        }
        .HeroSlide::before {
          animation: none;
        }
        .FeatureTitle {
          margin-bottom: 0;
        }
        .FeatureDescription {
          display: none;
        }
        .FeatureFrequency {
          display: none;
        }
      }
      `}</style>
      </div>
      
    );
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