import styles from "./search.module.css";

export default function Search() {
  return (
    <div className={styles["search-wrapper"]}>
      <input
        className={styles.search}
        type="text"
        placeholder="팝송 검색하기"
      />
    </div>
  );
}
