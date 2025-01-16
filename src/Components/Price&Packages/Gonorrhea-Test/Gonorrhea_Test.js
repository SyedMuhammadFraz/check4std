import React, { useState } from 'react'
import '../Herpes1_2/herpes1_2.css'
import GenericSection from '../GenericSection'
import { useNavigate } from 'react-router-dom'

function Gonorrhea_Test() {
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
          selectedTest = { name: "Gonorrhea", price: 59 };
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
                    Gonorrhea Test
                </h1>
                <div className='Herper1-2-section1-text'>
                    <h2>How We Test for Gonorrhea</h2>
                    <p>
                        We use a small urine sample to test for gonorrhea. Our test is the Nucleic Acid Amplification Test (NAAT), which is the recommended method for gonorrhea testing. The test looks for the presence of the bacteria that causes gonorrhea, <em>Neisseria gonorrhoeae</em>.
                    </p>
                    <br />
                    <p>
                        If the bacteria is present, then you have an active gonorrhea infection. All of our STD tests require only a small sample of urine or blood. There is never any uncomfortable swabbing or undressing.
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
                            Gonorrhea
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
                    <h2>Do You Test Blood or Urine?</h2>
                    <p>
                        Our NAAT gonorrhea test is a urine test. We only need a small amount of urine to test for gonorrhea.
                    </p>
                    <br />
                    <p>
                        Nucleic Acid Amplification Tests (NAATs) work by detecting the genetic material (DNA) of the bacteria that causes gonorrhea, <em>Neisseria gonorrhoeae</em>. Here's how the test works:
                    </p>
                    <br />
                    <ul>
                        <li><strong>Sample Collection:</strong> A urine sample is taken.</li>
                        <li><strong>Extraction of DNA</strong></li>
                        <li><strong>Amplification of Target DNA:</strong> The target DNA is amplified using a process called polymerase chain reaction (PCR). This creates many copies of the target DNA, making it easier to detect.</li>
                        <li><strong>Detection of Amplified DNA</strong></li>
                        <li><strong>Result Interpretation:</strong> The results are interpreted based on the presence or absence of the target DNA. If the target DNA is detected, it indicates that the individual is infected with gonorrhea.</li>
                    </ul>
                    <br />
                    <h3>Why These Tests Are the Best!</h3>
                    <p>
                        NAATs are highly sensitive and specific, meaning that they have a low rate of false negatives and false positives. They are also quicker than culture tests and can provide results within a few hours to a day. NAATs are considered to be the gold standard for diagnosing gonorrhea.
                    </p>
                    <br />
                    <h3>How Should I Prepare for the Test?</h3>
                    <p>
                        You should not urinate for at least one hour prior to arriving at the test center. No other preparation is needed.
                    </p>
                    <br />
                    <h3>What Should I Expect at the Examination Center?</h3>
                    <p>
                        You will sign in, and a lab technician will take you to the back. You will be asked to go to the bathroom and produce a urine sample. The sample should be “first catch,” meaning the first 20 - 30 mL of urine. Women should not clean their labia before producing a urine sample.
                    </p>
                    <br />
                    <h3>When Should I Test for Gonorrhea?</h3>
                    <p>
                        If you’re experiencing symptoms, get tested immediately! Gonorrhea may show up on tests as soon as 2 – 6 days after exposure. However, everyone is different, and it’s common to not experience symptoms, so it is highly recommended to test after every potential exposure. To ensure more accurate results, our doctors recommend waiting 2 weeks after potential exposure to get tested.
                    </p>
                    <br />
                    <h3>What Will the Gonorrhea Test Results Look Like?</h3>
                    <p>
                        Our gonorrhea results will indicate that you are either “positive” or “negative” for the bacteria. If you receive results that say “positive” or “detected,” that means you have an active gonorrhea infection. If the results say “negative” or “not detected,” that means that the bacteria was not found in your urine and therefore you do not have an active gonorrhea infection.
                    </p>
                    <br />
                    <h3>Can Gonorrhea Be Cured?</h3>
                    <p>
                        Gonorrhea is curable and can be treated with antibiotics. If you test positive, our doctors can prescribe antibiotics after a phone consultation. Be sure to finish the entire round of antibiotics and abstain from any sexual activity for at least one week after finishing the antibiotics. It is also recommended to get retested after the prescribed treatment is complete to ensure that the infection no longer remains. Keep in mind that it is possible to become reinfected with gonorrhea after receiving treatment.
                    </p>
                    <br />
                    <h3>Do I Need a Gonorrhea Test?</h3>
                    <p>
                        Yes, once you are sexually active, you need to get tested for gonorrhea. If you’re experiencing symptoms, get tested now! If you’re worried but not experiencing symptoms, wait 2 weeks after potential exposure. Untreated gonorrhea can cause severe and permanent health problems.
                    </p>
                    <br />

                </div>
            </section>
            <GenericSection />
        </section>
    )
}

export default Gonorrhea_Test