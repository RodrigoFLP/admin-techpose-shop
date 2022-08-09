import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PreferenceFormValues, Store } from "../interfaces/store";

export const shop = createApi({
  reducerPath: "shop",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/stores/1`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getStore: builder.query<Store, void>({
      query: () => ({
        url: "",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateStore: builder.mutation<Store, PreferenceFormValues>({
      query: (newStore) => ({
        url: "",
        method: "PATCH",
        body: newStore,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetStoreQuery, useUpdateStoreMutation } = shop;
