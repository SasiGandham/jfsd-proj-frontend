import { Form, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import styles from "./AddPost.module.css";

export default function AddPost() {
  const userEmail = useSelector((state) => state.login.userMail); // Get user email from redux
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // Store the file

  const handleSubmit = async (e) => {
    e.preventDefault();

    let base64Image = null;
    if (image) {
      base64Image = await photoFileToBase64(image);
    }

    try {
      const response = await fetch("http://localhost:8082/api/posts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          content,
          image: base64Image,
        }),
      });

      if (response.ok) {
        console.log("Post added successfully!");
        return redirect("/user");
      } else {
        console.error("Failed to add post:", await response.text());
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }

    return redirect("/user");
  };

  const photoFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <Form onSubmit={handleSubmit} className={styles["form-container"]}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post content here"
        required
        className={styles.textarea}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className={styles["file-input"]}
      />
      <button type="submit" className={styles["submit-button"]}>
        Add Post
      </button>
    </Form>
  );
}
