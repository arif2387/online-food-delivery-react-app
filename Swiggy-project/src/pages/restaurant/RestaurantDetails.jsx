import React, { useRef} from "react";
import styled from "styled-components";
import img from "../../assets/img.jpeg";
import logo from "../../assets/logo.png";
import TextField from "@mui/material/TextField";
import UploadButton from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector, useDispatch } from "react-redux";
import {app} from '../../firebase/firebaseConfig.js';
import { getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Header from "../../components/Restaurant/Header.jsx";
import {
  setCity,
  setRestaurantName,
  setRestaurantLocation,
  setCuisine,
  setIsUploaded,
  setCityError,
  setRestaurantNameError,
  setRestaurantLocationError,
  setCuisineError,
  setImageError,
  selectRestaurantDetails,
  resetForm,
  setLoading
} from "../../feature/restaurant/RestaurantDetailsSlice";
import { addRestaurantDetailsToFirestore } from "../../firebase/firebaseRestaurantDetails";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../context/authContext.js";
const Container = styled.div`
  font-family: "Open Sans";
  position: sticky;
  top: -340px;
  z-index: 100;
  background-image: url(${img});
  background-size: contain;
  background-position: right;
  background-repeat: no-repeat;
  background-color: #000000;
  height: 478px;

  & > div {
    margin-left: 8%;
    margin-right: 8%;
    padding-top: 3%;
    margin-bottom: 3%;
  }
`;

const Logo = styled.img`
  height: 9.57562568008705vh;
  margin-bottom: 4.5vh;
  vertical-align: middle;
  border-style: none;
`;

const HelpText = styled.span`
  color: white;
  float: right;
  font-size: 20px;
  padding-top: 10px;
`;

const Title = styled.p`
  color: #ffffff;
  font-family: "Open Sans";
  font-size: 54px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 74px;
  margin-bottom: 10px;
`;

const Subtitle = styled.span`
  color: white;
  font-family: "Open Sans";
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 33px;
`;

const StyledDivider = styled.div`
  background-color: #ffffff;
  margin-top: 41px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  border-bottom: 1px solid #979797;
`;

const FormContainer = styled.div`
  margin: 0 7%;
  padding: 6% 6%;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 7px 7px 2px rgba(0, 0, 0, 0.2);
  padding-top: 9.9vh;
`;

const FlexInput = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const InputContainer = styled.div`
  margin-bottom: 4rem;
  margin-right: 12vw;
  width: 24vw;
`;

function RestaurantDetails() {
  const firestore = getFirestore();
  const user=useUser();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    isUploaded,
    city,
    restaurantName,
    restaurantLocation,
    cuisine,
    cityError,
    restaurantNameError,
    restaurantLocationError,
    cuisineError,
    imageError,
    loading
  } = useSelector(selectRestaurantDetails);

//To see whether user for this email have restaurant or not


useEffect(() => {
  const checkRestaurantExistence = async () => {
    if (user) {
      const uid = user?.uid;
      const restaurantCollection = collection(firestore, 'restaurants');

      try {
        const querySnapshot = await getDocs(restaurantCollection);
        const restaurantExists = querySnapshot.docs.some(docSnapshot => {
          const data = docSnapshot.data();
          return Object.values(data).some(value => value === uid);
        });

        if(restaurantExists){
          navigate('/restaurant/');
        }
      } catch (error) {
        console.error('Error checking restaurant existence:', error);
      }
    }
  };

  checkRestaurantExistence();
}, [user, firestore,navigate]);




//function to see image upload
  const handleFileChange = () => {
    const files = fileInputRef.current.files;

    if (files.length > 0) {
      dispatch(setIsUploaded(true));
      dispatch(setImageError(""));
    } else {
      dispatch(setIsUploaded(false));
      dispatch(setImageError("Image is required"));
    }
  };


//onclick funtion
  const handleRegisterClick = async () => {
    if (!city.trim()) {
      dispatch(setCityError("City is required"));
    } else {
      dispatch(setCityError(""));
    }

    if (!restaurantName.trim()) {
      dispatch(setRestaurantNameError("Restaurant Name is required"));
    } else {
      dispatch(setRestaurantNameError(""));
    }

    if (!restaurantLocation.trim()) {
      dispatch(setRestaurantLocationError("Restaurant Location is required"));
    } else {
      dispatch(setRestaurantLocationError(""));
    }

    if (!cuisine.trim()) {
      dispatch(setCuisineError("Cuisine is required"));
    } else {
      dispatch(setCuisineError(""));
    }

    if (!isUploaded) {
      dispatch(setImageError("Image is required"));
    }

    if (city && restaurantName && restaurantLocation && cuisine&& isUploaded) {

      const files = fileInputRef.current.files;
        const restaurant_id = user?.uid;
        const storage = getStorage(app)
        const storageRef = ref(storage, `restaurant_imgs/${restaurant_id}.jpg`);
  
        const metadata = {
          contentType: 'image/jpeg',
        };
    
        try {
          dispatch(setLoading(true));
  
          const snapshot = await uploadBytes(storageRef, files[0], metadata);
          console.log('File uploaded successfully');
  
          const image_url = await getDownloadURL(storageRef);
          console.log('File download URL:', image_url);


          const restaurantDetails = {
            restaurant_id,
            city,
            restaurantName,
            restaurantLocation,
            cuisine,
            image_url
          };
          const success = await addRestaurantDetailsToFirestore(restaurantDetails);
    
          if (success) {
            console.log("Registration successful!");
            dispatch(resetForm());
            console.log(restaurantDetails);
          } else {
            console.log("Registration failed. Please try again.");
          }
          dispatch(setLoading(true));
          navigate('/restaurant/');
        } catch (error) {
          console.error('Error:', error);
        }
    }
  };

  return (
    <>
      <Header title={"Partner with Swiggy"} subtitle={"Get listed on India's leading online food delivery marketplace today"}/>

      <FormContainer>
        <h1
          style={{
            fontWeight: "600",
            fontSize: "26px",
            marginBottom: "1.5rem",
            color: "rgba(0, 0, 0, 0.85)",
          }}
        >
          Restaurant Details
        </h1>
        <FlexInput>
          <InputContainer>
            <span>City</span>
            <span style={{ marginLeft: "5px", color: "rgb(224, 32, 32)" }}>
              *
            </span>
            <TextField
              style={{ display: "block", marginTop: "10px", width: "25vw" }}
              id="outlined-required"
              InputProps={{ style: { width: "24vw" } }}
              onChange={(e) => dispatch(setCity(e.target.value))}
              error={!!cityError}
              helperText={cityError}
            />
          </InputContainer>

          <InputContainer>
            <span>Restaurant Name</span>
            <span style={{ marginLeft: "5px", color: "rgb(224, 32, 32)" }}>
              *
            </span>
            <TextField
              style={{ display: "block", marginTop: "10px", width: "25vw" }}
              id="outlined-required"
              InputProps={{ style: { width: "25vw" } }}
              onChange={(e) => dispatch(setRestaurantName(e.target.value))}
              error={!!restaurantNameError}
              helperText={restaurantNameError}
            />
          </InputContainer>

          <InputContainer>
            <span>Restaurant Location</span>
            <span style={{ marginLeft: "5px", color: "rgb(224, 32, 32)" }}>
              *
            </span>
            <TextField
              style={{ display: "block", marginTop: "10px" }}
              InputProps={{ style: { width: "24vw" } }}
              id="outlined-required"
              onChange={(e) => dispatch(setRestaurantLocation(e.target.value))}
              error={!!restaurantLocationError}
              helperText={restaurantLocationError}
            />
          </InputContainer>

          <InputContainer>
            <span>Add Cuisine Separated by comma</span>
            <span style={{ marginLeft: "5px", color: "rgb(224, 32, 32)" }}>
              *
            </span>
            <TextField
              style={{ display: "block", marginTop: "10px" }}
              InputProps={{ style: { width: "24vw" } }}
              id="outlined-required"
              onChange={(e) => dispatch(setCuisine(e.target.value))}
              error={!!cuisineError}
              helperText={cuisineError}
            />
          </InputContainer>

          <InputContainer>
            <div style={{ display: "block" }}>
              <span>Upload Cover Image for Restaurant</span>
              <span style={{ marginLeft: "5px", color: "rgb(224, 32, 32)" }}>
                *
              </span>
            </div>
            <UploadButton
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              style={{
                marginTop: "10px",
                backgroundColor: isUploaded ? "#f68621" : null,
              }}
            >
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              {isUploaded ? "Uploaded" : "Upload file"}
            </UploadButton>
            {imageError && (
              <div style={{ color: "rgb(224, 32, 32)", marginTop: "5px" }}>
                {imageError}
              </div>
            )}
          </InputContainer>
        </FlexInput>
        <LoadingButton
          loading={loading}
          loadingPosition="start"
          variant="outlined"
          onClick={handleRegisterClick}
          style={{
            backgroundColor: "#f68621",
            border: "none",
            borderRadius: "4px",
            height: "45px",
            width: "230px",
            color: "white",
            fontSize: "20px",
            lineHeight: "24px",
            fontFamily: "Open Sans",
            letterSpacing: "1px",
          }}
        >
          Register
        </LoadingButton>
      </FormContainer>
    </>
  );
}

export default RestaurantDetails;
