import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./signin.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { authToken, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the profile page if already logged in
    if (authToken) {
      navigate("/user-profile");
    }
  }, [authToken, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    toast.dismiss();

    // Mock authentication
    if (email === "test@example.com" && password === "password") {
      // Simulate successful login
      login("mock-auth-token"); 
      navigate("/user-profile");
      toast.success('Successfully signed in!');
    } else {
      setError("Invalid email or password");
      toast.error('Please enter valid credentials.');
    }
  };

  return (
    <div className="signin-auth-container">
      <h2>{authToken ? "Welcome Back!" : "Account Login"}</h2>
      
      {!authToken ? (
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
          <button
            className="signin-auth-button"
            onClick={() => navigate("/user-profile")}
          >
            Go to Profile
          </button>
          <button className="signin-auth-button" onClick={logout}>
            Logout
          </button>
        </div>
      )}

      {!authToken && (
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      )}
    </div>
  );
};

export default SignIn;
