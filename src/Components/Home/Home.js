import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate=useNavigate();

  const onSeeTestsClick=()=>{
    navigate("/price-packages")
  }
  const onFindAlabClick=()=>{
    navigate("/test-centers")
  }
  return (
    <section className="home">
      <section className="home1">
        <div className="text">
          <h1>Fast, Private & Affordable STD Testing</h1>
          <div className="d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 48 48"
            >
              <g
                fill="none"
                stroke="#f57a00"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
              >
                <path d="M42 20v19a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h21" />
                <path d="m16 20l10 8L41 7" />
              </g>
            </svg>
            &nbsp;<strong>100% Confidential </strong>&nbsp; STD Testing
          </div>
          <div className="d-flex align-items-center my-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 48 48"
            >
              <g
                fill="none"
                stroke="#f57a00"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
              >
                <path d="M42 20v19a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h21" />
                <path d="m16 20l10 8L41 7" />
              </g>
            </svg>
            &nbsp;<strong>5 Minute Testing </strong>&nbsp; with Results in 1 to
            2 days
          </div>
          <div className="d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 48 48"
            >
              <g
                fill="none"
                stroke="#f57a00"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
              >
                <path d="M42 20v19a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h21" />
                <path d="m16 20l10 8L41 7" />
              </g>
            </svg>
            &nbsp;<strong>All Tests </strong>&nbsp; are FDA-Approved / Cleared
          </div>
          <div className="d-flex align-items-center  my-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 48 48"
            >
              <g
                fill="none"
                stroke="#f57a00"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
              >
                <path d="M42 20v19a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h21" />
                <path d="m16 20l10 8L41 7" />
              </g>
            </svg>
            &nbsp;<strong>Same Day </strong>&nbsp; STD Testing Available
          </div>
          <div className="d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 48 48"
            >
              <g
                fill="none"
                stroke="#f57a00"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
              >
                <path d="M42 20v19a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h21" />
                <path d="m16 20l10 8L41 7" />
              </g>
            </svg>
            &nbsp;<strong>Over 4,500 testing centers </strong>&nbsp; Nationwide
          </div>
          <div className="d-flex my-3">
            <button className="button3" onClick={onSeeTestsClick}>See Tests & Prices</button>
            <button className="button2 mx-3" onClick={onFindAlabClick}>Find A Lab</button>
          </div>
        </div>
        <img className="width" src="Female-Doctor.png" />
      </section>
      <section className="home2">
        <h1>Know Your Status. Get Tested.</h1>
        <div className="home2section1">
          <div className="">
            <p>
              Giving you control over your sexual health is one of the most
              important things we can do with an online STD test. That is why
              we've eliminated the embarrassment and hassle of conventional STD
              testing. We give you access to the same FDA-approved / cleared
              testing used by doctors and hospitals. Once you place your order,
              you can visit any of our nationwide testing centers without an
              appointment, even the same day of your purchase. Your results are
              delivered to you and no one else - nothing is reported to your
              insurance or placed on your medical records. More importantly, we
              provide guidance and support every step of the way, no matter what
              your results are.
            </p>
            <br />
            <p>
              Take charge of your sexual health today. Help stop the spread of
              STDs by knowing your status by purchasing an online STD test from
              STDCheck.
            </p>
          </div>
          <div className="">
            <img src="Sheild.png" />
          </div>
        </div>
        <section className="home2section2">
          <div className="row">
            <div className="col-md-6">
              {" "}
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#333333"
                    d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"
                  />
                </svg>
                <span className="mx-3">
                  <strong>Private STD Testing</strong>
                </span>
              </div>
              <p>
                Your results will not be reported to your insurance company and,
                therefore, will not be placed on your permanent medical records.
              </p>
            </div>
            <div className="col-md-6">
              {" "}
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50px"
                  height="50px"
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
                <span className="mx-3">
                  <strong>Quick & Discreet</strong>
                </span>
              </div>
              <p>
                Testing takes only a few minutes. No questions are asked and no
                paperwork is required. Provide a urine or blood sample and you
                are done.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {" "}
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50px"
                  height="50px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#333333"
                    fill-rule="evenodd"
                    d="M14.25 2.5a.25.25 0 0 0-.25-.25H7A2.75 2.75 0 0 0 4.25 5v14A2.75 2.75 0 0 0 7 21.75h10A2.75 2.75 0 0 0 19.75 19V9.147a.25.25 0 0 0-.25-.25H15a.75.75 0 0 1-.75-.75zm.75 9.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5zm0 4a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill="#333333"
                    d="M15.75 2.824c0-.184.193-.301.336-.186q.182.147.323.342l3.013 4.197c.068.096-.006.22-.124.22H16a.25.25 0 0 1-.25-.25z"
                  />
                </svg>
                <span className="mx-3">
                  <strong>10 Test Panel Advantage</strong>
                </span>
              </div>
              <p>
                We offer the most comprehensive tests available. Our 10-Test
                Panel will test for all major STDs. We are the only company that
                offers hepatitis A tests in our panels.
              </p>
            </div>
            <div className="col-md-6">
              {" "}
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="43.75px"
                  height="50px"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#333333"
                    d="M224 256a128 128 0 1 0 0-256a128 128 0 1 0 0 256m-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16s7.2-16 16-16v-24c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16v-40c0-29.8 20.4-54.9 48-62v-57.1q-9-.9-18.3-.9h-91.4q-9.3 0-18.3.9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7zM144 448a24 24 0 1 0 0-48a24 24 0 1 0 0 48"
                  />
                </svg>
                <span className="mx-3">
                  <strong>Doctor Consultation available</strong>
                </span>
              </div>
              <p>
                Speak with one of our doctors if your test results come back
                positive. Doctors may prescribe treatment or refer you to a
                specialist.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {" "}
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50px"
                  height="50px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#333333"
                    d="M7.75 2.5a.75.75 0 0 0-1.5 0v1.58c-1.44.115-2.384.397-3.078 1.092c-.695.694-.977 1.639-1.093 3.078h19.842c-.116-1.44-.398-2.384-1.093-3.078c-.694-.695-1.639-.977-3.078-1.093V2.5a.75.75 0 0 0-1.5 0v1.513C15.585 4 14.839 4 14 4h-4c-.839 0-1.585 0-2.25.013z"
                  />
                  <path
                    fill="#333333"
                    fill-rule="evenodd"
                    d="M2 12c0-.839 0-1.585.013-2.25h19.974C22 10.415 22 11.161 22 12v2c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14zm15 2a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="mx-3">
                  <strong>Fast STD Test Results</strong>
                </span>
              </div>
              <p>
                Results are available within 1-2 days after your visit to a
                testing center. Text us anytime for a status update.
              </p>
            </div>
            <div className="col-md-6">
              {" "}
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50px"
                  height="50px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#333333"
                    d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"
                  />
                </svg>
                <span className="mx-3">
                  <strong>100% Satisfaction</strong>
                </span>
              </div>
              <p>
                We want you to have the best testing experience possible. Our
                Care Advisors are available to answer your questions.
              </p>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}

export default Home;
