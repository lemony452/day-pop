"use client";

import Link from "next/link";
import styles from "./header.module.css";
import { fat } from "@/app/layout";
import Nav from "./navbar";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getCookie } from "cookies-next";
import { userActions } from "@/lib/user/userSlice";

export default function Header() {
  const [isClient, setIsClient] = useState(false);
  const { isLogin } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsClient(true);
    if (getCookie("access_token")) dispatch(userActions.login());
  }, [dispatch]);

  if (isClient) {
    return (
      <header className={`${styles.header} ${fat.variable}`}>
        <div className={styles.wraper}>
          <Link href="/" className={styles.logo}>
            Day POP
          </Link>
          {isLogin && <Nav />}
        </div>
      </header>
    );
  } else {
    return <></>;
  }
}
