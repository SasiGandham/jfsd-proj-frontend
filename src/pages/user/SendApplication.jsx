import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from './SendApplication.module.css'

export default function SendApplication() {
  const navigate = useNavigate();
  const [location, setLocation] = useState(""); // State to store the user's location
  const [loadingLocation, setLoadingLocation] = useState(false); // To handle loading state for location
  const [imageBase64, setImageBase64] = useState(""); // State to store the Base64 image string

  const appliedUser = useSelector((state) => state.login.userMail); // Redux: logged-in user's ID
  const politician = useSelector((state) => state.login.assignedPolitician); // Redux: politician's email

  // Function to get the user's location
  const fetchLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true); // Set loading state

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude}, ${longitude}`); // Set the location as "latitude, longitude"
        setLoadingLocation(false); // End loading state
      },
      (error) => {
        alert("Unable to retrieve location. Please try again.");
        console.error(error);
        setLoadingLocation(false); // End loading state
      }
    );
  };

  // Function to handle image selection and convert it to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageBase64(reader.result); // Set the Base64 string of the image
      };
      reader.onerror = () => {
        alert("Failed to load the image. Please try again.");
      };
      reader.readAsDataURL(file); // Read the file as a data URL (Base64)
    }
  };

  // Function to submit the application
  const action = async (applicationData) => {
    try {
      const response = await fetch("https://jfsd-backend-project.up.railway.app/api/applications/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        alert("Application submitted successfully!");
        navigate("/user");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error while submitting application:", error);
      alert("Failed to submit application. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(e.target);

    const location = formData.get("location")



    const applicationData = {
      appliedUserEmail: appliedUser, // Adjust key to match backend
      politicianEmail: politician,  // Adjust key to match backend
      title: formData.get("title"),
      problem: formData.get("problem"),
      description: formData.get("description"),
      image: imageBase64,
      location: location,
    };
    

    console.log(applicationData)

    // Call the action function to handle submission
    action(applicationData);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Send Application</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" className={styles.input} required />
        </div>
        <div>
          <label htmlFor="problem">Problem:</label>
          <input type="text" id="problem" name="problem" className={styles.input} required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" className={styles.textarea}></textarea>
        </div>
        <div>
          <label htmlFor="image">Upload Image:</label>
          <input type="file" id="image" accept="image/*" onChange={handleImageUpload} className={styles.input} />
          {imageBase64 && <img src={imageBase64} alt="Preview" className={styles.imagePreview} />}
        </div>
        <div className={styles.locationWrapper}>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.input}
            placeholder="Click 'Fetch Location' to autofill"
            required
          />
          <button
            type="button"
            onClick={fetchLocation}
            className={styles.button}
            disabled={loadingLocation}
          >
            {loadingLocation ? "Fetching..." : "Fetch Location"}
          </button>
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}
