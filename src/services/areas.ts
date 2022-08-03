import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Area } from "../interfaces/area";
import { Ticket } from "../interfaces/ticket";

export const areas = createApi({
  reducerPath: "areas",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://192.168.0.17:5000/stores/1/area`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAll: builder.query<Area[], void>({
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
} = areas;
