import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OrdersComponent from './OrdersComponent';
import MenuItem from './MenuItem';
import RestaurantDetailsComponent from './RestaurantDetailsComponent';
import { Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import AddItemsPopup from './AddItemsPopup';
import { useSelector } from 'react-redux';

const TabsContainer = styled.div`
  width: 80%;
  margin: 2rem 10%;
  box-sizing: border-box;
`;

const TabButton = styled.button`
  padding: 10px 15px;
  margin: 10px;
  background-color: transparent;
  color: ${(props) => (props.active ? 'grey' : '#000')};
  border: none;
  border-bottom: ${(props) => (props.active ? '2px solid grey' : '2px solid transparent')};
  cursor: pointer;
  outline: none;
  font-size: 2rem;
  font-weight: 800; 
  transition: border-bottom 0.3s;

  &:hover {
    border-bottom: ${(props) => (props.active ? '2px solid #1565c0' : '2px solid #f0f0f0')};
  }
`;

const AddItemButton = styled.div`
  display: flex;
  justify-content: end; 
  margin-right: 20%;
`;

const MenuItems = () => {
  const Items = useSelector((state) => state.AddItems.items)

  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
      <AddItemButton>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenPopup}>
          Add Items
        </Button>
      </AddItemButton>
      {Items.map((item, index) => (
        <MenuItem {...item} addBtn={false} key={index} />
      ))}
      {isPopupOpen && <AddItemsPopup open={isPopupOpen} onClose={handleClosePopup} />}
    </>
  )
}

const Tabs = ({restaurantData}) => {
  const [activeTab, setActiveTab] = useState('orders');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <TabsContainer>
      <TabButton active={activeTab === 'orders'} onClick={() => handleTabClick('orders')}>
        Orders
      </TabButton>
      <TabButton active={activeTab === 'menu'} onClick={() => handleTabClick('menu')}>
        Menu Items
      </TabButton>
      <TabButton active={activeTab === 'details'} onClick={() => handleTabClick('details')}>
        Restaurant Details
      </TabButton>

      {activeTab === 'orders' && <OrdersComponent />}
      {activeTab === 'menu' && <MenuItems />}
      {activeTab === 'details' && <RestaurantDetailsComponent restaurantData = {restaurantData}/>}
    </TabsContainer>
  );
};

export default Tabs;