import styles from "./loading.module.css";

export default function Loading() {
  return (
    <section className={styles.loading}>
      <div className={styles.loader}></div>
      <div className={styles.loader}></div>
      <div className={styles.loader}></div>
    </section>
  );
}
