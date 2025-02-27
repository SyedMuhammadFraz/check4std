import React, { useState, useEffect } from "react";
import { webApiInstance } from "../../../AxiosInstance";
import "../Herpes1_2/herpes1_2.css";
import GenericSection from "../GenericSection";
import { useNavigate } from "react-router-dom";

function HepC_Test() {
  const navigate = useNavigate();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  const [TenTestPanel, setTenTestPanel] = useState(null);
  const [TenTestPanelEarlyRNA, setTenTestPanelEarlyRNA] = useState(null);
  const [HepC, setHepC] = useState(null);

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
    getData("Hepatitis C", setHepC);
  }, []);

  const handleGetTested = () => {
    let selectedTest = null;
    if (checked1) {
      selectedTest = { name: HepC.name, price: HepC.price };
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

  return (
    <section>
      <section className="Herper1-2-section1">
        <h1 className="center my-3">Hepatitis C Test</h1>
        <div className="Herper1-2-section1-text">
          <h2>How We Test for Hepatitis C</h2>
          <p>
            Our clinicians test for hepatitis C using the FDA-approved hepatitis
            C Antibody test. This hepatitis C test searches for antibodies
            produced by the body in response to the presence of the virus in the
            bloodstream.
          </p>
          <br />
          <p>
            Our CLIA-certified labs take a small blood sample to conduct the
            test. No undressing or uncomfortable swabbing is necessary.
          </p>
          <br />
          <p>
            All laboratory tests, including STD testing, measure accuracy in
            terms of sensitivity and specificity. Our FDA-approved hepatitis C
            test has a sensitivity rate of 100% and a specificity of 99.99%.
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
              Hepatitis C
            </div>
            <div className="card-price">
              {" "}
              ${HepC !== null ? HepC.price : ""}
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
          <div className="card-radio" onClick={handleCheckbox3}>
            <div className="card-checkbox">
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
              Hepatitis C Testing Process
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
        <h1 className="center my-3">
          More Information About Hepatitis C Testing
        </h1>
        <div className="Herper1-2-section2-text">
          <h2>Does Hepatitis C Testing Use Blood or Urine?</h2>
          <p>
            The Hepatitis C Antibody Test is a blood test that searches for
            antibodies to the hepatitis C virus in the bloodstream. Only a small
            blood sample is needed to complete the test.
          </p>
          <br />

          <h2>What Do I Need to Do to Prepare for the Test?</h2>
          <p>
            The Hepatitis C Antibody test is a blood test, and no fasting or any
            other preparation is needed.
          </p>
          <br />

          <h2>When Is the Right Time to Test for Hepatitis C?</h2>
          <p>
            Different people react differently to the Hepatitis C Virus (HCV).
            On average, it takes the body about 8-9 weeks to create antibodies.
            This is the time recommended by our clinicians to test for hepatitis
            C. You should also have a follow-up test 3 months post-exposure to
            confirm that there is no active hepatitis C (HCV) infection.
          </p>
          <br />

          <h2>What Will the Test Results Say?</h2>
          <p>
            If negative, no hepatitis C antibodies were found in your blood. If
            positive, hepatitis C antibodies were found in your blood. Although
            uncommon, 10% of positives may be "false positives." In those cases,
            antibodies for the hepatitis C virus are sometimes found because
            your body may have fought the virus in the past. If your results are
            positive, our doctors may recommend follow-up tests to determine if
            you have an active infection.
          </p>
          <br />

          <h2>Can Hepatitis C Be Cured or Treated?</h2>
          <p>
            Depending on whether it is acute (new) or chronic (long-lasting), no
            treatment may be necessary. Many may not even be aware that they
            have the hepatitis C virus since its symptoms can be mild and may
            feel like the flu. Acute hepatitis C can be managed through a
            healthy diet, taking plenty of fluids, and adequate rest. It is also
            recommended to see a liver specialist to ensure that your liver has
            not been affected. Untreated or chronic hepatitis C infection can
            lead to serious liver disease, including liver failure. Diagnosing
            hepatitis C before it progresses to the chronic stage increases your
            chances of treating the infection without serious complications.
          </p>
          <br />

          <h2>Who Needs Hepatitis C Testing?</h2>
          <p>
            If you were born between 1945 and 1965 or had a blood transfusion or
            organ transplant before July 1992, it is recommended that you get
            tested for hepatitis C. If you are a current or former injection
            drug user, hepatitis C testing is advisable. If you have had a
            recent unprotected sexual encounter or live with somebody who has
            hepatitis C, you should consider taking a hepatitis C test as part
            of your routine STD testing.
          </p>
          <br />
        </div>
      </section>
      <GenericSection />
    </section>
  );
}

export default HepC_Test;
