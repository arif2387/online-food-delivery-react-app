import React, { useState } from "react";
import styled from "styled-components";
import veg from "../../assets/veg-icon.png";
import nonVeg from "../../assets/non-veg.png";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { deleteMenuItem } from "../../firebase/firestoreServices";
import { deleteItem } from "../../feature/restaurant/RestaurantHomeSlice";
import { removeItem } from "../../feature/restaurant/DeleteItemSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import EditItem from "./EditItem";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../feature/consumer/CartSlice";


const MenuItemWrapper = styled.div`
  border-top: 1px solid #ccc;
  padding: 16px;
  margin: 16px auto;
  width: 60%;
  min-height: 10rem;
  transition: transform 0.3s ease-in-out;
  display: flex;
  justify-content: space-between;

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

const Description = styled.p`
  margin-top: 8px;
`;

const VegetarianLabel = styled.img`
  margin-top: 8px;
  width: 20px;
  height: auto;
`;

const AddButton = styled.button`
  background-color: #fff;
  display: flex;
  justify-content: space-evenly;
  color: #45a049;
  margin: -1rem 0 0 0;
  padding: 0.5rem 1.5rem;
  border: 1px solid grey;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
    color: #fff;
  }

  &:active {
    background-color: #39843e;
    color: #fff;
  }
`;
const CountItem = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #45a049;
  border: 1px solid grey;
  width: 4vw;
  margin: -1rem 0 0 0;
  border-radius: 4px;
  height: 2rem;
  transition: background-color 0.3s ease;
`;

const MenuItem = ({
  addBtn,
  restaurantId,
  itemId,
  itemName,
  price,
  description,
  itemImage,
  isVegetarian,
}) => {
  const dispatch = useDispatch();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
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

  const foundItem = cart.items.find((item) => item.itemId === itemId);
  console.log(foundItem);
  let totalCount = 0;
  if (cart != undefined)
    totalCount = cart.items.reduce((sum, item) => sum + item.count, 0);

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleEdit = async () => {
    setPopupOpen(true);
  };
   

  const handleDelete = async () => {
    try {
      dispatch(deleteItem(itemId));
      dispatch(removeItem(true));
      setTimeout(()=>{
        dispatch(removeItem(false));
      },2000)
      await deleteMenuItem(restaurantId, itemId);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  return (
    <>
      {isPopupOpen && (
        <EditItem
          itemId={itemId}
          itemName={itemName}
          description={description}
          isVegetarian={isVegetarian}
          price={price}
          image={itemImage}
          open={isPopupOpen}
          onClose={handleClosePopup}
        />
      )}
      <MenuItemWrapper>
        <LeftColumn>
          <VegetarianLabel
            isVegetarian={isVegetarian}
            src={isVegetarian?veg:nonVeg}
            alt="Vegetarian"
          />
          <ItemName>{itemName}</ItemName>
          <Price>₹{price}</Price>
          <Description>{description}</Description>
        </LeftColumn>
        <RightColumn>
          {!addBtn && (
            <Box>
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            </Box>
          )}
          <ItemImage src={itemImage} alt={itemName} />
          {addBtn && !foundItem && (
            <AddButton onClick={handleAddToCart}>ADD</AddButton>
          )}
          {foundItem && foundItem.count > 0 && (
            <CountItem>
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
          )}
        </RightColumn>
      </MenuItemWrapper>
    </>
  );
};

export default MenuItem;
