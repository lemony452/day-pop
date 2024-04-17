import {
  addStudyPopsong,
  fetchPopsongById,
  savingStudyPopsong,
} from "./thunks";
import { gradeToScore, totalToGrade } from "./util";

const { createSlice, current } = require("@reduxjs/toolkit");
const { compareSentence } = require("../play");

const initialStudyState = {
  fetchStatus: "initial", // 팝송 가져오기 상태
  newStatus: "initial", // 새로운 팝송 등록 상태
  saveStatus: "initial", // 팝송 학습 저장 상태
  isStudy: false, // 학습한적이 있는지 여부
  popsongInfo: {
    title: "",
    artist: "",
    originalLyrics: [],
    totalSentence: 1,
    trackId: "",
    popsongId: "",
  },

  // 학습 상태
  // isReady: false,
  // isStudy: true,
  // isResult: false,

  // 학습한 정보
  studying: {
    studyingLyrics: [],
    sentenceIdx: 0,
    perfect: 0,
    great: 0,
    good: 0,
    bad: 0,
    miss: 0,
    grade: "",
    isDone: false,
  },

  // 최종 결과
  result: {
    score: 0,
    grade: "-",
  },
};

const StudySlice = createSlice({
  name: "study",
  initialState: initialStudyState,
  reducers: {
    selectPopsong(state, action) {
      state.popsongInfo = { ...action.payload };
    },
    studyReady(state) {
      state.studying.isReady = true;
    },
    studyStart(state) {
      state.studying.isReady = false;
      state.studying.isStudy = true;
    },
    initialSaveStatus(state) {
      state.saveStatus = "initial";
    },
    initialFetchStatus(state) {
      state.fetchStatus = "initial";
    },
    gradeSentence(state, action) {
      let grade = "";
      const currentIdx = state.studying.sentenceIdx;
      const originSentence = state.popsongInfo.originalLyrics[currentIdx];
      // 실제 가사와 비교
      const { correct, incorrectArray } = compareSentence(
        originSentence,
        action.payload
      );

      // grade 판정
      const correctRatio = (correct / originSentence.length) * 100;
      if (correctRatio === 0) grade = "miss";
      else if (correctRatio < 30) grade = "bad";
      else if (correctRatio < 60) grade = "good";
      else if (correctRatio < 90) grade = "great";
      else grade = "perfect";

      if (state.studying.studyingLyrics) {
        state.studying.studyingLyrics = [
          ...state.studying.studyingLyrics,
          action.payload,
        ];
      } else state.studying.studyingLyrics = [action.payload];
      state.studying.grade = grade;
      state.studying[grade] += 1;

      // 마지막 문장 학습 후 종료
      if (
        state.studying.sentenceIdx ===
        state.popsongInfo.originalLyrics.length - 1
      ) {
        // 점수 및 등급 판정
        const grade = totalToGrade(state.studying);
        const score = gradeToScore(grade);

        state.result.grade = grade;
        state.result.score = score;
        state.studying.isDone = true;
      } else {
        state.studying.sentenceIdx += 1;
      }
    },
  },
  // 비동기 리듀서
  extraReducers(builder) {
    // 학습할 팝송 데이터 가져오기
    builder.addCase(fetchPopsongById.pending, (state) => {
      state.fetchStatus = "loading";
    });
    builder.addCase(fetchPopsongById.fulfilled, (state, action) => {
      state.fetchStatus = "success";
      state.isStudy = true;
      const data = action.payload;
      if (data) {
        state.popsongInfo = {
          title: data.title,
          artist: data.artist,
          originalLyrics: data.originalLyrics,
          totalSentence: data.originalLyrics.length,
          popsongId: data._id,
        };
        state.studying = { ...data.savedData };
        // state.studying.studyingLyrics = [...data.studyingLyrics];
        state.result.grade = data.grade;
        state.result.score = data.score;
      }
    });
    builder.addCase(fetchPopsongById.rejected, (state, action) => {
      state.fetchStatus = "error";
      state.isStudy = false;
      state.result.grade = "-";
      state.result.score = 0;
      state.popsongInfo.originalLyrics = [];
      state.studying.studyingLyrics = [];
    });
    // 첫 학습할 팝송 데이터 저장하기
    builder.addCase(addStudyPopsong.pending, (state) => {
      state.newStatus = "loading";
    });
    builder.addCase(addStudyPopsong.fulfilled, (state, action) => {
      state.newStatus = "success";
      const { popsongId, message } = action.payload;
      state.popsongInfo.popsongId = popsongId;
    });
    builder.addCase(addStudyPopsong.rejected, (state) => {
      state.newStatus = "error";
    });
    // 학습한 내용 저장하기
    builder.addCase(savingStudyPopsong.pending, (state) => {
      state.saveStatus = "loading";
    });
    builder.addCase(savingStudyPopsong.fulfilled, (state, action) => {
      state.saveStatus = "success";
    });
    builder.addCase(savingStudyPopsong.rejected, (state) => {
      state.saveStatus = "error";
    });
  },
});

export const studyActions = StudySlice.actions;

export default StudySlice.reducer;
