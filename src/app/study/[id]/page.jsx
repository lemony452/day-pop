import Player from "@/components/player";
import styles from "./page.module.css";
import { fat } from "@/app/layout";

export default function PopsongStudyPage() {
  return (
    <section className={styles["study-section"]}>
      <div className={styles["study-wrapper"]}>
        <div className={`${styles.remain} ${fat.variable}`}>
          남은 문장 수 <span>1 / 33</span>
        </div>
        <div className={styles["study-box"]}>
          <div className={`${styles.rating} ${fat.variable}`}>A</div>
          <p className={styles.lyrics}>
            Contrary to popular belief, Lorem Ipsum is not simply random text.{" "}
          </p>
        </div>
        <input type="text" placeholder="한 문장씩 가사를 입력해 주세요" />
      </div>
      <Player></Player>
    </section>
  );
}
