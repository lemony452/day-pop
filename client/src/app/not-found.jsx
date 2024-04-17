import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="not-found">
      <Image
        src="/pop.png"
        alt="day-pop logo image"
        width={80}
        height={80}
      ></Image>
      <h1>404 Not Found</h1>
      <Link href="/myplaylist">플레이리스트로 돌아가기</Link>
    </div>
  );
}
