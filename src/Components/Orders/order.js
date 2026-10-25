import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Journey/journey.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../utils/AuthContext";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { Check } from "lucide-react";
import { LocationContext } from "../../utils/LocationContext";
import { webApiInstance } from "../../AxiosInstance";
import { useLoader } from "../../utils/LoaderContext";
import { useQuestionnaire } from "../../utils/QuestionareContext";
import { useCart } from "../../utils/CartContext";
import "../../Modals/confirmation-modal.css";
// Guests leave the site for Stripe (or the login page), so the cart and patient
// details are kept in sessionStorage for the length of the visit.
import {
  CHECKOUT_TESTS_KEY,
  GUEST_DETAILS_KEY,
  readStored,
  writeStored,
} from "../../utils/checkoutStorage";
import { EMPTY_GUEST_DETAILS, validateGuestDetails, guestCustomerPayload } from "./guestDetails";

const checkoutErrorMessage = (error) => {
  if (error.response?.status === 403)
    return "Your account can't place orders yet. Please book a doctor consultation first.";
  const data = error.response?.data;
  if (typeof data === "string" && data) return data;
  if (data?.errors) return Object.values(data.errors).flat().join(" ");
  return "We couldn't start checkout. Please try again.";
};

const OrderPage = () => {
  const [testPrices, setTestPrices] = useState({
    tenTestPanel: null,
    tenTestPanelHIVRNA: null,
  });
  const { selectedLocation } = useContext(LocationContext);
  const { setSelectedTests } = useCart();
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [Disease, setDisease] = useState(null);
  const [genderLookup, setGenderLookup] = useState([]);
  const [patients, setPatients] = useState([]);
  const { loading, setLoading } = useLoader();
  const { questionnaireId, hasSymptoms, stdQuestionsFilled } =
    useQuestionnaire();

  const location = useLocation();
  const { selectedTests: routedTests = [] } = location.state || {};
  // Coming back from Stripe there is no route state, so fall back to the saved cart.
  const selectedTests = routedTests.length ? routedTests : readStored(CHECKOUT_TESTS_KEY, []);
  const [tests, setTests] = useState(selectedTests);
  const [totalCost, setTotalCost] = useState(
    selectedTests.reduce((acc, test) => acc + test.price, 0)
  );
  // Entered on /patient-details (step 1 of guest checkout).
  const [guestDetails] = useState(() => ({
    ...EMPTY_GUEST_DETAILS,
    ...readStored(GUEST_DETAILS_KEY, {}),
  }));
  const guestDetailsComplete = Object.keys(validateGuestDetails(guestDetails)).length === 0;
  const [submitting, setSubmitting] = useState(false);
  // Shown to guests after Confirm order, before they are sent to Stripe.
  const [guestNotice, setGuestNotice] = useState(null);

  // Every test detail page routes here with its own location state; keep the
  // shared cart in step with whatever actually landed on this page.
  useEffect(() => {
    setSelectedTests(tests);
    writeStored(CHECKOUT_TESTS_KEY, tests);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tests]);

  // Guests fill in the patient's details first (the cart is already saved above).
  useEffect(() => {
    if (!authToken && !guestDetailsComplete) navigate("/patient-details", { replace: true });
  }, [authToken, guestDetailsComplete, navigate]);

  // Upgrade buttons need the real panel prices from the backend.
  useEffect(() => {
    const fetchPanelPrices = async () => {
      try {
        const [panel, panelWithRna] = await Promise.all([
          webApiInstance.get(`/Disease/get-by-name/${encodeURIComponent("10 Test Panel")}`),
          webApiInstance.get(
            `/Disease/get-by-name/${encodeURIComponent("10 Test Panel with HIV RNA Early Detection")}`
          ),
        ]);
        setTestPrices({
          tenTestPanel: Number(panel.data.result.price),
          tenTestPanelHIVRNA: Number(panelWithRna.data.result.price),
        });
      } catch (error) {
        console.error("Error fetching panel prices:", error);
      }
    };

    fetchPanelPrices();
  }, []);

  const onChangeLocation = () => {
    navigate("/test-centers");
  };

  const [randomDoctor, setRandomDoctor] = useState(null);
  const [reviewConfirmed, setReviewConfirmed] = useState(false);

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


  // useEffect(() => {
  //   if (!stdQuestionsFilled) {
  //     navigate("/std-assessment");
  //   }
  // }, [stdQuestionsFilled, navigate]);

  // useEffect(() => {
  //   if (questionnaireId === 2 && hasSymptoms) {
  //     // Redirect user or show warning
  //     alert(
  //       "You are not eligible to order based on your answers. First consult a doctor."
  //     );
  //     navigate("/doctor-consultation"); // or navigate back
  //   }
  // }, [questionnaireId, hasSymptoms, navigate]);

  useEffect(() => {
    if (!authToken) return;
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
  }, [tests]);

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
      console.log(diseases, authToken);
      // Extract IDs from the diseases array
      const response = await webApiInstance.post(
        "/Payment/create-checkout-session",
        {
          diseaseIdList: diseases,
          doctorId: 15
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
    }
  };

  // Logged-in users keep the existing checkout; guests use the guest endpoint
  // with the patient's details. Prices are always worked out by the backend.
  const handleConfirmOrder = async () => {
    if (!Array.isArray(Disease) || Disease.length !== tests.length) {
      toast.error("Your tests are still loading. Please try again in a moment.");
      return;
    }
    if (!authToken && !guestDetailsComplete) {
      navigate("/patient-details");
      return;
    }

    setSubmitting(true);
    try {
      const response = authToken
        ? await webApiInstance.post(
            "/Payment/create-checkout-session",
            { diseaseIdList: Disease, doctorId: 15 },
            { headers: { Authorization: `Bearer ${authToken}` } }
          )
        : await webApiInstance.post("/Payment/create-guest-checkout-session", {
            diseaseIdList: Disease,
            doctorId: 15,
            customer: guestCustomerPayload(guestDetails),
          });
      if (response.data.sessionUrl) {
        if (!authToken) {
          // Tell the guest about their account first; the popup's button goes to Stripe.
          setGuestNotice({
            sessionUrl: response.data.sessionUrl,
            accountActive: response.data.accountActive,
            emailSent: response.data.emailSent,
            email: guestDetails.email.trim(),
          });
          return;
        }
        window.location.href = response.data.sessionUrl;
        return; // leave the button locked while the browser goes to Stripe
      }
      toast.error("We couldn't start checkout. Please try again.");
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error(checkoutErrorMessage(error));
    }
    setSubmitting(false);
  };

  useEffect(() => {
    console.log("Selected Location ", selectedLocation);
  }, [selectedLocation]);

  if (loading) {
    return (
      <section className="sh-journey">
        <div className="j-loading">
          <ClipLoader size={50} color={"#006c55"} loading={loading} />
        </div>
      </section>
    );
  }

  const showPanelUpgrade =
    testPrices.tenTestPanel !== null &&
    tests.length > 0 &&
    tests[0].name !== "10 Test Panel" &&
    tests[0].name !== "10 Test Panel with HIV RNA Early Detection" &&
    totalCost < 150;
  const showHivRnaUpgrade =
    testPrices.tenTestPanelHIVRNA !== null && tests.length > 0 && tests[0].name === "10 Test Panel";
  const panelTests = [
    "HIV Type 1",
    "Hepatitis A",
    "Gonorrhea",
    "Herpes 2",
    "Chlamydia",
    "Herpes 1",
    "Hepatitis C",
    "HIV Type 2",
    "Hepatitis B",
    "Syphilis",
  ];

  return (
    <section className="sh-journey">
      {guestNotice && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal-content" role="dialog" aria-modal="true">
            <h2 className="confirmation-modal-heading">
              {guestNotice.accountActive ? "You already have an account" : "Check your email"}
            </h2>
            <p>
              {guestNotice.accountActive
                ? `${guestNotice.email} already has a Satellite Health account. We've added this order to it, so log in after paying to see it.`
                : `We've sent a link to ${guestNotice.email} to activate the account for this order. The link is valid for 24 hours, and any earlier link no longer works.`}
            </p>
            {!guestNotice.emailSent && (
              <p>We couldn't send the email right now. You can still complete your payment.</p>
            )}
            <div className="confirmation-modal-buttons">
              <button
                className="button2"
                onClick={() => {
                  window.location.href = guestNotice.sessionUrl;
                }}
              >
                Continue to payment
              </button>
            </div>
          </div>
        </div>
      )}
      <p className="j-notice">
        Your order is not confirmed until payment succeeds. Card details are entered on our secure
        payment provider's checkout and never pass through this page.
      </p>
      <div className="j-shell">
        <div className="j-eyebrow">COMPLETE YOUR ORDER</div>
        <h1 className="j-title">Order &amp; checkout.</h1>
        <p className="j-intro">
          Review your tests and collection location, then continue to secure payment.
        </p>

        <div className="j-payment-layout">
          <div className="j-stack">
            <section className="j-panel">
              <div className="j-payment-heading">
                <h2 className="j-panel-title">Your tests</h2>
                <span className="j-pill">
                  {tests.length} {tests.length === 1 ? "test" : "tests"} selected
                </span>
              </div>
              {tests.length === 0 ? (
                <p className="j-hint">
                  No tests selected yet. Browse the catalogue to add an individual test or a panel.
                </p>
              ) : (
                tests.map((test, index) => (
                  <div className="j-row" key={index}>
                    <span>{test.name}</span>
                    <strong>${test.price.toFixed(2)}</strong>
                  </div>
                ))
              )}
              <div className="j-actions">
                <button
                  type="button"
                  className="j-button j-button--secondary"
                  onClick={() =>
                    navigate("/price-packages", { state: { selectedTests: tests } })
                  }
                >
                  Add / edit tests
                </button>
              </div>
            </section>

            {showPanelUpgrade && (
              <section className="j-panel j-upgrade">
                <span className="j-tag">SAVE ON COMMON STDS</span>
                <h2 className="j-panel-title">Upgrade to the 10 Test Panel</h2>
                <p className="j-hint">
                  Test for the ten most common STDs in a single order.
                </p>
                <ul className="j-upgrade-tests">
                  {panelTests.map((name) => (
                    <li key={name}>
                      <Check size={16} aria-hidden="true" />
                      {name}
                    </li>
                  ))}
                </ul>
                <div className="j-actions">
                  <button type="button" className="j-button" onClick={handleUpgrade}>
                    Upgrade now · + $
                    {Math.max(0, testPrices.tenTestPanel - totalCost).toFixed(2)}
                  </button>
                </div>
              </section>
            )}

            {showHivRnaUpgrade && (
              <section className="j-panel j-upgrade">
                <span className="j-tag">WORRIED ABOUT RECENT EXPOSURE?</span>
                <h2 className="j-panel-title">Add HIV RNA Early Detection</h2>
                <p className="j-hint">
                  Early detection testing shortens the window period for an HIV result.
                </p>
                <div className="j-actions">
                  <button type="button" className="j-button" onClick={handleHIVRNAUpgrade}>
                    Upgrade · + $
                    {Math.max(0, testPrices.tenTestPanelHIVRNA - totalCost).toFixed(2)}
                  </button>
                </div>
              </section>
            )}

            <section className="j-panel">
              <div className="j-payment-heading">
                <h2 className="j-panel-title">Find a test center</h2>
                <span className="j-pill">Collection location</span>
              </div>
              <p className="j-hint">Your sample is collected at the lab you choose here.</p>
              <div className="j-row">
                <span>Your selected lab</span>
                <strong>{selectedLocation || "No lab selected yet"}</strong>
              </div>
              <div className="j-row">
                <span>Address</span>
                <strong>4651 W Kennedy Blvd, Tampa, FL 33609</strong>
              </div>
              <div className="j-actions">
                <button
                  type="button"
                  className="j-button j-button--secondary"
                  onClick={onChangeLocation}
                >
                  Change location
                </button>
              </div>
            </section>

            {!authToken && (
              <section className="j-panel">
                <div className="j-payment-heading">
                  <h2 className="j-panel-title">Patient details</h2>
                  <span className="j-pill">The person being tested</span>
                </div>
                <div className="j-row">
                  <span>Name</span>
                  <strong>
                    {guestDetails.firstName} {guestDetails.lastName}
                  </strong>
                </div>
                <div className="j-row">
                  <span>Email</span>
                  <strong>{guestDetails.email}</strong>
                </div>
                <div className="j-row">
                  <span>Phone</span>
                  <strong>{guestDetails.phoneNumber}</strong>
                </div>
                <div className="j-row">
                  <span>Date of birth</span>
                  <strong>{guestDetails.dob}</strong>
                </div>
                <div className="j-row">
                  <span>Address</span>
                  <strong>
                    {guestDetails.address}, {guestDetails.city}, {guestDetails.state}{" "}
                    {guestDetails.zip}
                  </strong>
                </div>
                <p className="j-hint">
                  When you confirm the order we create their account and email them a link to
                  activate it.
                </p>
                <div className="j-actions">
                  <button
                    type="button"
                    className="j-button j-button--secondary"
                    onClick={() => navigate("/patient-details")}
                  >
                    Edit details
                  </button>
                </div>
              </section>
            )}
          </div>

          <aside className="j-payment-summary">
            <div className="j-panel">
              <span className="j-tag">YOUR ORDER</span>
              <h2 className="j-panel-title">Order summary</h2>
              <div className="j-row">
                <span>Test / panel</span>
                <strong>
                  {tests.length ? tests.map((test) => test.name).join(", ") : "None selected"}
                </strong>
              </div>
              <div className="j-row">
                <span>Collection location</span>
                <strong>{selectedLocation || "Not selected"}</strong>
              </div>
              <div className="j-payment-total">
                <span>Total</span>
                <strong>${totalCost.toFixed(2)}</strong>
              </div>
              <label className="j-check">
                <input
                  type="checkbox"
                  checked={reviewConfirmed}
                  onChange={(event) => setReviewConfirmed(event.target.checked)}
                />
                <span>I have reviewed the selected tests, lab, and total.</span>
              </label>
              <button
                type="button"
                className="j-button j-pay-button"
                disabled={!selectedLocation || !reviewConfirmed || !tests.length || submitting}
                onClick={handleConfirmOrder}
              >
                {submitting ? "Starting checkout…" : "Confirm order"}
              </button>
              {!selectedLocation && (
                <p className="j-error">Choose a test center to continue.</p>
              )}
              <p className="j-hint">
                You complete payment on our secure checkout. Pricing is confirmed before any charge
                is taken.
              </p>
            </div>
            <div className="j-payment-next">
              <h3>What happens next?</h3>
              <p>
                After a confirmed payment you receive an order confirmation and receipt by email and
                text. Your lab requisition follows separately, with collection instructions for the
                center you chose.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default OrderPage;