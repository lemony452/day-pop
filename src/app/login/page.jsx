import styles from "./page.module.css";
import LoginForm from "./loginForm";

export default async function LoginPage() {
  return <LoginForm styles={styles} />;
}
