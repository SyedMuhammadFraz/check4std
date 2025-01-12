import React, { useState } from 'react'
import '../Herpes1_2/herpes1_2.css'
import GenericSection from '../GenericSection'
function HepB_Test() {
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
            setChecked2(false)
            setChecked4(false)
        }
    };
    const handleCheckbox4 = () => {
        setChecked4(!checked4);
        if (!checked4) {
            setChecked1(false); // Uncheck Checkbox 1
            setChecked2(false)
            setChecked3(false)
        }
    };
    return (
        <section>
            <section className='Herper1-2-section1'>
                <h1 className="center my-3">
                    Hepatitis B Test
                </h1>
                <div className='Herper1-2-section1-text'>
                    <h2>How We Test for Hepatitis B</h2>
                    <p>
                        Our FDA-approved hepatitis B virus test (HBV) determines if you have hepatitis B by looking for surface antigens (viral proteins). Surface antigens are the earliest indicator of acute infection and are also present in chronic (long-term) infection.
                    </p>      <br/>
                    <p>
                        To avoid developing health complications in the liver, finding a hepatitis B infection early is extremely advantageous. If the HBV test responds positive, a second confirmation test is run, at no additional cost, to ensure that you receive the most reliable results possible.
                    </p>      <br/>
                    <p>
                        Accuracy rates are measured in terms of sensitivity and specificity. Our HBV test has a sensitivity rate of 88% and a specificity of 99-100%.
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
                            Hepatitis B
                        </div>
                        <div className="card-price"> $24.00</div>
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
                        <button className="button3">Get Tested</button>
                    </div>
                </div>
                <div className="test-process my-3">
                    <div className="test-process-card">
                        <div className="test-process-box test-process-heading-box">
                            Hepatitis B
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
                    More Information About Hepatitis B Testing
                </h1>
                <div className='Herper1-2-section2-text'>
                    <h2>Does Hepatitis B Testing Use Blood or Urine?</h2>
                    <p>
                        Our hepatitis B test is performed on a blood sample provided by the patient at the test center by a laboratory technician.
                    </p>
        <br/>
                    <h2>What Do I Need to Do to Prepare for the Test?</h2>
                    <p>
                        No fasting nor preparation is necessary. Go to the lab you selected at your earliest convenience.
                    </p>
                    <br/>
                    <h2>Who Needs Hepatitis B Testing?</h2>
                    <p>
                        Hepatitis B often does not show symptoms, so it is common for people to be unaware that they have an infection. If you do experience symptoms, they may consist of extreme fatigue, tenderness or pain in the lower abdomen, loss of appetite, nausea and vomiting, pain in the joints, headache, fever, and hives. These symptoms can appear from 6 weeks to 6 months after the infection has been introduced to the body.
                    </p>
                    <br/>
                    <h2>What Will the Test Results Say?</h2>
                    <p>
                        The results will give either a positive or negative result. If you receive a negative result, this means there is no sign of HBV in your blood sample. A positive result means there is. If your results show positive, our clinicians are available to talk to you about the results and answer any questions that you may have.
                    </p>
                    <br/>
                    <h2>Can Hepatitis B Be Cured or Treated?</h2>
                    <p>
                        There is no cure for hepatitis B, but because 90% of acute infections clear up on their own, it’s usually not something that you have to worry about. If you’ve tested positive for HBV for longer than 6 months, you have a chronic infection. Once you discover this, there is a treatment to slow the progression of the virus and keep your liver from being damaged. Most patients with chronic HBV still live healthy, long lives.
                    </p>
                    <br />
                </div>
            </section>
            <GenericSection />
        </section>
    )
}

export default HepB_Test