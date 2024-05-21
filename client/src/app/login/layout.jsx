import Header from "@/components/Header";
import Image from "next/image";
import styles from "./page.module.css";

export default function LoginLayout({ children }) {
  return (
    <section className={styles["login-container"]}>
      <Header></Header>
      <div className={styles["login-wrapper"]}>
        <Image
          src="/pop.png"
          alt="pop logo img"
          width={80}
          height={80}
          priority
        ></Image>
        {children}
      </div>
    </section>
  );
}
