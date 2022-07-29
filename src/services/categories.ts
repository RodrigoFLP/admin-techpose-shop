import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category, Product } from "../interfaces";

export const categories = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://192.168.0.10:5000/categories`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getOneCategory: builder.query<Category, number | string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllCategories: builder.query<Category[], void>({
      query: () => ({
        url: "",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateCategory: builder.mutation<Category, Category>({
      query: (product) => ({
        url: `/${product.id}`,
        method: "PATCH",
        credentials: "include",
        body: product,
      }),
    }),
    addCategory: builder.mutation<Category, Category>({
      query: (product) => ({
        url: "",
        method: "POST",
        credentials: "include",
        body: product,
      }),
    }),
    removeCategory: builder.mutation<Category, number | string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetOneCategoryQuery,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useAddCategoryMutation,
  useRemoveCategoryMutation,
} = categories;
