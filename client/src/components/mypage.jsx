"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import styles from "./Mypage.module.css";
import { userActions } from "@/lib/user/userSlice";
import { fat } from "@/app/layout";
import Image from "next/image";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isMypage, totalPopsongs, history, nickname, result } = useAppSelector(
    (state) => state.user
  );

  const handleCloseMypage = () => {
    dispatch(userActions.openMypage());
  };

  const handleLogout = () => {
    dispatch(userActions.logout());
    dispatch(userActions.openMypage());
    deleteCookie("access_token");
    router.push("/login");
  };

  return (
    <div
      className={`${styles["mypage-container"]} ${fat.variable} ${
        isMypage ? styles["open-mypage"] : styles["close-mypage"]
      }`}
    >
      <div className={styles["mypage-head"]}>
        <span>Day POP</span>
        <Image
          src="/close.png"
          alt="close imgage"
          width={30}
          height={30}
          className={styles["close-icon"]}
          onClick={handleCloseMypage}
        ></Image>
      </div>
      <div className={styles["user-info"]}>
        <div className={styles["user-nickname"]}>
          <span>{nickname}</span>
          <span>님</span>
        </div>
        <div className={styles["popsong-total-wrapper"]}>
          총{" "}
          <span className={styles["popsong-total-cnt"]}>{totalPopsongs}</span>{" "}
          개의 팝송을 학습했어요
        </div>
      </div>
      <div className={styles["user-rank-wrapper"]}>
        <span className={styles["user-rank-label"]}>
          <Image
            src="/rank.png"
            alt="rank star icon image"
            width={30}
            height={30}
          ></Image>{" "}
          평균 랭크
        </span>
        <span className={styles["user-rank-value"]} id={result.grade}>
          {result.grade}
        </span>
      </div>
      <div className={styles["popsonglist-history"]}>
        <span className={styles["popsonglist-history-label"]}>
          <Image
            src="/album.png"
            alt="album icon image"
            width={30}
            height={30}
          ></Image>
          최근 학습한 팝송
        </span>
        <ul className={styles["popsonglist-wrapper"]}>
          {history.map((popsong) => (
            <li className={styles["popsong-item"]} key={popsong.title}>
              {popsong.title} - {popsong.artist}
            </li>
          ))}
        </ul>
      </div>
      <div onClick={handleLogout} className={styles["logout-btn"]}>
        로그아웃
      </div>
    </div>
  );
}
