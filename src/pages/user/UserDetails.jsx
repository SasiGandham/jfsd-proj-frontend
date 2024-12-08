import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./UserDetails.module.css";

export default function UserDetails() {
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
          fetch(`http://localhost:8082/api/applications/user/${userMail}`),
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

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>User Details</h1>

      <div className={styles.section}>
        <h2 className={styles.subheading}>Profile</h2>
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
                className={styles.image}
              />
            )}
          </div>
        ) : (
          <p>User details not found.</p>
        )}
      </div>

      <div className={styles.section}>
        <h2 className={styles.subheading}>Applications</h2>
        {applications && applications.length > 0 ? (
          <ul className={styles.applicationsList}>
            {applications.map((app) => (
              <li key={app.id} className={styles.applicationItem}>
                <p className={styles.detail}>
                  <span className={styles.strong}>Application ID:</span>{" "}
                  {app.id}
                </p>
                <p className={styles.detail}>
                  <span className={styles.strong}>Description:</span>{" "}
                  {app.description}
                </p>
                <p className={styles.detail}>
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
