import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Schedule } from "../interfaces";
import { Ticket } from "../interfaces/ticket";

export const schedules = createApi({
  reducerPath: "schedules",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://192.168.0.10:5000/schedules`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAll: builder.query<Schedule[], void>({
      query: () => ({
        url: "/main",
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
} = schedules;
