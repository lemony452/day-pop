"use client";

import { getRefresh } from "@/lib/auth";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { fetchPopsongById } from "@/lib/study/thunks";
import { verifyToken } from "@/lib/user/thunks";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

let isRender = false;
const ACCESS_TOKEN = getCookie("access_token");
const REFRESH_TOKEN = getCookie("refresh_token");

export default function Result({ styles, trackId }) {
  // const [accessToken, setAccessToken] = useState(ACCESS_TOKEN);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { result } = useAppSelector((state) => state.study);
  const { access_token, refresh_token } = useAppSelector((state) => state.user);

  // const verifyToken = async () => {
  //   console.log("토큰 검증");
  //   try {
  //     const res = await getRefresh(accessToken, REFRESH_TOKEN);
  //     if (!res.ok) {
  //       if (res.status === 401) return router("/login");
  //       else if (res.status !== 400) throw new Error("에러가 발생하였습니다");
  //     }
  //     if (res.status === 200) {
  //       const newTokenInfo = await res.json();
  //       setCookie("access_token", newTokenInfo.access_token);
  //       setAccessToken(newTokenInfo.access_token);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   dispatch(verifyToken(ACCESS_TOKEN, REFRESH_TOKEN))
  // }, [dispatch])

  useEffect(() => {
    if (!isRender) {
      isRender = true;
      return;
    }

    dispatch(fetchPopsongById(trackId));
  }, [trackId, dispatch]);

  return <div className={styles["result-grade"]}>{result.grade}</div>;
}
