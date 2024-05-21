"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { fetchPopsongById } from "@/lib/study/thunks";
import { useEffect } from "react";

export default function Result({ styles, trackId }) {
  const dispatch = useAppDispatch();
  const { isStudy, result, studying, popsongInfo } = useAppSelector(
    (state) => state.study
  );
  const progress = Math.ceil(
    (studying.sentenceIdx / popsongInfo.originalLyrics.length) * 100
  );

  useEffect(() => {
    dispatch(fetchPopsongById(trackId));
  }, [trackId, dispatch]);

  return (
    <div className={styles["result-grade"]}>
      <div className={styles["result-info"]}>
        {isStudy && result.grade === "-" ? "진행률" : "Rank"}
      </div>
      <div className={styles["result-grade-value"]}>
        {isStudy && result.grade === "-" ? `${progress}%` : result.grade}
      </div>
    </div>
  );
}
