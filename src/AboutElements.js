import styled from 'styled-components';

// STYLED COMPONENTS! so cool, nice work figuring this out
export const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AboutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-itments: center
`;

export const AboutCard = styled.div`
  background: rgba(242,34,255, 0.3);
  margin: 50px;
  width: 200px;
  height: auto;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  box-shadow: rgba(140,30,255, 0.4) -5px 5px, rgba(242,34,255, 0.3) -10px 10px, rgba(255,41,117, 0.2) -15px 15px, rgba(255,144,31, 0.1) -20px 20px, rgba(255,211,25, 0.05) -25px 25px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export const AboutIcon = styled.img`
  height: 100px;
  width: 100px;
  margin-bottom: 10px;
  border-radius: 50px;
  opacity: 0.8;
  margin: 10px;
`;

export const AboutH1 = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 64px;
`;

export const AboutH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
  color: #fff;
`;

export const AboutP = styled.p`
  font-size: 1rem;
  text-align: center;
  color: #fff;
  margin: 10px;
`;