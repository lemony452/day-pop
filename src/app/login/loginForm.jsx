"use client";

import Button from "@/components/btn";
import { login } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { setCookie } from "cookies-next";
import { useAppDispatch } from "@/lib/hooks";
import { userActions } from "@/lib/user/userSlice";

export default function LoginForm({ styles }) {
  const router = useRouter();
  const formRef = useRef(null);
  const dispatch = useAppDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = {
      id: formRef.current.id.value,
      passwordValue: formRef.current.passwordValue.value,
    };
    try {
      const { access_token, refresh_token } = await login(data);
      if (access_token) {
        setCookie("access_token", access_token);
        setCookie("refresh_token", refresh_token);
        router.push("/myplaylist");
        dispatch(userActions.login());
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
