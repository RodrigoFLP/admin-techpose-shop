import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tag } from "../interfaces/tag";

export const tags = createApi({
  reducerPath: "tags",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/tags`,
    credentials: "include",
  }),
  tagTypes: ["Tag", "Error"],

  endpoints: (builder) => ({
    getOneTag: builder.mutation<Tag, number | string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllTags: builder.query<Tag[], void>({
      query: () => ({
        url: "",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Tag"],
    }),
    updateTag: builder.mutation<Tag, Tag>({
      query: (tag) => ({
        url: `/${tag.id}`,
        method: "PATCH",
        credentials: "include",
        body: { ...tag, id: undefined },
      }),
      invalidatesTags: ["Tag"],
    }),
    addTag: builder.mutation<Tag, Omit<Tag, "id">>({
      query: (tag) => ({
        url: "",
        method: "POST",
        credentials: "include",
        body: { ...tag },
      }),
      invalidatesTags: ["Tag"],
    }),
    removeTag: builder.mutation<Tag, number | string>({
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
  useGetOneTagMutation,
  useGetAllTagsQuery,
  useUpdateTagMutation,
  useAddTagMutation,
  useRemoveTagMutation,
} = tags;
