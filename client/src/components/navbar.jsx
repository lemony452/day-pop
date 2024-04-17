"use client";

import Image from "next/image";
import Button from "./btn";
import styles from "./header.module.css";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { usePathname } from "next/navigation";
import { savingStudyPopsong } from "@/lib/study/thunks";
import { userActions } from "@/lib/user/userSlice";
import { fetchUserInfo } from "@/lib/user/thunks";

export default function Nav() {
  const pathName = usePathname();

  const { studying, popsongInfo } = useAppSelector((state) => state.study);
  const dispatch = useAppDispatch();

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

  const handleOpenMypage = () => {
    dispatch(fetchUserInfo("user"));
    dispatch(userActions.openMypage());
  };

  return (
    <div className={styles["nav-items"]}>
      {pathName !== "/study" && pathName !== "/myplaylist" && (
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
      <button onClick={handleOpenMypage} className={styles.menu}>
        <Image src="/menu.png" alt="sidebar menu" width={30} height={30} />
      </button>
    </div>
  );
}
