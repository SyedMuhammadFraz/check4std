import React, { useState, useEffect } from "react";
import { webApiInstance } from "../../../AxiosInstance";
import GenericSection from "../GenericSection";
import "./Chlamydia_Gonorrhea.css";
import "../Card.css";
import "../10-test-panel/Testpanel.css";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../../utils/LoaderContext";
import { toast } from "react-toastify";

function Chlamydia_Gonorrhea() {
  const navigate = useNavigate();
  const { setLoading } = useLoader();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  const [TenTestPanel, setTenTestPanel] = useState(null);
  const [TenTestPanelEarlyRNA, setTenTestPanelEarlyRNA] = useState(null);
  const [Chlamydia_Gonorrhea, setChlamydia_Gonorrhea] = useState(null);

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
          toast.error("There was an error fetching the data. Please try again.");
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
    const errorFlag = { current: false }; // Shared flag to prevent multiple toasts/navigation
  
    getData("10 Test Panel with HIV RNA Early Detection", setTenTestPanelEarlyRNA, errorFlag);
    getData("10 Test Panel", setTenTestPanel, errorFlag);
    getData("Chlamydia & Gonorrhea", setChlamydia_Gonorrhea, errorFlag);
  }, []);
  

  useEffect(() => {
    if (Chlamydia_Gonorrhea !== null) {
      setLoading(false);
    }
  }, [Chlamydia_Gonorrhea]);

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
      selectedTest = {
        name: Chlamydia_Gonorrhea.name,
        price: Chlamydia_Gonorrhea.price,
      };
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

  function toggleContent(id) {
    const content = document.getElementById(`content-${id}`);
    const isVisible = content.style.display === "block";
    document
      .querySelectorAll(".content")
      .forEach((el) => (el.style.display = "none")); // Hide all contents
    content.style.display = isVisible ? "none" : "block"; // Toggle the clicked one
  }
  return (
    <section>
      <h1 className="center my-3">Chlamydia & Gonorrhea Test</h1>
      <section className="Chlamydia_Gonorrhea-section1">
        <div className="Chlamydia_Gonorrhea-section1-text">
          <h4>
            <strong>FDA-Cleared Urine Test for Chlamydia and Gonorrhea</strong>
            <br />
          </h4>
          <p>
            Our test uses the FDA-cleared Nucleic Acid Amplification (NAA)
            method, recognized as the "gold standard" in the industry. It
            detects <em>Chlamydia trachomatis</em> (the bacteria responsible for
            chlamydia) and <em>Neisseria gonorrhoeae</em> (the bacteria causing
            gonorrhea) within the genitourinary system, which includes the
            reproductive and urinary organs.
          </p>
          <p>
            This test is the most accurate available, requiring only a small
            urine sample—no swabbing or undressing necessary.
          </p>
          <br />
          <p>
            Laboratory test accuracy is evaluated through sensitivity and
            specificity. Our chlamydia and gonorrhea test panel boasts a
            sensitivity of 99.8% and a specificity of 99.3%.
          </p>
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
              Chlamydia & Gonorrhea
            </div>
            <div className="card-price">
              {" "}
              ${Chlamydia_Gonorrhea !== null ? Chlamydia_Gonorrhea.price : ""}
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
              Chlamydia & Gonorrhea Testing Process
            </div>
            <div className="test-process-box">
              <h4>
                <strong>No Urination</strong>
              </h4>
              <br /> At least one hour before arriving at the testing center
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
              <br /> Small Urine Sample
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
      <section className="Chlamydia_Gonorrhea-section2">
        <h1 className="center my-3">
          More Information about Chlamydia and Gonorrhea Testing
        </h1>
        <div className="Chlamydia_Gonorrhea-section2-text">
          <h2>What are Chlamydia and Gonorrhea?</h2>
          <p>
            Chlamydia and Gonorrhea are bacterial sexually transmitted diseases
            (STDs). Chlamydia is caused by the <em>Chlamydia trachomatis</em>{" "}
            bacterium and is a prevalent STD in the United States, with over 3
            million new cases annually. Gonorrhea, caused by the{" "}
            <em>Neisseria gonorrhoeae</em> bacterium, thrives in moist areas of
            the reproductive system such as the cervix, uterus, and Fallopian
            tubes in women, and the urethra in both men and women. It can also
            infect the mouth, throat, anus, and eyes. According to the CDC, over
            700,000 cases of gonorrhea are reported annually in the U.S. Both
            infections are often asymptomatic, making testing the only way to
            confirm their presence. These infections are treatable with
            antibiotics.
          </p>
          <br />

          <h2>How do you test for Chlamydia and Gonorrhea?</h2>
          <p>
            STDcheck.com provides the FDA-cleared Nucleic Acid Amplification
            (NAA) test, a highly reliable method for detecting chlamydia and
            gonorrhea. This test identifies the infection in a small urine
            sample.
          </p>
          <br />
          <h2>How are Chlamydia and Gonorrhea transmitted?</h2>
          <p>
            Both men and women can contract chlamydia and gonorrhea through
            oral, vaginal, or anal sex. Transmission can occur even without
            ejaculation. Re-infection is possible if the bacteria are not
            completely eliminated or if exposed to an infected partner. While
            these infections are often symptomless, potential symptoms include
            burning during urination, abnormal discharge, or unusual sores and
            rashes in the genital area. The CDC recommends routine testing for
            sexually active women under 25.
          </p>
          <br />
          <h2>Who needs Chlamydia and Gonorrhea testing?</h2>
          <p>
            These STDs are easily transmitted and can affect anyone who is
            sexually active. Regular testing is essential, particularly for
            those with multiple partners. Since both infections can be
            asymptomatic, testing is the only way to confirm if you are
            infected.
          </p>
          <br />
          <h2>Why should Chlamydia and Gonorrhea be tested together?</h2>
          <p>
            Chlamydia and gonorrhea frequently co-occur, making it important to
            test for both simultaneously. Both infections are bacterial and can
            be detected using a single urine sample. While they are treatable
            with antibiotics, untreated infections can lead to complications
            such as pelvic inflammatory disease (PID) in women, which can cause
            infertility or ectopic pregnancy, and epididymitis in men, a painful
            condition affecting the testicular tubes.
          </p>
          <br />
          <h2>
            How soon can I get tested for Chlamydia and Gonorrhea after
            exposure?
          </h2>
          <p>
            To ensure accurate results, testing is recommended 1-5 days after
            potential exposure to chlamydia and 2-6 days after potential
            exposure to gonorrhea. It is also advisable to get retested 21-28
            days after completing treatment to confirm the infection has been
            fully cleared.
          </p>
          <br />
          <h2>
            What preparation is needed for a Chlamydia and Gonorrhea test?
          </h2>
          <p>
            To provide an accurate sample, avoid urinating for at least one hour
            before your test. No additional preparation or fasting is required.
          </p>
        </div>
      </section>
      <GenericSection />
    </section>
  );
}

export default Chlamydia_Gonorrhea;
