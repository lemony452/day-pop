import styles from "./loading.module.css";

export default function Loading({ children }) {
  return (
    <section className={styles.loading}>
      <div className={styles.loader}></div>
      <div className={styles.loader}></div>
      <div className={styles.loader}></div>
      {children}
    </section>
  );
}
