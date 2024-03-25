import Image from "next/image";
import Button from "./btn";
import styles from "./header.module.css";
import Link from "next/link";

export default function Nav() {
  return (
    <>
      <Button className={styles.menu}>
        <Image src="/menu.png" alt="sidebar menu" width={30} height={30} />
      </Button>
      <Link href={`/result/${1}`}>
        <Button className={`${styles.button} ${styles.studyOver}`}>
          학습 종료
        </Button>
      </Link>
      <Link href="/">
        <Button className={`${styles.button} ${styles.toMain}`}>
          메인으로 돌아가기
        </Button>
      </Link>
    </>
  );
}
