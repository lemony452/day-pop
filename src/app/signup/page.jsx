import Header from "@/components/header";
import Image from "next/image";
// import Button from "@/components/btn";
// import Link from "next/link";
import styles from "./page.module.css";
import SignupForm from "./signupForm";

export default function SignupPage() {
  return (
    <section className={styles["signup-section"]}>
      <Header></Header>
      <div className={styles["signup-wrapper"]}>
        <Image
          src="/pop.png"
          alt="pop logo img"
          width={80}
          height={80}
          priority
        ></Image>
        <SignupForm styles={styles}></SignupForm>
      </div>
    </section>
  );
}
