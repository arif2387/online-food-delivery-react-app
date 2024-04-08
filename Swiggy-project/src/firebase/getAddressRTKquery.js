import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const addressesApi = createApi({
  reducerPath: 'addresses',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getAddresses: builder.query({
      async queryFn(userId) {
        try {
          const addressesRef = doc(db, 'addresses', userId);
          const addressesDoc = await getDoc(addressesRef);

          if (addressesDoc.exists()) {
            console.log(addressesDoc.data());
            return { data: addressesDoc.data() };
          } else {
            throw new Error('Addresses not found');
          }
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetAddressesQuery } = addressesApi;
