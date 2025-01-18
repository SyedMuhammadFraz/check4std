import React, { useState } from "react";
import "../Herpes1_2/herpes1_2.css";
import GenericSection from "../GenericSection";
import { useNavigate } from "react-router-dom";

function Genital_Herpes_Test() {
  const navigate = useNavigate();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

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

  const handleGetTested = () => {
    let selectedTest = null;
    if (checked1) {
      selectedTest = { name: "Genital Herpes (HSV-2)", price: 45 };
    } else if (checked2) {
      selectedTest = { name: "Herpes I & II", price: 79 };
    } else if (checked3) {
      selectedTest = { name: "10 Test Panel", price: 139 };
    } else if (checked4) {
      selectedTest = {
        name: "10 Test Panel with HIV RNA Early Detection",
        price: 259,
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
        <h1 className="center my-3">Genital Herpes Test</h1>
        <div className="Herper1-2-section1-text">
          <h2>How We Test for Genital Herpes (HSV-2)</h2>
          <p>
            We use an FDA-cleared type-specific genital herpes test that
            searches for antibodies to the herpes virus and can differentiate
            between HSV-1 (oral herpes) and HSV-2 (genital herpes).
          </p>
          <br />

          <p>
            Our CLIA-certified labs take a small blood sample to conduct the
            test. No undressing or uncomfortable swabbing is necessary.
          </p>
          <br />

          <p>
            All laboratory tests, including STD testing, measure accuracy in
            terms of sensitivity and specificity. Our FDA-cleared herpes type 2
            test has a sensitivity rate of 97% and a specificity of 98%.
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
              Genital Herpes (HSV-2)
            </div>
            <div className="card-price"> $45.00</div>
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
            <div className="card-price"> $79.00</div>
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
            <div className="card-price"> $139.00</div>
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
            <div className="card-price"> $259.00</div>
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
              Genital Herpes (HSV-2) Testing
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
        <h1 className="center my-3">
          More Information About Oral Herpes Testing
        </h1>
        <div className="Herper1-2-section2-text">
          <h2>Does Oral Herpes Test Use Blood or Urine?</h2>
          <p>
            Our oral herpes test uses a blood sample. There is no undressing or
            uncomfortable swabbing necessary.
          </p>
          <br />

          <h2>What Do I Need to Do to Prepare for the Test?</h2>
          <p>
            No preparation or fasting is needed for oral herpes (herpes-1)
            testing.
          </p>
          <br />

          <h2>When is the Right Time to Test for Oral Herpes?</h2>
          <p>
            Our clinicians recommend testing for oral herpes 4-6 weeks after
            initial exposure. Getting tested for oral herpes should be a part of
            your routine STD screening if you have had unprotected oral sex or
            have come in contact with HSV-1 infected fluids such as saliva or
            semen.
          </p>
          <br />

          <h2>What Will the Test Results Say?</h2>
          <p>
            If your results are negative, there are no signs of oral herpes in
            your body. If positive, oral herpes was found.
          </p>
          <br />

          <h2>Can Oral Herpes Be Cured or Treated?</h2>
          <p>
            No. There is no cure for the oral herpes (herpes-1) virus but it is
            possible to manage the symptoms through antiviral drugs. These drugs
            do not rid the body of the virus, they help control outbreaks and
            prevent transmission of oral herpes to your partner.
          </p>
          <br />

          <h2>Who Needs Oral Herpes Testing?</h2>
          <p>
            Oral Herpes is a fairly common STD and anyone who has had
            unprotected oral sex or come in contact with infected bodily fluids
            needs testing. Since Herpes-1 symptoms do not always show up, it is
            important to get tested even when you do not see signs that you may
            have been infected.
          </p>
          <br />
        </div>
      </section>
      <GenericSection />
    </section>
  );
}

export default Genital_Herpes_Test;
