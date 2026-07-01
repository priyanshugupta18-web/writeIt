import React, { useId } from "react";

function Select(
  {
    label = "",
    className = "",
    options = [],
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-slate-300"
        >
          {label}
        </label>
      )}

      <select
        id={id}
        ref={ref}
        {...props}
        className={`
          w-full
          rounded-lg
          border
          border-slate-700
          bg-slate-900
          px-4
          py-3
          text-slate-100
          outline-none
          transition-all
          duration-300
          cursor-pointer
          focus:border-sky-500
          focus:ring-2
          focus:ring-sky-500/30
          ${className}
        `}
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-slate-900 text-slate-100"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);