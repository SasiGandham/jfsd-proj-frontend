import { useEffect, useState } from "react";
import styles from "./RemovePolitician.module.css";

export default function RemovePolitician() {
  const [politicians, setPoliticians] = useState([]);

  useEffect(() => {
    const fetchPoliticians = async () => {
      try {
        const response = await fetch("http://localhost:8082/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch politicians");
        }
        const data = await response.json();
        const filteredPoliticians = data.filter(
          (user) => user.role === "politician"
        ); // Filter role = politician
        setPoliticians(filteredPoliticians);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPoliticians();
  }, []);

  const handleDelete = async (email) => {
    try {
      const response = await fetch(`http://localhost:8082/api/users/${email}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete politician");
      }
      alert("Politician deleted successfully!");
      setPoliticians(politicians.filter((user) => user.email !== email));
    } catch (error) {
      console.error(error);
      alert("Error deleting politician!");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Remove Politicians</h1>
      <div className={styles.politicianList}>
        {politicians.map((politician) => (
          <div key={politician.email} className={styles.politicianCard}>
            <img
              src={politician.photo}
              alt={politician.name}
              className={styles.politicianPhoto}
            />
            <div>
              <h3>{politician.name}</h3>
              <p>{politician.email}</p>
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(politician.email)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
