import React, { useState, useEffect } from "react";
import "./10-test-panel/Testpanel.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { webApiInstance } from "../../AxiosInstance";

function GenericSection() {
  const navigate = useNavigate();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const handleCheckbox1 = () => {
    setChecked1(!checked1);
    if (!checked1) setChecked2(false); // Uncheck Checkbox 2
  };

  const handleCheckbox2 = () => {
    setChecked2(!checked2);
    if (!checked2) setChecked1(false); // Uncheck Checkbox 1
  };

  const handleGetTested = () => {
    let selectedTest = null;
    if (checked1) {
      selectedTest = { name: "10 Test Panel", price: 139 };
    } else if (checked2) {
      selectedTest = {
        name: "10 Test Panel with HIV RNA Early Detection",
        price: 259,
      };
    }
    if (selectedTest) {
      navigate("/order", { state: { selectedTests: [selectedTest] } });
    } else {
      toast.error("Please select a test before proceeding.");
    }
  };

  const onSubmitClick = () => {
    navigate("/order");
  };

  const [TenTestPanel, setTenTestPanel] = useState(null);
  const [TenTestPanelEarlyRNA, setTenTestPanelEarlyRNA] = useState(null);

  const getData = async (name, setter) => {
    try {
      const response = await webApiInstance.get(`/Disease/get-by-name/${encodeURIComponent(name)}`);
      setter(response.data.result);
    } catch (error) {
      console.error(`Error fetching data for ${name}:`, error);
    }
  };

  useEffect(() => {
    getData(
      "10 Test Panel with HIV RNA Early Detection",
      setTenTestPanelEarlyRNA
    );
    getData("10 Test Panel", setTenTestPanel);
  }, []);

  useEffect(() => {
    console.log(TenTestPanel);
  }, [TenTestPanel]);

  return (
    <section>
      <section className="TestPanelSection3">
        <h1 className="center my-3" style={{ padding: "10px 0" }}>
          Our Service Includes:
        </h1>
        <div className="test-services">
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#333333"
                    d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"
                  />
                </svg>
                <span className="mx-3 test-service-text">
                  <strong>
                    FDA-approved / cleared tests performed in CLIA-certified
                    labs
                  </strong>
                  <p>
                    Same labs trusted by physicians and hospitals in your area
                  </p>
                </span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="#333333"
                      d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 4a1 1 0 0 0-1 1v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V7a1 1 0 0 0-1-1"
                    />
                  </g>
                </svg>
                <span className="mx-3 test-service-text">
                  <strong>Fast results in 1-2 days</strong>
                  <p>Sent to your email as soon as they are available</p>
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#333333"
                    d="M224 256a128 128 0 1 0 0-256a128 128 0 1 0 0 256m-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16s7.2-16 16-16v-24c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16v-40c0-29.8 20.4-54.9 48-62v-57.1q-9-.9-18.3-.9h-91.4q-9.3 0-18.3.9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7zM144 448a24 24 0 1 0 0-48a24 24 0 1 0 0 48"
                  />
                </svg>
                <span className="mx-3 test-service-text">
                  <strong>Physician consultation available</strong>
                  <p>
                    If your test result is positive, you can speak with one of
                    our doctors
                  </p>
                </span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50px"
                  height="50px"
                  viewBox="0 0 48 48"
                >
                  <g fill="#333333">
                    <path d="m24.433 28.279l-1.867-.707c.5-1.32 1.35-2.752 2.69-4.241l1.487 1.338c-1.183 1.315-1.901 2.53-2.31 3.61" />
                    <path
                      fill-rule="evenodd"
                      d="M15.563 7C10.035 7 6 12.64 6 18.724C6 32.304 24 41 24 41s18-9.256 18-22.276C42 12.642 37.965 7 32.438 7C28.602 7 25.755 9.531 24 13.121C22.243 9.531 19.398 7 15.563 7M17 24.959c0 2.807 3.142 3.703 5.441 2.957c-1.098 3.251-.078 5.784.83 6.764l1.467-1.36c-.364-.392-1.2-2.014-.509-4.422c1.207 2.237 6.771 2.519 6.771-1.7V16c-2.882 2.439-5.961 3.403-8.495 4.197C19.323 21.193 17 21.92 17 24.959"
                      clip-rule="evenodd"
                    />
                  </g>
                </svg>
                <span className="mx-3 test-service-text">
                  <strong>
                    Care Advisors available 24/7 at 1-800-456-2323
                  </strong>
                  <p>
                    Our trained Care Advisors are available over the phone or
                    online to answer your questions
                  </p>
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#333333"
                    fill-rule="evenodd"
                    d="M14.25 2.5a.25.25 0 0 0-.25-.25H7A2.75 2.75 0 0 0 4.25 5v14A2.75 2.75 0 0 0 7 21.75h10A2.75 2.75 0 0 0 19.75 19V9.147a.25.25 0 0 0-.25-.25H15a.75.75 0 0 1-.75-.75zm.75 9.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5zm0 4a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill="3333333"
                    d="M15.75 2.824c0-.184.193-.301.336-.186q.182.147.323.342l3.013 4.197c.068.096-.006.22-.124.22H16a.25.25 0 0 1-.25-.25z"
                  />
                </svg>
                <span className="mx-3 test-service-text">
                  <strong>Local testing centers in your area</strong>
                  <p>
                    With our 4500 testing centers nationwide, your sample
                    collection is easy and convenient
                  </p>
                </span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#333333"
                    d="M22 3.94L12 .44L2 3.94V12c0 4.127 2.534 7.012 4.896 8.803a19.8 19.8 0 0 0 4.65 2.595q.17.064.342.122l.112.04l.114-.04a14 14 0 0 0 .65-.244a19.7 19.7 0 0 0 4.34-2.473C19.467 19.012 22 16.127 22 12zM11.001 15.415L6.76 11.172l1.414-1.415l2.828 2.829l5.657-5.657l1.415 1.414z"
                  />
                </svg>
                <span className="mx-3 test-service-text">
                  <strong>Your health information is kept private</strong>
                  <p>
                    We care about your privacy and all of your health
                    information is protected
                  </p>
                </span>
              </div>
            </div>
          </div>
          <div className="test-services-flex">
            <img src="./Doctor.svg" alt="404" />
            <div className="test-services-flex-text">
              <h4>What do I do if I test Positive for an STD?</h4>
              <p>
                If one or more of your test results are positive, you can
                schedule a phone consultation with one of our doctors. During
                this consultation, one of our doctors will explain what your
                test results mean, answer any questions you might have, and can
                prescribe treatment at his or her discretion.
              </p>
              <h6>We are here for you. Call us at tel:18004562323</h6>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <section className="TestPanelSection4">
        <div className="Test-Panel-Transaction-Card">
          <div className="Test-Panel-Transaction-Card-header">
            10 Test Panel
          </div>
          <div className="Test-Panel-Transaction-Card-Text ">
            <strong>No Long Delays - </strong>
            Testing usually takes a few minutes and your results are available
            within 1-2 days.
          </div>
          <div className="Test-Panel-Transaction-Card-Text ">
            <strong>No Surprises - </strong>
            No hidden fees, no extra charges.
          </div>
          <div className="Testss mx-3">
            <div className="tests">
              <div className="test">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#36ef3c"
                      d="M11.4 6.85a.5.5 0 0 0-.707-.707l-3.65 3.65l-1.65-1.65a.5.5 0 0 0-.707.707l2 2a.5.5 0 0 0 .707 0l4-4z"
                    />
                  </svg>
                </span>
                <p>
                  {" "}
                  <strong>HIV Type 1</strong>
                </p>
              </div>
              <div className="test">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#36ef3c"
                      d="M11.4 6.85a.5.5 0 0 0-.707-.707l-3.65 3.65l-1.65-1.65a.5.5 0 0 0-.707.707l2 2a.5.5 0 0 0 .707 0l4-4z"
                    />
                  </svg>
                </span>
                <p>
                  {" "}
                  <strong>HIV Type 2</strong>
                </p>
              </div>
              <div className="test">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#36ef3c"
                      d="M11.4 6.85a.5.5 0 0 0-.707-.707l-3.65 3.65l-1.65-1.65a.5.5 0 0 0-.707.707l2 2a.5.5 0 0 0 .707 0l4-4z"
                    />
                  </svg>
                </span>
                <p>
                  {" "}
                  <strong>Herpes 1</strong>
                </p>
              </div>
              <div className="test">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#36ef3c"
                      d="M11.4 6.85a.5.5 0 0 0-.707-.707l-3.65 3.65l-1.65-1.65a.5.5 0 0 0-.707.707l2 2a.5.5 0 0 0 .707 0l4-4z"
                    />
                  </svg>
                </span>
                <p>
                  {" "}
                  <strong>Herpes 2</strong>
                </p>
              </div>
              <div className="test">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#36ef3c"
                      d="M11.4 6.85a.5.5 0 0 0-.707-.707l-3.65 3.65l-1.65-1.65a.5.5 0 0 0-.707.707l2 2a.5.5 0 0 0 .707 0l4-4z"
                    />
                  </svg>
                </span>
                <p>
                  {" "}
                  <strong> Hepatitis A</strong>
                </p>
              </div>
            </div>
            <div className="tests">
              <div className="test">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#36ef3c"
                      d="M11.4 6.85a.5.5 0 0 0-.707-.707l-3.65 3.65l-1.65-1.65a.5.5 0 0 0-.707.707l2 2a.5.5 0 0 0 .707 0l4-4z"
                    />
                  </svg>
                </span>
                <p>
                  {" "}
                  <strong> Hepatitis B</strong>
                </p>
              </div>
              <div className="test">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#36ef3c"
                      d="M11.4 6.85a.5.5 0 0 0-.707-.707l-3.65 3.65l-1.65-1.65a.5.5 0 0 0-.707.707l2 2a.5.5 0 0 0 .707 0l4-4z"
                    />
                  </svg>
                </span>
                <p>
                  {" "}
                  <strong>Hepatitis C</strong>
                </p>
              </div>
              <div className="test">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#36ef3c"
                      d="M11.4 6.85a.5.5 0 0 0-.707-.707l-3.65 3.65l-1.65-1.65a.5.5 0 0 0-.707.707l2 2a.5.5 0 0 0 .707 0l4-4z"
                    />
                  </svg>
                </span>
                <p>
                  {" "}
                  <strong>Chlamydia</strong>
                </p>
              </div>
              <div className="test">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#36ef3c"
                      d="M11.4 6.85a.5.5 0 0 0-.707-.707l-3.65 3.65l-1.65-1.65a.5.5 0 0 0-.707.707l2 2a.5.5 0 0 0 .707 0l4-4z"
                    />
                  </svg>
                </span>
                <p>
                  {" "}
                  <strong>Gonorrhea</strong>
                </p>
              </div>
              <div className="test">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#36ef3c"
                      d="M11.4 6.85a.5.5 0 0 0-.707-.707l-3.65 3.65l-1.65-1.65a.5.5 0 0 0-.707.707l2 2a.5.5 0 0 0 .707 0l4-4z"
                    />
                  </svg>
                </span>
                <p>
                  {" "}
                  <strong>Syphilis</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="test-card-1-container">
            <div className="test-card-1">
              <div className="card-header">Choose Your Packages</div>

              <div className="card-radio">
                <div className="card-checkbox" onClick={handleCheckbox1}>
                  <input
                    type="checkbox"
                    checked={checked1}
                    onChange={handleCheckbox1}
                  />
                  10 Test Panel
                </div>
                <div className="card-price"> ${TenTestPanel !== null ? TenTestPanel.price : ""}</div>
              </div>
              <div className="card-radio" onClick={handleCheckbox2}>
                <div className="card-checkbox">
                  <input
                    type="checkbox"
                    checked={checked2}
                    onChange={handleCheckbox2}
                  />
                  10 Test Panel with HIV RNA Early Detection
                </div>
                <div className="card-price"> ${TenTestPanelEarlyRNA !== null ? TenTestPanelEarlyRNA.price : ""}</div>
              </div>
              <div className="card-button">
                <button className="button3" onClick={handleGetTested}>
                  Get Tested
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default GenericSection;
