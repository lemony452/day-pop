import styles from "./card.module.css";

export default function Card({ imgSize }) {
  return (
    <div className={styles.cardWrapper}>
      <div
        className={styles.image}
        style={{ width: `${imgSize}px`, height: `${imgSize}px` }}
      ></div>
      <div className={styles.title}>Title</div>
      <div className={styles.artist}>Artist</div>
    </div>
  );
}
