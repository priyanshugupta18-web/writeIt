import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ size = 70 }) => {
  return (
    <Link to="/" className="flex items-center gap-3">
      <svg
        width={size}
        height={size * (120 / 200)}
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="writeIt Logo"
      >
        <path
          d="M20 30 L62 92 L100 38 L138 92 L180 30"
          stroke="#38bdf8"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
};

export default Logo;