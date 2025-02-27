import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { set } from "mongoose";

// Define a type for the slice state
interface UserState {
  userName: string;
  email: string;
  role: string;
  date: string;
  userId: string;
  isAuthenticated: boolean,
  token?: string;

}

// Define the initial state using that type
const initialState: UserState = {
  userName: "",
  email: "",
  role: "",
  date: '',
  userId: "",
  isAuthenticated: false,
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<UserState>) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.date = action.payload.date;
      state.userId = action.payload.userId;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.userName = "";
      state.email = "";
      state.role = "";
      state.date = "";
      state.userId = "";
      state.isAuthenticated = false;
      state.token = "";
    },
  },
});

export const {
  setUserDetails,
  setUserName,
  setEmail,
  setRole,
  setDate,
  setToken,
  setLogout
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
