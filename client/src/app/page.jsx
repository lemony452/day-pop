import Image from "next/image";
import styles from "./page.module.css";

import Button from "@/components/Btn";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookiesStore = cookies();

  const access_token = cookiesStore.get("access_token")?.value;
  if (access_token) redirect("/myplaylist");

  return (
    <section className={styles["welcome-container"]}>
      <div className={styles["welcome-wrapper"]}>
        <Image src="/pop.png" alt="pop logo" width={80} height={80} />
        <p className={styles["welcome-title"]}>Day POP에 오신걸 환영해요!</p>
        <p className={styles["welcome-sub-title"]}>
          좋아하는 팝송을 들으며 영어 공부를 할 수 있어요 😀
        </p>
        <Button isLogin={true} className={styles["login-btn"]}>
          <Image
            src="/SpotifyLogo.png"
            alt="spotify logo img"
            width={30}
            height={30}
          ></Image>
          <div>스포티파이 로그인하기</div>
        </Button>
      </div>
    </section>
  );
}
