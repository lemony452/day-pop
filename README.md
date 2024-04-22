# Day POP 🎧

<img src="https://github.com/lemony452/day-pop/assets/109330624/98408a5f-40c0-44a7-964d-0057c291e6a4" width="100">  

> 팝송을 듣고, 직접 가사를 써보며 영어 학습을 할 수 있어요  
> URL : https://day-pop.vercel.app  

📌 이용시 주의사항 : 해당 서비스는 스포티파이 프리미엄 계정이 필요합니다

# 지원 기능
- 스포티파이에서 설정한 나만의 플레이리스트를 볼 수 있어요
- 팝송을 들으며 가사를 직접 입력하면 등급을 보여줘서 리듬게임처럼 재밌게 학습할 수 있어요
- 학습 내용을 저장하고 이어하기가 가능해요
- 학습을 통해 좋은 결과를 내면 점수를 쌓고 등급을 올릴 수 있어요

# 데모 영상
https://github.com/lemony452/day-pop/assets/109330624/9051f957-f666-4279-a143-8f78c80c95ac

# 프로젝트 설명

## 1. 기획 동기
좋아하는 팝송을 들으며 게임처럼 영어 공부를 하면 좋겠다는 생각에 Day POP을 만들었습니다

## 2. 설계 및 디자인

먼저 [요구사항 정의서](https://morning-rock-513.notion.site/c4fc7b0f3c9e493cba1abb255fb59e88?pvs=4)를 바탕으로 [DB](https://morning-rock-513.notion.site/DB-21974dd0bf2c4d9bb782169ff98bd824?pvs=4)와 [디자인](https://www.figma.com/file/zHD0v59XgvknhLWLtcL3rZ/Day-POP?type=design&node-id=0-1&mode=design&t=CMjqZCSjiS7gL9aq-0)을 설계했습니다  
화면 파트별로 핵심기능들을 사용하는 유저 플로우를 예상하고, 각각의 유저 기능들을 명세하면서 구체화했습니다  

### 폴더 구조
```
📦 client
├─ public
└─ src
   ├─ app
   │  ├─ callback
   │  ├─ dashboard
   │  ├─ detail
   │  ├─ login
   │  ├─ myplaylist
   │  ├─ result
   │  ├─ signup
   │  └─ study
   ├─ components
   └─ lib
      ├─ modal
      ├─ study
      └─ user
```

```
📦 server
├─ controller
├─ models
├─ routes
└─ utils
```

## 3. 기술스택 및 사용이유

### FE
`Nextjs`
  - React를 기반으로 SSR을 사용해 초기 렌더링을 시간을 줄여 성능을 개선하고, SEO 최적화에 유리해 사용하였습니다
  - 라우터 기능을 위해 따로 라이브러리를 설치하지 않아도 폴더별로 페이지 라우팅을 쉽게 할 수 있습니다

`Redux-Toolkit`
  - 유저 상태, 학습 상태를 관리하는데 createSlice로 액션 함수를 간결하게 정의하고, state의 불변성을 유지하도록 도와주기 때문에 선택했습니다  
  - createAsyncThunk를 사용해 비동기 데이터를 패칭하고 로딩, 에러 처리를 할 수 있었습니다

`Return-Fetch`
  - 401 응답 코드를 확인하고 액세스 토큰을 재발급해 해당 요청을 재시도하기 위한 intercepter 구현을 목적으로 사용했습니다
  - 약 65kB로 타 라이브러리보다 가벼우면서 nextjs에서 제공하는 fetch의 장점을 해치지 않고 사용할 수 있었습니다

`cookies-next`
  - jwt 토큰을 쿠키에 저장하고 사용하는데 서버 & 클라이언트 컴포넌트 모두 접근이 가능합니다
  - 쉽게 쿠키를 설정, 조회할 수 있도록 GET, SET 등 다양한 매서드들을 제공합니다

### BE
`Nodejs`
`Express`
`MongoDB`
`Mongoose`

### Deploy
`Vercel`
  - 빌드 및 배포를 자동화 기능을 지원해주어 쉽게 배포할 수 있었습니다
  - Nextjs의 SSR에 필요한 서버를 지원하기 때문에 프론트 단 배포에 선택하였습니다

`Cloudtype`
  - 서버가 한국에 위치해 속도가 빠르고, 사용하기 쉬운 PaaS를 선택했습니다
  - 백엔드 서버와 DB 배포에 사용했습니다

## 4. 개발 과정

### Nextjs 커스텀서버를 사용하지 않고 서버를 분리하게 된 이유

Nextjs에서 제공하는 커스텀 서버에서 api를 만들어 사용할 계획이었으나
[공식문서](https://nextjs.org/docs/pages/building-your-application/configuring/custom-server) 내용을 통해 서버를 따로 만들기로 했습니다

> 사용자 정의 서버를 사용하기로 결정하기 전에 Next.js의 통합 라우터가 앱 요구 사항을 충족할 수 없는 경우에만 사용해야 한다는 점을 명심하세요
> 맞춤형 서버는 서버리스 기능 및 자동 정적 최적화 와 같은 중요한 성능 최적화를 제거합니다
> Vercel에는 사용자 정의 서버를 배포 할 수 없습니다  

Nextjs를 Vercel로 배포할 계획이었고, 자체 JWT 로그인과 유저, 팝송 api 모두 구현하면 규모가 더 커지기 때문에 따로 관리하는 것이 나을 것이라고 판단했습니다  

### 스포티파이 Oauth만 쓰려다가 JWT 로그인을 구현하게 된 이유

스포티파이의 고유한 userId 값으로 Day POP 유저와 팝송 학습 정보에 사용할 생각이었습니다  
하지만 유저 정보가 탈취되면 이차적인 본인 인증 수단이 없었기 때문에 보안에 취약하였습니다  
세션 로그인을 사용하는 방법도 있었지만 당시 서버 세션에 부담을 주는 방법보다 중요한 정보를 해쉬 암호화해 전송하는 방법인 JWT를 선택하게 되었습니다  
또한 액세스 토큰 탈취 시 위험을 줄이기 위해 만료 시간을 1시간으로 두고 리프레시 토큰을 통해 재발급할 수 있도록 했습니다  

### 토큰 유무에 따라 리다이렉트 처리하기

Nextjs의 미들웨어는 캐시 전, 요청 전에 실행되어 리다이렉트 처리가 가능하고 쿠키를 사용할 수 있습니다  
로그인을 할 때, 스포티파이 리프레시 토큰, 자체 액세스 토큰, 리프레시 토큰 3가지를 쿠키에 저장하고 나면  
로그인 이후 모든 요청 전에 해당 유무를 미들웨어에서 미리 판단할 수 있어 home, login, myplaylist 각 페이지로 리다이렉트 처리를 할 수 있었습니다

### return-fetch로 코드의 안정성과 재사용성 높이기

모든 API 요청을 fetch로 구현하다보니 중복된 코드가 많아졌고, 그만큼 실수에 대한 위험도도 높고 유지보수도 까다로운 코드가 되었습니다  
또한 모든 요청 전에 토큰 검증을 하다보니 비효율적으로 느껴졌습니다 이러한 문제를 해결하면서 Nextjs에서 제공하는 fetch의 장점도 취할 수 있는 방법을 찾다 return-fetch 라이브러리를 선택하였습니다  

return-fetch는 전역 fetch를 건드리지 않고 Axios처럼 baseUrl, header과 같은 기본적인 설정을 할 수 있습니다  
또한 interceptor를 사용해 토큰 재발급 과정을 추가하고 재발급한 토큰으로 해당 요청을 다시 실행할 수 있었습니다  
토큰을 검증하는 `fetchVerifyToken` 함수와 공통 api 요청을 하는 `fethcPopsongExtended` 함수 2가지를 정의했습니다  
기존의 useEffect로 토큰을 검증한 코드들과 createAsyncThunk에 사용했던 각각의 api 요청 함수들 모두 위의 두 함수들로 줄일 수 있었습니다  


```js
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
  },
});
```

## 5. 트러블 슈팅

> URL: https://morning-rock-513.notion.site/8386087a94254dafad53ee8d31dc5070?pvs=4


## 6. 프로젝트 후기







