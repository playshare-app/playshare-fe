
import { Link } from 'react-router-dom';

import Video from './videos/homepage.mp4';
import {
  HomeContainer,
  HomeBg,
  VideoBg,
  HomeContent,
  HomeH1,
  HomeP,
} from './HomeElements';

// nice work figuring out functional components!
function HomeSection() {
  

  
  return (
    <HomeContainer>
      <HomeBg>
        <VideoBg playsInline autoPlay loop muted src={Video} type='video/mp4' />
      </HomeBg>
      <HomeContent>
        <HomeH1><img src="https://fontmeme.com/permalink/210311/4af09c502652bb0a3c80d3db2939ea5b.png" alt='logo'/></HomeH1>
        <HomeP>
          Connecting developers, one playlist at a time.
        </HomeP>
        <Link to="/login" className="btn-primary"><img src="https://fontmeme.com/permalink/210311/fcb96cf24f54b8053fd629ac163dbc1a.png" alt="mexcellent-font" border="0"/></Link>
        <Link className="signup" to="/signup">Don't have an account? Sign Up Here!</Link>
      </HomeContent>
    </HomeContainer>
  );
}

export default HomeSection;