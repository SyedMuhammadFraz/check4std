import React from "react";
import "./NavBar.css";

function NavBar() {
  return (
    <nav>
      <div id="NavBar">
        <ul>
          <li>
            <img src="https://img.freepik.com/free-vector/flat-medical-symbol_23-2149496593.jpg" alt="404"/>
            <a href="#">Check4std</a>
          </li>
          <li>
            <a href="#">Home</a>
            <button className="button1">Sign In</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
