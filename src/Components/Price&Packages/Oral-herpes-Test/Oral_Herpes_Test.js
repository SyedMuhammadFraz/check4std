import React, { useState, useEffect } from "react";
import { webApiInstance } from "../../../AxiosInstance";
import "../Herpes1_2/herpes1_2.css";
import GenericSection from "../GenericSection";
import { useNavigate } from "react-router-dom";

function Oral_Herpes_Test() {
  const navigate = useNavigate();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

  const [TenTestPanel, setTenTestPanel] = useState(null);
  const [TenTestPanelEarlyRNA, setTenTestPanelEarlyRNA] = useState(null);
  const [Oral_Herpes, setOral_Herpes] = useState(null);
  const [Herpes1_2, setHerpes1_2] = useState(null);

  const getData = async (name, setter) => {
    try {
      const response = await webApiInstance.get(
        `/Disease/get-by-name/${encodeURIComponent(name)}`
      );
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
    getData("Oral Herpes (HSV-1)", setOral_Herpes);
    getData("Herpes I & II", setHerpes1_2);
  }, []);

  const handleGetTested = () => {
    let selectedTest = null;
    if (checked1) {
      selectedTest = { name: Oral_Herpes.name, price: Oral_Herpes.price };
    } else if (checked2) {
      selectedTest = { name: Herpes1_2.name, price: Herpes1_2.price };
    } else if (checked3) {
      selectedTest = { name: TenTestPanel.name, price: TenTestPanel.price };
    } else if (checked4) {
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

  const handleCheckbox1 = () => {
    setChecked1(!checked1);
    if (!checked1) {
      setChecked2(false);
      setChecked3(false);
      setChecked4(false);
    } // Uncheck Checkbox 2
  };

  const handleCheckbox2 = () => {
    setChecked2(!checked2);
    if (!checked2) {
      setChecked1(false); // Uncheck Checkbox 1
      setChecked3(false);
      setChecked4(false);
    }
  };

  const handleCheckbox3 = () => {
    setChecked3(!checked3);
    if (!checked3) {
      setChecked1(false); // Uncheck Checkbox 1
      setChecked2(false);
      setChecked4(false);
    }
  };
  const handleCheckbox4 = () => {
    setChecked4(!checked4);
    if (!checked4) {
      setChecked1(false); // Uncheck Checkbox 1
      setChecked2(false);
      setChecked3(false);
    }
  };

  return (
    <section>
      <section className="Herper1-2-section1">
        <h1 className="center my-3">Oral Herpes Test</h1>
        <div className="Herper1-2-section1-text">
          <h2>How We Test for Oral Herpes (Herpes-1)</h2>
          <p>
            Our clinicians use the type-specific Chemiluminescence immunoassay
            to look for specific antibodies that fight the herpes-1 virus in
            your blood.
          </p>
          <br />

          <p>
            Our CLIA-certified labs take a small blood sample to conduct the
            test. No undressing or uncomfortable swabbing is necessary.
          </p>
          <br />

          <p>
            All laboratory tests, including STD testing, measure accuracy in
            terms of sensitivity and specificity. Our FDA-cleared herpes type 1
            test has a sensitivity rate of 96% and a specificity of 97%.
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
              Oral Herpes (HSV-1)
            </div>
            <div className="card-price">
              {" "}
              ${Oral_Herpes !== null ? Oral_Herpes.price : ""}
            </div>
          </div>
          <div className="card-radio">
            <div className="card-checkbox" onClick={handleCheckbox2}>
              <input
                type="checkbox"
                checked={checked2}
                onChange={handleCheckbox2}
              />
              Herpes I & II
            </div>
            <div className="card-price">
              {" "}
              ${Herpes1_2 !== null ? Herpes1_2.price : ""}
            </div>
          </div>
          <div className="card-radio">
            <div className="card-checkbox" onClick={handleCheckbox3}>
              <input
                type="checkbox"
                checked={checked3}
                onChange={handleCheckbox3}
              />
              10 Test Panel
            </div>
            <div className="card-price">
              {" "}
              ${TenTestPanel !== null ? TenTestPanel.price : ""}
            </div>
          </div>
          <div className="card-radio" onClick={handleCheckbox4}>
            <div className="card-checkbox">
              <input
                type="checkbox"
                checked={checked4}
                onChange={handleCheckbox4}
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
              Herpes I Testing Process
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
          </div>
        </div>
      </section>
      <section className="Herper1-2-section2">
        <h1 className="center my-3">Genital Herpes (HSV-2) Testing</h1>
        <div className="Herper1-2-section2-text">
          <h2>Does This Genital Herpes Test Use Blood or Urine?</h2>
          <p>
            We use a blood test called the Chemiluminescence immunoassay (CLIA)
            test, which looks for antibodies to the herpes virus.
          </p>
          <br />

          <h2>What Do I Need to Do to Prepare for the Test?</h2>
          <p>No fasting or preparation is necessary for the HSV-2 test.</p>
          <br />

          <h2>When Is the Right Time to Test for Genital Herpes?</h2>
          <p>
            There is no right time to get tested for genital herpes, since
            everybody creates antibodies at different rates. Although it is
            possible to detect herpes-2 as early as 3 weeks after exposure, it
            is recommended to wait 4-6 weeks after being exposed. If you test
            negative, it is advisable to test again in three months to confirm
            the initial test results.
          </p>
          <br />

          <h2>What Will the Test Results Say?</h2>
          <p>
            If your results are negative, there are no signs of genital herpes.
            If positive, genital herpes was found. Although CLIA tests are
            reliable, "false positives" are possible due to the low occurrence
            of the HSV-2 virus in some populations. Test results for herpes fall
            within a numeric range. If your test returns a value of 0.91 or
            below, you are negative. A value of 1.09 or above is a positive. See
            additional test results and what they mean at our STD Test Results
            Sample page.
          </p>
          <br />

          <h2>Can Genital Herpes Be Cured or Treated?</h2>
          <p>
            Genital herpes is not curable but can be treated and managed.
            Current antiviral medications can prevent symptoms, shorten the
            duration of outbreaks, and reduce the likelihood of transmitting the
            genital herpes virus.
          </p>
          <br />

          <h2>Who Needs Genital Herpes Testing?</h2>
          <p>
            According to the CDC, HSV-2 infection is more common among women
            because the infection is more easily transmitted from men to women.
            Women who have had recent encounters with someone who is infected
            with genital herpes (HSV-2) should get tested. Infections can be
            transmitted through contact with genital or oral secretions,
            lesions, and mucosal surfaces.
          </p>
          <br />
        </div>
      </section>
      <GenericSection />
    </section>
  );
}

export default Oral_Herpes_Test;
