import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './PoliticianNavBar.module.css'

const UserNavBar = () => {
    const navigate = useNavigate();

    const userName = useSelector((state) => state.login.userName);
    const userImage = useSelector((state) => state.login.userImage);

    // Function to fetch politician details

    function handleSeeApplications() {
        navigate('/politician/applications');
    }

    function handleLogout() {
        navigate('/login');
    }

    return (
        <div className={styles.navbar}>
            <button onClick={handleSeeApplications}>See Applications</button>
            <div className={styles.profile}>
                <img
                    src={userImage ? userImage : "https://via.placeholder.com/100"}
                    alt="Profile"
                    className={styles.profilePic}
                />
                <p className={styles.name}>{userName}</p>
            </div>
            <button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default UserNavBar;
