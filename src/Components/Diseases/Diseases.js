import React, { useState } from "react";
import "./Diseases.css";
import "./SideBar.css";
import Chlamydia from "./Chlamydia/Chlamydia";
import Gonorrhea from "./Gonorrhea";

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
  const [Chlamydiaa, setChlamydia] = useState(false);
  const [Gonorrheaa, setGonorrhea] = useState(false);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleSubHeadingClick = (heading) => {
    if (heading === "Chlamydia") {
      setChlamydia(true);
      setGonorrhea(false);
    } else if (heading === "Gonorrhea") {
      setGonorrhea(true);
      setChlamydia(false);
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
          {Chlamydiaa && <Chlamydia />}
          {Gonorrheaa && <Gonorrhea />}
        </div>
      </div>
    </section>
  );
}

export default Diseases;
