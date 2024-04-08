import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RestaurantHome from '../pages/restaurant/RestaurantHome';
import RestaurantDetails from '../pages/restaurant/RestaurantDetails'
import RestaurantRegister from '../pages/restaurant/RestaurantRegister'


const Restaurant = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RestaurantHome />} />
        <Route path="/register" element={<RestaurantRegister/>} />
        <Route path="/details" element={<RestaurantDetails/>}/>
 
      </Routes>
    </>
  );
}

export default Restaurant;
