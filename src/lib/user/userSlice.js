import { createSlice } from "@reduxjs/toolkit";
import { verifyToken } from "./thunks";

const initialUserState = {
  verifyStatus: "initial",
  access_token: "",
  refresh_token: "",
  isLogin: false,
  isStudy: false,
  studyList: [],
  isMypage: false,
  result: {
    grade: "-",
    score: 0,
  },
};

export const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
    openMypage(state) {
      state.isMypage = !state.isMypage;
    },
  },
  extraReducers(builder) {
    builder.addCase(verifyToken.pending, (state) => {
      state.verifyStatus = "loading";
    });
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      state.verifyStatus = "success";
      if (action.payload) {
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
      }
    });
    builder.addCase(verifyToken.rejected, (state, action) => {
      console.log(action.payload);
      state.isLogin = false;
    });
  },
});

export const userActions = UserSlice.actions;

export default UserSlice.reducer;
