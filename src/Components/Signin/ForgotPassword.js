import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../Journey/journey.css";
import { connectTokenInstance, webApiInstance } from "../../AxiosInstance";
import { useLoader } from "../../utils/LoaderContext";

const ForgotPassword = () => {
  const { setLoading } = useLoader();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [user, SetUser] = useState(null);

  const ResetLogin = async (event) => {
    event.preventDefault(); // Prevent form refresh
    setLoading(true);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }

    try {
      // const checkUser = await webApiInstance.get(
      //   `/User/get-by-email?email=${encodeURIComponent(email)}`
      // );

      // if (checkUser.status === 200) {
        // User exists
        // SetUser(checkUser.data.result);
        // localStorage.setItem("User", checkUser.data.result);
        // Perform further actions here
        try {
          const response = await connectTokenInstance.post(
            `/api/UserRegistration/request-otp/${email}`
          );
          if(response.status === 200)
          {
            localStorage.setItem("User-Otp" , response.data);
            setLoading(false);
            navigate("/forgot-password-otp")
          }
        } catch (err) {
          setLoading(false);
          if(err.response.status === 400)
          {
            toast.error("You must wait to get another otp.")
          }
          else
          {
            toast.error("Something went wrong. Please try again.")
          }
        }
      // }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 404) {
        toast.error("This email does not have any user.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <section className="sh-journey">
      <div className="j-shell">
        <div className="j-auth-shell">
          <div className="j-eyebrow">SATELLITE HEALTH · ACCOUNT</div>
          <h1 className="j-title">Reset your password.</h1>
          <p className="j-intro">
            Enter the email address on your account and we'll send you a reset code.
          </p>

          <form className="j-panel" onSubmit={ResetLogin}>
            <div className="j-grid">
              <div className="j-full">
                <label htmlFor="reset-email">Email address</label>
                <input
                  id="reset-email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit">Send reset code</button>
            <p className="j-auth-foot">
              <Link to="/login">Back to login</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
