import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./slices/userSlice";
import flightResultsSlice from "./slices/flightsResultsSlice"; 
import { combineReducers } from "redux";
import { fetchDataApi } from "../services/fetchData";
import bookFlightSlice from "./slices/bookFlightSlice";

const rootReducer = combineReducers({
  user: userReducer,
  flightResults: flightResultsSlice,
  bookFlight: bookFlightSlice,
  [fetchDataApi.reducerPath]: fetchDataApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchDataApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
