import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const RestaurantsApi = createApi({
  reducerPath: "Restaurants",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getAllRestaurants: builder.query({
      async queryFn(_arg, { signal }) {
        try {
          const restaurantsSnapshot = await getDocs(collection(db, "restaurants"), { signal });
          const restaurantsData = restaurantsSnapshot.docs.map((doc) => doc.data());
          return { data: restaurantsData };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetAllRestaurantsQuery } = RestaurantsApi;
