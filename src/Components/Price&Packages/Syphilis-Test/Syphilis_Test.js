import React, { useState, useEffect } from "react";
import { webApiInstance } from "../../../AxiosInstance";
import "../Herpes1_2/herpes1_2.css";
import GenericSection from "../GenericSection";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../../utils/LoaderContext";
import { toast } from "react-toastify";

function Syphilis_Test() {
  const navigate = useNavigate();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const { setLoading } = useLoader();
  const [TenTestPanel, setTenTestPanel] = useState(null);
  const [TenTestPanelEarlyRNA, setTenTestPanelEarlyRNA] = useState(null);
  const [Syphilis, setSyphilis] = useState(null);

  const getData = async (name, setter, setErrorFlag) => {
    try {
      const response = await webApiInstance.get(
        `/Disease/get-by-name/${encodeURIComponent(name)}`
      );
      if (response.data.statusCode === 200) {
        setter(response.data.result);
      } else {
        if (!setErrorFlag.current) {
          setErrorFlag.current = true;
          toast.error(
            "There was an error fetching the data. Please try again."
          );
          navigate("/");
        }
      }
    } catch (error) {
      if (!setErrorFlag.current) {
        setErrorFlag.current = true;
        toast.error("There was an error fetching the data. Please try again.");
        navigate("/");
      }
      console.error(`Error fetching data for ${name}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    const errorFlag = { current: false };
    getData(
      "10 Test Panel with HIV RNA Early Detection",
      setTenTestPanelEarlyRNA , errorFlag 
    );
    getData("10 Test Panel", setTenTestPanel, errorFlag );
    getData("Syphilis", setSyphilis, errorFlag );
  }, []);

  const handleCheckbox1 = () => {
    setChecked1(!checked1);
    if (!checked1) {
      setChecked2(false);
      setChecked3(false);
    } // Uncheck Checkbox 2
  };

  const handleCheckbox2 = () => {
    setChecked2(!checked2);
    if (!checked2) {
      setChecked1(false); // Uncheck Checkbox 1
      setChecked3(false);
    }
  };

  const handleCheckbox3 = () => {
    setChecked3(!checked3);
    if (!checked3) {
      setChecked1(false); // Uncheck Checkbox 1
      setChecked2(false);
    }
  };

  const handleGetTested = () => {
    let selectedTest = null;
    if (checked1) {
      selectedTest = { name: Syphilis.name, price: Syphilis.price };
    } else if (checked2) {
      selectedTest = { name: TenTestPanel.name, price: TenTestPanel.price };
    } else if (checked3) {
      selectedTest = {
        name: TenTestPanelEarlyRNA.name,
        price: TenTestPanelEarlyRNA.price,
      };
    }
    if (selectedTest) {
      navigate("/order", { state: { selectedTests: [selectedTest] } });
    } else {
      alert("Please select a test before proceeding.");
    }
  };
  return (
    <section>
      <section className="Herper1-2-section1">
        <h1 className="center my-3">Syphilis Test</h1>
        <div className="Herper1-2-section1-text">
          <h2>Syphilis Testing - Details</h2>

          <p>
            <strong>How we test for Syphilis:</strong>
            <br />
            Our clinicians use the Rapid Plasma Reagin (RPR) syphilis test,
            which looks for antibodies that fight a syphilis infection. If
            positive, a Treponemal Pallidum Assay (TPA) test is used to confirm
            the presence of the bacteria.
          </p>
          <br />

          <p>
            <strong>Why is getting tested important?</strong>
            <br />
            Getting tested is essential because it is possible to have a
            symptomless infection and unknowingly transmit it to your partner.
          </p>
          <br />

          <p>
            <strong>What does the test involve?</strong>
            <br />
            Our CLIA-certified labs take a small blood sample to conduct the
            test. No undressing or uncomfortable swabbing is necessary.
          </p>
          <br />

          <p>
            <strong>Accuracy of the test:</strong>
            <br />
            All laboratory tests, including STD testing, measure accuracy in
            terms of sensitivity and specificity. Our FDA-cleared syphilis test
            has a sensitivity rate of 95% and a specificity of 91%.
          </p>
          <br />
        </div>
        <div className="test-card">
          <div className="card-header">Choose Your Packages</div>
          <div className="card-radio">
            <div className="card-checkbox" onClick={handleCheckbox1}>
              <input
                type="checkbox"
                checked={checked1}
                onChange={handleCheckbox1}
              />
              Syphilis
            </div>
            <div className="card-price">
              {" "}
              ${Syphilis !== null ? Syphilis.price : ""}
            </div>
          </div>
          <div className="card-radio">
            <div className="card-checkbox" onClick={handleCheckbox2}>
              <input
                type="checkbox"
                checked={checked2}
                onChange={handleCheckbox2}
              />
              10 Test Panel
            </div>
            <div className="card-price">
              {" "}
              ${TenTestPanel !== null ? TenTestPanel.price : ""}
            </div>
          </div>
          <div className="card-radio">
            <div className="card-checkbox" onClick={handleCheckbox3}>
              <input
                type="checkbox"
                checked={checked3}
                onChange={handleCheckbox3}
              />
              10 Test Panel with HIV RNA Early Detection
            </div>
            <div className="card-price">
              {" "}
              ${TenTestPanelEarlyRNA !== null ? TenTestPanelEarlyRNA.price : ""}
            </div>
          </div>
          <div className="card-button">
            <button className="button3" onClick={handleGetTested}>
              Get Tested
            </button>
          </div>
        </div>
        <div className="test-process my-3">
          <div className="test-process-card">
            <div className="test-process-box test-process-heading-box">
              Syphilis Testing Process
            </div>
            <div className="test-process-box">
              <h4>
                <strong>5 Minute</strong>
              </h4>
              <br />
              Testing process
            </div>
            <div className="test-process-box">
              <h4>
                <strong>Sample Required</strong>
              </h4>
              <br /> Small Blood Sample
            </div>
            <div className="test-process-box">
              <h4>
                <strong>Results</strong>
              </h4>
              <br /> Ready in 1-2 days
            </div>
            <div className="test-process-box">
              <h4>
                <strong>Doctor Consultation</strong>
              </h4>
              <br /> Over the phone, if results are positive
            </div>
          </div>
        </div>
      </section>
      <section className="Herper1-2-section2">
        <h1 className="center my-3">More Information About Syphilis Testing</h1>
        <div className="Herper1-2-section2-text">
          <h2>Frequently Asked Questions About Syphilis Testing</h2>

          <p>
            <strong>Does syphilis testing use blood or urine?</strong>
            <br />
            To test for syphilis, we use a small blood sample.
          </p>
          <br />

          <p>
            <strong>What do I need to do to prepare for the test?</strong>
            <br />
            No preparation or fasting is necessary to take this syphilis test.
          </p>
          <br />

          <p>
            <strong>When is the right time to test for syphilis?</strong>
            <br />
            It is recommended that you wait a minimum of 3-6 weeks post-exposure
            before taking a syphilis test. Once you have been treated for
            syphilis, get re-tested in 3 months to ensure that the syphilis
            infection has been cleared.
          </p>
          <br />

          <p>
            <strong>What will the test results say?</strong>
            <br />
            There are two possible outcomes: positive (reactive) or negative
            (non-reactive). A negative result means that there were no
            detectable traces of syphilis in your system. A positive result may
            indicate that you have syphilis. However, a positive diagnosis
            cannot be established until a TPA confirmation test can be run that
            differentiates syphilis from other conditions.
          </p>
          <br />

          <p>
            <strong>Can syphilis be cured or treated?</strong>
            <br />
            Yes, syphilis is curable and can be treated with antibiotics. Should
            you test positive for syphilis, our clinicians are available to
            discuss your test results over the phone at no additional cost.
          </p>
          <br />

          <p>
            <strong>Who needs syphilis testing?</strong>
            <br />
            If you are sexually active, you are at risk of contracting syphilis.
            Not only is it easy for you to transmit, but it can also lie dormant
            for many years without displaying symptoms. The best way to be sure
            about your status is to get tested. Testing for syphilis should be a
            regular part of your STD screening, particularly if you had
            unprotected sex and are unsure of your partner's status.
          </p>
          <br />
        </div>
      </section>
      <GenericSection />
    </section>
  );
}

export default Syphilis_Test;
