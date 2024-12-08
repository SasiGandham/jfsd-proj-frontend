import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to Citizens and Politicians App</h1>
      <Link to="/login" className={styles.link}>
        Login
      </Link>
      <Link to="/signup" className={styles.link}>
        SignUp
      </Link>
    </div>
  );
}
