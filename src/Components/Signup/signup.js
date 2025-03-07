import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./signup.css";
import { authServerInstance, webApiInstance } from "../../AxiosInstance";
import { useAuth } from "../../utils/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";

const SignUp = () => {
  const { setPendingUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });

  const { authToken, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (authToken) navigate("/user-profile");
  }, [authToken, navigate]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phoneNumberRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Enter a valid email");
      return false;
    }
    if (!formData.dob) {
      toast.error("Date of Birth is required");
      return false;
    }
    if (!phoneNumberRegex.test(formData.phoneNumber)) {
      toast.error(
        "Please enter a valid Phone Number in the format (123) 456-7890"
      );
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must be at least 8 characters long with an uppercase letter, lowercase letter, number, and special character."
      );
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    try {
      const [emailValidityResponse, phoneNumberValidityResponse] =
        await Promise.allSettled([
          webApiInstance.get(`/User/get-by-email`, {
            params: { email: formData.email },
          }),
          webApiInstance.get(`/User/get-by-phone-number`, {
            params: { phoneNumber: formData.phoneNumber },
          }),
        ]);
      let userExists = false;
      if (
        emailValidityResponse.status === "fulfilled" &&
        emailValidityResponse.value.status === 200
      ) {
        toast.error("User with this email already exists. Please login.");
        userExists = true;
      }

      if (
        phoneNumberValidityResponse.status === "fulfilled" &&
        phoneNumberValidityResponse.value.status === 200
      ) {
        toast.error(
          "User with this phone number already exists. Use a different number."
        );
        userExists = true;
      }

      if (userExists) return;

      // If neither exists, proceed to OTP verification
      setPendingUser(formData);
      navigate("/get-otp");
      toast.success('Click on "Send OTP" to verify your email or phone number');
    } catch (error) {
      console.error("Error checking user existence:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out!");
    navigate("/");
  };

  return (
    <div className="signup-auth-container">
      <h2>{authToken ? "Welcome to Your Profile" : "Create Account"}</h2>

      {authToken ? (
        <div className="profile-logout-container">
          <p>
            You are logged in as <strong>{formData.name || "User"}</strong>.
          </p>
          <button
            className="signup-auth-button"
            onClick={() => navigate("/user-profile")}
          >
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
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email (e.g., user@example.com)"
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="Enter in fromat (021) 123-4567"
            />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
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
                placeholder="Must be 8+ chars, include uppercase, lowercase, number & symbol"
              />
              <span
                className="toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
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
              <span
                className="toggle-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <h4 className="password-guidelines-heading">Password Guidelines</h4>
          <ul className="password-guidelines">
            <li>At least 8 characters</li>
            <li>One uppercase letter (A-Z)</li>
            <li>One lowercase letter (a-z)</li>
            <li>One number (0-9)</li>
            <li>One special character (!@#$%^&*)</li>
          </ul>
          <button type="submit" className="signup-auth-button">
            Sign Up
          </button>
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
