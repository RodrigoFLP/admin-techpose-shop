import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Customer } from "../interfaces/customer";

export const customers = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/customers`,
    credentials: "include",
  }),
  reducerPath: "customers",
  tagTypes: ["Tag", "Error"],
  endpoints: (builder) => ({
    getOne: builder.query<Customer, number | string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Tag"],
    }),
    getAll: builder.query<Customer[], void>({
      query: () => ({
        url: "",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Tag"],
    }),
    updateCustomer: builder.mutation<Customer, Customer>({
      query: (customer) => ({
        url: `/${customer.id}`,
        method: "PATCH",
        credentials: "include",
        body: customer,
      }),
      invalidatesTags: ["Tag"],
    }),
    addCustomer: builder.mutation<Customer, Customer>({
      query: (customer) => ({
        url: "",
        method: "POST",
        credentials: "include",
        body: customer,
      }),
      invalidatesTags: ["Tag"],
    }),
    removeCustomer: builder.mutation<Customer, number | string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Tag"],
    }),
  }),
});

export const {
  useGetOneQuery,
  useGetAllQuery,
  useUpdateCustomerMutation,
  useAddCustomerMutation,
  useRemoveCustomerMutation,
} = customers;
