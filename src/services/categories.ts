import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category } from "../interfaces";

export const categories = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/categories`,
    credentials: "include",
  }),
  tagTypes: ["Category", "Error"],
  endpoints: (builder) => ({
    getOneCategory: builder.mutation<Category, number | string>({
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
      providesTags: ["Category"],
    }),
    updateCategory: builder.mutation<Category, Category>({
      query: (product) => ({
        url: `/${product.id}`,
        method: "PATCH",
        credentials: "include",
        body: { ...product, id: undefined },
      }),
      invalidatesTags: ["Category"],
    }),
    addCategory: builder.mutation<Category, Omit<Category, "id">>({
      query: (product) => ({
        url: "",
        method: "POST",
        credentials: "include",
        body: { ...product },
      }),
      invalidatesTags: ["Category"],
    }),
    removeCategory: builder.mutation<Category, number | string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetOneCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useAddCategoryMutation,
  useRemoveCategoryMutation,
} = categories;
