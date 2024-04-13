import Script from "next/script";

export default function Layout({ children }) {
  return (
    <>
      {children}
      {/* <Script
        src="https://sdk.scdn.co/spotify-player.js"
        async={true}
        strategy="beforeInteractive"
      ></Script> */}
    </>
  );
}
