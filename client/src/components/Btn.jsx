"use client";

import { useRouter } from "next/navigation";

export default function Btn({ children, isLogin = false, ...props }) {
  const router = useRouter();
  const handleLogin = async () => {
    if (isLogin) {
      const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/code");
      const spotifyLogin = await res.json();
      router.push(spotifyLogin);
    }
  };
  return (
    <button {...props} onClick={handleLogin}>
      {children}
    </button>
  );
}
