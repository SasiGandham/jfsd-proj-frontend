import { useEffect, useState } from "react";
import styles from "./RemoveUser.module.css";

export default function RemoveUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jfsd-backend-project.up.railway.app/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        const filteredUsers = data.filter((user) => user.role === "user"); // Filter role = user
        setUsers(filteredUsers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (email) => {
    try {
      const response = await fetch(`https://jfsd-backend-project.up.railway.app/${email}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      alert("User deleted successfully!");
      setUsers(users.filter((user) => user.email !== email));
    } catch (error) {
      console.error(error);
      alert("Error deleting user!");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Remove Users</h1>
      <div className={styles.userList}>
        {users.map((user) => (
          <div key={user.email} className={styles.userCard}>
            <img src={user.photo} alt={user.name} className={styles.userPhoto} />
            <div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(user.email)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
