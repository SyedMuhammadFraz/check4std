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

  const onSigninClick=()=>{
    navigate("/login");
  }

  const onSignupClick=()=>{
    navigate("/signup");
  }

  return (
    <nav>
      <div id="NavBar">
        <ul>
          <li onClick={onHomeClick}>
            <img
              src='client-new-logo.png'
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
            <a onClick={onSigninClick}>Sign In</a>
            <button className="button1">Sign Up</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
