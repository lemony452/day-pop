import Link from "next/link";
import Card from "@/components/card";
import Search from "@/components/search";
import { getCookies } from "cookies-next";
import { cookies } from "next/headers";
import styles from "./page.module.css";
import { getSpotifyRefresh } from "@/lib/auth";
import Image from "next/image";
import WebPlayback from "@/components/WebPlayback";
import { redirect } from "next/navigation";
import Loading from "../dashboard/loading";

const getFeaturedPlaylist = async (access_token) => {
  const res = await fetch(
    "https://api.spotify.com/v1/browse/featured-playlists?limit=1",
    {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }
  );

  return await res.json();
};

const getMyTracks = async (access_token) => {
  const res = await fetch(
    "https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl",
    {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }
  );
  return await res.json();
};

export default async function PlaylistPage() {
  const cookiesStore = cookies();
  const spotify_refresh_token = cookiesStore.get("spotify_refresh_token");
  console.log(spotify_refresh_token);
  let playlistInfo;

  const tokenInfo = await getSpotifyRefresh(spotify_refresh_token.value);
  console.log(tokenInfo);
  if (!tokenInfo.access_token) {
    console.log("스포티파이 로그인을 진행해주세요");
    redirect("/");
  }
  // playlistInfo = await getFeaturedPlaylist(tokenInfo.access_token);
  // console.log("playlist : ", playlistInfo);
  // console.log("이미지 : ", playlistInfo.playlists.items.images);
  const trackData = await getMyTracks(tokenInfo.access_token);
  console.log("트랙 데이터 : ", trackData);

  // const temp = new Array(5).fill(0);
  return (
    <section className={styles["playlist-section"]}>
      <div className={styles["playlist-wrapper"]}>
        <Loading></Loading>
        {/* <Search></Search> */}
        {/* <h1>{playlistInfo.playlists.items.name}</h1> */}
        {/* <WebPlayback
          access_token={tokenInfo.access_token}
          track={trackData}
        ></WebPlayback> */}
        {/* {playlistInfo.playlists.items.images.map((image, idx) => {
          <Image
            src={image.url}
            alt="playlist image"
            width={160}
            height={160}
          ></Image>;
        })} */}
        {/* <h1>요즘 인기있는 팝송 TOP 10</h1>
        <div className={styles["top10-playlist"]}>
          {temp.map((v, idx) => (
            <Link href={`/${idx}`} key={idx}>
              <Card imgSize={160}></Card>
            </Link>
          ))}
        </div>
        <h1>최근 학습한 곡과 유사한 팝송</h1>
        <div className={styles["top10-playlist"]}>
          {temp.map((v, idx) => (
            <Link href={`/${idx}`} key={idx}>
              <Card imgSize={160}></Card>
            </Link>
          ))}
        </div> */}
      </div>
    </section>
  );
}
