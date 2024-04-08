import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.png'
import headerImage from '../../assets/img.jpeg'


const Container = styled.div`
  /* background-image: url(${headerImage}); */
  position: sticky;
  top: -340px;
  z-index: 100;
  background-size: contain;
  background-position: right;
  background-repeat: no-repeat;
  background-color: #000000;
  height: 278px;

  & > div {
    margin-left: 8%;
    margin-right: 8%;
    padding-top: 3%;
    margin-bottom: 3%;
  }
`;

const Logo = styled.img`
  vertical-align: middle;
  border-style: none;
`;

const HelpText = styled.span`
  color: white;
  float: right;
  font-size: 20px;
`;

const Title = styled.h1`
  color: #ffffff;
  font-family: 'Open Sans';
  font-size: 54px;
  font-weight: bold;
  letter-spacing: 0;
`;

const Subtitle = styled.span`
  color: white;
  font-family: 'Open Sans';
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0;
`;

const StyledDivider = styled.div`
  background-color: #ffffff;
  margin-top: 41px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  border-bottom: 1px solid #979797;
`;

const Header = ({ title, subtitle, Image }) => {
  console.log(Image);
  return (
    <>
      <Container style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.5) 50%, transparent 50%), url(${Image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'right',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#000000',
        height: '100%',
        position: 'sticky',
        top: '-340px',
        zIndex: '100',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
      }}>
        <div >
          <div>
            <HelpText>Need Help? Contact Us: 080-45664746</HelpText>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Logo src={logo} />
            <div>
              <Title>{title}</Title>
              <Subtitle>{subtitle}</Subtitle>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Header