import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './signup.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: ''
  });

  const { authToken, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (authToken) navigate("/user-profile");
  }, [authToken, navigate]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error('Enter a valid email');
      return false;
    }
    if (!formData.dob) {
      toast.error('Date of Birth is required');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (!passwordRegex.test(formData.password)) {
      toast.error('Password must be at least 8 characters long with an uppercase letter, lowercase letter, number, and special character.');
      return false;
    }
   
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    navigate("/get-otp");
    toast.success('Click on "Send OTP" to verify your email');
  };

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out!');
    navigate("/");
  };

  return (
    <div className="signup-auth-container">
      <h2>{authToken ? "Welcome to Your Profile" : "Create Account"}</h2>

      {authToken ? (
        <div className="profile-logout-container">
          <p>You are logged in as <strong>{formData.name || "User"}</strong>.</p>
          <button className="signup-auth-button" onClick={() => navigate("/user-profile")}>
            Go to Profile
          </button>
          <button className="signup-auth-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
          <div className="form-group password-container">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="toggle-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="form-group password-container">
          <label>Confirm Password</label>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span className="toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
          <button type="submit" className="signup-auth-button">Sign Up</button>
        </form>
      )}

      {!authToken && (
        <p>
          Already have an account? <a href="/login">Sign In</a>
        </p>
      )}
    </div>
  );
};

export default SignUp;