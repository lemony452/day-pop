"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchPopsongById } from "@/lib/study/thunks";
import { useEffect } from "react";
import { fat } from "../layout";
import Card from "@/components/card";

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
          <div className={styles.rating}>
            <ul>
              <li className="perfect">Perfect {studying.perfect}</li>
              <li className="great">Great {studying.great}</li>
              <li className="good">Good {studying.good}</li>
              <li className="bad">Bad {studying.bad}</li>
              <li className="miss">Miss {studying.miss}</li>
            </ul>
          </div>
          <div className={styles["result-grade"]}>
            <div className={styles["result-info"]}>Rank</div>
            <div className={styles["result"]}>{result.grade}</div>
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
