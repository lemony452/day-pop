import Header from "@/components/header";
import Image from "next/image";
import styles from "./page.module.css";

export default function LoginLayout({ children }) {
  return (
    <section className={styles["login-section"]}>
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
