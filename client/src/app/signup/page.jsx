import styles from "./page.module.css";

import SignupForm from "./signupForm";

export default function SignupPage({ searchParams }) {
  const spotifyId = searchParams.spotifyId;
  return <SignupForm styles={styles} spotifyId={spotifyId} />;
}
