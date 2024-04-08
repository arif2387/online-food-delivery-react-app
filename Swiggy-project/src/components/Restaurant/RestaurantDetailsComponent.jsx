import React from 'react';
import { Button } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { signOutUser } from '../../firebase/firebaseConfig';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 60%;
  margin: 2rem auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InfoContainer = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const InfoText = styled.p`
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 10px;
`;

const Image = styled.img`
  max-width: 300px;
  height: auto;
  border-radius: 8px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const StyledButton = styled(Button)`
  && {
    background-color: #ff4081;
    color: #fff;

    &:hover {
      background-color: #d81b60;
    }
  }
`;

const RestaurantDetailsComponent = ({ restaurantData }) => {
  const navigate = useNavigate();

  const handleSignout = async () => {
    await signOutUser();
    navigate('/restaurant/register');
  };

  return (
    <Container>
      <Title>{restaurantData?.restaurantName}</Title>
      <Details>
        <InfoContainer>
          <InfoText><strong>Cuisine:</strong> {restaurantData?.cuisine}</InfoText>
          <InfoText><strong>City:</strong>{restaurantData?.city}</InfoText>
          <InfoText><strong>Location:</strong> {restaurantData?.restaurantLocation}</InfoText>
          <StyledButton onClick={handleSignout} variant="contained" endIcon={<LogoutIcon />}>
            Sign Out
          </StyledButton>
        </InfoContainer>
        <Image src={restaurantData?.image_url} alt="Restaurant" />
      </Details>
    </Container>
  );
};

export default RestaurantDetailsComponent;