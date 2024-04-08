import React, { useState } from "react";
import Header from "../../components/Consumer/Header";
import RestaurantMenu from "../../components/Consumer/RestaurantMenu";
import MenuItem from "../../components/Restaurant/MenuItem";
import ItemCart from "../../components/Consumer/ItemCart";
import { useGetMenuItemQuery } from "../../firebase/firebaseRTKquery";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectVegFilter } from "../../feature/consumer/filterSlice";
import { useLocation } from "react-router-dom";

function RestaurantPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get("id");
  const { data: menuItem, error, isLoading } = useGetMenuItemQuery(id);

  const isVegOnly = useSelector(selectVegFilter);

  const items = menuItem?.items;

  const filteredItems = items?.filter((item) =>
  isVegOnly ? item.isVegetarian : true
);

  return (
    <>
      <Header />
      <RestaurantMenu />
      <Box sx={{ margin: "0 auto" }}>
        {filteredItems &&
          filteredItems.map((item, index) => (
            <MenuItem {...item} addBtn={true} key={index} />
          ))}
      </Box>
      <ItemCart />
    </>
  );
}

export default RestaurantPage;
