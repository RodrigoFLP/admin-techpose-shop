import { configureStore, isAnyOf } from "@reduxjs/toolkit";

import authSlice from "./auth/authSlice";
import { fetchAuth } from "./auth/authSlice";

import { auth } from "../services/auth";

import { startAppListening, listenerMiddleware } from "./listenerMiddleware";
import { products } from "../services/products";
import { categories } from "../services/categories";
import { schedules } from "../services/schedules";
import { areas } from "../services/areas";
import { tickets } from "../services/tickets";

export const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
    [products.reducerPath]: products.reducer,
    [categories.reducerPath]: categories.reducer,
    [schedules.reducerPath]: schedules.reducer,
    [areas.reducerPath]: areas.reducer,
    [tickets.reducerPath]: tickets.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(auth.middleware)
      .concat(products.middleware)
      .concat(categories.middleware)
      .concat(schedules.middleware)
      .concat(areas.middleware)
      .concat(tickets.middleware)
      .prepend(listenerMiddleware.middleware),
});

//dispatch async thunk to fetch user data
store.dispatch(fetchAuth());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
