import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, redirect } from "react-router-dom";

export default function SignUp3() {
  const signUpState = useSelector((state) => state.signUp);
  const [coords, setCoords] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error fetching location:", error);
        setCoords({ latitude: "0", longitude: "0" }); // Default values if location access is denied
      }
    );
  }, []);

  return (
    <div>
      <h1>SignUp3</h1>
      <Form method="post" encType="multipart/form-data">
        {/* Age */}
        <div>
          <label htmlFor="age">Age:</label>
          <input type="number" name="age" id="age" placeholder="Enter your age" required />
        </div>

        {/* Constituency */}
        <div>
          <label htmlFor="constituency">Constituency:</label>
          <input
            type="text"
            name="constituency"
            id="constituency"
            placeholder="Enter your constituency"
            maxLength="255"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            value={signUpState.email || ""}
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            maxLength="255"
            required
          />
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            maxLength="255"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            maxLength="255"
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Re-enter your password"
            maxLength="255"
            required
          />
        </div>

        {/* Photo */}
        <div>
          <label htmlFor="photo">Photo:</label>
          <input type="file" name="photo" id="photo" accept="image/*" required />
        </div>

        {/* Hidden Fields for Coords */}
        <input type="hidden" name="latitude" value={coords.latitude || ""} />
        <input type="hidden" name="longitude" value={coords.longitude || ""} />
        <input type="hidden" name="role" value="user" />

        {/* Submit Button */}
        <div>
          <button type="submit">Submit</button>
        </div>
      </Form>
    </div>
  );
}



export async function action({ request }) {
  const formData = await request.formData();

  // Read the photo as a base64 string
  const photoFile = formData.get("photo");
  const photoBase64 = await photoFileToBase64(photoFile);

  // Prepare JSON payload
  const userData = {
    age: formData.get("age"),
    constituency: formData.get("constituency"),
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
    latitude: parseFloat(formData.get("latitude")),
    longitude: parseFloat(formData.get("longitude")),
    role: "user",
    photo: photoBase64,
  };

  const response = await fetch("https://jfsd-backend-project.up.railway.app/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to send Details");
  }

  return redirect("/login");
}

// Helper function to convert a file to base64
async function photoFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

