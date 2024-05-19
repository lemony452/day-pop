"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { studyActions } from "@/lib/study/studySlice";
import { useRef } from "react";
import styles from "./page.module.css";

export default function SentenceInput() {
  const dispatch = useAppDispatch();
  const inputRef = useRef();

  const onCheckSentence = (e) => {
    e.preventDefault();
    const sentence = inputRef.current.value;
    dispatch(studyActions.gradeSentence(sentence));
    inputRef.current.value = "";
  };

  return (
    <form onSubmit={onCheckSentence}>
      <input
        className={styles["study-lyircs-input"]}
        ref={inputRef}
        name="sentence"
        type="text"
        placeholder="한 문장씩 가사를 입력해 주세요"
      />
    </form>
  );
}
