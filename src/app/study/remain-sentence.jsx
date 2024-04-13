"use client";

import { fat } from "../layout";
import styles from "./page.module.css";
import { useAppSelector } from "@/lib/hooks";

export default function RemainSentence() {
  const { studying, popsongInfo } = useAppSelector((state) => state.study);
  return (
    <div className={`${styles.remain} ${fat.variable}`}>
      학습 진행률{" "}
      <span>
        {studying.sentenceIdx + 1 || 1} /{" "}
        {popsongInfo.originalLyrics.length || 1}
      </span>
    </div>
  );
}
