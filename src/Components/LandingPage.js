import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Ribbon from "./Ribbon";

function LandingPage() {
  return (
    <>
      <NavBar />
      <Ribbon/>
      <Outlet />
    </>
  );
}

export default LandingPage;
