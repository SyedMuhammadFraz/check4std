import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signin.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authToken, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      navigate("/user-profile");
    }
  }, [authToken, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.dismiss();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    if (email === "test@example.com" && password === "Password@123") {
      login("mock-auth-token");
      toast.success("Successfully signed in!");
      navigate("/user-profile");
    } else {
      toast.error("Invalid email or password.");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out!");
    navigate("/");
  };

  return (
    <div className="signin-auth-container">
      <h2>{authToken ? "Welcome Back!" : "Account Login"}</h2>

      {!authToken ? (
        <form onSubmit={handleSubmit}>
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
          <p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior

                // Delay navigation to ensure localStorage update
                setTimeout(() => {
                  navigate("/forgot-password");
                }, 100);
              }}
            >
              Forgot Password?
            </a>
          </p>
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
          <button className="signin-auth-button" onClick={handleLogout}>
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
