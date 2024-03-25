import Button from "@/components/btn";
import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function LoginPage() {
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
        <form className={styles["login-box"]}>
          <p>
            <label htmlFor="id">ID</label>
            <input
              type="text"
              name="id"
              id="id"
              placeholder="아이디를 입력해주세요"
            />
          </p>
          <p>
            <label htmlFor="passwordValue">Password</label>
            <input
              type="password"
              name="passwordValue"
              id="passwordValue"
              placeholder="비밀번호를 입력해주세요"
              autoComplete="off"
            />
          </p>
          <Button className={styles["login-btn"]}>로그인</Button>
          <Link href="/signup">회원가입 하러 가기</Link>
        </form>
      </div>
    </section>
  );
}
