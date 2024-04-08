import React, { useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import { Search as SearchIcon } from "@mui/icons-material";
import image1 from "../../assets/SearchCuisines/Screenshot from 2023-12-10 10-48-22.png";
import image2 from "../../assets/SearchCuisines/Screenshot from 2023-12-10 10-49-33.png";
import image3 from "../../assets/SearchCuisines/Screenshot from 2023-12-10 10-49-00.png";
import image4 from "../../assets/SearchCuisines/Screenshot from 2023-12-10 10-49-09.png";
import image5 from "../../assets/SearchCuisines/Screenshot from 2023-12-10 10-49-16.png";
import image6 from "../../assets/SearchCuisines/Screenshot from 2023-12-10 10-49-25.png";
import { useGetAllRestaurantsQuery } from "../../firebase/firebaseRTKqueryRestaurants";

const Container = styled.div`
  position: relative;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  min-width: 1240px;
`;
const FieledContainer = styled.div`
  width: 100%;
  z-index: 2;
  background-color: #fff;
  padding-bottom: 8px;
`;
const FieledContainer2 = styled.div`
  padding: 0;
  background: #fff;
  height: 48px;
  overflow: hidden;
  border-bottom: 1px solid rgba(40, 44, 63, 0.2);
  width: 860px;
  margin: 0 auto 8px;
  border: 1px solid rgba(40, 44, 63, 0.3);
  border-radius: 3px;
`;
const FieledContainer3 = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  width: 95%;
  padding-right: 25px;
  padding-left: 23px;
  justify-content: center;
`;
const Input = styled.input`
  font-size: 1.15rem;
  line-height: 24px;
  width: 100%;
  height: 100%;
  outline: 0;
  border: none;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: inherit;
  color: inherit;
  background: inherit;
  vertical-align: middle;
  font-weight: 500;
`;

const Cusine = styled.div`
  position: relative;
  min-height: calc(100vh - 70px);
  width: 860px;
  margin: 0 auto;
  padding-left: 10px;
`;

const Text = styled.div`
  font-size: 1.43rem;
  font-weight: bolder;
  color: #383c4b;
  letter-spacing: -0.3px;
  font-family: sans-serif;
  margin-top: 15px;
`;
function Search() {
  const [searchInput, setSearchInput] = useState("");
  const { data: restaurants, error, isLoading } = useGetAllRestaurantsQuery();

  function handleSearchInputChange(event) {
    setSearchInput(event.target.value);
  }

  let filteredRestaurants;
  if (restaurants != undefined) {
    filteredRestaurants = restaurants.filter((restaurant) =>
      restaurant.restaurantName
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );
  }
  return (
    <>
      <Container>
        <FieledContainer>
          <FieledContainer2>
            <FieledContainer3>
              <Input
                placeholder="Search for restaurants and food"
                value={searchInput}
                onChange={handleSearchInputChange}
              ></Input>
              <SearchIcon></SearchIcon>
            </FieledContainer3>
          </FieledContainer2>
        </FieledContainer>

        <Cusine>
          <div>
            <Text>Popular Cuisines</Text>
          </div>
          <img style={{ cursor: "pointer" }} src={image1}></img>
          <img style={{ cursor: "pointer" }} src={image2}></img>
          <img style={{ cursor: "pointer" }} src={image3}></img>
          <img style={{ cursor: "pointer" }} src={image4}></img>
          <img style={{ cursor: "pointer" }} src={image5}></img>
          <img style={{ cursor: "pointer" }} src={image6}></img>
          {filteredRestaurants && restaurants && restaurants.length!=filteredRestaurants.length &&
            filteredRestaurants.map((hotel) => (
              <div style={{margin:"50px 0"}}>
              <Card 
                key={hotel?.restaurant_id}
                image={hotel?.image_url}
                cuisines={hotel?.cuisine}
                location={hotel?.restaurantLocation}
                name={hotel?.restaurantName}
                avgRating={4.4}
                deliveryTime={hotel?.info?.sla?.slaString || "10 mins"}
                id={hotel?.restaurant_id}
              />
              </div>
            ))}
        </Cusine>
      </Container>
    </>
  );
}
export default Search;
