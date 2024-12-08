import { useNavigate } from 'react-router-dom';
import styles from './AdminAddRemovePage.module.css';
import userPic from './imagess/user.png';

export default function AdminAddRemovePage() {

  const navigate = useNavigate();

  function handleAddUser() {
    navigate('/admin/addUser');
  }

  function handleAddPolitician() {
    navigate('/admin/addPolitician');
  }

  function handleAddAdmin() {
    navigate('/admin/addAdmin');
  }

  function handleRemoveUser() {
    navigate('/admin/removeUser');
  }

  function handleRemovePolitician() {
    navigate('/admin/removePolitician');
  }

  function handleRemoveAdmin() {
    navigate('/admin/removeAdmin');
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Add/Remove Options</h1>
      <div className={styles.cardContainer}>
        {/* Add User Card */}
        <div className={styles.card}>
          <img src={userPic} alt="User" className={styles.cardImage} />
          <h2 className={styles.cardTitle}>Add User</h2>
          <p className={styles.cardDescription}>Manage and add new users to the system.</p>
          <button className={styles.cardButton} onClick={handleAddUser}>Add User</button>
        </div>

        {/* Add Politician Card */}
        <div className={styles.card}>
          <img src={userPic} alt="User" className={styles.cardImage} />
          <h2 className={styles.cardTitle}>Add Politician</h2>
          <p className={styles.cardDescription}>Add new politicians and manage their details.</p>
          <button className={styles.cardButton} onClick={handleAddPolitician}>Add Politician</button>
        </div>

        {/* Add Admin Card */}
        <div className={styles.card}>
          <img src={userPic} alt="User" className={styles.cardImage} />
          <h2 className={styles.cardTitle}>Add Admin</h2>
          <p className={styles.cardDescription}>Add new admins to the system.</p>
          <button className={styles.cardButton} onClick={handleAddAdmin}>Add Admin</button>
        </div>

        {/* Remove User Card */}
        <div className={styles.card}>
          <img src={userPic} alt="User" className={styles.cardImage} />
          <h2 className={styles.cardTitle}>Remove User</h2>
          <p className={styles.cardDescription}>Remove existing users from the system.</p>
          <button className={styles.cardButton} onClick={handleRemoveUser}>Remove User</button>
        </div>

        {/* Remove Politician Card */}
        <div className={styles.card}>
          <img src={userPic} alt="User" className={styles.cardImage} />
          <h2 className={styles.cardTitle}>Remove Politician</h2>
          <p className={styles.cardDescription}>Remove existing politicians from the system.</p>
          <button className={styles.cardButton} onClick={handleRemovePolitician}>Remove Politician</button>
        </div>

        {/* Remove Admin Card */}
        <div className={styles.card}>
          <img src={userPic} alt="User" className={styles.cardImage} />
          <h2 className={styles.cardTitle}>Remove Admin</h2>
          <p className={styles.cardDescription}>Remove existing admins from the system.</p>
          <button className={styles.cardButton} onClick={handleRemoveAdmin}>Remove Admin</button>
        </div>
      </div>
    </div>
  );
}
