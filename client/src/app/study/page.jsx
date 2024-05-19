import { cookies } from "next/headers";
import { fat } from "@/app/layout";
import styles from "./page.module.css";

import { getRefresh, getSpotifyRefresh } from "@/lib/auth";
import WebPlayback from "@/components/WebPlayback";
import { getTrackInfo, getLyrics, getPopsongInfo } from "@/lib/play";
import StudyContent from "./study-content";

export default async function PopsongStudyPage({ searchParams }) {
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

  return (
    <section className={styles["study-container"]}>
      <div className={styles["study-wrapper"]}>
        <StudyContent trackId={trackId} />
      </div>
      <WebPlayback
        access_token={tokenInfo.access_token}
        cardInfo={cardInfo}
      ></WebPlayback>
    </section>
  );
}
