"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const REFRESH_TOKEN =
  "AQCe6aDws27cUx1ppX40lLonfEJF6OK8R7DSzJAr6P0B5Zq7VL8fkaejDHFskUb0no2qKIZYXItiUZEpC2lzem2RkeGiFzif2u3XOonz11d1apY-7pX9iTdkSPLKidQbTeQ";

let isRender = false;

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  useEffect(() => {
    const getToken = async (code, state) => {
      // const newTokenInfo = await getRefreshToken(REFRESH_TOKEN);
      // console.log("새로 발급 받은 토큰 : ", newTokenInfo);
      const accessToken =
        "BQBBthw2X-HC_n-3-BQB4XaUCIgYv8-CGsQVjSqpkXlWL4BWfz_AWAVlkiWApf5Onw6H2LTyPLnXvk0-a5IWYa9rNLLOgGadJrBa6Kfw04lMtLQVFEz_WgZu67FKUEiczJiqShNQyeyBLkw3LmGa0oy6Kwsv-cEaRD147CRgUvNqm3GPMbYtWWqhCgMDK8b7NGJl-d__0dwbpucoJqqXpPtfjirVcVHKZaxdmQA-nYvRkDQn-YjDGVtGmtW3268z7GMy6yja4rZv4syViGo3zC4GYH1FwnaasSVbRFQtFs-2XFHKczzNV4WkAujlyqSxN0QQHIFqJNLKgfnoJMqOQKOyapLeWnb8-hX2-EDgsmmwln30l644tdgm-G0JGg";

      // const accessToken = newTokenInfo.accsess_token;
      // if (accessToken) localStorage.setItem("accessToken", accessToken);
      const { tokenInfo, isSign, userInfo } = await SpotifyLogin(code, state);
      if (tokenInfo) {
        localStorage.setItem("spotify_access_token", tokenInfo.access_token);
        localStorage.setItem("spotify_refresh_token", tokenInfo.refresh_token);
        // spotifyId를 query string으로 넘겨주도록 변경
        // localStorage.setItem("spotifyId", userInfo.id);
        if (isSign) router.push("/login");
        else router.push(`/signup?spotifyId=${userInfo.id}`);
      }
    };
    if (isRender) {
      getToken(code, state);
    }
    if (!isRender) isRender = true;
  }, []);

  return <h1>로그인 중입니다...</h1>;
}

const SpotifyLogin = async (code, state) => {
  const res = await fetch(
    `http://localhost:8080/api/spotify/login?code=${code}&state=${state}`
  );
  return await res.json();
};

export const getRefreshToken = async (refreshToken) => {
  const res = await fetch("http://localhost:8080/api/refreshToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  return await res.json();
};
