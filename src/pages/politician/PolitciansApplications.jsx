import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./PoliticiansApplications.module.css";

export default function PoliticianApplications() {
  const userMail = useSelector((state) => state.login.userMail);
  const [userDetails, setUserDetails] = useState(null);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userMail) {
      setError("Please log in to view user details.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const [userDetailsResponse, applicationsResponse] = await Promise.all([
          fetch(`http://localhost:8082/api/users/${userMail}`),
          fetch(`http://localhost:8082/api/applications/politician/${userMail}`),
        ]);

        if (!userDetailsResponse.ok || !applicationsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const userDetailsData = await userDetailsResponse.json();
        const applicationsData = await applicationsResponse.json();

        setUserDetails(userDetailsData);
        setApplications(applicationsData);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userMail]);

  if (loading) return <p className={`${styles.message} ${styles.loading}`}>Loading...</p>;
  if (error) return <p className={`${styles.message} ${styles.error}`}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Your Details</h1>
      <div className={styles.userDetails}>
        {userDetails ? (
          <div>
            <p className={styles.detail}>
              <span className={styles.strong}>Name:</span> {userDetails.name}
            </p>
            <p className={styles.detail}>
              <span className={styles.strong}>Email:</span> {userDetails.email}
            </p>
            <p className={styles.detail}>
              <span className={styles.strong}>Role:</span> {userDetails.role}
            </p>
            {userDetails.photo && (
              <img
                src={userDetails.photo}
                alt="User"
                className={styles.photo}
              />
            )}
          </div>
        ) : (
          <p>User details not found.</p>
        )}
      </div>

      <h2 className={styles.subheading}>Applications</h2>
      <div>
        {applications && applications.length > 0 ? (
          <ul className={styles.applicationsList}>
            {applications.map((app) => (
              <li key={app.id} className={styles.applicationItem}>
                <p className={styles.applicationDetail}>
                  <span className={styles.strong}>Application ID:</span>{" "}
                  {app.id}
                </p>
                <p className={styles.applicationDetail}>
                  <span className={styles.strong}>Description:</span>{" "}
                  {app.description}
                </p>
                <p className={styles.applicationDetail}>
                  <span className={styles.strong}>Status:</span> {app.status}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No applications found.</p>
        )}
      </div>
    </div>
  );
}
