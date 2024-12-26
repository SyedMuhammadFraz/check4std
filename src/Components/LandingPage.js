import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Ribbon from "./Ribbon";
import Footer from "./Footer";
import Nav from "./Nav";

function LandingPage() {
  return (
    <>
      <NavBar />
      {/* <Nav/> */}
      <Ribbon/>
      <Outlet />
      <Footer/>
    </>
  );
}

export default LandingPage;
