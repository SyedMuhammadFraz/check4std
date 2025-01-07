import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/auth";
import "./signin.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in when the page loads
    const authToken = Cookies.get("authToken");
    if (authToken) {
      setLoggedIn(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Mock authentication
    if (email === "test@example.com" && password === "password") {
      // Store the authentication token in cookies
      Cookies.set("authToken", "mock-auth-token");
      
      // Set the logged-in state to true
      setLoggedIn(true);

      // Redirect to home page after successful login
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleLogout = () => {
    // Remove the token from cookies
    Cookies.remove("authToken");
    setLoggedIn(false);
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="signin-auth-container">
      <h2>{loggedIn ? "Welcome Back!" : "Account Login"}</h2>
      
      {/* Show login form only if user is not logged in */}
      {!loggedIn ? (
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signin-auth-button">
            Sign In
          </button>
        </form>
      ) : (
        <div className="profile-logout-container">
          <p>You are logged in. Welcome!</p>
          <button className="signin-auth-button" onClick={() => navigate("/profile")}>
            Go to Profile
          </button>
          <button className="signin-auth-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      {/* Show Sign Up link if user is not logged in */}
      {!loggedIn && (
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      )}
    </div>
  );
};

export default SignIn;
