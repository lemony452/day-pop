import { cookies } from "next/headers";
import MyPlaylistItem from "./myplaylist-item";
import styles from "./page.module.css";
import { getSpotifyRefresh } from "@/lib/auth";
import Link from "next/link";

const HEADERS = (access_token) => {
  return {
    Authorization: "Bearer " + access_token,
  };
};

const getMyPlaylist = async (access_token, limit) => {
  const res = await fetch(
    `https://api.spotify.com/v1/me/playlists?limit=${limit}`,
    {
      headers: HEADERS(access_token),
    }
  );

  return await res.json();
};

const getTracks = async (access_token, trackHref) => {
  const res = await fetch(trackHref, { headers: HEADERS(access_token) });
  return await res.json();
};

export default async function MyplaylistPage() {
  const cookiesStore = cookies();
  const spotify_refresh_token = cookiesStore.get("spotify_refresh_token");

  const tokenInfo = await getSpotifyRefresh(spotify_refresh_token.value);

  const playlist = await getMyPlaylist(tokenInfo.access_token, 3);
  const myplaylist = playlist.items.map((item) => item.tracks);
  let tracksInfo = [];
  for (let playlist of myplaylist) {
    if (playlist.total > 0) {
      const res = await getTracks(tokenInfo.access_token, playlist.href);
      tracksInfo.push(...res.items);
    }
  }

  return (
    <section className={styles["myplaylist-container"]}>
      <div className={styles["myplaylist-wrapper"]}>
        <div className={styles["myplaylist-header"]}>
          <div className={styles["myplaylist-header-title"]}>
            🎵 내 플레이리스트
          </div>
          <div className={styles["myplaylist-header-cnt"]}>
            {tracksInfo.length} 곡
          </div>
        </div>
        <div className={styles["myplaylist-contents"]}>
          <div className={styles["myplaylist-contents-header"]}>
            <div>Title</div>
            <div>Album</div>
            <div>Time</div>
          </div>
          {tracksInfo.length > 0 ? (
            <ul className={styles["myplaylist-items-container"]}>
              {tracksInfo.map((trackInfo) => (
                <Link
                  className={styles["myplaylist-item-row"]}
                  href={{
                    pathname: "/detail",
                    query: { trackId: trackInfo.track.id },
                  }}
                  key={trackInfo.track.id}
                >
                  <MyPlaylistItem trackInfo={trackInfo}></MyPlaylistItem>
                </Link>
              ))}
            </ul>
          ) : (
            <div className={styles["myplaylist-items-empty"]}>
              스포티파이 플레이리스트에 팝송을 추가해주세요
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
