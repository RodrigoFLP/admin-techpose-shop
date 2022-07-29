import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../interfaces";

export const products = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://192.168.0.10:5000/products`,
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
    getAll: builder.query<Product[], void>({
      query: () => ({
        url: "",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateProduct: builder.mutation<Product, Product>({
      query: (product) => ({
        url: `/${product.id}`,
        method: "PATCH",
        credentials: "include",
        body: product,
      }),
    }),
    addProduct: builder.mutation<Product, Product>({
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
  useGetAllQuery,
  useUpdateProductMutation,
  useAddProductMutation,
  useRemoveProductMutation,
} = products;
