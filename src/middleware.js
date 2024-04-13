import { getRefresh, getSpotifyRefresh } from "@/lib/auth";
import { getPlayState, transferPlayer } from "@/lib/play";
import { getCookies, setCookie } from "cookies-next";
import { NextResponse } from "next/server";

export async function middleware(request, event) {
  const url = request.nextUrl.origin;
  // console.log(request.nextUrl);
  let spotify_access_token;
  console.log("cookies-next : ", getCookies());
  const { cookies } = request;
  const response = NextResponse.next();
  console.log("쿠키들: ", cookies.getAll());

  const access_token = cookies.get("access_token").value;
  const refresh_token = cookies.get("refresh_token").value;
  const spotify_refresh_token = cookies.get("spotify_refresh_token").value;

  if (!spotify_refresh_token && request.nextUrl.pathname !== "/") {
    console.log("스포티파이 로그인 필요");
    return NextResponse.redirect(new URL(url));
  } else {
    console.log("스포티파이 액세스 토큰 가져오기");
    const tokenInfo = await getSpotifyRefresh(spotify_refresh_token);
    if (tokenInfo) spotify_access_token = tokenInfo.access_token;
  }

  if (spotify_refresh_token && (!access_token || !refresh_token)) {
    console.log("day-pop 로그인 필요");
    return NextResponse.redirect(new URL(url + "/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/myplaylist")) {
    console.log("내 플레이리스트에 옴");
    // const { device } = await getPlayState(spotify_access_token);
    // console.log("내 디바이스 정보 : ", device);
    // if (device && !device.is_active) {
    // }
    // console.log("디바이스 전환 필요");
    // await transferPlayer(spotify_access_token, device.id);
    return NextResponse.rewrite(new URL(url + "/myplaylist"));
  }

  return response;
}

export const config = {
  matcher: [
    "/myplaylist/:path",
    "/detail/:path",
    "/study/:path",
    "/result/:path",
  ],
};
