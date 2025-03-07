import React, { useState, useEffect } from "react";
import "./Diseases.css";
import "./SideBar.css";
import STDs from "./STD Overview/overview";
import Chlamydia from "./Chlamydia/Chlamydia";
import ChlamydiaSymptoms from "./Chlamydia/Chlamydia2";
import ChlamydiaTreatment from "./Chlamydia/Chlamydia3";
import Gonorrhea from "./Gonorrhea/Gonorrhea";
import GonorrheaSymptoms from "./Gonorrhea/Gonorrhea2";
import GonorrheaTreatment from "./Gonorrhea/Gonorrhea3";
import HepatitisA from "./Hepatitis A/Hepatitis A";
import HepatitisASymptoms from "./Hepatitis A/Hepatitis A2";
import HepatitisATreatment from "./Hepatitis A/Hepatitis A3";
import HepatitisB from "./Hepatitis B/Hepatitis B";
import HepatitisBSymptoms from "./Hepatitis B/Hepatitis B2";
import HepatitisBTreatment from "./Hepatitis B/Hepatitis B3";
import HepatitisC from "./Hepatitis C/Hepatitis C";
import HepatitisCSymptoms from "./Hepatitis C/Hepatitis C2";
import HepatitisCTreatment from "./Hepatitis C/Hepatitis C3";
import GenitalHerpes from "./Genital Herpes/Genital Herpes";
import GenitalHerpesSymptoms from "./Genital Herpes/Genital Herpes2";
import HerpesSymptomsMen from "./Genital Herpes/Genital Herpes3";
import HerpesSymptomsWomen from "./Genital Herpes/Genital Herpes4";
import GenitalHerpesTreatment from "./Genital Herpes/Genital Herpes5";
import HSV2Symptoms from "./Genital Herpes/Genital Herpes6";
import OralHerpes from "./Oral Herpes/Oral Herpes";
import OralHerpesSymptoms from "./Oral Herpes/Oral Herpes2";
import OralHerpesTreatment from "./Oral Herpes/Oral Herpes3";
import HSV1Symptoms from "./Oral Herpes/Oral Herpes4";
import ColdSoresSymptoms from "./Oral Herpes/Oral Herpes5";
import HIV from "./HIV/HIV";
import HIVSymptoms from "./HIV/HIV2";
import HIVSymptomsMen from "./HIV/HIV3";
import HIVSymptomsWomen from "./HIV/HIV4";
import AIDSSymptoms from "./HIV/HIV5";
import HIVRash from "./HIV/HIV6";
import HIVTreatment from "./HIV/HIV7";
import Syphilis from "./Syphilis/Syphilis";
import SyphilisSymptoms from "./Syphilis/Syphilis2";
import SyphilisTreatment from "./Syphilis/Syphilis3";
import RPRTesting from "./Syphilis/Syphilis4";
import SyphilisRash from "./Syphilis/Syphilis5";
import UnderstandingSTDs from "./Symptoms/STD Symptoms";
import Overview from "./Symptoms in Men/Overview";
import JockItch from "./Symptoms in Men/JockItch";
import PainfulUrination from "./Symptoms in Men/Painful Urination";
import Penis_Bumps from "./Symptoms in Men/Penis Bumps";
import Penile_Discharge from "./Symptoms in Men/Penile Discharge";
import Penis_Rash from "./Symptoms in Men/Penis Rash";
import PenisSpots from "./Symptoms in Men/Spots on Penis";
import Penis_Pimples from "./Symptoms in Men/Pimple on Penis";
import BumpsOnTesticles from "./Symptoms in Men/Lump on Testicle";
import TesticlePain from "./Symptoms in Men/Testicle Pain";
import TesticleSwelling from "./Symptoms in Men/Testicle Swelling";
import FemaleSTD from "./Symptoms in Women/Overview";
import VaginalBumps from "./Symptoms in Women/Vaginal Bumps";
import VaginalBurningAndPainfulUrination from "./Symptoms in Women/Vaginal Burning";
import VaginalDischarge from "./Symptoms in Women/Vaginal Discharge";
import VaginalItching from "./Symptoms in Women/Vanginal Itching";
import VaginalOdor from "./Symptoms in Women/Vaginal Odor";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Diseases() {
  const headings = [
    {
      id: 1,
      title: "STD Overview",
      subheadings: [
        { title: "Overview", component: <STDs /> },
      ],
    },
    {
      id: 2,
      title: "Chlamydia",
      subheadings: [
        { title: "Chlamydia Overview", component: <Chlamydia /> },
        { title: "Chlamydia Symptoms", component: <ChlamydiaSymptoms /> },
        { title: "Chlamydia Testing & Treatment", component: <ChlamydiaTreatment /> },
      ],
    },
    {
      id: 3,
      title: "Gonorrhea",
      subheadings: [
        { title: "Gonorrhea Overview", component: <Gonorrhea /> },
        { title: "Gonorrhea Symptoms", component: <GonorrheaSymptoms /> },
        { title: "Gonorrhea Testing & Treatment", component: <GonorrheaTreatment /> },
      ],
    },
    {
      id: 4,
      title: "Hepatitis A",
      subheadings: [
        { title: "Hepatitis A Overview", component: <HepatitisA /> },
        { title: "Hepatitis A Symptoms", component: <HepatitisASymptoms /> },
        { title: "Hepatitis A Testing & Treatment", component: <HepatitisATreatment /> },
      ],
    },
    {
      id: 5,
      title: "Hepatitis B",
      subheadings: [
        { title: "Hepatitis B Overview", component: <HepatitisB /> },
        { title: "Hepatitis B Symptoms", component: <HepatitisBSymptoms /> },
        { title: "Hepatitis B Testing & Treatment", component: <HepatitisBTreatment /> },
      ],
    },
    {
      id: 6,
      title: "Hepatitis C",
      subheadings: [
        { title: "Hepatitis C Overview", component: <HepatitisC /> },
        { title: "Hepatitis C Symptoms", component: <HepatitisCSymptoms /> },
        { title: "Hepatitis C Testing & Treatment", component: <HepatitisCTreatment /> },
      ],
    },
    {
      id: 7,
      title: "Genital Herpes",
      subheadings: [
        { title: "Genital Herpes Overview", component: <GenitalHerpes /> },
        { title: "Genital Herpes Symptoms", component: <GenitalHerpesSymptoms /> },
        { title: "Genital Herpes Symptoms in Men", component: <HerpesSymptomsMen /> },
        { title: "Genital Herpes Symptoms in Women", component: <HerpesSymptomsWomen /> },
        { title: "Genital Herpes Testing & Treatment", component: <GenitalHerpesTreatment /> },
        { title: "HSV-2 Symptoms", component: <HSV2Symptoms /> },
      ],
    },
    {
      id: 8,
      title: "Oral Herpes",
      subheadings: [
        { title: "Oral Herpes Overview", component: <OralHerpes /> },
        { title: "Oral Herpes Symptoms", component: <OralHerpesSymptoms /> },
        { title: "Oral Herpes Testing & Treatment", component: <OralHerpesTreatment /> },
        { title: "HSV-1 Symptoms", component: <HSV1Symptoms /> },
        { title: "Cold Sores Symptoms", component: <ColdSoresSymptoms /> },
      ],
    },
    {
      id: 9,
      title: "HIV",
      subheadings: [
        { title: "HIV Overview", component: <HIV /> },
        { title: "HIV Symptoms", component: <HIVSymptoms /> },
        { title: "HIV Symptoms in Men", component: <HIVSymptomsMen /> },
        { title: "HIV Symptoms in Women", component: <HIVSymptomsWomen /> },
        { title: "AIDS Symptoms", component: <AIDSSymptoms /> },
        { title: "HIV Rash", component: <HIVRash /> },
        { title: "HIV Testing & Treatment", component: <HIVTreatment /> },
      ],
    },
    {
      id: 10,
      title: "Syphilis",
      subheadings: [
        { title: "Syphilis Overview", component: <Syphilis /> },
        { title: "Syphilis Symptoms", component: <SyphilisSymptoms /> },
        { title: "Syphilis Testing & Treatment", component: <SyphilisTreatment /> },
        { title: "RPR Testing", component: <RPRTesting /> },
        { title: "Syphilis Rash", component: <SyphilisRash /> },
      ],
    },

  ];


  const SymptomsHeadings = [
    {
      id: 1,
      title: "STD Symptoms",
      subheadings: [
        { title: "Symptoms", component: <UnderstandingSTDs /> },
      ],
    },
    {
      id: 2,
      title: "Symptoms in Men",
      subheadings: [
        { title: "Overview", component: <Overview /> },
        { title: "Jock Itch STD", component: <JockItch /> },
        { title: "Painful Urination", component: <PainfulUrination /> },
        { title: "Penis Bumps", component: <Penis_Bumps /> },
        { title: "Penile Discharge", component: <Penile_Discharge /> },
        { title: "Penis Rash", component: <Penis_Rash /> },
        { title: "Spots on Penis", component: <PenisSpots /> },
        { title: "Pimple on Penis", component: <Penis_Pimples /> },
        { title: "Lump on Testicles", component: <BumpsOnTesticles /> },
        { title: "Testicle Pain", component: <TesticlePain /> },
        { title: "Testicle Swelling", component: <TesticleSwelling /> },
      ],
    },
    {
      id: 3,
      title: "Symptoms in Women",
      subheadings: [
        { title: "Overview", component: <FemaleSTD /> },
        { title: "Vaginal Bumps", component: <VaginalBumps /> },
        { title: "Vaginal Burning", component: <VaginalBurningAndPainfulUrination /> },
        { title: "Vaginal Discharge", component: <VaginalDischarge /> },
        { title: "Vaginal Itching", component: <VaginalItching /> },
        { title: "Vaginal Odor", component: <VaginalOdor /> },
      ],
    },


  ];


  const [openDropdown1, setOpenDropdown1] = useState(null);
  const [activeContent, setActiveContent] = useState(null);
  const [openDropdown2, setOpenDropdown2] = useState(null);


  const toggleDropdown1 = (id) => {
    setOpenDropdown1(openDropdown1 === id ? null : id);
  };

  const toggleDropdown2 = (id) => {
    setOpenDropdown2(openDropdown2 === id ? null : id);
  };



  const handleSubHeadingClick = (component) => {
    setActiveContent(component);
    if (window.innerWidth < 1373) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  

  const location = useLocation();

  return (
    <section id="Main">
      <div className="Grid">
        {/* Sidebar 1 */}
        <div className="both-sidebars">
          <div className="SideBar">
            <div className="sidebar">
              <div className="sidebar-header">STDs & Symptoms</div>
              {headings.map((heading) => (
                <div key={heading.id} className="Dropdown">
                  <div
                    className={`heading ${openDropdown1 === heading.id ? "active" : ""}`}
                    onClick={() => toggleDropdown1(heading.id)}
                  >
                    {heading.title}
                    <span className="arrow">
                      {heading.subheadings.length > 0 && (openDropdown1 === heading.id ? "▼" : "▶")}
                    </span>
                  </div>
                  {openDropdown1 === heading.id && heading.subheadings.length > 0 && (
                    <ul className="subheadings">
                      {heading.subheadings.map((subheading, index) => (
                        <li
                          key={index}
                          onClick={() => handleSubHeadingClick(subheading.component)}
                        >
                          {subheading.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
          <br/>
          {/* Sidebar 2 */}
          <div className="SideBar">
            <div className="sidebar">
              <div className="sidebar-header">STD Symptoms</div>
              {SymptomsHeadings.map((heading) => (
                <div key={heading.id} className="Dropdown">
                  <div
                    className={`heading ${openDropdown2 === heading.id ? "active" : ""}`}
                    onClick={() => toggleDropdown2(heading.id)}
                  >
                    {heading.title}
                    <span className="arrow">
                      {heading.subheadings.length > 0 && (openDropdown2 === heading.id ? "▼" : "▶")}
                    </span>
                  </div>
                  {openDropdown2 === heading.id && heading.subheadings.length > 0 && (
                    <ul className="subheadings">
                      {heading.subheadings.map((subheading, index) => (
                        <li
                          key={index}
                          onClick={() => handleSubHeadingClick(subheading.component)}
                        >
                          {subheading.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Display */}
        <div className="Article">
          {activeContent && <div className="content1">{activeContent}</div>}
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default Diseases;
