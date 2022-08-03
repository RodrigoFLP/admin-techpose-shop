import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Ticket } from "../interfaces/ticket";

export const tickets = createApi({
  reducerPath: "tickets",

  baseQuery: fetchBaseQuery({
    baseUrl: `http://192.168.0.17:5000/tickets`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // getOne: builder.query<Ticket, number | string>({
    //   query: (id) => ({
    //     url: `/${id}`,
    //     method: "GET",
    //     credentials: "include",
    //   }),
    // }),
    getAll: builder.query<Ticket[], void>({
      query: () => ({
        url: "",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateTicket: builder.mutation<Ticket, Ticket>({
      query: (product) => ({
        url: `/${product.id}`,
        method: "PATCH",
        credentials: "include",
        body: product,
      }),
    }),
    removeTicket: builder.mutation<Ticket, number | string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllQuery,
  useUpdateTicketMutation,
  useRemoveTicketMutation,
} = tickets;
