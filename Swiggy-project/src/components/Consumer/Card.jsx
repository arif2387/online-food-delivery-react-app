import React from 'react';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled.div`
  width: 20rem;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  transition: box-shadow 0.3s ease;
  overflow-wrap: break-word;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.7);
  }

  &:active {
    box-shadow: inset 0px 0px 4px rgba(2, 0, 0, 0.7);
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 15rem;
  border-radius: 1.5rem;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const CardTitle = styled.h1`
  font-size: 1.5rem;
  margin-top: 1rem;
`;

const RatingTime = styled.div`
  display: flex;
  align-items: center;
`;

const Card = (params) => {
  const navigate = useNavigate();
  return (
    <>
      <StyledCard className="card-container" onClick={()=> navigate(`/menu?name=${params?.name}&location=${params?.location}&cuisines=${params?.cuisines}&id=${params?.id}`)}>
        <ImgContainer className="img-container">
          <Img src={params.image} alt="" />
        </ImgContainer>
        <CardTitle>{params.name}</CardTitle>
        <RatingTime>
          {<StarPurple500Icon sx={{ color: 'green' }} />} {params.avgRating} - {params.deliveryTime}
        </RatingTime>
        <p>{params.cuisines}</p>
      </StyledCard>
    </>
  );
};

export default Card;
