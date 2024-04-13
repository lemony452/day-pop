"use client";

import { getCookie, setCookie } from "cookies-next";
import RemainSentence from "./remain-sentence";
import Result from "./result";
import SentenceInput from "./sentence-input";
import { useEffect, useState } from "react";
import { getRefresh } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { getPopsongInfo } from "@/lib/play";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchPopsongById, savingStudyPopsong } from "@/lib/study/thunks";
import { closeModal, openModal } from "@/lib/modal/modalSlice";
import { studyActions } from "@/lib/study/studySlice";

let isRender = false;
const ACCESS_TOKEN = getCookie("access_token");
const REFRESH_TOKEN = getCookie("refresh_token");

export default function StudyContent({ trackId }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [accessToken, setAccessToken] = useState(ACCESS_TOKEN);
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

  const verifyToken = async () => {
    console.log("토큰 검증");
    try {
      const res = await getRefresh(accessToken, REFRESH_TOKEN);
      console.log(res);
      if (!res.ok) {
        if (res.status === 401) return router("/login");
        else if (res.status !== 400) throw new Error("에러가 발생하였습니다");
      }
      if (res.status === 200) {
        const newTokenInfo = await res.json();
        setCookie("access_token", newTokenInfo.access_token);
        setAccessToken(newTokenInfo.access_token);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!isRender) verifyToken();
  }, []);

  useEffect(() => {
    if (!isRender) {
      isRender = true;
      return;
    }
    dispatch(fetchPopsongById(trackId));
  }, [dispatch, trackId]);

  useEffect(() => {
    if (studying.isDone) {
      dispatch(savingStudyPopsong(savingData));
      dispatch(openModal("학습이 완료되었습니다. 학습 결과를 판정중입니다..."));
    }
  }, [studying.isDone, dispatch]);

  useEffect(() => {
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

  useEffect(() => {
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
