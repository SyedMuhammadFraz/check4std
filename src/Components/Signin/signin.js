import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "../Journey/journey.css";
import ClipLoader from "react-spinners/ClipLoader";
import { connectTokenInstance } from "../../AxiosInstance";
import { POST_LOGIN_REDIRECT_KEY, readStored, removeStored } from "../../utils/checkoutStorage";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginReminder, setShowLoginReminder] = useState(true);
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

      if (response.data.access_token) {
        const token = response.data.access_token;
        const decodedData = decodeJWT(token);
        console.log(token);
        console.log(decodedData);
        const role1 = decodedData.role;
        console.log(role1);

        if (role1 === "user") {
          login(token);
          toast.success("Successfully signed in!");
          // e.g. a guest whose email already had an account goes back to their order.
          const redirect = readStored(POST_LOGIN_REDIRECT_KEY, null);
          removeStored(POST_LOGIN_REDIRECT_KEY);
          navigate(redirect || "/");
        } else if (role1 === "admin") {
          login(token);
          console.log("Auth Token:", token);
          toast.success("Successfully signed in!");
          navigate("/admin-panel/");
        }
          else if (role1 === "doctor") {
          login(token);
          console.log("Auth Token:", token);
          toast.success("Successfully signed in!");
          navigate("/doctor-dashboard");
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
  };
  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out!");
    navigate("/");
  };

  return (
    <section className="sh-journey">
      <div className="j-shell">
        <div className="j-auth-shell">
          <div className="j-eyebrow">SATELLITE HEALTH · ACCOUNT</div>
          <h1 className="j-title">Welcome back.</h1>
          <p className="j-intro">
            {authToken
              ? "You're signed in. Pick up your testing journey where you left off."
              : "Log in with your email address to review your orders and results."}
          </p>

          {!authToken && showLoginReminder && (
            <div className="j-summary">
              <span>You need to log in to place an order.</span>
              <button
                type="button"
                className="j-button j-button--text"
                onClick={() => setShowLoginReminder(false)}
              >
                Dismiss
              </button>
            </div>
          )}

          {!authToken ? (
            <form className="j-panel" onSubmit={handleSubmit}>
              <div className="j-grid">
                <div className="j-full">
                  <label htmlFor="signin-email">Email address</label>
                  <input
                    id="signin-email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="j-full j-password">
                  <label htmlFor="signin-password">Password</label>
                  <input
                    id="signin-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading}>
                {loading ? <ClipLoader size={18} color={"#fff"} /> : "Log in"}
              </button>
              <p className="j-auth-foot">
                <Link to="/forgot-password">Forgot password?</Link>
              </p>
              <p className="j-auth-foot">
                New to Satellite Health? <Link to="/signup">Create an account</Link>
              </p>
            </form>
          ) : showLoggedIn ? (
            <div className="j-panel">
              <span className="j-tag">YOU ARE SIGNED IN</span>
              <h2 className="j-panel-title">Your account is ready.</h2>
              <p className="j-hint">
                Review your orders and results, or sign out of this device.
              </p>
              <div className="j-actions">
                <button
                  type="button"
                  className="j-button"
                  onClick={() => navigate("/user-profile")}
                >
                  Go to my account
                </button>
                <button
                  type="button"
                  className="j-button j-button--secondary"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <div className="j-loading">
              <ClipLoader size={50} color={"#006c55"} loading={true} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignIn;
