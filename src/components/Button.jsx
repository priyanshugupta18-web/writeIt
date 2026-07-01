import React from "react";

// children is a prop provided which contains the value to be kept inside the opening and closing tags of the component
const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-5 py-2.5
        rounded-lg
        bg-sky-500
        text-white
        font-medium
        transition-all
        duration-300
        hover:bg-sky-600
        hover:-translate-y-0.5
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:translate-y-0
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;