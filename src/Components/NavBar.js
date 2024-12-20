import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const onDiseasesClick = () => {
    navigate("/diseases");
  };

  const onPriceClick = ()=>{
    navigate("/price-packages");
  }

  const onHomeClick = () =>
  {
    navigate("/");
  }

  return (
    <nav>
      <div id="NavBar">
        <ul>
          <li onClick={onHomeClick}>
            <img
              src="https://img.freepik.com/free-vector/flat-medical-symbol_23-2149496593.jpg"
              alt="404"
            />
            <a>Check4std</a>
          </li>
          <li>
            <a onClick={onHomeClick}>Home</a>
            <a>Find a Lab</a>
            <a>How it works</a>
            <a onClick={onPriceClick}>Price and Packages</a>
            <a onClick={onDiseasesClick}>STDs & Symptoms</a>
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
