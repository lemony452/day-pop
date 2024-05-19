import Image from "next/image";
import styles from "./Card.module.css";

export default function Card({ imgSize, cardInfo, children }) {
  return (
    <div className={styles["popsong-card-container"]}>
      <div
        className={styles["album-img-wrapper"]}
        style={{ width: imgSize, height: imgSize }}
      >
        <Image
          src={cardInfo.trackImgSrc}
          alt="album image"
          className={styles["album-img"]}
          width={imgSize}
          height={imgSize}
        ></Image>
      </div>
      <div className={styles["popsong-card-info"]}>
        <div className={styles["popsong-card-title"]}>
          {cardInfo.trackTitle}
        </div>
        <div className={styles["popsong-card-artist"]}>
          {cardInfo.trackArtist}
        </div>
      </div>
      {children}
    </div>
  );
}
