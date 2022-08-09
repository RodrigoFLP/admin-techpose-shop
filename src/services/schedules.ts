import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Schedule } from "../interfaces";

export const schedules = createApi({
  reducerPath: "schedules",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}`,
    credentials: "include",
  }),
  tagTypes: ["Schedule", "Error"],

  endpoints: (builder) => ({
    getAll: builder.query<Schedule[], void>({
      query: () => ({
        url: "schedules/main",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Schedule"],
    }),

    updateSchedule: builder.mutation<any, any>({
      query: (mutation) => ({
        url: `/stores/schedule`,
        method: "PATCH",
        credentials: "include",
        body: mutation,
      }),
      invalidatesTags: (result, error, arg) =>
        result ? ["Schedule"] : ["Error"],
    }),
  }),
});

export const { useGetAllQuery, useUpdateScheduleMutation } = schedules;
