import { createAsyncThunk } from "@reduxjs/toolkit";
import { fethcPopsongExtended } from "../play";
import { getCookie } from "cookies-next";

// 팝송 데이터 가져오기
// return-fetch 적용
export const fetchPopsongById = createAsyncThunk(
  "study/fetchPopsongStatus", // thunk 함수 이름
  async (trackId, { rejectWithValue }) => {
    const token = getCookie("access_token");
    // 비동기 payloadCreator 함수 정의
    try {
      const res = await fethcPopsongExtended(`/api/popsong/${trackId}`, {
        headers: { Authorization: "Bearer " + token },
      });
      if (!res.ok) {
        throw Error(res.status);
      }
      return await res.json();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// 팝송 학습 정보 첫 등록하기
export const addStudyPopsong = createAsyncThunk(
  "study/addPopsongStatus",
  async (popsongData, { rejectWithValue }) => {
    const token = getCookie("access_token");
    try {
      const res = await fethcPopsongExtended("/api/popsong", {
        method: "POST",
        body: JSON.stringify(popsongData),
        headers: { Authorization: "Bearer " + token },
      });
      if (!res.ok) throw Error(res.status);
      return await res.json();
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.message);
    }
  }
);

// 학습 내용 저장하기
export const savingStudyPopsong = createAsyncThunk(
  "study/savingPopsongStatus",
  async (savingData, { rejectWithValue }) => {
    const token = getCookie("access_token");
    const bodyValue = {
      savedData: savingData.savedData,
    };
    if (savingData.grade && savingData.score) {
      Object.assign(bodyValue, {
        score: savingData.score,
        grade: savingData.grade,
      });
    }
    try {
      const res = await fethcPopsongExtended(
        `/api/popsong/${savingData.popsongId}`,
        {
          method: "PATCH",
          body: JSON.stringify(bodyValue),
          headers: { Authorization: "Bearer " + token },
        }
      );
      if (!res.ok) throw Error(res.status);
      return await res.json();
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.message);
    }
  }
);
