import Image from "next/image";
import styles from "./card.module.css";

export default function Card({ imgSize, cardInfo, children }) {
  return (
    <div className={styles["card-wrapper"]}>
      <div
        className={styles["img-wrapper"]}
        style={{ width: imgSize, height: imgSize }}
      >
        <Image
          src={cardInfo.trackImgSrc}
          alt="album image"
          className={styles.image}
          width={imgSize}
          height={imgSize}
        ></Image>
      </div>
      <div className={styles["popsong-info"]}>
        <div className={styles.title}>{cardInfo.trackTitle}</div>
        <div className={styles.artist}>{cardInfo.trackArtist}</div>
      </div>
      {children}
    </div>
  );
}
