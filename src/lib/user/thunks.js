import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRefresh } from "../auth";
import { fethcPopsongExtended } from "../play";

// 토큰 유효한지 검증하기
export const verifyToken = createAsyncThunk(
  "user/verifyTokenStatus",
  async ({ access_token, refresh_token }, { rejectWithValue }) => {
    try {
      const res = await getRefresh(access_token, refresh_token);
      if (!res.ok) {
        if (res.status === 401) throw new Error("로그인이 필요합니다");
        else if (res.status !== 400) throw new Error("에러가 발생하였습니다");
      }
      return res;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e);
    }
  }
);

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfoStatus",
  async (user, { rejectWithValue }) => {
    try {
      const res = await fethcPopsongExtended("/api/user");
      if (!res.ok) throw Error(res.status);
      return await res.json();
    } catch (e) {
      console.log(e);
      return rejectWithValue(e);
    }
  }
);
