import { Form, Link, redirect, useActionData } from "react-router-dom";
import styles from "./LoginPage.module.css";
import store from "../store";
import { loginActions } from "../store/LoginSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const dispatch = useDispatch();
  const actionData = useActionData(); // To receive data from the `action` function
  const [emailError, setEmailError] = useState(""); // State for email error
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error fetching location:", error);
      }
    );

    dispatch(loginActions.handleLocationSetting(userLocation));
  }, [dispatch, userLocation]);

  // Function to validate email format
  const validateEmail = (e) => {
    const email = e.target.value;
    if (!email.endsWith("@gmail.com")) {
      setEmailError("Email must end with @gmail.com");
    } else {
      setEmailError("");
    }
  };

  return (
    <div className={styles.container}>
      <Form method="post">
        <p className={styles.heading}>Bridging Gap between Politicians and Citizens</p>
        <h2>Login</h2>
        <div className={styles["control-row"]}>
          <div className={styles.control}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              required
              onChange={validateEmail}
              className={emailError ? styles.inputError : ""}
            />
            {emailError && <p className={styles.errorText}>{emailError}</p>}
          </div>
          <div className={styles.control}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" required />
          </div>
        </div>
        {actionData?.error && <p className={styles.errorText}>{actionData.error}</p>}
        <p className={styles["form-actions"]}>
          <button className={styles.button} type="submit" disabled={!!emailError}>
            Login
          </button>
        </p>
      </Form>
      <Link to="/signup" className={styles.link}>
        Dont have an account? Sign Up
      </Link>
    </div>
  );
}

export async function action({ request }) {
  const loginForm = await request.formData();
  const loginData = {
    email: loginForm.get("email"),
    password: loginForm.get("password"),
  };

  try {
    const response = await fetch("https://jfsd-backend-project.up.railway.app/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Invalid credentials
        return { error: "Invalid username or password." };
      }
      throw new Error("An unexpected error occurred.");
    }

    const data = await response.json(); // Parse the JSON response

    const role = data.role;
    loginData.name = data.name;
    loginData.image = data.image;
    loginData.assignedPolitician = data.nearest_politician_email;

    // Dispatch login data to Redux store
    store.dispatch(loginActions.handleLoginClick(loginData));

    // Redirect based on user role
    if (role === "user") {
      return redirect("/user");
    } else if (role === "politician") {
      return redirect("/politician");
    } else if (role === "admin") {
      return redirect("/admin");
    } else {
      throw new Error("Unknown Role");
    }
  } catch (error) {
    console.error("Login error:", error.message);
    return { error: "Login failed. Please check your credentials and try again." };
  }
}
