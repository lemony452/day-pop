"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import styles from "./mypage.module.css";
import { userActions } from "@/lib/user/userSlice";
import { fat } from "@/app/layout";
import Image from "next/image";

export default function MyPage() {
  const dispatch = useAppDispatch();
  const { isMypage } = useAppSelector((state) => state.user);

  const handleCloseMypage = () => {
    dispatch(userActions.openMypage());
  };

  return (
    <div
      className={`${styles["mypage-wrapper"]} ${fat.variable} ${
        isMypage ? styles["open-mypage"] : styles["close-mypage"]
      }`}
    >
      <div className={styles.top}>
        <span>Day POP</span>
        <Image
          src="/close.png"
          alt="close imgage"
          width={30}
          height={30}
          className={styles["close-button"]}
          onClick={handleCloseMypage}
        ></Image>
      </div>
      <div className={styles["user-info"]}>
        <div className={styles.nickname}>
          <span>김학습</span>
          <span>님</span>
        </div>
        <div className={styles.total}>
          총 <span>23</span> 개의 팝송을 학습했어요
        </div>
      </div>
      <div className={styles.rank}>
        <span>
          <Image
            src="/rank.png"
            alt="rank star icon image"
            width={30}
            height={30}
          ></Image>{" "}
          평균 랭크
        </span>
        <span>A</span>
      </div>
      <div className={styles.history}>
        <span>
          <Image
            src="/album.png"
            alt="album icon image"
            width={30}
            height={30}
          ></Image>
          최근 학습한 팝송
        </span>
        <ul>
          <li>Title - Artist</li>
          <li>Title - Artist</li>
          <li>Title - Artist</li>
        </ul>
      </div>
      <div className={styles.logout}>로그아웃</div>
    </div>
  );
}
