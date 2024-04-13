"use client";

import RemainSentence from "./remain-sentence";
import Result from "./result";
import SentenceInput from "./sentence-input";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchPopsongById, savingStudyPopsong } from "@/lib/study/thunks";
import { closeModal, openModal } from "@/lib/modal/modalSlice";
import { studyActions } from "@/lib/study/studySlice";

let isRender = false;

export default function StudyContent({ trackId }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { studying, popsongInfo, result, fetchStatus, saveStatus } =
    useAppSelector((state) => state.study);

  console.log("=======> 학습한 내용들", studying.studyingLyrics);

  const savingData = {
    popsongId: popsongInfo.popsongId,
    savedData: {
      sentenceIdx: studying.sentenceIdx,
      studyingLyrics: studying.studyingLyrics,
      perfect: studying.perfect,
      great: studying.great,
      good: studying.good,
      bad: studying.bad,
      miss: studying.miss,
    },
    score: result.score,
    grade: result.grade,
  };

  useEffect(() => {
    if (!isRender) {
      isRender = true;
      return;
    }
    dispatch(fetchPopsongById(trackId));
  }, [dispatch, trackId]);

  useEffect(() => {
    if (studying.isDone) {
      console.log("========팝송 저장하고 학습 완료 모달 띄우기========");
      dispatch(savingStudyPopsong(savingData));
      dispatch(openModal("학습이 완료되었습니다. 학습 결과를 판정중입니다..."));
    }
  }, [studying.isDone, dispatch]);

  // 팝송 학습 저장할 때 모달 안내
  useEffect(() => {
    console.log("==========학습 저장 상태 모달 안내========");
    console.log(saveStatus);
    if (saveStatus === "loading") {
      dispatch(openModal("학습한 내용 저장중..."));
    }
    if (saveStatus === "success") {
      dispatch(closeModal());
      dispatch(studyActions.initialSaveStatus());
      if (studying.isDone) router.push(`/result?trackId=${trackId}`);
      else router.push(`/detail?trackId=${trackId}`);
    }
    if (saveStatus === "error") {
      dispatch(
        openModal("학습한 내용을 저장하는데 실패하였습니다 다시 시도해주세요")
      );
    }
  }, [saveStatus, dispatch, studying.isDone, router, trackId]);

  // 팝송 데이터 가져올 때 모달 안내
  useEffect(() => {
    console.log("=========학습할 데이터 가져오기 안내 모달======");
    if (fetchStatus === "loading")
      dispatch(openModal("팝송 정보를 가져오는 중입니다..."));
    if (fetchStatus === "success") {
      dispatch(closeModal());
      dispatch(studyActions.initialFetchStatus());
    }
    if (fetchStatus === "error")
      dispatch(
        openModal("팝송 정보를 가져오는데 실패하였습니다 다시 시도해주세요")
      );
  }, [fetchStatus, dispatch]);

  return (
    <>
      <RemainSentence></RemainSentence>
      <Result></Result>
      <SentenceInput></SentenceInput>
    </>
  );
}
