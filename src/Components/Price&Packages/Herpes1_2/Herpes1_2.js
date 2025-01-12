import React, { useState } from 'react'
import './herpes1_2.css'
import GenericSection from '../GenericSection'

function Herpes1_2() {
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
    return (
        <section>
            <section className='Herper1-2-section1'>
                <h1 className="center my-3">
                    Herpes Type 1 and Type 2 Testing
                </h1>
                <div className='Herper1-2-section1-text'>
                    <h2>How We Test For Oral & Genital Herpes (HSV-1 & HSV-2)</h2>
                    <p>
                        Our herpes simplex virus type 1 and 2 (IgG) type-specific antibody test screens blood for antibodies to both types of the herpes virus using an immunoassay. A positive result indicates the presence of the corresponding virus if sufficient antibodies are detected.
                    </p>
                    <br />
                    <p>
                        Even without symptoms, our FDA-cleared herpes type 1 and 2 tests are 97%-99% accurate between 4-6 weeks after exposure and maintain 99% accuracy beyond 6 weeks.
                    </p>
                    <br />
                    <p>
                        It's important to note that while HSV-2 is commonly associated with genital herpes and HSV-1 with oral herpes, both can occur in either region of the body. A positive HSV-1 result does not necessarily indicate oral herpes, nor does a positive HSV-2 result confirm genital herpes.
                    </p>
                    <br />
                    <p>
                        Finding a lab is easy—simply enter your zip code and choose the most convenient location. Payment is made online, and testing can be done as early as the same day.
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
                            Herpes I & II
                        </div>
                        <div className="card-price"> $79.00</div>
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
                        <button className="button3">Get Tested</button>
                    </div>
                </div>
                <div className="test-process my-3">
                    <div className="test-process-card">
                        <div className="test-process-box test-process-heading-box">
                            Herpes I & II
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
                    </div>
                </div>
            </section>
            <section className='Herper1-2-section2'>
                <h1 className="center my-3">
                    More Information About Oral & Genital Herpes Testing
                </h1>
                <div className='Herper1-2-section2-text'>
                    <h2>How Did I Get Herpes Simplex Virus?</h2>
                    <p>
                        HSV-1 is commonly spread through kissing, sexual contact, oral secretions, sharing personal items like toothbrushes, and direct contact with herpes sores. HSV-2 is primarily transmitted through sexual activity and direct contact with the genitals of a herpes-positive individual. Symptoms may not appear immediately and can take weeks, months, or even years, allowing the virus to spread unnoticed. Although practicing safe sex reduces the risk, herpes can occasionally be transmitted even when protection is used. Open and honest communication with your partner about their status, symptoms to watch for, and the potential for asymptomatic transmission is crucial.
                    </p>
                    <br/>
                    <h2>Do You Use a Blood or Urine Sample to Test for Herpes?</h2>
                    <p>
                        The herpes type 1 and 2 (IgG) type-specific antibody test requires a blood sample. This method is the most accurate and reliable option available.
                    </p>
                    <br/>
                    <h2>How Do I Prepare to Test for Herpes Simplex Virus?</h2>
                    <p>
                        No special preparation is needed prior to testing, including fasting or scheduling appointments.
                    </p>
                    <br/>
                    <h2>When Should I Test for HSV-1 & HSV-2?</h2>
                    <p>
                        If you have symptoms, get tested immediately! If you are not experiencing symptoms, it is recommended to wait at least four weeks after potential exposure to the herpes virus for more accurate results.
                    </p>
                    <br/>
                    <h2>Herpes Test Results Explained</h2>
                    <p>
                        The concentration of herpes antibodies in your blood determines whether your results are positive, negative, or indeterminate. A negative result means there were not enough herpes antibodies detected to confirm a herpes infection. A positive result indicates that significant antibodies for one or both herpes strains were found in your blood. It is possible to test positive for both HSV-1 and HSV-2 simultaneously. If your result is negative, consider retesting in three months to confirm the diagnosis.
                    </p>
                    <br/>
                    <h2>Can HSV-1 & HSV-2 Be Cured or Treated?</h2>
                    <p>
                        Herpes, regardless of type, cannot be cured. However, severe symptoms can be managed using antiviral drugs. These medications do not eliminate the virus but help control outbreaks, reduce symptom severity, and lower the chances of transmission. Most herpes-positive individuals lead normal, happy lives without significant disruptions caused by the virus. Herpes is extremely common; the World Health Organization estimates that up to 67% of the global population has HSV, and this figure might be higher as many healthcare providers do not test for the virus unless specifically requested.
                    </p>

                </div>
            </section>
            <GenericSection />
        </section>
    )
}

export default Herpes1_2