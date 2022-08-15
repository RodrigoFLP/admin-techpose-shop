import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  PreferenceFormValues,
  Store,
  StoreMutation,
} from "../interfaces/store";

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
    updateStore: builder.mutation<
      Store,
      StoreMutation & { lat?: number; lon?: number }
    >({
      query: (newStore) => ({
        url: "",
        method: "PATCH",
        body: newStore,
        credentials: "include",
      }),
    }),
    updateCoordinates: builder.mutation<Store, { lat: number; lon: number }>({
      query: (newStore) => ({
        url: "",
        method: "PATCH",
        body: newStore,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetStoreQuery,
  useUpdateStoreMutation,
  useUpdateCoordinatesMutation,
} = shop;
