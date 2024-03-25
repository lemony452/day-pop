import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Card from "@/components/card";
import Search from "@/components/search";

export default async function Home() {
  const res = await fetch("http://localhost:8080/hello");
  const data = await res.json();
  console.log(data);
  return (
    // <section className={styles.welcome}>
    //   <div>
    //     <Image src="/pop.png" alt="pop logo" width={80} height={80} />
    //     <p className={styles.title}>Day POP에 오신걸 환영해요!</p>
    //     <p className={styles.subTitle}>
    //       좋아하는 팝송을 들으며 영어 공부를 할 수 있어요 😀
    //     </p>
    //     <Link href="/login" className={styles.loginBtn}>
    //       로그인
    //     </Link>
    //   </div>
    // </section>
    <Playlist></Playlist>
  );
}

function Playlist() {
  const temp = new Array(5).fill(0);
  return (
    <section className={styles["playlist-section"]}>
      <div className={styles["playlist-wrapper"]}>
        <Search></Search>
        <h1>요즘 인기있는 팝송 TOP 10</h1>
        <div className={styles["top10-playlist"]}>
          {temp.map((v, idx) => (
            <Link href={`/${idx}`} key={idx}>
              <Card imgSize={160}></Card>
            </Link>
          ))}
        </div>
        <h1>최근 학습한 곡과 유사한 팝송</h1>
        <div className={styles["top10-playlist"]}>
          {temp.map((v, idx) => (
            <Link href={`/${idx}`} key={idx}>
              <Card imgSize={160}></Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
