import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ActiveOrder, StatusType } from "../interfaces/order";
import { Order as Ticket } from "../interfaces/order";

export const tickets = createApi({
  reducerPath: "tickets",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/tickets`,
    credentials: "include",
  }),
  tagTypes: ["ActiveOrders", "Error"],
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
    updateTicketStatus: builder.mutation<
      number,
      { statusId: number; status: StatusType }
    >({
      query: (payload) => ({
        url: `/status/${payload.statusId}`,
        method: "PATCH",
        credentials: "include",
        body: { status: payload.status },
      }),
      invalidatesTags: (result, error, arg) =>
        result ? ["ActiveOrders"] : ["Error"],
    }),
    getAllActive: builder.query<ActiveOrder[], void>({
      query: () => ({
        url: "/active",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["ActiveOrders"],
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
  useGetAllActiveQuery,
  useUpdateTicketMutation,
  useRemoveTicketMutation,
  useUpdateTicketStatusMutation,
} = tickets;
