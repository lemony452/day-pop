import styles from "./player.module.css";

export default function Player() {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-wrapper"]}>
        <div className={styles["player-info"]}></div>
        <div className={styles["player-controll"]}></div>
      </div>
    </footer>
  );
}
