import React, { useState } from 'react'
import '../Herpes1_2/herpes1_2.css'
import GenericSection from '../GenericSection'
import { useNavigate } from 'react-router-dom';

function HepA_Test() {
    const navigate = useNavigate();
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);

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
            setChecked2(false)
            
        }
    };

    const handleGetTested = () => {
        let selectedTest = null;
        if (checked1) {
          selectedTest = { name: "Hepatitis A", price: 24 };
        } else if (checked2) {
          selectedTest = { name: "10 Test Panel", price: 139 };
        }
        else if (checked3) {
          selectedTest = { name: "10 Test Panel with HIV RNA Early Detection", price: 259 };
        }
      if (selectedTest) {
        navigate("/order", { state: { selectedTests: [selectedTest] } });
      } else {
        alert("Please select a test before proceeding.");
      }
    };
    return (
        <section>
            <section className='Herper1-2-section1'>
                <h1 className="center my-3">
                    Hepatitis A Test
                </h1>
                <div className='Herper1-2-section1-text'>
                    <h2>How We Test for Hepatitis A</h2>
                    <p>
                        Our labs perform an FDA-cleared hepatitis A antibody blood test to diagnose hepatitis A (HAV) in the blood. This hepatitis A test evaluates your blood for IgM antibodies, which are proteins produced by the body in response to a viral infection. If these antibodies are found, it can then be determined you have been exposed to the hepatitis A virus.
                    </p>
                    <br />

                    <p>
                        All laboratory testing accuracy rates are measured in terms of sensitivity and specificity. Our FDA-cleared hepatitis A test has an extremely high sensitivity and specificity rates, both at 95 percent.
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
                            Hepatitis A
                        </div>
                        <div className="card-price"> $24.00</div>
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
                        <div className="card-price"> $139.00</div>
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
                        <div className="card-price"> $259.00</div>
                    </div>
                    <div className="card-button">
                        <button className="button3" onClick={handleGetTested}>Get Tested</button>
                    </div>
                </div>
                <div className="test-process my-3">
                    <div className="test-process-card">
                        <div className="test-process-box test-process-heading-box">
                            Hepatitis A
                            Testing Process
                        </div>
                        <div className="test-process-box">
                            <h4>
                                <strong>5 Minute</strong>
                            </h4>
                            <br />Testing process
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
            <section className='Herper1-2-section2'>
                <h1 className="center my-3">
                    More Information About Hepatitis A Testing
                </h1>
                <div className='Herper1-2-section2-text'>
                    <h2>How is the Hep A test performed?</h2>
                    <p>
                        Our hepatitis A test requires a blood sample. In the case of hepatitis A, blood samples provide more accurate results than urine or other methods of testing. A lab technician will draw a small sample of your blood when you visit a testing center.
                    </p>
                    <br />

                    <h2>What do I need to do to prepare for the test?</h2>
                    <p>
                        This test does not necessitate any preparation prior to visiting the testing center. Fasting is not required.
                    </p>
                    <br />

                    <h2>How did I contract hepatitis A?</h2>
                    <p>
                        Hepatitis A is usually spread when someone ingests the virus from food or drinks that were contaminated with undetectable amounts of stool from an infected person. If you have recently traveled internationally to a developing country then you are also at a higher risk to contract hepatitis A. Hepatitis is also commonly transferred sexually.
                    </p>
                    <br />

                    <h2>Who is at the greatest risk of hepatitis A?</h2>
                    <p>
                        If you have traveled to developing countries with a high prevalence of hepatitis A, have recently had anal sex or sex with someone who may be infected, or shared needles using illicit drugs, you are at a higher risk of getting hepatitis A and should be tested. It’s best to wait 2-7 weeks after exposure to get tested for hepatitis A.
                    </p>
                    <br />

                    <h2>Need Help Understanding Your Test Results?</h2>
                    <p>
                        Your hepatitis A test result will either come back as positive or negative. A positive result indicates an acute or recent HAV infection, and a negative result simply means there was no active hepatitis A infection found.
                    </p>
                    <br />

                    <h2>Can hepatitis A be cured or treated?</h2>
                    <p>
                        There is no cure for hepatitis A at this time. However, a safe and effective vaccine exists that will prevent you from getting hepatitis A. Since the 1990s the hepatitis A vaccine has been available and has drastically reduced the number of hepatitis A cases. Those who have not been previously vaccinated can do so within two weeks of exposure to the virus and have an 80-90% chance of not experiencing symptoms.
                    </p>
                    <br />

                    <h2>Who needs hepatitis A testing?</h2>
                    <p>
                        Anyone who has not had Hepatitis A before, or anyone who has not been vaccinated for Hepatitis A, is at risk of acquiring hepatitis A. It is commonly spread through food that was prepared with improper hygiene, sexual activity, and by sharing needles. Those who travel to developing countries, are men who have sex with men, or are in contact with people with hepatitis A are at an abnormally high risk of hepatitis A.
                    </p>
                    <br />
                </div>
            </section>
            <GenericSection />
        </section>
    )
}

export default HepA_Test