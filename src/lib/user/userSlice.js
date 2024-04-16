import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInfo } from "./thunks";

const initialUserState = {
  verifyStatus: "initial",
  access_token: "",
  refresh_token: "",
  isLogin: false,
  isStudy: false,
  history: [],
  nickname: "",
  totalPopsongs: 0,
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
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.verifyStatus = "loading";
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.verifyStatus = "success";
      if (action.payload) {
        console.log(action.payload);
        const userInfo = action.payload;
        state.result.grade = userInfo.grade;
        state.history = userInfo.history;
        state.nickname = userInfo.nickname;
        state.totalPopsongs = userInfo.totalPopsongs;
      }
    });
    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      state.verifyStatus = "error";
      console.log(action.payload);
    });
  },
});

export const userActions = UserSlice.actions;

export default UserSlice.reducer;
