import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "./signin.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

    // Mock authentication
    if (email === "test@example.com" && password === "password") {
      // Simulate successful login
      login("mock-auth-token");
      navigate("/user-profile");
      toast.success('Successfully signed in!');
    }
    else if (email === "admin@admin.com" && password === "admin") {
      // login("mock-auth-token");
      navigate("/admin-panel/");
      toast.success('Successfully signed in!');
    }
    else {
      setError("Invalid email or password");
      toast.error('Please enter valid credentials.');
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
          <div className="form-group password-container">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="toggle-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
          <button type="submit" className="signin-auth-button">
            Sign In
          </button>
          <p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
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
