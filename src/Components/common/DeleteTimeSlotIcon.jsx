import React from "react";

const DeleteTimeSlotIcon = ({ onClick, disabled, title }) => (
  <svg
    onClick={disabled ? null : onClick}
    title={title}
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
    style={{ cursor: disabled ? "not-allowed" : "pointer" }}
  >
    <defs>
      <mask id="deleteMask">
        <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
          <path fill="#555555" d="M9 10v34h30V10z" />
          <path strokeLinecap="round" d="M20 20v13m8-13v13M4 10h40" />
          <path fill="#555555" d="m16 10l3.289-6h9.488L32 10z" />
        </g>
      </mask>
    </defs>
    <path fill="#e53835" d="M0 0h48v48H0z" mask="url(#deleteMask)" />
  </svg>
);

export default DeleteTimeSlotIcon;
