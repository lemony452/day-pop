import Card from "@/components/Card";
import styles from "./page.module.css";
import { fat } from "@/app/layout";
import { getPopsongInfo, getTrackInfo } from "@/lib/play";
import { cookies } from "next/headers";
import { getSpotifyRefresh } from "@/lib/auth";
import ResultInfo from "./result-info";

export default async function ResultPage({ searchParams }) {
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
    <section className={styles["result-container"]}>
      <ResultInfo
        cardInfo={cardInfo}
        trackId={trackId}
        styles={styles}
      ></ResultInfo>
    </section>
  );
}
