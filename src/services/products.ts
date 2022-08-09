import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, ProductMutation } from "../interfaces";

export const products = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/products`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getOne: builder.query<Product, number | string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    get: builder.mutation<Product, number | string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAll: builder.query<Product[], void>({
      query: () => ({
        url: "",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateProduct: builder.mutation<Product, ProductMutation>({
      query: (product) => ({
        url: `/${product.id}`,
        method: "PATCH",
        credentials: "include",
        body: product,
      }),
    }),
    addProduct: builder.mutation<Product, ProductMutation>({
      query: (product) => ({
        url: "",
        method: "POST",
        credentials: "include",
        body: product,
      }),
    }),
    removeProduct: builder.mutation<Product, number | string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetOneQuery,
  useGetMutation,
  useGetAllQuery,
  useUpdateProductMutation,
  useAddProductMutation,
  useRemoveProductMutation,
} = products;
