"use client";

import Image from "next/image";
import Button from "./btn";
import styles from "./header.module.css";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter, usePathname } from "next/navigation";
import { savingStudyPopsong } from "@/lib/study/thunks";
import { openModal } from "@/lib/modal/modalSlice";
import { getCookie, setCookie } from "cookies-next";
import { useEffect } from "react";
import { verifyToken } from "@/lib/user/thunks";

export default function Nav() {
  const pathName = usePathname();
  console.log(pathName);

  const { studying, popsongInfo } = useAppSelector((state) => state.study);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const ACCESS_TOKEN = getCookie("access_token");
  const REFRESH_TOKEN = getCookie("refresh_token");

  const savingData = {
    popsongId: popsongInfo.popsongId,
    savedData: {
      sentenceIdx: studying.sentenceIdx,
      studyingLyrics: studying.studyingLyrics,
      perfect: studying.perfect,
      great: studying.great,
      good: studying.good,
      bad: studying.bad,
      miss: studying.miss,
    },
  };

  const handleFinishStudy = () => {
    dispatch(savingStudyPopsong(savingData));
  };

  // useEffect(() => {
  //   dispatch(verifyToken(ACCESS_TOKEN, REFRESH_TOKEN))
  // }, [dispatch])

  // if (pathName === "/study" && studying.isDone) {
  //   if (savingData) {
  //     dispatch(savingStudyPopsong(savingData));
  //     router("/")
  //   } else router
  // }

  return (
    <div className={styles["nav-items"]}>
      {pathName !== "/study" && (
        <>
          <Link href="/myplaylist">
            <Button className={`${styles.button} ${styles.toMain}`}>
              플레이리스트로 돌아가기
            </Button>
          </Link>
        </>
      )}
      {pathName === "/study" && (
        <button
          onClick={handleFinishStudy}
          className={`${styles.button} ${styles.studyOver}`}
        >
          학습 종료
        </button>
      )}
      <Button className={styles.menu}>
        <Image src="/menu.png" alt="sidebar menu" width={30} height={30} />
      </Button>
    </div>
  );
}
