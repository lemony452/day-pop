const request = require("request");
const querystring = require("querystring");
const { generateRandomString } = require("../utils/utils");
const User = require("../models/user");

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// 인가코드를 요청할 주소 url 가져오기
module.exports.getCode = (req, res) => {
  const state = generateRandomString(16);
  const scope =
    "user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming";
  // const scope = "user-read-private user-read-email";

  res.json(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state,
      })
  );
};

module.exports.spotifyLogin = (req, res) => {
  const { code, state } = req.query;

  if (!code || !state)
    return res.status(500).json("토큰을 가져오는데 실패하였습니다.");

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
    },
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    },
    json: true,
  };

  request.post(authOptions, async function (error, response, body) {
    try {
      if (!error && response.statusCode === 200) {
        const tokenInfo = body;
        const userInfo = await getUserInfo(tokenInfo.access_token);
        const user = await User.exists({ spotifyId: userInfo.id });
        if (user) res.status(200).json({ tokenInfo, isSign: true, userInfo });
        else res.status(200).json({ tokenInfo, isSign: false, userInfo });
      } else {
        throw new Error(500);
      }
    } catch (e) {
      res.status(500).json("스포티파이 로그인에 실패하였습니다");
    }
  });
};

module.exports.getRefreshToken = (req, res) => {
  const { refresh_token } = req.body;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.status(200).json(body);
    } else {
      res.status(500).json("리프레시 토큰을 가져오기 실패");
    }
  });
};

const getUserInfo = async (access_token) => {
  const url = "https://api.spotify.com/v1/me";

  // accesstoken으로 유저 정보 가져오기
  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + access_token },
  });

  return await res.json();
};
