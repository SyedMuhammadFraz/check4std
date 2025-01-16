import React, { useState } from 'react'
import '../Herpes1_2/herpes1_2.css'
import GenericSection from '../GenericSection'
import { useNavigate } from 'react-router-dom'

function Chlamydia_Test() {
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

    const handleGetTested = () => {
        let selectedTest = null;
        if (checked1) {
          selectedTest = { name: "Chlamydia", price: 59 };
        } else if (checked2) {
            selectedTest = { name: "Chlamydia & Gonorrhea", price: 99 };
        } else if (checked3) {
          selectedTest = { name: "10 Test Panel", price: 139 };
        }
        else if (checked4) {
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
                    Chlamydia Test
                </h1>
                <div className='Herper1-2-section1-text'>
                    <h2>About Our Chlamydia Test</h2>
                    <p>
                        check4std utilizes the FDA-cleared Nucleic Acid Amplification (NAA) test, a urine-based test that is regarded as the most accurate option for chlamydia testing. During the test, you will provide a urine sample, which will be analyzed for the presence of the bacterium <em>Chlamydia trachomatis</em>.
                    </p>
                    <br />
                    <p>
                        The chlamydia test is quick, taking only a few minutes to complete, and results are typically available within 1-2 days. The NAA test does not require fasting, swabbing, pricking, or undressing, making it a convenient option.
                    </p>
                    <br />
                    <p>
                        The test's accuracy is measured in terms of specificity and sensitivity, with a specificity rate of 99.3% and a sensitivity rate of 99.8%.
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
                            Chlamydia
                        </div>
                        <div className="card-price"> $59.00</div>
                    </div>
                    <div className="card-radio">
                        <div className="card-checkbox" onClick={handleCheckbox2}>
                            <input
                                type="checkbox"
                                checked={checked2}
                                onChange={handleCheckbox2}
                            />
                            Chlamydia & Gonorrhea
                        </div>
                        <div className="card-price"> $99.00</div>
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
                        <button className="button3" onClick={handleGetTested}>Get Tested</button>
                    </div>
                </div>
                <div className="test-process my-3">
                    <div className="test-process-card">
                        <div className="test-process-box test-process-heading-box">
                            Chlamydia
                            Testing Process
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
                            <br />Testing process
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
            <section className='Herper1-2-section2'>
                <h1 className="center my-3">
                    More Information About Our Chlamydia Urine Test
                </h1>
                <div className='Herper1-2-section2-text'>
                    <h2>Do You Use Blood or Urine to Test for Chlamydia?</h2>
                    <p>
                        Our chlamydia test requires the lab to collect a urine sample. No blood is required for a chlamydia test. Pricking, swabbing, and undressing will never be required for an NAA chlamydia test.
                    </p>
                    <br />

                    <h2>How Do I Prepare for a Chlamydia Urine Test?</h2>
                    <p>
                        You must avoid urinating for at least one hour before your chlamydia test. The sample must consist of first-catch urine, which is about 20-30mL of the initial urine stream. The sample should not include anything beyond first-catch urine, as this may dilute the sample. Female test takers are encouraged to avoid cleansing the labial area before providing a sample. No fasting is required, and no other preparation is necessary.
                    </p>
                    <br />

                    <h2>When Should I Test for Chlamydia?</h2>
                    <p>
                        If you’ve recently had an experience that you believe may have put you at risk of chlamydia, our doctors recommend waiting at least 1-5 days post-exposure to be tested. At the very minimum, you should wait 24 hours after potential exposure. For the most accurate results, testing two weeks after potential exposure is recommended. If you have undergone chlamydia treatment, you should be tested again 21 to 28 days after treatment has ended to verify that the bacterium has been eliminated. If you have tested positive for gonorrhea, you should also be tested for chlamydia, as these infections often coincide and share similar symptoms.
                    </p>
                    <br />

                    <h2>How Do I Read My Chlamydia Test Results?</h2>
                    <p>
                        If your chlamydia test results are positive, the bacterium <em>Chlamydia trachomatis</em> was found in your system, and you do have chlamydia. If your results are negative, then you do not have chlamydia. Testing too soon after exposure may lead to inaccurate results. For the most accurate outcome, wait up to two weeks post-potential exposure before testing.
                    </p>
                    <br />

                    <h2>Is There a Chlamydia Cure?</h2>
                    <p>
                        Chlamydia is entirely curable with antibiotic treatment. If you test positive, you are eligible for an over-the-phone consultation with one of our doctors, who can discuss treatment options. If necessary, antibiotics can be prescribed and picked up at your local pharmacy.
                    </p>
                    <br />

                    <h2>Who Should Be Tested for Chlamydia?</h2>
                    <p>
                        Both women and men are susceptible to chlamydia. The CDC reports that there are nearly 3 million new chlamydia infections annually in the U.S. Chlamydia is common because it often presents no symptoms and is easily spread. According to a CDC report, “chlamydia prevalence among sexually active persons aged 14-24 years is nearly three times the prevalence among those aged 25-39 years.” The CDC strongly recommends testing for chlamydia in all sexually active women aged 25 or younger. Young women are particularly at risk as their cervix is still in the developmental stages and more susceptible to bacteria. Regardless of age, if you have recently had unprotected sex with a partner whose STD status is unknown, you should be tested for chlamydia.
                    </p>
                    <br />
                </div>
            </section>
            <GenericSection/>
        </section>
    )
}

export default Chlamydia_Test