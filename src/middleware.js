import { getRefresh, getSpotifyRefresh } from "@/lib/auth";
import { getPlayState, transferPlayer } from "@/lib/play";
import { getCookies } from "cookies-next";
import { NextResponse } from "next/server";

// import { cookies } from "next/headers";

export async function middleware(request, event) {
  let spotify_access_token;
  const { cookies } = request;
  console.log("쿠키들: ", cookies.getAll());

  const access_token = cookies.get("access_token");
  const refresh_token = cookies.get("refresh_token");
  const spotify_refresh_token = cookies.get("spotify_refresh_token");

  if (!spotify_refresh_token && request.nextUrl.pathname !== "/") {
    console.log("스포티파이 로그인 필요");
    return NextResponse.redirect(new URL("/"));
  } else {
    console.log("스포티파이 액세스 토큰 가져오기");
    const tokenInfo = await getSpotifyRefresh(spotify_refresh_token);
    if (tokenInfo) spotify_access_token = tokenInfo.access_token;
  }

  if (!access_token || !refresh_token) {
    console.log("day-pop 로그인 필요");
    return NextResponse.redirect(new URL("/login"));
  }

  if (request.nextUrl.pathname.startsWith("/myplaylist")) {
    console.log("내 플레이리스트에 옴");
    const { device } = await getPlayState(spotify_access_token);
    console.log("내 디바이스 정보 : ", device);
    if (device && !device.is_active) {
      console.log("디바이스 전환 필요");
      await transferPlayer(spotify_access_token, device.id);
    }
    return NextResponse.rewrite(new URL("/myplaylist", request.url));
  }

  // event.waitUntil(
  //   fetch(`http://localhost:8080/api/refresh}`, {
  //     method: "POST",
  //     headers: {
  //       Authorizaiton: "Bearer " + access_token,
  //       refreshToken: refresh_token,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((tokenInfo) => {
  //       console.log(tokenInfo);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // getRefresh(access_token, refresh_token)
  //   .then((res) => {
  //     console.log("미들웨어 요청 결과 : ", res);
  //     const { new_access_token, new_refresh_token } = res;
  //     cookies.set("access_token", new_access_token);
  //     cookies.set("refresh_token", new_refresh_token);
  //   })
  //   .catch((err) => {
  //     if (err.status === 401) return NextResponse.redirect(new URL("/login"));
  //     console.log(err);
  //   })
  // );

  return NextResponse.next();
}

export const config = {
  matcher: ["/myplaylist"],
};
