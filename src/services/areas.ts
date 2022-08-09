import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Area, AreaMutation } from "../interfaces/area";

export const areas = createApi({
  reducerPath: "areas",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/stores/1/area`,
    credentials: "include",
  }),
  tagTypes: ["Area", "Error"],
  endpoints: (builder) => ({
    getAll: builder.query<Area[], void>({
      query: () => ({
        url: "",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Area"],
    }),
    create: builder.mutation<Area, AreaMutation>({
      query: (area) => ({
        url: "",
        method: "POST",
        body: area,
        credentials: "include",
      }),
      invalidatesTags: ["Area"],
    }),
    delete: builder.mutation<Area, number>({
      query: (areaId) => ({
        url: `/${areaId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Area"],
    }),
    removeany: builder.mutation<any, number | string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetAllQuery, useDeleteMutation, useCreateMutation } = areas;
