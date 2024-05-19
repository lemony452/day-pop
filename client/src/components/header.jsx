"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { fat } from "@/app/layout";
import Nav from "./Navbar";
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
      <header className={`${styles["head-container"]} ${fat.variable}`}>
        <div className={styles["head-wrapper"]}>
          <Link href="/" className={styles["head-logo"]}>
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
