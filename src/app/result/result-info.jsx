"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchPopsongById } from "@/lib/study/thunks";
import { useEffect } from "react";
import { fat } from "../layout";
import Card from "@/components/card";

let isRender = false;

export default function ResultInfo({ cardInfo, trackId, styles }) {
  const { studying, result } = useAppSelector((state) => state.study);
  const dispatch = useAppDispatch();
  console.log(studying, result);

  useEffect(() => {
    if (!isRender) {
      dispatch(fetchPopsongById(trackId));
    }
  }, [dispatch, trackId]);

  return (
    <div className={styles["result-wrapper"]}>
      <div className={`${styles["result-info"]} ${fat.variable}`}>
        <div className={styles["result-header"]}>학습 결과</div>
        <div className={styles["result-detail"]}>
          <Card imgSize={200} cardInfo={cardInfo}></Card>
          <div className={styles.rating}>
            <ul>
              <li>Perfect {studying.perfect}</li>
              <li>Great {studying.great}</li>
              <li>Good {studying.good}</li>
              <li>Bad {studying.bad}</li>
              <li>Miss {studying.miss}</li>
            </ul>
            <div className={styles.rank}>
              Rank
              <p>{result.grade}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["result-lyrics"]}>
        {studying.studyingLyrics?.map((sentence, idx) => (
          <p key={idx}>{sentence}</p>
        ))}
      </div>
    </div>
  );
}
