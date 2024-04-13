"use client";

import { loginWithSpotify } from "@/lib/auth";
import { setCookie } from "cookies-next";
// import { redirect } from "next/navigation";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

let isRender = false;

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  console.log(code, state);

  useEffect(() => {
    console.log("use Effect!");
    const getToken = async (code, state) => {
      // const newTokenInfo = await getRefreshToken(REFRESH_TOKEN);
      // console.log("새로 발급 받은 토큰 : ", newTokenInfo);

      // const accessToken = newTokenInfo.accsess_token;
      // if (accessToken) localStorage.setItem("accessToken", accessToken);
      const { tokenInfo, isSign, userInfo } = await loginWithSpotify(
        code,
        state
      );
      console.log("?? : ", tokenInfo, userInfo, isSign);

      if (tokenInfo) {
        setCookie("spotify_refresh_token", tokenInfo.refresh_token);
        // localStorage.setItem("spotify_access_token", tokenInfo.access_token);
        // localStorage.setItem("spotify_refresh_token", tokenInfo.refresh_token);
        // spotifyId를 query string으로 넘겨주도록 변경
        // localStorage.setItem("spotifyId", userInfo.id);
        if (isSign) router.push("/login");
        else router.push(`/signup?spotifyId=${userInfo.id}`);
      }
    };
    if (isRender) {
      console.log("render...");
      getToken(code, state);
    }
    if (!isRender) isRender = true;
  }, [code, router, state]);

  return <h1>로그인 중입니다...</h1>;
}

// export default async function CallbackPage({ searchParams }) {
//   const { code, state } = searchParams;
//   const cookiesStore = cookies();

//   const { tokenInfo, isSign, userInfo } = await loginWithSpotify(code, state);
//   if (tokenInfo) {
//     cookiesStore.set("spotify_refresh_token", tokenInfo.refresh_token, {
//       secure: true,
//     });
//     if (isSign) redirect("/login");
//     else redirect(`/signup?spotifyId=${userInfo.id}`);
//   } else {
//     redirect("/");
//   }

//   return <h1>로그인 중입니다...</h1>;
// }

// const SpotifyLogin = async (code, state) => {
//   const res = await fetch(
//     `${process.env.LOCAL_SERVER_URL}/spotify/login?code=${code}&state=${state}`
//   );
//   return await res.json();
// };

// const getRefreshToken = async (refreshToken) => {
//   const res = await fetch(`${process.env.LOCAL_SERVER_URL}/refreshToken`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ refresh_token: refreshToken }),
//   });

//   return await res.json();
// };
