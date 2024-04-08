import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card';
import data from '../../data.json';
import { useNavigate } from 'react-router-dom';
import { useGetAllRestaurantsQuery} from '../../firebase/firebaseRTKqueryRestaurants'
import CardSkeleton from './CardSkeleton';

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 3rem auto;
  padding: 0 3rem 0 3rem;
`;

const RestaurantContainer = styled.div`
  box-sizing: border-box;
  margin:0 auto;
  padding: 0 3rem 0 3rem;
`;


const FoodCardsContainer = styled.div`
  width: 100%;
  margin: 2rem auto;
  display: flex;
  align-items: baseline;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 1.3rem;
`;

const Body = () => {
  const { data: restaurants, error, isLoading } = useGetAllRestaurantsQuery();

  return (
    <Container>
      <RestaurantContainer>
      <h1>Restaurants with online food delivery in Bangalore</h1>
        <FoodCardsContainer>
         
          { isLoading ? <CardSkeleton/>
          :restaurants&&restaurants.map((hotel) => (
            <Card
              key={hotel?.restaurant_id}
              image={hotel?.image_url}
              cuisines={hotel?.cuisine}
              location={hotel?.restaurantLocation}
              name={hotel?.restaurantName}
              avgRating={4.4}
              deliveryTime={hotel?.info?.sla?.slaString || '10 mins'}
              id={hotel?.restaurant_id}
            />
          ))}
        </FoodCardsContainer>
      </RestaurantContainer>
    </Container>
  );
};

export default Body;
