import React, { useState } from "react";
import styled from "styled-components";
import veg from "../../assets/veg-icon.png";
import nonVeg from "../../assets/non-veg.png";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  addItemToCart,
  removeItemFromCart,
} from "../../feature/consumer/CartSlice";
import { useDispatch,useSelector } from "react-redux";
const MenuItemWrapper = styled.div`
  border-top: 1px solid #ccc;
  padding: 1rem;
  height: 25vh;
  transition: transform 0.3s ease-in-out;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: start;
  text-align: left;
  padding-right: 16px;
`;

const RightColumn = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ItemImage = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 4px;
`;

const ItemName = styled.h3`
  margin-top: 8px;
`;

const Price = styled.p`
  margin-top: 8px;
  font-weight: bold;
`;

const VegetarianLabel = styled.img`
  margin-top: 8px;
  width: 15px;
  height: auto;
`;


const CountItem = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #45a049;
  border: 1px solid grey;
  width: 4rem;
  margin: -1rem 0 0 0;
  height:2rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
`;

const ReviewCart = ({
  restaurantId,
  itemId,
  itemName,
  price,
  description,
  itemImage,
  isVegetarian,
}) => 

{
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const foundItem = cart.items.find((item) => item.itemId === itemId);
  const handleAddToCart = () => {
    const newItem = {
      itemId,
      itemName,
      price,
      description,
      itemImage,
      isVegetarian,
    };
    dispatch(addItemToCart(newItem));
  };
  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(itemId));
  };
  return (
    <>
      <MenuItemWrapper style={{ width: "40vw" }}>
        <LeftColumn>
          <VegetarianLabel
            src={isVegetarian?veg:nonVeg}
            alt="Vegetarian"
          />
          <ItemName>{itemName}</ItemName>
          <Price>₹{price}</Price>
        </LeftColumn>
        <RightColumn>
          <ItemImage src={itemImage} alt={itemName} />
          <CountItem >
            <RemoveIcon
              style={{ cursor: "pointer", height: "18px", width: "18px" }}
              onClick={handleRemoveFromCart}
            >
              -
            </RemoveIcon>
            <div>{foundItem.count}</div>
            <AddIcon
              style={{ cursor: "pointer", height: "18px", width: "18px" }}
              onClick={handleAddToCart}
            >
              +
            </AddIcon>
          </CountItem>
        </RightColumn>
      </MenuItemWrapper>
    </>
  );
};

export default ReviewCart;
