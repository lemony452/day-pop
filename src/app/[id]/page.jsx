import Card from "@/components/card";
import Search from "@/components/search";
import styles from "./page.module.css";
import Button from "@/components/btn";
import { fat } from "../layout";
import Player from "@/components/player";
import Link from "next/link";

export default function PopsongPage(props) {
  const id = props.params.id;

  return (
    <section className={styles["popsong-section"]}>
      <div className={styles["popsong-wrapper"]}>
        <Search></Search>
        <div className={styles["popsong-contents"]}>
          <Card imgSize={250}></Card>
          <div className={`${styles["popsong-result"]} ${fat.variable}`}>
            <div className={styles["result-header"]}>Result</div>
            <div className={styles["result-grade"]}>-</div>
            <Link href={`/study/${id}`}>
              <Button className={styles["study-btn"]}>학습하기</Button>
            </Link>
          </div>
          <p className={styles["popsong-lyrics"]}>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using Content here, content
            here, making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for lorem ipsum will uncover many web sites
            still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </p>
        </div>
      </div>
      <Player></Player>
    </section>
  );
}
