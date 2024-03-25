import Link from "next/link";
import styles from "./header.module.css";
import { fat } from "@/app/layout";
import Nav from "./navbar";

export default function Header() {
  return (
    <header className={`${styles.header} ${fat.variable}`}>
      <div className={styles.wraper}>
        <Link href="/" className={styles.logo}>
          Day POP
        </Link>
        <Nav />
      </div>
    </header>
  );
}
