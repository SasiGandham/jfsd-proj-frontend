import { useNavigate } from "react-router-dom";
import styles from "./AdminNavBar.module.css";

const UserNavBar = () => {
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/login");
  }

  function handleAdd() {
    navigate("add");
  }

  return (
    <div className={styles.navbar}>
      <h1 className={styles.dashboardText}>Admin DashBoard</h1>
      <div>
        <button className={styles.applicationBtn} onClick={handleAdd}>
          Add/Remove
        </button>
      </div>
      <div className={styles.profile}>
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className={styles.profilePic}
        />
        <p className={styles.name}>Admin</p>
      </div>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserNavBar;
