import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Customer } from "../interfaces/customer";

export const products = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/customers`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getOne: builder.query<Customer, number | string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAll: builder.query<Customer[], undefined>({
      query: () => ({
        url: "",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateCustomer: builder.mutation<Customer, Customer>({
      query: (product) => ({
        url: `/${product.id}`,
        method: "PATCH",
        credentials: "include",
        body: product,
      }),
    }),
    addCustomer: builder.mutation<Customer, Customer>({
      query: (product) => ({
        url: "",
        method: "POST",
        credentials: "include",
        body: product,
      }),
    }),
    removeCustomer: builder.mutation<Customer, number | string>({
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
  useUpdateCustomerMutation,
  useAddCustomerMutation,
  useRemoveCustomerMutation,
} = products;
