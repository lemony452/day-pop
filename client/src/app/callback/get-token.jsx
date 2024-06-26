"use client";

import { loginWithSpotify } from "@/lib/auth";
import { setCookie } from "cookies-next";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GetToken({ code, state }) {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const code = searchParams.get("code");
  // const state = searchParams.get("state");

  useEffect(() => {
    const getToken = async (code, state) => {
      const { tokenInfo, isSign, userInfo } = await loginWithSpotify(
        code,
        state
      );

      if (tokenInfo) {
        setCookie("spotify_refresh_token", tokenInfo.refresh_token);

        // spotifyId를 query string으로 넘겨주도록 변경
        if (isSign) router.push("/login");
        else router.push(`/signup?spotifyId=${userInfo.id}`);
      }
    };

    getToken(code, state);
  }, [code, router, state]);
  return <div>스포티파이 로그인중...</div>;
}
