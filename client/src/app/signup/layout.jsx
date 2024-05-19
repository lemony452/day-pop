import Header from "@/components/Header";
import Image from "next/image";
import styles from "./page.module.css";

export default function SignupLayout({ children }) {
  return (
    <section className={styles["signup-container"]}>
      <Header></Header>
      <div className={styles["signup-wrapper"]}>
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
