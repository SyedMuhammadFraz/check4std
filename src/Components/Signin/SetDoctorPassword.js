import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./SetDoctorPassword.css";
import { connectTokenInstance, webApiInstance } from "../../AxiosInstance";
import { useLoader } from "../../utils/LoaderContext";

const SetDoctorPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Token from URL

  const { setLoading } = useLoader();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing token.");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await webApiInstance.post(
        "/Doctor/set-password",
        {
          token: token, // send the encrypted payload from URL
          password: password,
          confirmPassword: confirmPassword,
        }
      );
      if (response.status === 200) {
        toast.success("Password set successfully! Please log in.");
        navigate("/login");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="set-password-container">
      <h2>Set Your Password</h2>
      <p>Create a password to activate your account.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="set-password-button">
          Set Password
        </button>
      </form>

      <button className="back-to-login-button" onClick={() => navigate("/login")}>
        Back to Login
      </button>
    </div>
  );
};

export default SetDoctorPassword;
