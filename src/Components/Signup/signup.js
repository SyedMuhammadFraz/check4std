import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from "react-router-dom";

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

  const Navigate = useNavigate();

  const onSignupClick=()=>{
    Navigate("/get-otp");
  }

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
    console.log('Sign Up:', { name, email, dob, password });
  };

  return (
    <div className="signup-auth-container">
      <h2>Create Account</h2>
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
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className='centered-button'>
      <button type="submit" className="signup-auth-button" onClick={onSignupClick}>Sign Up</button>
      <p>
        Already have an account? <a href="/login">Sign In</a>
      </p>
      <p>
         <a href="/login">Forgot Your Password?</a>
      </p>
      </div>
    </div>
  );
};

export default SignUp;
