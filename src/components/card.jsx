import Image from "next/image";
import styles from "./card.module.css";

export default function Card({ imgSize, cardInfo }) {
  return (
    <div className={styles.cardWrapper}>
      <Image
        src={cardInfo.trackImgSrc}
        alt="album image"
        className={styles.image}
        width={imgSize}
        height={imgSize}
      ></Image>
      <div className={styles.title}>{cardInfo.trackTitle}</div>
      <div className={styles.artist}>{cardInfo.trackArtist}</div>
    </div>
  );
}
