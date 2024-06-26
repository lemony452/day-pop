import Link from "next/link";
import { cookies } from "next/headers";
import styles from "./page.module.css";

import Card from "@/components/Card";
import { getSpotifyRefresh, getRefresh } from "@/lib/auth";
import { getLyrics, getPopsongInfo, getTrackInfo } from "@/lib/play";
import StartStudy from "./start-study";
import Result from "./result";

export default async function PopsongPage({ searchParams }) {
  const { trackId } = searchParams;
  const cookiesStore = cookies();
  const spotify_refresh_token = cookiesStore.get("spotify_refresh_token");
  const tokenInfo = await getSpotifyRefresh(spotify_refresh_token.value);

  const trackInfo = await getTrackInfo(trackId, tokenInfo.access_token);

  const cardInfo = {
    trackTitle: trackInfo.name,
    trackArtist: trackInfo.artists[0].name,
    trackImgSrc: trackInfo.album.images[0].url,
    track_uri: trackInfo.uri,
  };

  let lyrics = [];
  try {
    const res = await getLyrics(cardInfo.trackArtist, cardInfo.trackTitle);
    if (res.error) throw new Error("가사를 가져오는데 실패하였습니다");
    lyrics = res.lyrics.split("\n").slice(1);
  } catch (e) {
    lyrics = [];
  }

  return (
    <section className={styles["popsong-section"]}>
      <div className={styles["popsong-wrapper"]}>
        <div className={styles["popsong-contents"]}>
          <Card imgSize={400} cardInfo={cardInfo}>
            <Result styles={styles} trackId={trackId}></Result>
            <StartStudy
              styles={styles}
              cardInfo={cardInfo}
              lyrics={lyrics}
              trackId={trackId}
            ></StartStudy>
          </Card>
          <div className={styles["popsong-lyrics"]}>
            {lyrics.length > 0
              ? lyrics.map((sentence, idx) => <p key={idx}>{sentence}</p>)
              : "가사를 가져오는데 실패하였습니다:("}
          </div>
        </div>
      </div>
    </section>
  );
}
