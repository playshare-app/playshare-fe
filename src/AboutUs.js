import React from 'react';
import About1 from './images/About-1.jpg';
import About2 from './images/About-2.png';
import About3 from './images/About-3.jpg';
import About4 from './images/About-4.jpeg';
import SpotifyPlayer from 'react-spotify-player';
import {
  AboutContainer,
  AboutH1,
  AboutWrapper,
  AboutCard,
  AboutIcon,
  AboutH2,
  AboutP
} from './AboutElements';

const size = {
  width: '200px',
  height: 100
};
const view = 'list'; // or 'coverart'
const theme = 'black'; // or 'white'

const About = () => {
  return (
    <AboutContainer id='About'>
      <AboutH1><img src="https://fontmeme.com/permalink/210312/407b56786f570c247f0fa751774d780e.png" alt="mexcellent-font" border="0"/></AboutH1>
      <AboutWrapper>
        <AboutCard>
          <AboutH2>Cierra McDonald</AboutH2>
          <AboutIcon src={About2} />
          <AboutP>
          Developer, plant mom, wanderer, dancing to the beat of her own drum. 
          </AboutP>
          <SpotifyPlayer
              uri='spotify:playlist:6kKjVT1ZPRx4GPGncIna4V'
              size={size}
              view={view}
              theme={theme}
            />
        </AboutCard>
        <AboutCard>
          <AboutH2>Claudia Mazariegos</AboutH2>
          <AboutIcon src={About1} />
          <AboutP>
          Software developer, beachgoer, usually somewhere basking in the sun. 
          </AboutP>
          <SpotifyPlayer
              uri='spotify:playlist:37i9dQZF1DWYs2pvwxWA7l'
              size={size}
              view={view}
              theme={theme}
            />
        </AboutCard>
        <AboutCard>
          <AboutH2>Katilyn Wiggins</AboutH2>
          <AboutIcon src={About3} />
          <AboutP>
          Developer, thrifter, crafter, easily lost on purpose. 
          </AboutP>
          <SpotifyPlayer
              uri='spotify:playlist:37i9dQZF1DWYzpSJHStHHx'
              size={size}
              view={view}
              theme={theme}
            />
        </AboutCard>
        <AboutCard>
          <AboutH2>Zina Mohamed</AboutH2>
          <AboutIcon src={About4} />
          <AboutP>
          Software developer, lover of all things sci-fi, somewhere eating mochi. 
          </AboutP>
          <SpotifyPlayer
              uri='spotify:playlist:2Mq3wk563SWgYwA7sIoQAA'
              size={size}
              view={view}
              theme={theme}
            />
        </AboutCard>
      </AboutWrapper>
    </AboutContainer>
  );
};

export default About;