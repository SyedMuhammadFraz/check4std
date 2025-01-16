import React, { useState } from 'react'
import '../Herpes1_2/herpes1_2.css'
import GenericSection from '../GenericSection'
import { useNavigate } from 'react-router-dom';

function HIV_RNA_Test() {
    const navigate = useNavigate();
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);

    const handleCheckbox1 = () => {
        setChecked1(!checked1);
        if (!checked1) {
            setChecked2(false);
        } // Uncheck Checkbox 2
    };

    const handleCheckbox2 = () => {
        setChecked2(!checked2);
        if (!checked2) {
            setChecked1(false); // Uncheck Checkbox 1
        }
    };

    const handleGetTested = () => {
        let selectedTest = null;
        if (checked1) {
          selectedTest = { name: "HIV RNA Early Detection", price: 129 };
        } else if (checked2) {
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
                    HIV RNA Test for Early Detection
                </h1>
                <div className='Herper1-2-section1-text'>
                    <h2>HIV RNA Early Detection Test</h2>
                    <p>
                        Our clinicians recommend the HIV RNA Early Detection Test if you think you may have been recently exposed to the HIV virus and STDcheck.com offers the only FDA-approved HIV RNA Test on the market.
                    </p><br />

                    <p>
                        RNA is the genetic material that makes up certain viruses, like HIV. This HIV test searches for the core genetic material of HIV rather than its antigens, or your body's immune response to it (antibodies); allowing for earlier detection (in as little as 9-11 days after exposure), making this test the most accurate HIV test available today.
                    </p><br />

                    <p>
                        Taking our HIV RNA Test is a simple process, just provide a small blood sample at a lab near you and be on your way in minutes. With more than 4,500 conveniently located testing centers nationwide, there is one in your area.
                    </p><br />

                    <p>
                        Results for HIV RNA are typically available within 2-4 business days, so get tested for HIV today with this specialized test and know your status.
                    </p><br />

                    <p>
                        All laboratory tests, including STD testing, measure accuracy in terms of sensitivity and specificity. Our FDA-approved HIV RNA Early Detection test has a sensitivity rate of 100% and a specificity of 99.83%.
                    </p><br />
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
                            HIV RNA Early Detection
                        </div>
                        <div className="card-price"> $129.00</div>
                    </div>
                    <div className="card-radio">
                        <div className="card-checkbox" onClick={handleCheckbox2}>
                            <input
                                type="checkbox"
                                checked={checked2}
                                onChange={handleCheckbox2}
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
                            HIV RNA
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
                            <br /> Ready in 2-4 days
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
                    HIV RNA Test
                </h1>
                <div className='Herper1-2-section2-text'>
                    <h2>HIV RNA Early Detection Test - Details</h2>

                    <p>
                        <strong>Does this test use blood or urine?</strong><br />
                        The HIV RNA Early Detection Test is a blood test. A small blood sample will be drawn by our lab technicians to complete the test.
                    </p><br />

                    <p>
                        <strong>What do I need to do to prepare for the test?</strong><br />
                        No fasting or preparation is necessary.
                    </p><br />

                    <p>
                        <strong>When is the right time to take the HIV RNA Early Detection Test?</strong><br />
                        The HIV RNA Test for Early Detection is conclusive as early as 9-11 days post-exposure. We are the only online STD testing service that provides this FDA-approved HIV RNA Early Detection test. This test looks for the presence of HIV RNA in the plasma of patients. It can detect acute (new) HIV infection without the presence of antibodies (proteins produced by the body to fight against the HIV virus) in the blood, making the RNA test the most sensitive and accurate HIV RNA Early Detection test available on the market today.
                    </p><br />

                    <p>
                        <strong>What will the test results say?</strong><br />
                        If your results are negative, HIV was not found. If your results are positive, HIV was found in your bloodstream. If the initial blood test result is positive, a confirmation test will be completed on the same blood sample to confirm the result at no additional cost. A positive result for the HIV virus does not mean that you have AIDS.
                    </p><br />

                    <p>
                        <strong>Understanding your HIV Test results:</strong><br />
                        PCR stands for polymerase chain reaction. These types of tests can be used to determine if HIV genetic material (RNA) is in the sample. The sample blood will be tested for early infections before any antibodies have been produced.
                    </p><br />

                    <p>
                        <strong>HIV RNA Test Window Period:</strong><br />
                        These tests determine if the HIV virus is present in the sample collected. There is an extremely short window to detect the virus - roughly 9 days after infection. This test is seldom used for screening because it is one of the most costly tests out there. It is only slightly better than an antigen/antibody test, which is more affordable. Still, this test can be done as a follow-up for a positive HIV test. It can even be used for screening for certain cases, like if someone was recently exposed to HIV and is having symptoms of an early HIV infection.
                    </p><br />

                    <p>
                        An early HIV infection can be detected with an RNA test if administered within 9 to 11 days after exposure. This is the window period to use an RNA test because antibody tests won’t detect HIV yet, as confirmed by the CDC.
                    </p><br />

                </div>
            </section>
            <GenericSection />
        </section>
    )
}

export default HIV_RNA_Test