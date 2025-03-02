import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./slices/userSlice";
import gameReducer from "./slices/gameSlice"; 
import { combineReducers } from "redux";
import { fetchDataApi } from "../services/fetchData";

const rootReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
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
