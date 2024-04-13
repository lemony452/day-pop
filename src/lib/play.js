import { getCookie, setCookie } from "cookies-next";
import { getRefresh } from "./auth";
import { useRouter } from "next/navigation";

const SERVER_URL = process.env.NEXT_PUBLIC_LOCAL_SERVER_URL;
const INITIAL_HEADERS = {
  "Content-Type": "application/json",
};
const LYRICSOVH_URL = "https://api.lyrics.ovh/v1";
const ACCESS_TOKEN = getCookie("access_token");
const REFRESH_TOKEN = getCookie("refresh_token");

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
  console.log("트랙 : ", track_uri);
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

  console.log(res);
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
  console.log("원래 가사 : ", originSentence);
  console.log("내가 쓴 가사 : ", sentence);
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

// 학습한 팝송 정보 가져오기
export const getPopsongInfo = async (trackId) => {
  const res = await fetch(SERVER_URL + `/popsong/${trackId}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + ACCESS_TOKEN,
    },
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("액세스 토큰이 유효하지 않습니다");
    else if (res.status === 400) throw new Error("학습한 적이 없는 팝송입니다");
    else throw new Error("학습 결과를 가져오지 못했습니다");
  }

  return await res.json();
};

// 학습한 팝송 목록에 추가하기
export const addStudyingList = async (popsongData) => {
  console.log(popsongData);
  const res = await fetch(SERVER_URL + "/popsong", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + ACCESS_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...popsongData }),
  });

  if (!res.ok) throw new Error("팝송을 저장하는데 실패하였습니다");

  return await res.json();
};

// 학습한 내용 저장하기
export const editStudyingPopsong = async (savingData) => {
  const bodyValue = {
    savedData: savingData.savedData,
  };
  if (savingData.grade && savingData.score) {
    Object.assign(bodyValue, {
      score: savingData.score,
      grade: savingData.grade,
    });
  }
  console.log(savingData);

  const res = await fetch(SERVER_URL + `/popsong/${savingData.popsongId}`, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + ACCESS_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyValue),
  });

  if (!res.ok) throw new Error("팝송을 저장하는데 실패하였습니다");

  return await res.json();
};
