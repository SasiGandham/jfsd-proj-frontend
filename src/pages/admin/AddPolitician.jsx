import { Form, redirect } from 'react-router-dom'
import styles from "./AddPolitician.module.css";
import { useState } from 'react';

export default function AddPolitician() {

  const [imagePreview,setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Preview the image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Politician</h1>
      <Form method="post" encType="multipart/form-data" className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.input}
            placeholder="Enter Politician's Name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            placeholder="Enter Politician's Email"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="age" className={styles.label}>Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            className={styles.input}
            placeholder="Enter Politician's Age"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="constituency" className={styles.label}>Constituency:</label>
          <input
            type="text"
            id="constituency"
            name="constituency"
            className={styles.input}
            placeholder="Enter constituency"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.input}
            placeholder="Enter password"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmpassword" className={styles.label}>Confirm Password:</label>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            className={styles.input}
            placeholder="Renter password"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="latitude" className={styles.label}>Constituency Latitude:</label>
          <input
            type="text"
            id="latitude"
            name="latitude"
            className={styles.input}
            placeholder="Enter Latitude"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="longitude" className={styles.label}>Constituency Longitude:</label>
          <input
            type="text"
            id="longitude"
            name="longitude"
            className={styles.input}
            placeholder="Enter Longitude"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="photo" className={styles.label}>Photo:</label>
          <input
            type="file"
            onChange={handleImageChange}
            id="photo"
            name="photo"
            accept="image/*"
            className={styles.input}
            required
          />
          {imagePreview && <img src={imagePreview}  alt='politicianPhoto'/>}
        </div>
        <input type="hidden" name="role" value="politician" />
        <button type="submit" className={styles.submitButton}>Add Politician</button>
      </Form>
    </div>
  );
}


export async function action({ request }) {
  // Parse form data
  const formData = await request.formData();
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    age: formData.get("age"),
    constituency: formData.get("constituency"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
    password: formData.get("password"),
    role: formData.get("role"),
  };

  // Handle file upload
  const file = formData.get("photo");
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    await new Promise((resolve) => (reader.onload = resolve)); // Wait for file to load
    data.photo = reader.result; // File content as base64
  }

  // Make POST request to Spring Boot API
  const response = await fetch("http://localhost:8082/api/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to add politician");
  }

  return redirect("/admin"); // Redirect to admin dashboard or relevant page
}