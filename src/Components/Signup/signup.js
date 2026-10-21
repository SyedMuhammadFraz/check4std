import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../Journey/journey.css";
import { webApiInstance } from "../../AxiosInstance";
import { userRegisterInstance } from "../../AxiosInstance";
import { useLoader } from "../../utils/LoaderContext";
import PatientFields, {
  EMPTY_PATIENT_FIELDS,
  validatePatientFields,
  patientFieldsPayload,
} from "../Shared/PatientFields";

const guidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const SignUp = () => {
  const [role, setRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(true);
  const [roleError, setRoleError] = useState("");
  const [roleAttempt, setRoleAttempt] = useState(0);
  const [patientErrors, setPatientErrors] = useState({});
  const [formData, setFormData] = useState({
    ...EMPTY_PATIENT_FIELDS,
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    roleId: "",
    dob: "",
  });

  useEffect(() => {
    let active = true;
    const fetchRole = async () => {
      setRoleLoading(true);
      setRoleError("");
      try {
        const response = await webApiInstance.get("/Role/get-by-name/user");
        console.log("Role fetch response:", response.data);
        const userRoleId =
          response.data?.result?.roleId || response.data?.result?.id;

        if (!guidRegex.test(userRoleId || "")) {
          throw new Error("User role ID was not returned by the API.");
        }

        if (active) setRole(userRoleId);
      } catch (error) {
        if (!active) return;
        console.error("Failed to fetch user role", error);
        const message = !error.response && error.request
          ? "Cannot reach the signup service. Check your connection and try again."
          : error.response?.status === 404
            ? "The user role is not configured. Please contact support."
            : "Unable to load user role. Please try again.";
        setRoleError(message);
      } finally {
        if (active) setRoleLoading(false);
      }
    };

    fetchRole();
    return () => { active = false; };
  }, [roleAttempt]);

  const { authToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const { setLoading } = useLoader();
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
    setPatientErrors((previous) => ({ ...previous, [e.target.name]: undefined }));
  };

  const validateForm = () => {
    const errors = validatePatientFields(formData);
    setPatientErrors(errors);
    if (Object.keys(errors).length > 0) {
      toast.error("Please check your details.");
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

    if (!guidRegex.test(role)) {
      toast.error("Unable to load user role. Please refresh and try again.");
      return;
    }

    setLoading(true);

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
        setLoading(false);
        toast.error("User with this email already exists. Please login.");
        userExists = true;
      }

      if (
        phoneNumberValidityResponse.status === "fulfilled" &&
        phoneNumberValidityResponse.value.status === 200
      ) {
        setLoading(false);
        toast.error(
          "User with this phone number already exists. Use a different number."
        );
        userExists = true;
      }

      if (userExists) {
        setLoading(false);
        return;
      }

      // If user doesn't exist, proceed to register
      // setPendingUser(formData);

      const apiPayload = {
        email: formData.email, // Change the email as required
        password: formData.password,
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        dob: formData.dob, // Change the DOB as required
        roleId: role,
        phoneNumber: formData.phoneNumber,
        ...patientFieldsPayload(formData),
      };

      const response = await userRegisterInstance.post(
        "/UserRegistration/register-user",
        apiPayload
      ); // Calls user registration API
      if (response.status === 200) {
        localStorage.setItem("optID", response.data);
        localStorage.setItem("email", apiPayload.email);

        navigate("/get-otp");
        toast.success(
          'Click on "Send OTP" to verify your email or phone number'
        );
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      const responseData = error.response?.data;
      const errorMessage =
        typeof responseData === "string"
          ? responseData
          : responseData?.message ||
            (responseData?.errors
              ? Object.values(responseData.errors).flat().join(" ")
              : "An error occurred. Please try again later.");

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out!");
    navigate("/");
  };

  const getMaxDOB = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  return (
    <section className="sh-journey">
      <div className="j-shell">
        <div className="j-auth-shell">
          <div className="j-eyebrow">SATELLITE HEALTH · ACCOUNT</div>
          <h1 className="j-title">
            {authToken ? "Your account is ready." : "Create your account."}
          </h1>
          <p className="j-intro">
            {authToken
              ? "You're already signed in. Continue to your account to review orders and results."
              : "Use your email address as your username to access your orders and results."}
          </p>

          {authToken ? (
            <div className="j-panel">
              <span className="j-tag">YOU ARE SIGNED IN</span>
              <h2 className="j-panel-title">
                Signed in as {formData.firstName || "your account"}.
              </h2>
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
            <form className="j-panel" onSubmit={handleSubmit}>
              <div className="j-grid">
                <div className="j-full">
                  <label htmlFor="signup-email">Email address</label>
                  <input
                    id="signup-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="signup-phone">Phone number</label>
                  <input
                    id="signup-phone"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    placeholder="(021) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="signup-dob">Date of birth</label>
                  <input
                    id="signup-dob"
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    max={getMaxDOB()}
                  />
                </div>
                <PatientFields
                  values={formData}
                  onChange={handleChange}
                  errors={patientErrors}
                  idPrefix="signup"
                />
                <div className="j-password">
                  <label htmlFor="signup-password">Password</label>
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
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
                <div className="j-password">
                  <label htmlFor="signup-confirm">Confirm password</label>
                  <input
                    id="signup-confirm"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <h3>Password guidelines</h3>
              <ul className="j-guidelines">
                <li>At least 8 characters</li>
                <li>One uppercase letter (A-Z)</li>
                <li>One lowercase letter (a-z)</li>
                <li>One number (0-9)</li>
                <li>One special character (!@#$%^&amp;*)</li>
              </ul>

              {roleError && (
                <div role="alert">
                  <p className="j-error">{roleError}</p>
                  <button
                    type="button"
                    className="j-button j-button--text"
                    onClick={() => setRoleAttempt((attempt) => attempt + 1)}
                  >
                    Retry
                  </button>
                </div>
              )}

              <button type="submit" disabled={roleLoading || !role}>
                {roleLoading ? "Loading signup…" : "Create account"}
              </button>
              <p className="j-auth-foot">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignUp;
