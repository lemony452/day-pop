import { getCookie, setCookie } from "cookies-next";
import { getRefresh } from "./auth";
import returnFetch from "return-fetch";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const INITIAL_HEADERS = {
  "Content-Type": "application/json",
};
const LYRICSOVH_URL = "https://api.lyrics.ovh/v1";

// fetch 응답 후 토큰 검증을 하고 다시 fetch 반환
export const fetchVerifyToken = (fetchArgs) =>
  returnFetch({
    ...fetchArgs,
    interceptors: {
      response: async (response, requestArgs, fetch) => {
        // 토큰 재발급 필요
        if (response.status !== 401) {
          return response;
        }

        console.log("401 에러,, 토큰 재발급 필요");
        const access_token = getCookie("access_token");
        const refresh_token = getCookie("refresh_token");
        const resTogetRefresh = await getRefresh(access_token, refresh_token);

        if (resTogetRefresh.status === 401) throw Error(resTogetRefresh.status);

        if (resTogetRefresh.status === 200) {
          const tokenInfo = await resTogetRefresh.json();
          setCookie("access_token", tokenInfo.access_token);
          setCookie("refresh_token", tokenInfo.refresh_token);

          // console.log(requestArgs); // [URL, {}]
          return fetch(requestArgs[0], {
            headers: {
              Authorization: "Bearer " + `${tokenInfo.access_token}`,
              "Content-Type": "application/json",
              credentials: "include",
            },
          });
        }

        return;
      },
    },
  });

// 팝송 api 요청 공통
export const fethcPopsongExtended = fetchVerifyToken({
  baseUrl: `${SERVER_URL}`,
  headers: {
    "Content-Type": "application/json",
    credentials: "include",
  },
});

// 가사 가져오기
export const getLyrics = async (artist, title) => {
  const res = await fetch(LYRICSOVH_URL + `/${artist}/${title}`);
  return await res.json();
};

// 플레이어 장치 상태 가져오기
export const getPlayState = async (access_token) => {
  const res = await fetch("https://api.spotify.com/v1/me/player", {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });

  return await res.json();
};

// 플레이어 바꾸기
export const transferPlayer = async (access_token, device_id) => {
  await fetch("https://api.spotify.com/v1/me/player", {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ device_ids: [device_id], play: true }),
  });
};

// 해당 트랙으로 플레이어 재생목록 설정하기
export const onPlayTrack = async (access_token, track_uri, device_id) => {
  const res = await fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: [track_uri], position_ms: 0 }),
    }
  );
};

// 트랙 정보 가져오기
export const getTrackInfo = async (trackId, access_token) => {
  const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });

  return await res.json();
};

// 원래 문장과 비교하기
export const compareSentence = (originSentence, sentence) => {
  let correct = 0;
  const incorrectArray = [];
  if (sentence.length > 0) {
    // 원래 문장 길이보다 작다는 가정
    for (let i = 0; i < Math.min(originSentence.length, sentence.length); i++) {
      if (sentence[i] === originSentence[i]) correct += 1;
      else incorrectArray.push(i);
    }
  }

  return { correct, incorrectArray };
};
