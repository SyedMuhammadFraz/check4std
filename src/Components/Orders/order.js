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
import { useLoader } from "../../utils/LoaderContext";
import { useQuestionnaire } from "../../utils/QuestionareContext";

const OrderPage = () => {
  const [testPrices, setTestPrices] = useState({
    tenTestPanel: null,
    tenTestPanelHIVRNA: null,
  });
  const { selectedLocation } = useContext(LocationContext);
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [Disease, setDisease] = useState(null);
  const [genderLookup, setGenderLookup] = useState([]);
  const [patients, setPatients] = useState([]);
  const { loading, setLoading } = useLoader();
  const { questionnaireId, hasSymptoms, stdQuestionsFilled } =
    useQuestionnaire();

  const location = useLocation();
  const { selectedTests = [] } = location.state || {};
  const [tests, setTests] = useState(selectedTests);
  const [totalCost, setTotalCost] = useState(
    selectedTests.reduce((acc, test) => acc + test.price, 0)
  );

  const onChangeLocation = () => {
    navigate("/test-centers");
  };

  const [randomDoctor, setRandomDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctorsAndPickOne = async () => {
      try {
        const res = await webApiInstance.get("/Doctor");
        const doctors = res.data.result;

        const onlyDoctors = doctors.filter(
          (d) => d.profession?.toLowerCase() === "doctor"
        );

        console.log("Filtered Doctors: ", onlyDoctors);

        if (onlyDoctors.length > 0) {
          const randomIndex = Math.floor(Math.random() * onlyDoctors.length);
          setRandomDoctor(onlyDoctors[randomIndex]);
        } else {
          console.error("No doctors found after filtering.");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorsAndPickOne();
  }, []);

  useEffect(() => {
  if (randomDoctor) {
    console.log("Selected Random Doctor: ", randomDoctor);
  }
}, [randomDoctor]);


  useEffect(() => {
    if (!stdQuestionsFilled) {
      navigate("/std-assessment");
    }
  }, [stdQuestionsFilled, navigate]);

  useEffect(() => {
    if (questionnaireId === 2 && hasSymptoms) {
      // Redirect user or show warning
      alert(
        "You are not eligible to order based on your answers. First consult a doctor."
      );
      navigate("/doctor-consultation"); // or navigate back
    }
  }, [questionnaireId, hasSymptoms, navigate]);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const response = await webApiInstance.get("/Patient/by-created-by", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setPatients(response.data.result || []);
      } catch (error) {
        console.error("Failed to fetch patients", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [authToken]);

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
  }, [selectedTests, tests]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    genderId: "",
    contactTypeId: "",
    dobMonth: "",
    dobDay: "",
    dobYear: "",
    email: "",
    phoneNumber: "",
    genderValue: "",
    contactValue: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    genderId: "",
    contactTypeId: "",
    dob: "",
  });

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;

  //   // Create the updated form data
  //   const updatedFormData = {
  //     ...formData,
  //     [name]: type === "checkbox" ? checked : value,
  //   };

  //   // Update the state with the new form data
  //   setFormData(updatedFormData);

  //   // Dynamically update errors
  //   setErrors((prevErrors) => {
  //     const newErrors = { ...prevErrors };

  //     // Remove specific field errors if the field is no longer invalid
  //     if (newErrors[name]) {
  //       delete newErrors[name];
  //     }

  //     return newErrors;
  //   });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    var fullDate = "";
    const newErrors = {};

    // Validate each field
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.genderId) newErrors.genderId = "Gender is required.";
    if (!formData.contactTypeId)
      newErrors.contactTypeId =
        "Select a method to notify you when your results are available.";
    if (
      formData.contactValue === "Email" &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (
      formData.contactValue === "PhoneNumber" &&
      !/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phoneNumber)
    ) {
      newErrors.phoneNumber =
        "Please enter a valid phone number (e.g., (xxx) xxx-xxxx).";
    }
    if (!formData.dobMonth || !formData.dobDay || !formData.dobYear) {
      newErrors.dob = "Date of birth is required.";
    } else if (formData.dobMonth && formData.dobDay && formData.dobYear) {
      fullDate = new Date(
        `${formData.dobMonth}-${formData.dobDay}-${formData.dobYear}`
      ).toISOString();
    }

    // ✅ Prepare the final payload
    const payload = {
      patientInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        genderId: Number(formData.genderId),
        contactTypeId: Number(formData.contactTypeId),
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        genderValue: formData.genderValue,
        contactValue: formData.contactValue,
        dob: fullDate, // Date in ISO format
      },
    };
    setErrors(newErrors);
    // Prevent submission if there are errors
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    navigate("/#");
    if (Disease !== null) {
      console.log("Random Doctor:", randomDoctor.id)
      toast.success("Redirecting to Payment Checkout Page");
      createCheckoutSession(
        Disease,
        authToken,
        payload.patientInfo,
        16
      );
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
  const years = Array.from({ length: 90 }, (_, i) => currentYear - 10 - i);

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

  // useEffect(() => {
  //   useLookupData([
  //     { type: "Gender", setter: setGenderLookup },
  //     { type: "ContactMedium", setter: setContactMediumLookup },
  //   ]);
  // }, []);

  const createCheckoutSession = async (
    diseases,
    authToken
  ) => {
    try {
      console.log(diseases);
      // Extract IDs from the diseases array
      const response = await webApiInstance.post(
        "/Payment/create-checkout-session",
        {
          diseaseIdList: diseases,
          doctorId: 16
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.sessionUrl) {
        window.location.href = response.data.sessionUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  const handleGenderChange = (e) => {
    const { name, value } = e.target;

    // If the user selects a gender, update both genderId and genderValue
    if (name === "genderId") {
      const selectedGender = genderLookup.find((g) => g.id === Number(value));

      setFormData((prevData) => ({
        ...prevData,
        genderId: value, // Numeric ID
        genderValue: selectedGender ? selectedGender.lookupValue : "", // Actual Gender Text
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      // Remove specific field errors if the field is no longer invalid
      if (newErrors[name]) {
        delete newErrors[name];
      }

      return newErrors;
    });
  };

  const handleSelect = async (patient) => {
    const payload = {
      patientInfo: {
        id: patient.id,
        name: patient.name,
        email: patient.email,
        phoneNumber: patient.phone,
        age: patient.age,
      },
    };

    if (Disease !== null) {
      setLoading(true); // Show spinner
      try {
        await createCheckoutSession(Disease, authToken, payload.patientInfo);
      } catch (error) {
        toast.error("Failed to redirect to payment.");
        console.error(error);
      } finally {
        setLoading(false); // Hide spinner
      }
    }
  };


  // Handle Upgrade for 10 Test Panel
  const handleUpgrade = () => {
    if (testPrices.tenTestPanel && totalCost < testPrices.tenTestPanel) {
      setTests([{ name: "10 Test Panel", price: testPrices.tenTestPanel }]);
      setTotalCost(testPrices.tenTestPanel);
      setDisease("10 Test Panel");
    }
  };

  const handleHIVRNAUpgrade = () => {
    if (testPrices.tenTestPanelHIVRNA) {
      setTests([
        {
          name: "10 Test Panel with HIV RNA Early Detection",
          price: testPrices.tenTestPanelHIVRNA,
        },
      ]);
      setTotalCost(testPrices.tenTestPanelHIVRNA);
      setDisease("10 Test Panel with HIV RNA Early Detection"); // ✅ Set Disease name here
    }
  };

  useEffect(() => {
    console.log("Selected Location ", selectedLocation);
  }, [selectedLocation]);

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
                  + $
                  {Math.max(0, testPrices.tenTestPanel - totalCost).toFixed(2)}
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
                + $
                {Math.max(0, testPrices.tenTestPanelHIVRNA - totalCost).toFixed(
                  2
                )}
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="container container-min-height">
        <h1>Quick & Confidential STD Testing</h1>

        <form>
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
          <div className="confirm-order-container">
            <button
              type="button"
              className="confirm-order-btn"
              disabled={!selectedLocation}
              onClick={() => {
                if (Disease !== null) {
                  createCheckoutSession(Disease, authToken);
                }
              }}
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;