import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "./signin.css";
import ClipLoader from "react-spinners/ClipLoader";
import { connectTokenInstance } from "../../AxiosInstance";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { authToken, login, logout } = useContext(AuthContext);
  const [showLoggedIn, setShowLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (authToken) {
      timer = setTimeout(() => {
        setShowLoggedIn(true);
      }, 2000);
    } else {
      setShowLoggedIn(false); // Reset when logged out
    }
    return () => clearTimeout(timer); // Cleanup function
  }, [authToken]);

  const decodeJWT = (token) => {
    try {
      const base64Url = token.split(".")[1]; // Extract the payload part
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64));
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    setLoading(true);

    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", email);
    formData.append("password", password);

    try {
      const response = await connectTokenInstance.post(
        "/connect/token",
        formData, // Pass form data here
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      // console.log(response);
      if (response.data.access_token) {
        const token = response.data.access_token;
        const decodedData = decodeJWT(token);
        console.log(decodedData);
        const role1 = decodedData.role;
        console.log(role1);

        if (role1 === "user") {
          login(token);
          toast.success("Successfully signed in!");
          navigate("/user-profile");
        } else if (role1 === "admin") {
          login(token);
          console.log("Auth Token:", token);
          toast.success("Successfully signed in!");
          navigate("/admin-panel/");
        } else {
          toast.error("Wrong password or Usename");
        }
      } else {
        toast.error("Invalid credentials.");
      }
    } catch (error) {
      toast.error("Username or password is incorrect");
    } finally {
      setLoading(false); // Hide loader after authentication
    }

    // Mock authentication
    // if (email === "test@example.com" && password === "password") {
    //   // Simulate successful login
    //   login("mock-auth-token");
    //   navigate("/user-profile");
    //   toast.success('Successfully signed in!');
    // }
    // else if (email === "admin@admin.com" && password === "admin") {
    //   // login("mock-auth-token");
    //   navigate("/admin-panel/");
    //   toast.success('Successfully signed in!');
    // }
    // else {
    //   toast.error('Please enter valid credentials.');
    // }
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
              <span
                className="toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="signin-auth-button"
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color={"#fff"} /> : "Sign In"}
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
      ) : showLoggedIn ? ( // ✅ UI changes after delay
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
      ) : (
        <div className="loading-container">
          <ClipLoader size={50} color={"#123abc"} loading={true} />
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
