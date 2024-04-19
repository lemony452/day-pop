const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const INITIAL_HEADERS = {
  "Content-Type": "application/json",
  credentials: "include",
};

// ----- 스포티파이 로그인 ------ //

// 스포티파이 토큰 재발급
export const getSpotifyRefresh = async (refresh_token) => {
  const res = await fetch(`${SERVER_URL}/spotify/refresh`, {
    method: "POST",
    headers: INITIAL_HEADERS,
    body: JSON.stringify({ refresh_token }),
  });

  return await res.json();
};

export const loginWithSpotify = async (code, state) => {
  const res = await fetch(
    `${SERVER_URL}/spotify/login?code=${code}&state=${state}`,
    {
      headers: INITIAL_HEADERS,
    }
  );
  return await res.json();
};

// ----- day-pop 로그인 ------ //

// 회원가입
export const signup = async (data) => {
  const res = await fetch(`${SERVER_URL}/signup`, {
    method: "POST",
    headers: INITIAL_HEADERS,
    body: JSON.stringify(data),
  });

  return await res.json();
};

// 로그인
export const login = async (data) => {
  const res = await fetch(`${SERVER_URL}/login`, {
    method: "POST",
    headers: INITIAL_HEADERS,
    body: JSON.stringify(data),
  });

  return await res.json();
};

// day-pop 토큰 재발급
export const getRefresh = async (access_token, refresh_token) => {
  const res = await fetch(`${SERVER_URL}/refresh`, {
    method: "POST",
    headers: {
      Authorizaiton: "Bearer " + access_token,
      refreshtoken: refresh_token,
      credentials: "include",
    },
  });

  return res;
};
