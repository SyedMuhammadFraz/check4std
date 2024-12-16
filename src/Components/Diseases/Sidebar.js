import React, { useState } from "react";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
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
        "Chlamydia",
        "Chlamydia Symptoms",
        "Chlamydia Testing & Treatment",
      ],
    },
    {
      id: 4,
      title: "Hepatitis A",
      subheadings: [
        "Chlamydia",
        "Chlamydia Symptoms",
        "Chlamydia Testing & Treatment",
      ],
    },
    {
      id: 5,
      title: "Hepatitis B",
      subheadings: [
        "Chlamydia",
        "Chlamydia Symptoms",
        "Chlamydia Testing & Treatment",
      ],
    },
    {
      id: 6,
      title: "Hepatitis C",
      subheadings: [
        "Chlamydia",
        "Chlamydia Symptoms",
        "Chlamydia Testing & Treatment",
      ],
    },
    {
      id: 7,
      title: "Genital Herpes",
      subheadings: [
        "Chlamydia",
        "Chlamydia Symptoms",
        "Chlamydia Testing & Treatment",
      ],
    },
    {
      id: 8,
      title: "Oral Herpes",
      subheadings: [
        "Chlamydia",
        "Chlamydia Symptoms",
        "Chlamydia Testing & Treatment",
      ],
    },
    {
      id: 9,
      title: "HIV",
      subheadings: [
        "Chlamydia",
        "Chlamydia Symptoms",
        "Chlamydia Testing & Treatment",
      ],
    },
    {
      id: 10,
      title: "Syphilis",
      subheadings: [
        "Chlamydia",
        "Chlamydia Symptoms",
        "Chlamydia Testing & Treatment",
      ],
    },
  ];

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleSubHeadingClick = (heading) => {
    // if (heading == "Chlamydia") {
    //   navigate("/diseases/chlamydia");
    // }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">STDs & Symptoms</div>
      {headings.map((heading) => (
        <div key={heading.id} className="dropdown">
          <div
            className={`heading ${openDropdown === heading.id ? "active" : ""}`}
            onClick={() => toggleDropdown(heading.id)}
          >
            {heading.title}
            <span className="arrow">
              {heading.subheadings.length > 0 &&
                (openDropdown === heading.id ? "▼" : "▶")}
            </span>
          </div>
          {openDropdown === heading.id && heading.subheadings.length > 0 && (
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
  );
};

export default Sidebar;
