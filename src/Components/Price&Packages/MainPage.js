import React from "react";
import "./MainPage.css";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useGotoOrderPage from "./order-handle";

const MainPage = () => {
  const navigate = useNavigate();
  const gotoOrderPage = useGotoOrderPage();
  const [selectedTests, setSelectedTests] = useState([]);

  const handleCheckboxChange = (testName, price) => {
    setSelectedTests((prev) => {
      const exists = prev.find((test) => test.name === testName);
      if (exists) {
        return prev.filter((test) => test.name !== testName);
      } else {
        return [...prev, { name: testName, price }];
      }
    });
  };

  const handleOrder = () => {
    if (selectedTests.length > 0) {
      navigate("/order", { state: { selectedTests } });
    } else {
      alert("Please select at least one test before proceeding.");
    }
  };

  return (
    <section className="MainPage">
      <h1 className="center">STD Test Prices & Packages</h1>
      <hr />
      <section className="MainPagesection1">
        <h1>Our Services</h1>
        <div className="services">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-5">
              <div className="service">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#F9D71C"
                    d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"
                  />
                </svg>
                <p>Secure and confidential STD testing services</p>
              </div>
            </div>
            <div className="col-md-5">
              <div className="service">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50px"
                  height="50px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#F9D71C"
                    fill-rule="evenodd"
                    d="M14.25 2.5a.25.25 0 0 0-.25-.25H7A2.75 2.75 0 0 0 4.25 5v14A2.75 2.75 0 0 0 7 21.75h10A2.75 2.75 0 0 0 19.75 19V9.147a.25.25 0 0 0-.25-.25H15a.75.75 0 0 1-.75-.75zm.75 9.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5zm0 4a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill="#F9D71C"
                    d="M15.75 2.824c0-.184.193-.301.336-.186q.182.147.323.342l3.013 4.197c.068.096-.006.22-.124.22H16a.25.25 0 0 1-.25-.25z"
                  />
                </svg>
                <p>
                  FDA-approved / cleared tests performed in CLIA-certified labs
                </p>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-5">
              <div className="service">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                >
                  <rect width="50" height="50" fill="none" />
                  <path
                    fill="#F9D71C"
                    d="M7.75 2.5a.75.75 0 0 0-1.5 0v1.58c-1.44.115-2.384.397-3.078 1.092c-.695.694-.977 1.639-1.093 3.078h19.842c-.116-1.44-.398-2.384-1.093-3.078c-.694-.695-1.639-.977-3.078-1.093V2.5a.75.75 0 0 0-1.5 0v1.513C15.585 4 14.839 4 14 4h-4c-.839 0-1.585 0-2.25.013z"
                  />
                  <path
                    fill="#F9D71C"
                    fill-rule="evenodd"
                    d="M2 12c0-.839 0-1.585.013-2.25h19.974C22 10.415 22 11.161 22 12v2c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14zm15 2a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
                    clip-rule="evenodd"
                  />
                </svg>
                <p>The fastest results possible - available in 1 to 2 days</p>
              </div>
            </div>
            <div className="col-md-5">
              <div className="service">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                >
                  <rect width="50" height="50" fill="none" />
                  <path
                    fill="#F9D71C"
                    d="m19.23 15.26l-2.54-.29a1.99 1.99 0 0 0-1.64.57l-1.84 1.84a15.05 15.05 0 0 1-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52a2 2 0 0 0-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07c.53 8.54 7.36 15.36 15.89 15.89c1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98"
                  />
                </svg>
                <p>Private ordering online or by phone</p>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-5">
              <div className="service">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="43.75px"
                  height="50px"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#F9D71C"
                    d="M224 256a128 128 0 1 0 0-256a128 128 0 1 0 0 256m-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16s7.2-16 16-16v-24c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16v-40c0-29.8 20.4-54.9 48-62v-57.1q-9-.9-18.3-.9h-91.4q-9.3 0-18.3.9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7zM144 448a24 24 0 1 0 0-48a24 24 0 1 0 0 48"
                  />
                </svg>
                <p>Doctor consultations available for positive test results</p>
              </div>
            </div>
            <div className="col-md-5">
              <div className="service">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50px"
                  height="50px"
                  viewBox="0 0 12 12"
                >
                  <path
                    fill="#F9D71C"
                    d="M4 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h1zm3 0H5v1.5a.5.5 0 0 1-.5.5H3v2h1.5a.5.5 0 0 1 .5.5V9h2V7.5a.5.5 0 0 1 .5-.5H9V5H7.5a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
                <p>Care Advisors available at 1-800-456-2323</p>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </section>
      <section className="MainPagesection2">
        <h1 className="center">10 Test Panel Pricing</h1>
        <div className="align">
          <div className="text">
            <h4>Doctors recommend our full 10 Test Panel</h4>
            <p>
              Our 10-Test Panel is a comprehensive STD testing package that
              tests for the most common bacterial and viral STDs in the United
              States. This inclusive STD testing panel has been carefully
              designed by our physicians to provide you with complete peace of
              mind.
            </p>
            <br />
            <p>
              If you are concerned about recent exposure, we recommend adding
              our HIV RNA Early Detection Test. Our HIV RNA Early Detection Test
              can detect an HIV infection as early as 6 days after exposure and
              is conclusive if taken 9-11 days post exposure. Our standard HIV
              test is a 4th Generation HIV 1 & 2 Antibody/Antigen test that can
              detect HIV as early as 3 weeks after exposure.
            </p>
            <div className="Testss">
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
            <h1>Choose Your Packages</h1>
            <div className="cards">
              <div className="card">
                <div className="card-header">10 Test Panel</div>
                <div className="card-price"> $139.00</div>
                <div className="card-button">
                  <button
                    className="button3"
                    onClick={() =>
                      gotoOrderPage([{ name: "10 Test Panel", price: 139 }])
                    }
                  >
                    Get Tested
                  </button>
                </div>
              </div>
              <div className="card">
                <div className="card-header">10 Test Panel</div>
                <div className="card-header italic">
                  with HIV RNA Early Detection
                </div>
                <div className="card-price"> $139.00</div>
                <div className="card-button">
                  <button
                    className="button3"
                    onClick={() =>
                      gotoOrderPage([
                        {
                          name: "10 Test Panel with HIV RNA Early Detection",
                          price: 139,
                        },
                      ])
                    }
                  >
                    Get Tested
                  </button>
                </div>
              </div>
            </div>
          </div>
          <img className="doctor-image" src="./Doctor.png" />
        </div>
      </section>
      <section className="MainPagesection3">
        <h1 className="center">Individual Test Pricing</h1>
        <p>
          We offer individual tests in case you are concerned about a single
          infection, or if you are retesting to see if an existing infection has
          been cleared after treatment.
          <strong> Please select tests from the list below.</strong>
        </p>

        <div className="section3width">
          <div className="check">
            <label className="Dform">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange("Chlamydia", 59.0)}
              />
              <p>Chlamydia</p>
              <div className="check-price">$59.00</div>
            </label>
            <label className="Dform">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange("Hepatitis C", 24.0)}
              />
              <p>Hepatitis C</p>
              <div className="check-price">$24.00</div>
            </label>
          </div>
          <div className="check">
            <label className="Dform">
              <input
                type="checkbox"
                onChange={() =>
                  handleCheckboxChange("Chlamydia & Gonorrhea", 99.0)
                }
              />
              <p>Chlamydia & Gonorrhea</p>
              <div className="check-price">$99.00</div>
            </label>
            <label className="Dform">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange("Herpes I", 45.0)}
              />
              <p>Herpes I</p>
              <div className="check-price">$45.00</div>
            </label>
          </div>
          <div className="check">
            <label className="Dform">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange("Gonorrhea", 59.0)}
              />
              <p>Gonorrhea</p>
              <div className="check-price">$59.00</div>
            </label>
            <label className="Dform">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange("Herpes II", 45.0)}
              />
              <p>Herpes II</p>
              <div className="check-price">$45.00</div>
            </label>
          </div>
          <div className="check">
            <label className="Dform">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange("Hepatitis A", 24.0)}
              />
              <p>Hepatitis A</p>
              <div className="check-price">$24.00</div>
            </label>
            <label className="Dform">
              <input
                type="checkbox"
                onChange={() =>
                  handleCheckboxChange("HIV 1 & 2 Antibody (4th Gen)", 49.0)
                }
              />
              <p>HIV 1 & 2 Antibody (4th Gen)</p>
              <div className="check-price">$49.00</div>
            </label>
          </div>
          <div className="check">
            <label className="Dform">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange("Hepatitis B", 24.0)}
              />
              <p>Hepatitis B</p>
              <div className="check-price">$24.00</div>
            </label>
            <label className="Dform">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange("Syphilis", 45.0)}
              />
              <p>Syphilis</p>
              <div className="check-price">$49.00</div>
            </label>
          </div>
        </div>
        <button className="button2" onClick={handleOrder}>
          Get Tested
        </button>
      </section>
      <section className="MainPagesection4">
        <h1 className="center">Complete STD Testing at Unbeatable Prices</h1>
        <p className="section4-header">
          You may be concerned about the best time to test for STDs. If you have
          had unprotected sexual contact, our doctors recommend testing 3 weeks
          after initial exposure, and again 3 months after to confirm your
          initial diagnosis. This is the best way to ensure you test at the
          right time because different sexually transmitted infections become
          detectable at different times. To know what test is right for you, use
          our physician-approved Test Recommendation Tool or call our Care
          Advisors at 1-800-456-2323.
        </p>
        <div className="section4text">
          <section>
            <h2>Why Choose Check4std.com?</h2>
            <ul>
              <li>100% Private and Confidential STD Testing Service</li>
              <li>Exclusive FDA-approved HIV RNA Early Detection testing</li>
              <li>Over 4,500 convenient testing locations nationwide</li>
              <li>
                Comprehensive 10-Test Panel that checks for all common STDs,
                including hepatitis A and HIV-2
              </li>
              <li>
                Fast results available in 1-2 days through your secure online
                account
              </li>
              <li>
                Doctor consultation and treatment options provided for positive
                results
              </li>
              <li>
                All tests are supervised and approved by qualified physicians
              </li>
            </ul>
          </section>
          <br />

          <section>
            <h3>HIV RNA Test vs. HIV 4th Generation Antibody Test</h3>
            <p>
              The HIV RNA test identifies HIV as early as 9-11 days after
              exposure, detecting the virus's genetic material (RNA) in the
              blood. In contrast, the HIV 4th Generation Antibody test detects
              antibodies and antigens 3 weeks after exposure. Antibodies are
              immune system proteins that fight foreign substances, while
              antigens are the substances causing the response. Both tests offer
              different detection timelines for early and accurate results.
            </p>
          </section>
          <br />

          <section>
            <h3>Next Steps</h3>
            <p>
              Testing with STDcheck.com is fast and straightforward. Simply
              select a testing location near you using your zip code. After
              placing your order, you’ll receive a Lab Requisition Form or test
              code in your secure online account. Bring this form or code to the
              testing center, where a technician will collect your
              samples—usually within 5 minutes. Your results will be available
              in 1-2 days in your secure account.
            </p>
          </section>
          <br />

          <section>
            <h3>Do I Need an Appointment?</h3>
            <p>
              No appointment is necessary. However, test centers do not accept
              payments onsite, so you must complete your order and payment
              online or via phone beforehand. Once your order is placed, you can
              visit any of our 4,500 test centers during regular business hours,
              with some open on Saturdays.
            </p>
          </section>
          <br />

          <section>
            <h3>Will My Visit Be Discreet?</h3>
            <p>
              Yes, our lab centers offer complete discretion. Technicians are
              unaware of the specific tests you're undergoing. The process is
              quick and private—typically completed within 5 minutes with no
              waiting area.
            </p>
          </section>
          <br />

          <section>
            <h3>Is My Information Confidential?</h3>
            <p>
              Your privacy is our top priority. We do not share your results
              with insurance companies or include them in your permanent medical
              record. All information is handled under HIPAA regulations,
              ensuring the highest level of confidentiality.
            </p>
          </section>
          <br />

          <section>
            <h3>Doctor Consultation</h3>
            <p>
              If you test positive for an STD, our physicians will explain your
              results and answer any questions. For an additional fee, treatment
              options can be prescribed and sent to your local pharmacy.
            </p>
          </section>
          <br />

          <section>
            <h3>Before and After the Test</h3>
            <p>
              For blood tests (e.g., HIV, syphilis, hepatitis, herpes), no
              preparation is needed. For urine tests (e.g., chlamydia,
              gonorrhea), avoid urination for at least one hour before testing.
              After your test, results will be available in 1-2 days. If
              positive, treatment options will be provided.
            </p>
          </section>
          <br />

          <section>
            <h3>How Soon Can I Test?</h3>
            <p>
              You can test immediately after placing your order and receiving
              your Lab Requisition Form or test code. Testing centers are open
              during normal business hours, with some available on Saturdays.
            </p>
          </section>
          <br />

          <section>
            <h3>How Long is the Lab Visit?</h3>
            <p>
              The lab visit takes approximately 5 minutes. Simply present your
              Lab Requisition Form or test code to the technician, and the
              required samples will be collected quickly and discreetly.
            </p>
          </section>
          <br />

          <section>
            <h3>What Should I Bring?</h3>
            <p>
              Bring your Lab Requisition Form or test code to the test center.
              Blood and/or urine samples will be collected as needed. Results
              will be available within 1-2 days in your secure account.
            </p>
          </section>
          <br />
        </div>
      </section>
    </section>
  );
};

export default MainPage;
