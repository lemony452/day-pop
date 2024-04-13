"use client";

import { getRefresh } from "@/lib/auth";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { studyActions } from "@/lib/study/studySlice";
import { addStudyPopsong } from "@/lib/study/thunks";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

let isRender = false;
const ACCESS_TOKEN = getCookie("access_token");
const REFRESH_TOKEN = getCookie("refresh_token");

export default function StartStudy({ styles, cardInfo, lyrics, trackId }) {
  // const [accessToken, setAccessToken] = useState(ACCESS_TOKEN);
  const router = useRouter();
  const { isStudy, result } = useAppSelector((state) => state.study);
  const dispatch = useAppDispatch();

  const popsongInfo = {
    title: cardInfo.trackTitle,
    artist: cardInfo.trackArtist,
    originalLyrics: [...lyrics],
    totalSentence: lyrics.length,
    trackId,
  };

  const handleStartStudy = () => {
    console.log("==========학습하기===========");
    console.log(popsongInfo);

    if (!popsongInfo.originalLyrics.length && !lyrics.length) {
      alert("해당 곡은 학습을 할 수 없습니다");
    } else {
      if (!isStudy) dispatch(addStudyPopsong(popsongInfo));

      router.push(`/study?trackId=${trackId}`);
    }
  };

  return (
    <button onClick={handleStartStudy} className={styles["study-btn"]}>
      {result.grade === "-"
        ? isStudy
          ? "이어서 학습하기"
          : "첫 학습시작하기"
        : "처음부터 학습하기"}
    </button>
  );
}
