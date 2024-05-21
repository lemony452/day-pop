"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchPopsongById } from "@/lib/study/thunks";
import { useEffect } from "react";
import { fat } from "../layout";
import Card from "@/components/Card";

export default function ResultInfo({ cardInfo, trackId, styles }) {
  const { studying, result } = useAppSelector((state) => state.study);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPopsongById(trackId));
  }, [dispatch, trackId]);

  return (
    <div className={styles["result-wrapper"]}>
      <div className={`${styles["result-info"]} ${fat.variable}`}>
        <Card imgSize={400} cardInfo={cardInfo}>
          <div className={styles["result-rating"]}>
            <ul className={styles["result-rating-list-container"]}>
              <li className={`perfect ${styles["result-rating-item"]}`}>
                Perfect {studying.perfect}
              </li>
              <li className={`great ${styles["result-rating-item"]}`}>
                Great {studying.great}
              </li>
              <li className={`good ${styles["result-rating-item"]}`}>
                Good {studying.good}
              </li>
              <li className={`bad ${styles["result-rating-item"]}`}>
                Bad {studying.bad}
              </li>
              <li className={`miss ${styles["result-rating-item"]}`}>
                Miss {studying.miss}
              </li>
            </ul>
          </div>
          <div className={styles["result-rank-container"]}>
            <div className={styles["result-rank-label"]}>Rank</div>
            <div className={styles["result-rank-value"]}>{result.grade}</div>
          </div>
        </Card>
      </div>
      <div className={styles["result-lyrics"]}>
        {studying.studyingLyrics?.map((sentence, idx) => (
          <p key={idx}>{sentence}</p>
        ))}
      </div>
    </div>
  );
}
