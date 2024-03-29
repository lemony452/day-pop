"use client";

import Button from "@/components/btn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function LoginForm({ styles }) {
  const router = useRouter();
  const formRef = useRef(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = {
      id: formRef.current.id.value,
      passwordValue: formRef.current.passwordValue.value,
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_LOCAL_SERVER_URL + "/login",
        config
      );
      const { access_token, refresh_token } = await res.json();
      if (access_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        return router.push("/");
      }
    } catch (e) {
      alert("로그인에 실패하였습니다.");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleLogin} className={styles["login-box"]}>
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
  );
}
