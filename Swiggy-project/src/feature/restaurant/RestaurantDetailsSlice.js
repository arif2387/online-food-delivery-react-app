import { createSlice } from '@reduxjs/toolkit';

export const restaurantDetailsSlice = createSlice({
  name: 'restaurantDetails',
  initialState: {
    isUploaded: false,
    city: '',
    restaurantName: '',
    restaurantLocation: '',
    cuisine: '',
    cityError: '',
    restaurantNameError: '',
    restaurantLocationError: '',
    cuisineError: '',
    imageError: '',
    loading:false,
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setRestaurantName: (state, action) => {
      state.restaurantName = action.payload;
    },
    setRestaurantLocation: (state, action) => {
      state.restaurantLocation = action.payload;
    },
    setCuisine: (state, action) => {
      state.cuisine = action.payload;
    },
    setIsUploaded: (state, action) => {
      state.isUploaded = action.payload;
    },
    setLoading:(state,action)=>{
      state.loading=action.payload;
    },
    setCityError: (state, action) => {
      state.cityError = action.payload;
    },
    setRestaurantNameError: (state, action) => {
      state.restaurantNameError = action.payload;
    },
    setRestaurantLocationError: (state, action) => {
      state.restaurantLocationError = action.payload;
    },
    setCuisineError: (state, action) => {
      state.cuisineError = action.payload;
    },
    setImageError: (state, action) => {
      state.imageError = action.payload;
    },
    resetForm: (state) => {
      return {
        ...state,
        city: '',
        restaurantName: '',
        restaurantLocation: '',
        cuisine: '',
        isUploaded: false,
        cityError: '',
        restaurantNameError: '',
        restaurantLocationError: '',
        cuisineError: '',
        imageError: '',
      };
    },
  },
});

export const {
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
  resetForm,
  setLoading
} = restaurantDetailsSlice.actions;

export const selectRestaurantDetails = (state) => state.restaurantDetails;

export default restaurantDetailsSlice.reducer;
