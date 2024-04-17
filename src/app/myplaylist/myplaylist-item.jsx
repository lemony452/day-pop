import Image from "next/image";
import styles from "./page.module.css";

export default function MyPlaylistItem({ trackInfo }) {
  const duration = Math.ceil(trackInfo.track.duration_ms / 1000); // ms -> s
  const minute = parseInt(duration / 60);
  let seconds = duration % 60;

  return (
    <li className={styles.item}>
      <div className={styles["item-title"]}>
        <Image
          src={trackInfo.track.album.images[0].url}
          alt="album img"
          width={70}
          height={70}
          className={styles["item-image"]}
        ></Image>
        <div className={styles["item-title-box"]}>
          <div className={styles["item-name"]}>{trackInfo.track.name}</div>
          <div className={styles["item-artist"]}>
            {trackInfo.track.artists[0].name}
          </div>
        </div>
      </div>
      <div className={styles["item-album"]}>{trackInfo.track.album.name}</div>
      <div className={styles["item-time"]}>
        {minute}:{seconds < 10 ? "0" + String(seconds) : seconds}
      </div>
    </li>
  );
}
