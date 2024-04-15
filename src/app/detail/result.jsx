"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { fetchPopsongById } from "@/lib/study/thunks";
import { useEffect } from "react";

let isRender = false;

export default function Result({ styles, trackId }) {
  const dispatch = useAppDispatch();
  const { isStudy, result, studying, popsongInfo } = useAppSelector(
    (state) => state.study
  );
  const progress = Math.ceil(
    (studying.sentenceIdx / popsongInfo.originalLyrics.length) * 100
  );

  useEffect(() => {
    if (!isRender) {
      isRender = true;
    } else {
      console.log("팝송 정보 가져오기");
      dispatch(fetchPopsongById(trackId));
    }
  }, [trackId, dispatch]);

  return (
    <div className={styles["result-grade"]}>
      <div className={styles["result-info"]}>
        {isStudy && result.grade === "-" ? "진행률" : "Rank"}
      </div>
      <div className={styles["result"]}>
        {isStudy && result.grade === "-" ? `${progress}%` : result.grade}
      </div>
    </div>
  );
}
