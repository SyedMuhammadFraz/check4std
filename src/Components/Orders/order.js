import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./order.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../utils/AuthContext";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { LocationContext } from "../../utils/LocationContext";
import { webApiInstance } from "../../AxiosInstance";

const OrderPage = () => {
  const [testPrices, setTestPrices] = useState({
    tenTestPanel: null,
    tenTestPanelHIVRNA: null,
  });
  const { selectedLocation } = useContext(LocationContext);
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [Disease, setDisease] = useState(null);

  const location = useLocation();
  const { selectedTests = [] } = location.state || {};
  const [tests, setTests] = useState(selectedTests);
  const [totalCost, setTotalCost] = useState(
    selectedTests.reduce((acc, test) => acc + test.price, 0)
  );

  const onChangeLocation = () => {
    navigate("/test-centers");
  };

  const getData = async (name) => {
    try {
      const response = await webApiInstance.get(
        `/Disease/get-by-name/${encodeURIComponent(name)}`
      );
      return response.data.result.id; // Return only the ID
    } catch (error) {
      console.error(`Error fetching data for ${name}:`, error);
      return null; // Return null if there's an error
    }
  };

  useEffect(() => {
    console.log(tests);
    const fetchAllDiseaseIds = async () => {
      if (!tests || tests.length === 0) return;

      try {
        const diseaseIds = await Promise.all(
          tests.map((test) => getData(test.name))
        );

        // Filter out null values in case of errors
        setDisease(diseaseIds.filter((id) => id !== null));
      } catch (error) {
        console.error("Error fetching disease IDs:", error);
      }
    };

    fetchAllDiseaseIds();
  }, [tests]); // Dependency to re-run if selectedTests change

  useEffect(() => {
    console.log("Disease Array: " + Disease);
  }, [Disease]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dobMonth: "",
    dobDay: "",
    dobYear: "",
    notificationMethod: "",
    email: "",
    phone: "",
    voicemail: "",
    addPartnerTest: false,
    paymentMethod: "",
    creditCardNumber: "",
    cardExpirationMonth: "",
    cardExpirationYear: "",
    billingCountry: "",
    billingZipCode: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    gender: "",
    notificationMethod: "",
    dob: "",
    voicemail: "",
  });

  const gotoPricePackages = () => {
    navigate("/price-packages");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Create the updated form data
    const updatedFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    // Update the state with the new form data
    setFormData(updatedFormData);

    // Dynamically update errors
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      // Remove specific field errors if the field is no longer invalid
      if (newErrors[name]) {
        delete newErrors[name];
      }

      return newErrors;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate each field
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.notificationMethod)
      newErrors.notificationMethod =
        "Select a method to notify you when your results are available.";
    if (
      formData.notificationMethod === "Email" &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (
      formData.notificationMethod === "Text Me (SMS)" &&
      !/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)
    ) {
      newErrors.phone =
        "Please enter a valid phone number (e.g., (xxx) xxx-xxxx).";
    }
    if (!formData.dobMonth || !formData.dobDay || !formData.dobYear) {
      newErrors.dob = "Date of birth is required.";
    }

    setErrors(newErrors);
    console.log(errors);
    // Prevent submission if there are errors
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    navigate("/#");
    if (Disease !== null) {
      toast.success("Redirecting to Payment Checkout Page");
      createCheckoutSession(Disease, authToken);
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (month, year) => {
    const monthIndex = months.indexOf(month);
    if (monthIndex === -1) return 31; // Default to 31 days if invalid month
    return new Date(year || 2024, monthIndex + 1, 0).getDate();
  };

  // Generate day options based on selected month and year
  const dates = Array.from(
    { length: getDaysInMonth(formData.dobMonth, formData.dobYear) || 31 },
    (_, i) => i + 1
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const handleMonthChange = (e) => {
    setFormData({ ...formData, dobMonth: e.target.value });
  };
  const handleDayChange = (e) =>
    setFormData({ ...formData, dobDay: e.target.value });
  const handleYearChange = (e) =>
    setFormData({ ...formData, dobYear: e.target.value });

  useEffect(() => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      // Check if all DOB fields are filled
      if (formData.dobMonth && formData.dobDay && formData.dobYear) {
        delete newErrors.dob; // Remove dob error
      }

      return newErrors;
    });
  }, [formData.dobMonth, formData.dobDay, formData.dobYear]);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      if (authToken === null) {
        navigate("/login");
        toast.error("Login to place an order!");
      }
      setLoading(false);
    }, 1000); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, [authToken, navigate]);

  const createCheckoutSession = async (diseases, authToken) => {
    console.log("Checkout disease", diseases);
    try {
      // Extract IDs from the diseases array
      const response = await webApiInstance.post(
        "/Payment/create-checkout-session",
        {
          diseaseIdList: diseases, // Send all IDs
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // Redirect to the checkout session in a new tab
      if (response.data.sessionUrl) {
        window.open(response.data.sessionUrl, "_blank");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  const handlePlaceOrder = () => {
    console.log(authToken);
    if (Disease !== null) {
      toast.success("Redirecting to Payment Checkout Page");
      createCheckoutSession(Disease, authToken);
    }
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const [panelResponse, hivRNAResponse] = await Promise.all([
          webApiInstance.get(`/Disease/get-by-name/10 Test Panel`),
          webApiInstance.get(`/Disease/get-by-name/10 Test Panel with HIV RNA Early Detection`),
        ]);

        setTestPrices({
          tenTestPanel: panelResponse.data.result.price,
          tenTestPanelHIVRNA: hivRNAResponse.data.result.price,
        });
      } catch (error) {
        console.error("Error fetching test prices:", error);
      }
    };

    fetchPrices();
  }, []);

  // Handle Upgrade for 10 Test Panel
  const handleUpgrade = () => {
    if (testPrices.tenTestPanel && totalCost < testPrices.tenTestPanel) {
      setTests([{ name: "10 Test Panel", price: testPrices.tenTestPanel }]);
      setTotalCost(testPrices.tenTestPanel);
    }
  };

  // Handle Upgrade for 10 Test Panel with HIV RNA
  const handleHIVRNAUpgrade = () => {
    if (testPrices.tenTestPanelHIVRNA) {
      setTests([{ name: "10 Test Panel with HIV RNA Early Detection", price: testPrices.tenTestPanelHIVRNA }]);
      setTotalCost(testPrices.tenTestPanelHIVRNA);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader size={50} color={"#36d7b7"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="order-page">
      <div class="responsive-container">
        <div className="order-card">
          <div className="order-card-content">
            <h2>Order Summary</h2>
            <ul>
              {tests.map((test, index) => (
                <li key={index}>
                  {test.name} - ${test.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <h3>Total: ${totalCost.toFixed(2)}</h3>
            <button
              onClick={() =>
                navigate("/price-packages", { state: { selectedTests: tests } })
              }
            >
              Add/Edit Tests
            </button>
          </div>
        </div>

        {tests.length > 0 &&
          tests[0].name !== "10 Test Panel" &&
          tests[0].name !== "10 Test Panel with HIV RNA Early Detection" &&
          totalCost < 150 && (
            <div className="upgrade-card">
              <h3>Save by testing for common STDs</h3>
              <p>
                Upgrade to the{" "}
                <strong className="highlight">10 Test Panel</strong>
              </p>

              <hr />

              <div className="test-list">
                <ul>
                  <li>✔️ HIV Type 1</li>
                  <li>✔️ Hepatitis A</li>
                  <li>✔️ Gonorrhea</li>
                  <li>✔️ Herpes 2</li>
                  <li>✔️ Chlamydia</li>
                </ul>
                <ul>
                  <li>✔️ Herpes 1</li>
                  <li>✔️ Hepatitis C</li>
                  <li>✔️ HIV Type 2</li>
                  <li>✔️ Hepatitis B</li>
                  <li>✔️ Syphilis</li>
                </ul>
              </div>

              <button className="upgrade-btn" onClick={handleUpgrade}>
                Upgrade Now{" "}
                <span className="price">
                  + ${Math.max(0, testPrices.tenTestPanel - totalCost).toFixed(2)}
                </span>
              </button>
            </div>
          )}

        {/* Show HIV RNA Upgrade Card ONLY if "10 Test Panel" is selected */}
        {tests.length > 0 && tests[0].name === "10 Test Panel" && (
          <div className="upgrade-card">
            <h3 className="highlight">Worried about recent exposure?</h3>
            <p>
              Upgrade with the{" "}
              <strong className="highlight">HIV RNA Early Detection</strong>
            </p>

            <hr />

            <button className="upgrade-btn" onClick={handleHIVRNAUpgrade}>
              Upgrade
              <span className="price">
                + ${Math.max(0, testPrices.tenTestPanelHIVRNA - totalCost).toFixed(2)}
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="container">
        <h1>Quick & Confidential STD Testing</h1>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Find a Test Center */}
          <section>
            <h2 className="blue-background">1. Find a Test Center</h2>
            <div>
              <label className="order-labels">Your Selected Lab:</label>
              <p>{selectedLocation}</p>
              <p>4651 W Kennedy Blvd, Tampa, FL 33609</p>
              <button type="button" onClick={onChangeLocation}>
                Change Location
              </button>
            </div>
          </section>

          {/* Section 2: Enter Patient Information */}
          <section>
            <h2 className="blue-background">2. Enter Patient Information</h2>
            <label className="order-labels">First & Last Name</label>
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            {errors.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
            {errors.lastName && (
              <span className="error">{errors.lastName}</span>
            )}

            <label className="order-labels">Sex</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
            {errors.gender && <span className="error">{errors.gender}</span>}
            <label className="order-labels">Date of Birth</label>

            <div>
              <select value={formData.dobMonth} onChange={handleMonthChange}>
                <option value="">Month</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select value={formData.dobDay} onChange={handleDayChange}>
                <option value="">Day</option>
                {dates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
              <select value={formData.dobYear} onChange={handleYearChange}>
                <option value="">Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            {errors.dob && <span className="error">{errors.dob}</span>}
            <label className="order-labels">
              How would you like us to notify you when your results are
              available?
            </label>
            <div>
              <select
                name="notificationMethod"
                value={formData.notificationMethod}
                onChange={handleChange}
              >
                <option value="">Select One</option>
                <option value="Email">Email</option>
                <option value="Text Me (SMS)">Text Me (SMS)</option>
                <option value="Do not contact me, I will call to check on my results.">
                  Do not contact me, I will call to check on my results.
                </option>
              </select>
            </div>
            {formData.notificationMethod === "Email" && (
              <div>
                <label className="order-labels" htmlFor="email">
                  Email Address:
                </label>
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
              </div>
            )}

            {formData.notificationMethod === "Text Me (SMS)" && (
              <div>
                <label className="order-labels" htmlFor="sms">
                  Phone Number (SMS):
                </label>
              </div>
            )}

            {formData.notificationMethod === "Text Me (SMS)" && (
              <div>
                <input
                  type="tel"
                  name="phone"
                  id="sms"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(xxx) xxx-xxxx"
                  required
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>
            )}

            {/* {formData.notificationMethod === "Text Me (SMS)" && (
              <div>
                <label className="order-labels">
                  May we leave a voicemail?
                </label>
              </div>
            )} */}
            {/* 
            {formData.notificationMethod === "Text Me (SMS)" && (
              <div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="voicemail"
                      value="Yes"
                      checked={formData.voicemail === "Yes"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="voicemail"
                      value="No"
                      checked={formData.voicemail === "No"}
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {errors.voicemail && (
                  <span className="error">{errors.voicemail}</span>
                )}
              </div>
            )} */}

            {errors.notificationMethod && (
              <span className="error">{errors.notificationMethod}</span>
            )}
          </section>

          <button type="submit" onClick={handleSubmit}>
            Place Your Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
