"use client";

import { useAppSelector } from "@/lib/hooks";
import styles from "./page.module.css";
import { fat } from "../layout";

const ENG_REG = /^[a-z|A-Z]/;

export default function Result() {
  const { studying, popsongInfo } = useAppSelector((state) => state.study);
  const hintArr =
    popsongInfo.originalLyrics[studying.sentenceIdx]?.split(" ") || [];

  return (
    <div className={styles["study-contents-container"]}>
      {studying.grade && (
        <div
          key={studying.sentenceIdx}
          className={`${styles["study-lyrics-rating"]} ${fat.variable} ${studying.grade}`}
        >
          {studying.grade}
        </div>
      )}
      <div className={styles["study-current-lyrics"]}>
        {hintArr.map((word, idx) =>
          word.length > 0 ? (
            <div key={idx}>
              {word.split("").map((letter, letterIdx) => (
                <span key={letterIdx}>
                  {letterIdx === 0 || !ENG_REG.test(letter) ? letter : "_"}
                </span>
              ))}
            </div>
          ) : (
            <div key={idx}>ENTER</div>
          )
        )}
      </div>
    </div>
  );
}
