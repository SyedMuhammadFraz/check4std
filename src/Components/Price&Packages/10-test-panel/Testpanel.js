import React, { useState } from "react";
import "./Testpanel.css";

function Testpanel() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const handleCheckbox1 = () => {
    setChecked1(!checked1);
    if (!checked1) setChecked2(false); // Uncheck Checkbox 2
  };

  const handleCheckbox2 = () => {
    setChecked2(!checked2);
    if (!checked2) setChecked1(false); // Uncheck Checkbox 1
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
    <section className="Testpanel">
      <h1 className="center my-3">
        STD Panel: Order Full Test Panel for 10 Common STDs
      </h1>
      <section className="TestPanelSection1">
        <h4>
          <strong>Comprehensive Full Panel STD Test</strong>
        </h4>
        <p>
          Many sexually transmitted diseases show no symptoms, meaning you could
          have an STD without knowing it. Additionally, having one STD increases
          the likelihood of having multiple infections.
        </p>
        <br />
        <p>
          We are the only online STD testing service offering a complete 10-Test
          STD Panel. This panel screens for the most common bacterial and viral
          STDs, including:
        </p>
        <ol className="my-3 list">
          <li>HIV Type 1 & Type 2 Antibody/Antigen (4th Generation)</li>
          <li>Herpes Type 1 & Type 2</li>
          <li>Hepatitis A, B, and C</li>
          <li>Chlamydia</li>
          <li>Gonorrhea</li>
          <li>Syphilis</li>
        </ol>
        <p>
          Comprehensive testing provides peace of mind. Take control of your
          health by choosing our 10-Test Panel today and understanding your STD
          status.
        </p>
        <br />
        <p className="my-3">
          For early HIV detection, we offer the only FDA-approved HIV RNA test,
          which directly detects the virus by identifying its RNA genetic
          material in your bloodstream. This advanced test delivers accurate
          results as early as 9 to 11 days after potential exposure to HIV.
        </p>
        <div className="test-cards">
          <div className="test-card">
            <div className="card-header">Choose Your Packages</div>
            <div className="card-radio">
              <div className="card-checkbox" onClick={handleCheckbox1}>
                <input
                  type="checkbox"
                  checked={checked1}
                  onChange={handleCheckbox1}
                />
                10 Test Panel
              </div>
              <div className="card-price"> $139.00</div>
            </div>
            <div className="card-radio" onClick={handleCheckbox2}>
              <div className="card-checkbox">
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
              <button className="button3">Get Tested</button>
            </div>
          </div>
        </div>

        <div className="test-process my-3">
          <div className="test-process-card">
            <div className="test-process-box test-process-heading-box">
              10 Test Panel Testing Process
            </div>
            <div className="test-process-box">
              <h4>
                <strong>5 Minute</strong>
              </h4>
              <br /> Testing process
            </div>
            <div className="test-process-box">
              <h4>
                <strong>Sample Required</strong>
              </h4>
              <br /> Small Urine and Blood Sample
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
      <section className="TestPanelSection2">
        <h1 className="center my-3">What Is Included In A Full STD Panel</h1>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Chlamydia
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
            >
              <div className="accordion-body">
                <h2>Do you use blood or urine for chlamydia testing?</h2>
                <p>
                  Our laboratory uses a urine sample to test for chlamydia,
                  which checks for the bacteria in the genitourinary system (the
                  organs of the reproductive and urinary tracts). When you visit
                  the testing center, you will only need to provide a urine
                  sample. There is no need for swabbing or undressing.
                </p>

                <h2>How do I prepare for the test?</h2>
                <p>
                  For the best results, avoid urinating for at least one hour
                  before taking the chlamydia test. No other special preparation
                  is required.
                </p>

                <h2>When is the best time to test for chlamydia?</h2>
                <p>
                  If you suspect you might have a chlamydia infection, the ideal
                  time for testing is at least 1-5 days after possible exposure.
                  It’s recommended to wait a minimum of 24 hours before testing.
                  If you’ve previously been treated for chlamydia, retesting is
                  recommended 21 to 28 days after treatment to ensure the
                  infection is completely cleared.
                </p>

                <h2>What will my test results show?</h2>
                <p>
                  A negative result indicates no chlamydia was detected in your
                  genitourinary system. A positive result means the infection
                  was found. It’s possible to test too early after exposure,
                  which can affect the accuracy of the results. We recommend
                  waiting 1-5 days after exposure for the most reliable results.
                </p>

                <h2>Can chlamydia be cured or treated?</h2>
                <p>
                  Yes, chlamydia is treatable with antibiotics. If needed, our
                  doctors will consult with you over the phone and, at their
                  discretion, prescribe antibiotics for you to pick up at a
                  nearby pharmacy.
                </p>

                <h2>Who should get tested for chlamydia?</h2>
                <p>
                  Both men and women can contract chlamydia. The CDC reports
                  nearly 3 million new chlamydia cases annually in the United
                  States. This is partly because the infection often has no
                  symptoms and can be easily transmitted. To protect your sexual
                  health, regular testing is advised. The CDC recommends testing
                  for all sexually active women under 25. You should also
                  consider testing if you’ve had unprotected sex with a partner
                  whose STD status is unknown.
                </p>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Gonorrhea
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
            >
              <div className="accordion-body">
                <h2>Is this gonorrhea test done with blood or urine?</h2>
                <p>
                  Our gonorrhea test uses a urine sample. When you visit the
                  testing center, a lab technician will collect a small urine
                  sample for analysis.
                </p>

                <h2>How should I prepare for the test?</h2>
                <p>
                  Ensure you do not urinate for at least one hour before
                  arriving at the testing center. No other preparations are
                  required.
                </p>

                <h2>When is the best time to test for gonorrhea?</h2>
                <p>
                  Since everyone’s body reacts differently to the Neisseria
                  gonorrhoeae bacteria, there is no fixed incubation period. It
                  is advised to wait at least 2 to 6 days after potential
                  exposure before testing. This gives the bacteria enough time
                  to grow, ensuring more accurate detection. If you’ve been
                  treated for gonorrhea, it’s recommended to get re-tested two
                  weeks after finishing the treatment to confirm the infection
                  has been cleared.
                </p>

                <h2>What do the gonorrhea test results mean?</h2>
                <p>
                  If the test results are negative, it means no gonorrhea
                  infection was detected. If the results are positive, it
                  indicates the presence of the Neisseria gonorrhoeae bacteria
                  in your urine. Testing too early after exposure may result in
                  inaccurate results. For reliable results, testing is best done
                  at least 2 to 6 days after exposure.
                </p>

                <h2>Can gonorrhea be cured?</h2>
                <p>
                  Yes, gonorrhea is treatable with antibiotics. If you test
                  positive, our doctors can provide a free phone consultation to
                  discuss your results and available treatment options. They can
                  also prescribe medications for the gonorrhea infection if
                  necessary.
                </p>

                <h2>Who should get tested for gonorrhea?</h2>
                <p>
                  If you are sexually active, you are at risk of contracting
                  gonorrhea. Left untreated, gonorrhea can lead to serious and
                  permanent health complications. Common symptoms include
                  abnormal discharge, pain or burning during urination, and
                  sores or rashes in the genital area. If you experience any of
                  these symptoms, both you and your partner should get tested as
                  soon as possible.
                </p>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Hepatitis A
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
            >
              <div className="accordion-body">
                <h2>Does the hepatitis A test use blood or urine?</h2>
                <p>
                  Our hepatitis A test is conducted using a blood sample. When
                  you visit one of our testing centers, a lab technician will
                  take a small blood sample for testing.
                </p>

                <h2>What preparation is required for the test?</h2>
                <p>
                  No fasting or other special preparations are needed before
                  visiting the testing center.
                </p>

                <h2>When should I get tested for hepatitis A?</h2>
                <p>
                  We recommend waiting at least 2 to 7 weeks after possible
                  exposure before getting tested, as the hepatitis A virus (HAV)
                  has an average incubation period of around 28 days. While HAV
                  infections typically do not cause chronic liver issues, they
                  can be fatal in rare cases (0.5%). Additionally, 10%–15% of
                  HAV patients may experience a relapse of symptoms within 6
                  months after treatment.
                </p>

                <h2>How can I contract hepatitis A?</h2>
                <p>
                  HAV is usually contracted through fecal-oral transmission
                  (e.g., consuming food or water contaminated with feces). The
                  virus can also be transmitted through anal-oral contact during
                  sex.
                </p>

                <h2>What will the test results show?</h2>
                <p>
                  Your test result will indicate whether you are positive or
                  negative for hepatitis A. A negative result means there is no
                  sign of the virus, while a positive result means hepatitis A
                  antibodies were detected.
                </p>

                <h2>Can hepatitis A be cured or treated?</h2>
                <p>
                  There is no cure for hepatitis A, but doctors will monitor
                  your liver functions to ensure proper healing. To protect
                  yourself from HAV, maintain good personal hygiene and consider
                  getting vaccinated if you are at risk. Hepatitis A vaccines
                  are recommended for children over 1 year old, individuals at
                  risk for complications, and anyone wanting immunity against
                  the virus.
                </p>

                <h2>Who should get tested for hepatitis A?</h2>
                <p>
                  Although anyone can contract hepatitis A, certain groups are
                  more at risk, including men who have sex with men, individuals
                  engaging in oral-to-anal sex, people who use illegal drugs,
                  and travelers to countries where HAV is common.
                </p>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                Hepatitis B
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="headingFour"
            >
              <div className="accordion-body">
                <h2>Does hepatitis B testing use blood or urine?</h2>
                <p>
                  Our hepatitis B test is performed using a blood sample. A
                  laboratory technician will draw a small blood sample during
                  your visit to the testing center.
                </p>

                <h2>What preparation is required for the test?</h2>
                <p>
                  No special preparation is needed for hepatitis B testing.
                  Fasting is not required.
                </p>

                <h2>When should I get tested for hepatitis B?</h2>
                <p>
                  While hepatitis B can be detected as early as 3 weeks after
                  infection, we recommend waiting at least 6 weeks to ensure
                  accurate results. Hepatitis B often has no symptoms, which
                  means many individuals are unaware of the infection. Symptoms,
                  when they occur, typically appear between 6 weeks to 6 months
                  after infection and may include extreme tiredness, tenderness
                  in the lower abdomen, loss of appetite, nausea, vomiting,
                  joint pain, headache, fever, and hives. If you experience
                  these symptoms or have had contact with someone with chronic
                  hepatitis B, consider getting tested.
                </p>

                <h2>What will the test results show?</h2>
                <p>
                  If your result is negative, it indicates there is no evidence
                  of hepatitis B in your blood. A positive result means the
                  hepatitis B virus was detected, and our doctors are available
                  to discuss your results and answer any questions you may have.
                </p>

                <h2>Can hepatitis B be cured or treated?</h2>
                <p>
                  There is no cure for hepatitis B, but around 90% of adults
                  with an acute HBV infection will clear the virus naturally
                  without medication. If you test positive for hepatitis B for
                  more than six months, you may have a chronic infection and
                  should consult with a doctor. Treatment can help slow the
                  virus's progression and prevent significant liver damage. Most
                  people with chronic hepatitis B can still lead long and
                  healthy lives.
                </p>

                <h2>Who should get tested for hepatitis B?</h2>
                <p>
                  Hepatitis B is a highly contagious virus affecting both men
                  and women. Testing is recommended for individuals at risk of
                  exposure, such as those who have shared needles for
                  intravenous drug use, engaged in unprotected sex, or live with
                  someone infected with hepatitis B. Consider including
                  hepatitis B testing in routine STD screenings, especially if
                  you've had unprotected sex with someone whose STD status is
                  unknown or concerning.
                </p>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                Hepatitis C
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="headingFive"
            >
              <div className="accordion-body">
                <h2>What is hepatitis C?</h2>
                <p>
                  Hepatitis C is a liver infection caused by the hepatitis C
                  virus (HCV). It is the most common chronic blood-borne
                  infection in the United States, affecting approximately 3.2
                  million people. The virus is primarily spread through contact
                  with contaminated blood, such as sharing needles during
                  intravenous drug use or in healthcare settings by healthcare
                  professionals. Hepatitis C is rarely transmitted through
                  sexual intercourse. It is also possible to have hepatitis C
                  without realizing it, as the early stages can be asymptomatic
                  or may only show mild fever. It typically takes 8-9 weeks for
                  HCV antibodies to develop in the body.
                </p>

                <h2>How do you test for hepatitis C?</h2>
                <p>
                  Our FDA-approved Hepatitis C Antibody Test is a blood test and
                  is considered the "gold standard" for detecting hepatitis C.
                  The test looks for antibodies that the body produces in
                  response to the hepatitis C virus (HCV). Our doctors recommend
                  this blood test for routine screenings of both acute (new) and
                  chronic (long-term) hepatitis C infections.
                </p>

                <h2>How is hepatitis C transmitted?</h2>
                <p>
                  Hepatitis C is mainly transmitted through contact with
                  contaminated blood, which can occur through intravenous drug
                  use or exposure in healthcare settings. It can also be spread
                  through oral, anal, or vaginal sex, as well as blood
                  transfusions and organ transplants.
                </p>

                <h2>
                  How soon can I get tested for hepatitis C after exposure?
                </h2>
                <p>
                  Hepatitis C antibody tests can detect the virus 8-9 weeks
                  after exposure. Our doctors recommend waiting enough time to
                  allow your body to develop antibodies, which helps ensure more
                  accurate results and avoids false positives.
                </p>

                <h2>What do I need to do to prepare for a hepatitis C test?</h2>
                <p>
                  No special preparation is needed for the hepatitis C test. You
                  do not need to fast, and the testing center will only require
                  a small blood sample. For more details, please refer to our
                  Hepatitis C Testing Information.
                </p>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSix">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSix"
                aria-expanded="false"
                aria-controls="collapseSix"
              >
                Herpes 1
              </button>
            </h2>
            <div
              id="collapseSix"
              className="accordion-collapse collapse"
              aria-labelledby="headingSix"
            >
              <div className="accordion-body">
                <h2>What is herpes 1?</h2>
                <p>
                  Herpes 1, also known as Oral Herpes or herpes labialis, is an
                  infection caused by the herpes simplex virus 1 (HSV-1),
                  typically affecting the lips, mouth, or gums. It leads to the
                  development of small, painful blisters commonly referred to as
                  cold sores or fever blisters. Herpes 1 is highly prevalent,
                  with most individuals contracting it before the age of 20.
                  While the majority of infected adults experience minimal or no
                  symptoms, the infection is still widespread.
                </p>

                <h2>How do you test for herpes 1?</h2>
                <p>
                  When you visit one of our partnered lab locations for testing,
                  a technician will draw a small blood sample to be sent for
                  analysis. Our doctors utilize the type-specific herpes blood
                  test recommended by the Centers for Disease Control and
                  Prevention (CDC). This test helps differentiate between herpes
                  type 1 (HSV-1) and herpes type 2 (HSV-2), specifically looking
                  for antibodies to the HSV-1 virus in the blood.
                </p>

                <h2>How is herpes 1 transmitted?</h2>
                <p>
                  The herpes 1 virus (HSV-1) is primarily transmitted through
                  kissing or close contact with an infected person. It can also
                  spread through contact with contaminated objects such as
                  razors, towels, dishes, and other personal items that have
                  been in contact with an infected area.
                </p>

                <h2>How soon can I get tested for herpes 1 after exposure?</h2>
                <p>
                  Our doctors recommend waiting 4-6 weeks after potential
                  exposure before testing for the herpes 1 virus. It can take
                  anywhere from 2 weeks to 6 months for antibodies to develop.
                  Although herpes 1 is not life-threatening, regular testing is
                  important, particularly to prevent complications like
                  blindness, which can occur if the infection spreads from the
                  mouth to the eye.
                </p>

                <h2>What do I need to do to prepare for a herpes 1 test?</h2>
                <p>
                  No special preparation or fasting is required before taking
                  the herpes type 1 test. For additional information, refer to
                  our Herpes 1 Testing Information.
                </p>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSeven">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSeven"
                aria-expanded="false"
                aria-controls="collapseSeven"
              >
                Herpes 2
              </button>
            </h2>
            <div
              id="collapseSeven"
              className="accordion-collapse collapse"
              aria-labelledby="headingSeven"
            >
              <div className="accordion-body">
                <h2>What is herpes 2?</h2>
                <p>
                  Herpes 2, also known as Genital Herpes, is a sexually
                  transmitted disease caused by the Herpes Simplex Virus (HSV).
                  It can be caused by either Herpes Simplex Virus Type 1 (HSV-1)
                  or Herpes Simplex Virus Type 2 (HSV-2), though most genital
                  herpes cases are caused by HSV-2. According to the Centers for
                  Disease Control and Prevention (CDC), approximately 776,000
                  Americans are infected with the herpes 2 virus annually.
                  Around 16.2%, or 1 in 6 individuals aged 14-49 years, are
                  affected by genital herpes, making it one of the most
                  prevalent sexually transmitted diseases in the country.
                </p>

                <h2>How do you test for herpes 2?</h2>
                <p>
                  STDcheck.com uses the CDC-recommended and FDA-cleared
                  type-specific herpes 2 blood test. During your visit to one of
                  our partnered lab locations, a technician will draw a small
                  blood sample for testing. Our herpes 2 test can differentiate
                  between herpes 1 and herpes 2, specifically looking for
                  antibodies to herpes 2 in the blood.
                </p>

                <h2>How is herpes 2 transmitted?</h2>
                <p>
                  The herpes 2 virus is transmitted through sexual intercourse.
                  Engaging in oral, vaginal, or anal sex with an infected person
                  exposes you to the virus. Many people infected with herpes 2
                  may not show symptoms or experience mild symptoms that are
                  often mistaken for other skin conditions. Transmission can
                  still occur even when no symptoms are visible.
                </p>

                <h2>How soon can I get tested for herpes 2 after exposure?</h2>
                <p>
                  Although it is possible to test for the herpes 2 virus as
                  early as three weeks after exposure, our doctors recommend
                  waiting 4-6 weeks to allow your body enough time to develop
                  antibodies for accurate results.
                </p>

                <h2>What do I need to do to prepare for a herpes 2 test?</h2>
                <p>
                  No preparation is required for the herpes 2 test. Fasting is
                  not necessary. Our testing center only requires a small blood
                  sample. For more information, refer to our Herpes 2 Testing
                  Information.
                </p>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingEight">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseEight"
                aria-expanded="false"
                aria-controls="collapseEight"
              >
                HIV 1 & 2 Antibody (4th Gen)
              </button>
            </h2>
            <div
              id="collapseEight"
              className="accordion-collapse collapse"
              aria-labelledby="headingEight"
            >
              <div className="accordion-body">
                <h2>What is HIV?</h2>
                <p>
                  HIV (Human Immunodeficiency Virus) is the virus responsible
                  for causing AIDS. HIV targets and destroys specific cells of
                  the immune system called CD4 cells or T cells, making it
                  difficult for the body to fight off common diseases. Unlike
                  some other sexually transmitted diseases (STDs), it is
                  impossible to cure HIV. Once infected with HIV, the disease is
                  lifelong. While there is no cure, antiretroviral therapies are
                  available to control the disease. With proper medical care,
                  individuals diagnosed with HIV can live a normal life.
                </p>

                <h2>How do you test for HIV?</h2>
                <p>
                  HIV 4th generation testing looks for antibodies in the blood
                  and has a 97%-99% accuracy rate three weeks after exposure. It
                  is 99% accurate 12 weeks post-exposure.
                </p>

                <h2>How is HIV transmitted?</h2>
                <p>
                  HIV is primarily transmitted through sexual intercourse. The
                  virus is spread through blood, semen (cum), pre-seminal fluid
                  (pre-cum), and rectal fluids. It can also be transmitted from
                  mother to infant through breast milk. The risk of HIV
                  infection is highest among individuals who engage in anal sex,
                  followed by vaginal sex, and intravenous drug users who share
                  needles.
                </p>

                <h2>How soon can I get tested for HIV after exposure?</h2>
                <p>
                  The timing depends on the type of test you take. For the HIV
                  Antibody test with Western Blot confirmation, wait at least 25
                  days to 2 months for HIV antibodies to develop. If you are
                  opting for the HIV RNA test, you can get tested 9-11 days
                  after exposure. Our FDA-approved HIV RNA test results are
                  conclusive in 9-11 days post-exposure.
                </p>

                <h2>What do I need to do to prepare for an HIV test?</h2>
                <p>
                  No preparation or fasting is required for either our
                  FDA-approved HIV Antibody test with Western Blot exam or the
                  HIV RNA test. For more details, see our HIV Testing
                  Information.
                </p>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingNine">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseNine"
                aria-expanded="false"
                aria-controls="collapseNine"
              >
                Syphilis
              </button>
            </h2>
            <div
              id="collapseNine"
              className="accordion-collapse collapse"
              aria-labelledby="headingNine"
            >
              <div className="accordion-body">
                <h2>What is Syphilis?</h2>
                <p>
                  Syphilis is a sexually transmitted disease (STD) caused by the{" "}
                  <em>Treponema pallidum</em> bacterium. If not treated
                  properly, syphilis can cause long-term complications and even
                  death. According to the Centers for Disease Control and
                  Prevention (CDC), approximately 56,000 new syphilis infections
                  occur annually in the United States, with 13,970 being primary
                  and secondary (P&S) infections. Symptoms of syphilis can
                  resemble other diseases, and the infection progresses in
                  stages if not treated early. The first stage, known as
                  chancre, involves a sore that appears on the genitals, vagina,
                  anus, or rectum where the virus entered the body. Without
                  treatment, the infection progresses to the second stage, which
                  begins with skin rashes and mucous membrane lesions or sores
                  typically found in the mouth, vagina, or anus. In the final
                  latent stage, syphilis becomes asymptomatic and can remain
                  dormant for years, potentially leading to severe organ damage
                  and death if left untreated.
                </p>

                <h2>How do you test for Syphilis?</h2>
                <p>
                  Syphilis is tested using the FDA-cleared Rapid Plasma Reagin
                  (RPR) test, which detects antibodies developed by the body in
                  response to the syphilis infection. If the initial test result
                  is positive, a confirmatory test is performed.
                </p>

                <h2>How is Syphilis Transmitted?</h2>
                <p>
                  Syphilis is transmitted through direct contact with a syphilis
                  sore, such as a chancre or a lesion, on the body of an
                  infected person. These sores are typically found on the
                  external genitals, vagina, anus, or rectum, and can also
                  appear inside the mouth or on the lips. The most common way to
                  contract syphilis is by having unprotected vaginal, anal, or
                  oral sex with an infected person. It can also be transmitted
                  from an infected mother to her baby during pregnancy.
                </p>

                <h2>How Soon Can I Get Tested for Syphilis After Exposure?</h2>
                <p>
                  Doctors recommend waiting 3 to 6 weeks after possible exposure
                  before testing for syphilis.
                </p>

                <h2>What Do I Need to Do to Prepare for a Syphilis Test?</h2>
                <p>
                  No preparation or fasting is necessary before taking the
                  syphilis RPR test through STDcheck.com. For more details,
                  refer to our Syphilis Testing information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="TestPanelSection3">
        <h1 className="center my-3">Our Service Includes:</h1>
        <div className="test-services">
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#333333"
                    d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"
                  />
                </svg>
                <span className="mx-3 test-service-text">
                  <strong>
                    FDA-approved / cleared tests performed in CLIA-certified
                    labs
                  </strong>
                  <p>
                    Same labs trusted by physicians and hospitals in your area
                  </p>
                </span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="#333333"
                      d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 4a1 1 0 0 0-1 1v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V7a1 1 0 0 0-1-1"
                    />
                  </g>
                </svg>
                <span className="mx-3 test-service-text">
                  <strong>Fast results in 1-2 days</strong>
                  <p>Sent to your email as soon as they are available</p>
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#333333"
                    d="M224 256a128 128 0 1 0 0-256a128 128 0 1 0 0 256m-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16s7.2-16 16-16v-24c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16v-40c0-29.8 20.4-54.9 48-62v-57.1q-9-.9-18.3-.9h-91.4q-9.3 0-18.3.9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7zM144 448a24 24 0 1 0 0-48a24 24 0 1 0 0 48"
                  />
                </svg>
                <span className="mx-3 test-service-text">
                  <strong>Physician consultation available</strong>
                  <p>
                    If your test result is positive, you can speak with one of
                    our doctors
                  </p>
                </span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50px"
                  height="50px"
                  viewBox="0 0 48 48"
                >
                  <g fill="#333333">
                    <path d="m24.433 28.279l-1.867-.707c.5-1.32 1.35-2.752 2.69-4.241l1.487 1.338c-1.183 1.315-1.901 2.53-2.31 3.61" />
                    <path
                      fill-rule="evenodd"
                      d="M15.563 7C10.035 7 6 12.64 6 18.724C6 32.304 24 41 24 41s18-9.256 18-22.276C42 12.642 37.965 7 32.438 7C28.602 7 25.755 9.531 24 13.121C22.243 9.531 19.398 7 15.563 7M17 24.959c0 2.807 3.142 3.703 5.441 2.957c-1.098 3.251-.078 5.784.83 6.764l1.467-1.36c-.364-.392-1.2-2.014-.509-4.422c1.207 2.237 6.771 2.519 6.771-1.7V16c-2.882 2.439-5.961 3.403-8.495 4.197C19.323 21.193 17 21.92 17 24.959"
                      clip-rule="evenodd"
                    />
                  </g>
                </svg>
                <span className="mx-3 test-service-text">
                  <strong>
                    Care Advisors available 24/7 at 1-800-456-2323
                  </strong>
                  <p>
                    Our trained Care Advisors are available over the phone or
                    online to answer your questions
                  </p>
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#333333"
                    d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"
                  />
                </svg>
                <span className="mx-3 test-service-text">
                  <strong>Local testing centers in your area</strong>
                  <p>
                    With our 4500 testing centers nationwide, your sample
                    collection is easy and convenient
                  </p>
                </span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#333333"
                    d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"
                  />
                </svg>
                <span className="mx-3 test-service-text">
                  <strong>Your health information is kept private</strong>
                  <p>
                    We care about your privacy and all of your health
                    information is protected
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Testpanel;
