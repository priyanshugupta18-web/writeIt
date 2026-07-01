import React, { forwardRef, useId } from "react";

const Input = forwardRef(
  (
    {
      type = "text",
      placeholder = "",
      label = "",
      className = "",
      ...props
    },
    ref,
  ) => {
    const id = useId();

    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-slate-300">
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          className={`
            w-full
            rounded-lg
            border
            border-slate-700
            bg-slate-900
            px-4
            py-3
            text-slate-100
            placeholder:text-slate-500
            outline-none
            transition-all
            duration-300
            focus:border-sky-500
            focus:ring-2
            focus:ring-sky-500/30
            ${className}
          `}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
