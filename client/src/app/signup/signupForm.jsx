"use client";

import Button from "@/components/Btn";
import { signup } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { setCookie } from "cookies-next";

export default function SignupForm({ styles, spotifyId }) {
  // const searchParams = useSearchParams();
  // const spotifyId = searchParams.get("spotifyId");
  const router = useRouter();
  const formRef = useRef(null);

  const handleSignup = async (event) => {
    event.preventDefault();
    // const spotifyId = localStorage.getItem("spotifyId");
    const data = {
      id: formRef.current.id.value,
      passwordValue: formRef.current.passwordValue.value,
      nickname: formRef.current.nickname.value,
      spotifyId,
    };
    const { access_token, refresh_token } = await signup(data);
    if (access_token) {
      setCookie("access_token", access_token);
      setCookie("refresh_token", refresh_token);
      router.push("/playlist");
    } else {
      alert("회원가입에 실패하였습니다.");
    }
    router.push("/");
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSignup}
      className={styles["signup-contents-container"]}
    >
      <p className={styles["signup-id-wrapper"]}>
        <label className={styles["signup-id-label"]} htmlFor="id">
          ID
        </label>
        <input
          className={styles["signup-id-input"]}
          type="text"
          name="id"
          id="id"
          placeholder="아이디를 입력해주세요"
        />
      </p>
      <p className={styles["signup-nickname-wrapper"]}>
        <label className={styles["signup-nickname-label"]} htmlFor="id">
          Nickname
        </label>
        <input
          className={styles["signup-nickname-input"]}
          type="text"
          name="nickname"
          id="nickname"
          placeholder="닉네임을 입력해주세요"
        />
      </p>
      <p className={styles["signup-password-wrapper"]}>
        <label
          className={styles["signup-password-label"]}
          htmlFor="passwordValue"
        >
          Password
        </label>
        <input
          className={styles["signup-password-input"]}
          type="password"
          name="passwordValue"
          id="passwordValue"
          placeholder="비밀번호를 입력해주세요"
          autoComplete="off"
        />
      </p>
      <Button className={styles["signup-btn"]}>회원가입</Button>
      <Link className={styles["login-page-link"]} href="/signup">
        로그인 하러 가기
      </Link>
    </form>
  );
}
