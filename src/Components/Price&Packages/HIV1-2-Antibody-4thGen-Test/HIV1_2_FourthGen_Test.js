import React, { useState , useEffect } from 'react'
import { axiosInstance } from "../../../AxiosInstance";
import '../Herpes1_2/herpes1_2.css'
import GenericSection from '../GenericSection'
import { useNavigate } from 'react-router-dom';

function HIV1_2_FourthGen_Test() {
    const navigate = useNavigate();
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);

    const [TenTestPanel, setTenTestPanel] = useState(null);
    const [HIV1_2_FourthGen, setHIV1_2_FourthGen] = useState(null);
  
    const getData = async (name, setter) => {
      try {
        const response = await axiosInstance.get(`/Disease/get-by-name/${encodeURIComponent(name)}`);
        setter(response.data.result);
      } catch (error) {
        console.error(`Error fetching data for ${name}:`, error);
      }
    };
  
    useEffect(() => {
      getData(
        "HIV 1 & 2 Antibody (4th Gen)",
        setHIV1_2_FourthGen
      );
      getData("10 Test Panel", setTenTestPanel);
    }, []);

    const handleCheckbox1 = () => {
        setChecked1(!checked1);
        if (!checked1) {
            setChecked2(false);
        } // Uncheck Checkbox 2
    };

    const handleCheckbox2 = () => {
        setChecked2(!checked2);
        if (!checked2) {
            setChecked1(false); // Uncheck Checkbox
        }
    };

    const handleGetTested = () => {
        let selectedTest = null;
        if (checked1) {
          selectedTest = { name: HIV1_2_FourthGen.name, price: HIV1_2_FourthGen.price };
        } else if (checked2) {
            selectedTest = { name: TenTestPanel.name, price: TenTestPanel.price };
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
                    HIV 1 & 2 Antibody (4th Generation) Test
                </h1>
                <div className='Herper1-2-section1-text'>
                    <h2>FDA-Approved HIV Antibody Test</h2>
                    <p>
                        Our standard HIV test is the HIV 4th Generation Duo Antigen/Antibody Test. This FDA-approved 4th generation HIV test evaluates the blood for HIV Type 1 and Type 2 in two ways: By detecting antibodies that your immune system creates specifically to fight the HIV virus, as well as detecting Human Immunodeficiency Virus antigens called HIV P24 antigens.
                    </p><br />

                    <p>
                        These antigens are viral proteins that make up most of the virus's core. They are especially helpful in diagnosing HIV because the P24 antigen levels are high in the first few weeks after infection. Also, since this test is sensitive to P24 antigens, it is useful for diagnosing HIV infections when your body's antibody levels are low.
                    </p><br />

                    <p>
                        If your initial blood test result is positive, a confirmation test will be completed on the same blood sample at no additional cost to you.
                    </p><br />

                    <p>
                        Getting tested for HIV is essential since it is possible to have HIV and infect your partner, even without showing any symptoms of the infection.
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
                            HIV 1 & 2 Antibody (4th Gen)
                        </div>
                        <div className="card-price"> ${HIV1_2_FourthGen !== null ? HIV1_2_FourthGen.price : ""}</div>
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
                        <div className="card-price"> ${TenTestPanel !== null ? TenTestPanel.price : ""}</div>
                    </div>
                    <div className="card-button">
                        <button className="button3" onClick={handleGetTested}>Get Tested</button>
                    </div>
                </div>
                <div className="test-process my-3">
                    <div className="test-process-card">
                        <div className="test-process-box test-process-heading-box">
                            HIV 1 & 2 Antibody (4th Gen)
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
                    HIV 4th Generation Test
                </h1>
                <div className='Herper1-2-section2-text'>
                    <h2>How Accurate is the HIV 4th Generation Test?</h2>
                    <p>
                        All laboratory testing, including STD tests, have accuracy rates that are measured in terms of sensitivity and specificity. Our FDA-approved HIV 4th Generation Antibody/Antigen test has a sensitivity rate of 100% and a specificity of 99.72-100%.
                    </p><br />

                    <h2>What is the Testing Window for HIV?</h2>
                    <p>
                        HIV has an incubation period of 21 days, and since the HIV 4th Generation Test looks for antigens and antibodies produced in the weeks following exposure, it can be taken 3 weeks from the latest encounter.
                    </p><br />

                    <h2>Does the HIV 4th Generation Test Use a Blood or Urine Sample?</h2>
                    <p>
                        Our HIV 4th Generation Antibody/Antigen test requires a small blood sample. There is no undressing or uncomfortable swabbing.
                    </p><br />

                    <h2>Do I Need to Prepare for the Test?</h2>
                    <p>
                        No fasting or additional preparation is needed for the HIV 4th Generation Antibody/Antigen test.
                    </p><br />

                    <h2>Can HIV Be Cured or Treated?</h2>
                    <p>
                        There is no cure for HIV, but with the help of various anti-retroviral drugs, HIV can be managed and individuals with HIV can lead normal lives. The medications prescribed to treat and manage HIV strengthen the immune system and help prevent HIV from developing into AIDS.
                    </p><br />

                    <h2>When is the Right Time to Take the HIV 4th Generation Test?</h2>
                    <p>
                        The right time to take our 4th Generation HIV Antibody/Antigen Test is 3 weeks post-exposure. This blood test searches for the presence of HIV antibodies in the blood, as well as antigens on the surface of HIV cells. Most people will develop detectable antibodies (proteins made by the immune system to fight HIV) within this time frame, but in rare cases it may take up to 3 months for them to develop, making this test conclusive at 100% accuracy if taken 12 weeks post-exposure. This test is sensitive to P24 antigens, so it is useful for diagnosing HIV infections when antibody levels are still initially low. If antibodies or antigens to HIV are found, a supplemental differentiation assay is performed at no additional cost to confirm the presence of HIV RNA. If you are concerned about recent exposure, our HIV RNA Early Detection Test can detect the presence of HIV as early as 9-11 days after exposure.
                    </p><br />

                    <h2>How Long Do Results for the HIV 4th Generation Test Take and What Could the Results Say?</h2>
                    <p>
                        It takes 1 - 2 business days for the results of your HIV 4th Generation Antibody/Antigen test to come back. The report will either say "Detected" or "Not Detected". If there are no signs of HIV antibodies or antigens in the blood, the result is negative (Not Detected). If HIV antibodies or antigens were found in your blood sample, the result will read "Detected" and the confirmation test will be performed to confirm that result.
                    </p><br />

                    <h2>Who Needs HIV 4th Generation Antibody/Antigen Testing?</h2>
                    <p>
                        HIV affects both men and women. Anyone who has had unprotected sex or who engages in intravenous drug use should get tested. It is possible to have HIV for a long time without being aware, especially because its symptoms (if present) could be mistaken for other illnesses. The only way to know is to get tested. The HIV test should be a part of your routine STD screening.
                    </p><br />

                </div>
            </section>
            <GenericSection />
        </section>
    )
}

export default HIV1_2_FourthGen_Test