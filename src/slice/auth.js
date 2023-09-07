import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../helpers/persistence-storage";

const initialState = {
  isLoading: false,
  loggedin: false,
  error: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUserStart: (state) => {
      state.isLoading = true;
    },
    signUserSuccess: (state, action) => {
      state.loggedin = true;
      state.isLoading = false;
      state.user = action.payload;
      setItem("token", action.payload.token);
    },
    signUSerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.loggedin = false;
    },
  },
});

export const { signUserStart, signUserSuccess, signUSerFailure, logoutUser } =
  authSlice.actions;
export default authSlice.reducer;
