import Card from "@/components/card";
import styles from "./page.module.css";
import { fat } from "@/app/layout";

export default function ResultPage() {
  return (
    <section className={styles["result-section"]}>
      <div className={styles["result-wrapper"]}>
        <div className={`${styles["result-info"]} ${fat.variable}`}>
          <div className={styles["result-header"]}>학습 결과</div>
          <div className={styles["result-detail"]}>
            <Card imgSize={200}></Card>
            <div className={styles.rating}>
              <ul>
                <li>Perfect</li>
                <li>Great</li>
                <li>Good</li>
                <li>Bad</li>
                <li>Miss</li>
              </ul>
              <div className={styles.rank}>
                Rank
                <p>A</p>
              </div>
            </div>
          </div>
          <div className={styles["remain-lyrics"]}>
            <div>
              총 문장수
              <p>32</p>
            </div>
            <div>=</div>
            <div>
              학습한 문장 수<p>20</p>
            </div>
            <div>+</div>
            <div>
              남은 문장수
              <p>12</p>
            </div>
          </div>
        </div>
        <div className={styles["result-lyrics"]}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using Content here, content here, making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for lorem ipsum will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like). page
          editors now use Lorem Ipsum as their default model text, and a search
          for lorem ipsum will uncover many web sites still in their infancy.
          Various versions have evolved over the years, sometimes by accident,
          sometimes on purpose (injected humour and the like).
        </div>
      </div>
    </section>
  );
}
