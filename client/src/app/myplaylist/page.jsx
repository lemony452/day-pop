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

const getMyPlaylist = async (access_token) => {
  const res = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: HEADERS(access_token),
  });

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

  const playlist = await getMyPlaylist(tokenInfo.access_token);
  // const myplaylist = playlist.items?.map((item) => item.tracks) || [];
  const myplaylist = playlist.itmes[0].tracks;
  const tracksInfo = await getTracks(tokenInfo.access_token, myplaylist.href);
  // let tracksInfo = [];
  // if (myplaylist.length) {
  //   for (let playlist of myplaylist) {
  //     res = await getTracks(tokenInfo.access_token, playlist.href);
  //     tracksInfo.push([...res]);
  //   }
  // }

  return (
    <section className={styles.myplaylist}>
      <div className={styles["myplaylist-wrapper"]}>
        <div className={styles["myplaylist-header"]}>
          <div className={styles.name}>🎵 내 플레이리스트</div>
          <div className={styles.total}>{myplaylist.total} 곡</div>
        </div>
        <div className={styles["myplaylist-flex"]}>
          <div className={styles["myplaylist-flex-header"]}>
            <div>Title</div>
            <div>Album</div>
            <div>Time</div>
          </div>
          <ul>
            {tracksInfo.length > 0 ? (
              tracksInfo.items.map((trackInfo) => (
                <Link
                  href={{
                    pathname: "/detail",
                    query: { trackId: trackInfo.track.id },
                  }}
                  key={trackInfo.track.id}
                >
                  <MyPlaylistItem trackInfo={trackInfo}></MyPlaylistItem>
                </Link>
              ))
            ) : (
              <div>플레이리스트에 팝송을 추가해주세요</div>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
