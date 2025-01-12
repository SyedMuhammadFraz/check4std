import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import { toast } from 'react-toastify';
import './signup.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const { authToken, login, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      navigate("/user-profile");
    }
  }, [authToken, navigate]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!passwordRegex.test(value)) {
      setPasswordStrength('Password is weak');
    } else {
      setPasswordStrength('Password is strong');
    }

    setPasswordMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMatch(password === value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(emailRegex.test(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordMatch) {
      setError('Passwords do not match');
      return;
    }
    if (!passwordRegex.test(password)) {
      setError('Password must meet strength requirements');
      return;
    }
    if (!isEmailValid) {
      setError('Enter a valid email');
      return;
    }
    setError('');

    // Mock registration
    login("mock-auth-token");

    // Redirect to profile page
    toast.success('Successfully created your Account!');
    navigate("/user-profile");
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
          <p>You are logged in as <strong>{name || "User"}</strong>.</p>
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
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {!isEmailValid && (
              <p className="validation-error">Enter a valid email address</p>
            )}
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {password && (
              <p
                className={`password-strength ${
                  passwordStrength === 'Password is strong' ? 'strong' : 'weak'
                }`}
              >
                {passwordStrength}
              </p>
            )}
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {password && confirmPassword && (
              <p
                className={`password-match ${
                  passwordMatch ? 'match' : 'no-match'
                }`}
              >
                {passwordMatch ? 'Passwords match' : 'Passwords do not match'}
              </p>
            )}
          </div>
          {error && <p className="error-message">{error}</p>}
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
