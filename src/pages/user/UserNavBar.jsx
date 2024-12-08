import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserNavBar.module.css';
import { useSelector } from 'react-redux';

const UserNavBar = () => {
    const navigate = useNavigate();

    const [politicianDetails, setPoliticianDetails] = useState(null);

    const userName = useSelector((state) => state.login.userName);
    const userImage = useSelector((state) => state.login.userImage);
    const assignedPolitician = useSelector((state) => state.login.assignedPolitician);

    // Function to fetch politician details
    async function fetchPoliticianDetails(politicianEmail) {
        try {
            const response = await fetch(`http://localhost:8082/api/users/${politicianEmail}`);
            if (response.ok) {
                const data = await response.json();
                setPoliticianDetails(data);
            } else {
                console.error('Failed to fetch politician details');
            }
        } catch (error) {
            console.error('Error fetching politician details:', error);
        }
    }

    useEffect(() => {
        if (assignedPolitician) {
            fetchPoliticianDetails(assignedPolitician);
        }
    }, [assignedPolitician]);


    function handleSendApplication() {
        navigate('/user/sendApplication')

    }

    function handleProfileDetails() {
        navigate('/user/userDetails')
    }

    function handleLogout() {
        navigate('/login');
    }

    return (
        <div className={styles.navbar}>
            <button className={styles.applicationBtn}  onClick={handleSendApplication}>Send Application</button>
            <div className={styles.politician}>
                <img
                    src={politicianDetails? politicianDetails.photo : "https://via.placeholder.com/100"}
                    alt="Politician"
                    className={styles.politicianPic}
                />
                <p className={styles.politicianLabel}>{politicianDetails?.name || assignedPolitician}</p>
            </div>

            <div className={styles.profile}>
                <button onClick={handleProfileDetails}>
                <img
                    src={userImage ? userImage : "https://via.placeholder.com/100"}
                    alt="Profile"
                    className={styles.profilePic}
                />
                </button>
                <p className={styles.name}>{userName}</p>
            </div>
            <button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default UserNavBar;
