import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const onDiseasesClick = () => {
    navigate("/diseases");
  };

  return (
    <nav>
      <div id="NavBar">
        <ul>
          <li>
            <img
              src="https://img.freepik.com/free-vector/flat-medical-symbol_23-2149496593.jpg"
              alt="404"
            />
            <a>Check4std</a>
          </li>
          <li>
            <a>How it works</a>
            <a onClick={onDiseasesClick}>Diseases & Symptoms</a>
            <a>Get Tested</a>
          </li>
          <li>
            <a>Sign In</a>
            <button className="button1">Sign Up</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
