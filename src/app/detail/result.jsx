"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { fetchPopsongById } from "@/lib/study/thunks";
import { useEffect } from "react";

let isRender = false;

export default function Result({ styles, trackId }) {
  const dispatch = useAppDispatch();
  const { result } = useAppSelector((state) => state.study);

  useEffect(() => {
    if (!isRender) {
      isRender = true;
      return;
    }

    dispatch(fetchPopsongById(trackId));
  }, [trackId, dispatch]);

  return <div className={styles["result-grade"]}>{result.grade}</div>;
}
