import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginMutation } from "../interfaces/auth";

export interface LoginRequest {
  username: string;
  password: string;
}

export const auth = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `http://192.168.0.10:5000`,
    credentials: "include",
  }),
  tagTypes: ["Address", "Error"],
  endpoints: (builder) => ({
    login: builder.mutation<any, LoginMutation>({
      query: (credentials) => ({
        url: "auth/admin/login",
        method: "POST",
        credentials: "include",
        body: credentials,
      }),
    }),
    signUp: builder.mutation<any, any>({
      query: (data) => ({
        url: "auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    check: builder.mutation<any, void>({
      query: () => ({
        url: "auth/check",
        method: "GET",
        credentials: "include",
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "GET",
        credentials: "include",
      }),
    }),
    getProfile: builder.mutation<any, void>({
      query: () => ({
        url: "/profile",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useCheckMutation,
  useLogoutMutation,
} = auth;
