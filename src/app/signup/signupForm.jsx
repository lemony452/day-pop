"use client";

import Button from "@/components/btn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function SignupForm({ styles }) {
  const router = useRouter();
  const formRef = useRef(null);

  const handleSignup = async (event) => {
    event.preventDefault();
    const spotifyId = localStorage.getItem("spotifyId");
    const data = {
      id: formRef.current.id.value,
      passwordValue: formRef.current.passwordValue.value,
      nickname: formRef.current.nickname.value,
      spotifyId,
    };
    console.log(data);
    const res = await fetch(
      process.env.NEXT_PUBLIC_LOCAL_SERVER_URL + "/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const { access_token, refresh_token } = await res.json();
    if (access_token) {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    } else {
      alert("회원가입에 실패하였습니다.");
    }
    return router.push("/");
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSignup}
      className={styles["signup-box"]}
    >
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
        <label htmlFor="id">Nickname</label>
        <input
          type="text"
          name="nickname"
          id="nickname"
          placeholder="닉네임을 입력해주세요"
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
      <Button className={styles["signup-btn"]}>회원가입</Button>
      <Link href="/signup">로그인 하러 가기</Link>
    </form>
  );
}
