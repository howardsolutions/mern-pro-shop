import { PRODUCT_URL } from '../constants.js';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/productId`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductQuery, useGetProductDetailsQuery } =
  productsApiSlice;
