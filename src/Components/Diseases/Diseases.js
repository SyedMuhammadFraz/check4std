import React, { useState } from "react";
import "./Diseases.css";
import "./SideBar.css";
import Chlamydia from "./Chlamydia/Chlamydia";
import Gonorrhea from "./Gonorrhea/Gonorrhea";
import HepatitisA from "./Hepatitis A/Hepatitis A";
import HepatitisB from "./Hepatitis B/Hepatitis B";
import HepatitisC from "./Hepatitis C/Hepatitis C";
import GenitalHerpes from "./Genital Herpes/Genital Herpes";
import OralHerpes from "./Oral Herpes/Oral Herpes";
import HIV from "./HIV/HIV";
import Syphilis from "./Syphilis/Syphilis";

function Diseases() {
  const headings = [
    {
      id: 1,
      title: "STD Overview",
      subheadings: [],
    },
    {
      id: 2,
      title: "Chlamydia",
      subheadings: [
        "Chlamydia",
        "Chlamydia Symptoms",
        "Chlamydia Testing & Treatment",
      ],
    },
    {
      id: 3,
      title: "Gonorrhea",
      subheadings: [
        "Gonorrhea",
        "Gonorrhea Symptoms",
        "Gonorrhea Testing & Treatment",
      ],
    },
    {
      id: 4,
      title: "Hepatitis A",
      subheadings: [
        "Hepatitis A",
        "Hepatitis A Symptoms",
        "Hepatitis A Testing & Treatment",
      ],
    },
    {
      id: 5,
      title: "Hepatitis B",
      subheadings: [
        "Hepatitis B",
        "Hepatitis B Symptoms",
        "Hepatitis B Testing & Treatment",
      ],
    },
    {
      id: 6,
      title: "Hepatitis C",
      subheadings: [
        "Hepatitis C",
        "Hepatitis C Symptoms",
        "Hepatitis C Testing & Treatment",
      ],
    },
    {
      id: 7,
      title: "Genital Herpes",
      subheadings: [
        "Genital Herpes",
        "Genital Herpes Symptoms",
        "Genital Herpes Testing & Treatment",
      ],
    },
    {
      id: 8,
      title: "Oral Herpes",
      subheadings: [
        "Oral Herpes",
        "Oral Herpes Symptoms",
        "Oral Herpes Testing & Treatment",
      ],
    },
    {
      id: 9,
      title: "HIV",
      subheadings: [
        "HIV",
        "HIV Symptoms",
        "HIV Testing & Treatment",
      ],
    },
    {
      id: 10,
      title: "Syphilis",
      subheadings: [
        "Syphilis",
        "Syphilis Symptoms",
        "Syphilis Testing & Treatment",
      ],
    },
  ];

  const [openDropdown, setOpenDropdown] = useState(null);
  const [isChlamydiaActive, setIsChlamydiaActive] = useState(false);
  const [isGonorrheaActive, setIsGonorrheaActive] = useState(false);
  const [isHepatitisAActive, setIsHepatitisAActive] = useState(false);
  const [isHIVActive, setIsHIVActive] = useState(false);
  const [isHepatitisBActive, setIsHepatitisBActive] = useState(false);
  const [isHepatitisCActive, setIsHepatitisCActive] = useState(false);
  const [isGenitalHerpesActive, setIsGenitalHerpesActive] = useState(false);
  const [isOralHerpesActive, setIsOralHerpesActive] = useState(false);
  const [isSyphilisActive, setIsSyphilisActive] = useState(false);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleSubHeadingClick = (heading) => {
    if (heading === "Chlamydia") {
      setIsChlamydiaActive(true);
      setIsGonorrheaActive(false);
      setIsHepatitisAActive(false);
      setIsHepatitisBActive(false);
      setIsHepatitisCActive(false);
      setIsGenitalHerpesActive(false);
      setIsOralHerpesActive(false);
      setIsHIVActive(false);
      setIsSyphilisActive(false);

    } else if (heading === "Gonorrhea") {
      setIsChlamydiaActive(false);
      setIsGonorrheaActive(true);
      setIsHepatitisAActive(false);
      setIsHepatitisBActive(false);
      setIsHepatitisCActive(false);
      setIsGenitalHerpesActive(false);
      setIsOralHerpesActive(false);
      setIsHIVActive(false);
      setIsSyphilisActive(false);
    }
    else if (heading === "Hepatitis A") {
      setIsChlamydiaActive(false);
      setIsGonorrheaActive(false);
      setIsHepatitisAActive(true);
      setIsHepatitisBActive(false);
      setIsHepatitisCActive(false);
      setIsGenitalHerpesActive(false);
      setIsOralHerpesActive(false);
      setIsHIVActive(false);
      setIsSyphilisActive(false);
    }
    else if (heading === "Hepatitis B") {
      setIsChlamydiaActive(false);
      setIsGonorrheaActive(false);
      setIsHepatitisAActive(false);
      setIsHepatitisBActive(true);
      setIsHepatitisCActive(false);
      setIsGenitalHerpesActive(false);
      setIsOralHerpesActive(false);
      setIsHIVActive(false);
      setIsSyphilisActive(false);
    }
    else if (heading === "Hepatitis B") {
      setIsChlamydiaActive(false);
      setIsGonorrheaActive(false);
      setIsHepatitisAActive(false);
      setIsHepatitisBActive(true);
      setIsHepatitisCActive(false);
      setIsGenitalHerpesActive(false);
      setIsOralHerpesActive(false);
      setIsHIVActive(false);
      setIsSyphilisActive(false);
    }
    else if (heading === "Hepatitis C") {
      setIsChlamydiaActive(false);
      setIsGonorrheaActive(false);
      setIsHepatitisAActive(false);
      setIsHepatitisBActive(false);
      setIsHepatitisCActive(true);
      setIsGenitalHerpesActive(false);
      setIsOralHerpesActive(false);
      setIsHIVActive(false);
      setIsSyphilisActive(false);
    }
    else if (heading === "Genital Herpes") {
      setIsChlamydiaActive(false);
      setIsGonorrheaActive(false);
      setIsHepatitisAActive(false);
      setIsHepatitisBActive(false);
      setIsHepatitisCActive(false);
      setIsGenitalHerpesActive(true);
      setIsOralHerpesActive(false);
      setIsHIVActive(false);
      setIsSyphilisActive(false);
    }
    else if (heading === "Oral Herpes") {
      setIsChlamydiaActive(false);
      setIsGonorrheaActive(false);
      setIsHepatitisAActive(false);
      setIsHepatitisBActive(false);
      setIsHepatitisCActive(false);
      setIsGenitalHerpesActive(false);
      setIsOralHerpesActive(true);
      setIsHIVActive(false);
      setIsSyphilisActive(false);
    }
    else if (heading === "HIV") {
      setIsChlamydiaActive(false);
      setIsGonorrheaActive(false);
      setIsHepatitisAActive(false);
      setIsHepatitisBActive(false);
      setIsHepatitisCActive(false);
      setIsGenitalHerpesActive(false);
      setIsOralHerpesActive(false);
      setIsHIVActive(true);
      setIsSyphilisActive(false);
    }
    else if (heading === "Syphilis") {
      setIsChlamydiaActive(false);
      setIsGonorrheaActive(false);
      setIsHepatitisAActive(false);
      setIsHepatitisBActive(false);
      setIsHepatitisCActive(false);
      setIsGenitalHerpesActive(false);
      setIsOralHerpesActive(true);
      setIsHIVActive(false);
      setIsSyphilisActive(true);
    }
  };

  return (
    <section id="Main">
      <div className="Grid">
        <div className="SideBar">
          <div className="sidebar">
            <div className="sidebar-header">STDs & Symptoms</div>
            {headings.map((heading) => (
              <div key={heading.id} className="dropdown">
                <div
                  className={`heading ${
                    openDropdown === heading.id ? "active" : ""
                  }`}
                  onClick={() => toggleDropdown(heading.id)}
                >
                  {heading.title}
                  <span className="arrow">
                    {heading.subheadings.length > 0 &&
                      (openDropdown === heading.id ? "▼" : "▶")}
                  </span>
                </div>
                {openDropdown === heading.id &&
                  heading.subheadings.length > 0 && (
                    <ul className="subheadings">
                      {heading.subheadings.map((subheading, index) => (
                        <li
                          key={index}
                          onClick={() => handleSubHeadingClick(subheading)} // Fixed here
                        >
                          {subheading}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            ))}
          </div>
        </div>
        <div className="Article">
          {isChlamydiaActive && <Chlamydia />}
          {isGonorrheaActive && <Gonorrhea />}
          {isHepatitisAActive && <HepatitisA />}
          {isHepatitisBActive && <HepatitisB />}
          {isHepatitisCActive && <HepatitisC />}
          {isGenitalHerpesActive && <GenitalHerpes />}
          {isOralHerpesActive && <OralHerpes />}
          {isHIVActive && <HIV />}
          {isSyphilisActive && <Syphilis />}
        </div>
      </div>
    </section>
  );
}

export default Diseases;
