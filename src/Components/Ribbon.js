import React from "react";
import "./Ribbon.css";

function Ribbon() {
  return (
    <div className="ribbon">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512"><defs><linearGradient id="meteoconsLightningBoltFill0" x1="8.7" x2="80.9" y1="17.1" y2="142.1" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f7b23b"/><stop offset=".5" stop-color="#f7b23b"/><stop offset="1" stop-color="#f59e0b"/></linearGradient><symbol id="meteoconsLightningBoltFill1" viewBox="0 0 102.7 186.8"><path fill="url(#meteoconsLightningBoltFill0)" stroke="#f6a823" stroke-miterlimit="10" stroke-width="4" d="m34.8 2l-32 96h32l-16 80l80-112h-48l32-64h-48z"><animate id="meteoconsLightningBoltFill2" attributeName="opacity" begin="0s; x1.end+.67s" dur="1.33s" keyTimes="0; .38; .5; .63; .75; .86; .94; 1" values="1; 1; 0; 1; 0; 1; 0; 1"/></path></symbol></defs><use width="102.7" height="186.7" href="#meteoconsLightningBoltFill1" transform="translate(186.37 130)scale(1.36)"/></svg>
      Get lightning fast results in only &nbsp;<strong> 1-2 days</strong>
    </div>
  );
}

export default Ribbon;
