import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const menuItemsApi = createApi({
  reducerPath: "menuItems",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getMenuItem: builder.query({
      async queryFn(menuItemId) {
        try {
          const menuItemRef = doc(db, "menus", menuItemId);
          const menuItemDoc = await getDoc(menuItemRef);
         
          if (menuItemDoc.exists()) {
            console.log(menuItemDoc.data());
            return { data: menuItemDoc.data() };
          } else {
            throw new Error("Menu item not found");
          }
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetMenuItemQuery } = menuItemsApi;



