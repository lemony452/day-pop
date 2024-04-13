import { cookies } from "next/headers";
import { fat } from "@/app/layout";
import styles from "./page.module.css";

import { getRefresh, getSpotifyRefresh } from "@/lib/auth";
import WebPlayback from "@/components/WebPlayback";
import { getTrackInfo, getLyrics, getPopsongInfo } from "@/lib/play";
import RemainSentence from "./remain-sentence";
import SentenceInput from "./sentence-input";
import Result from "./result";
import { redirect } from "next/navigation";
import StudyContent from "./study-content";

const cookiesStore = cookies();
const ACCESS_TOKEN = cookiesStore.get("access_token");
const REFRESH_TOKEN = cookiesStore.get("refresh_token");

export default async function PopsongStudyPage({ searchParams }) {
  const { trackId } = searchParams;

  // const spotify_refresh_token = cookiesStore.get("spotify_refresh_token");
  // const tokenInfo = await getSpotifyRefresh(spotify_refresh_token.value);

  // const trackInfo = await getTrackInfo(trackId, tokenInfo.access_token);
  // // console.log(trackInfo);

  // const cardInfo = {
  //   trackTitle: trackInfo.name,
  //   trackArtist: trackInfo.artists[0].name,
  //   trackImgSrc: trackInfo.album.images[0].url,
  //   track_uri: trackInfo.uri,
  // };

  // let lyrics = [];
  // try {
  //   const res = await getLyrics(cardInfo.trackArtist, cardInfo.trackTitle);
  //   // console.log(res);
  //   lyrics = res.lyrics.split("\n").slice(1);
  // } catch (e) {
  //   lyrics = [];
  // }
  return (
    <section className={styles["study-section"]}>
      <div className={styles["study-wrapper"]}>
        <StudyContent trackId={trackId} />
      </div>
      {/* <WebPlayback
        access_token={tokenInfo.access_token}
        cardInfo={cardInfo}
      ></WebPlayback> */}
    </section>
  );
}
