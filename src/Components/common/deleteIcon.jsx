import React from "react";

const DeleteIcon = ({ size = 30, color = "#d51e1e" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 24 24"
      style={{ cursor: "pointer" }}
    >
      <g
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path
          strokeDasharray="20"
          strokeDashoffset="20"
          d="M3 21v-1c0 -2.21 1.79 -4 4 -4h4c2.21 0 4 1.79 4 4v1"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.2s"
            values="20;0"
          />
        </path>

        <path
          strokeDasharray="20"
          strokeDashoffset="20"
          d="M9 13c-1.66 0 -3 -1.34 -3 -3c0 -1.66 1.34 -3 3 -3c1.66 0 3 1.34 3 3c0 1.66 -1.34 3 -3 3Z"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.2s"
            dur="0.2s"
            values="20;0"
          />
        </path>

        <path
          strokeDasharray="10"
          strokeDashoffset="10"
          d="M15 3l6 6"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.5s"
            dur="0.2s"
            values="10;0"
          />
        </path>

        <path
          strokeDasharray="10"
          strokeDashoffset="10"
          d="M21 3l-6 6"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.7s"
            dur="0.2s"
            values="10;0"
          />
        </path>
      </g>
    </svg>
  );
};

export default DeleteIcon;
