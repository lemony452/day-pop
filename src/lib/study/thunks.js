import { createAsyncThunk } from "@reduxjs/toolkit";
import { addStudyingList, getPopsongInfo, editStudyingPopsong } from "../play";
import { studyActions } from "./studySlice";

// 팝송 데이터 가져오기
export const fetchPopsongById = createAsyncThunk(
  "study/fetchPopsongStatus", // thunk 함수 이름
  async (trackId, { rejectWithValue }) => {
    // 비동기 payloadCreator 함수 정의
    try {
      const res = await getPopsongInfo(trackId);
      return res;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.message);
    }
  }
);

// export const fetchPopsongInfo = (trackId, access_token) => {
//   return async (dispatch) => {
//     const popsongInfo = await getPopsongInfo(trackId, access_token);
//     console.log("팝송 있는지 확인 : ", popsongInfo);
//     if (!popsongInfo) console.log("팝송을 학습한 정보를 가져올 수 없습니다");
//     else {
//       const data = {
//         title: popsongInfo.title,
//         artist: popsongInfo.artist,
//         originalLyrics: popsongInfo.originalLyrics,
//         totalSentence: popsongInfo.originalLyrics.length,
//       };
//       dispatch(studyActions.selectPopsong(data));
//     }
//   };
// };

// 팝송 학습 정보 첫 등록하기
export const addStudyPopsong = createAsyncThunk(
  "study/addPopsongStatus",
  async (popsongData, { rejectWithValue }) => {
    try {
      const res = await addStudyingList(popsongData);
      return res;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.Error);
    }
  }
);

// 학습 내용 저장하기
export const savingStudyPopsong = createAsyncThunk(
  "study/savingPopsongStatus",
  async (savingData, { rejectWithValue }) => {
    try {
      const res = await editStudyingPopsong(savingData);
      return res;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.Error);
    }
  }
);
