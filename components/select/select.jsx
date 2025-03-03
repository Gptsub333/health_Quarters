import { useState } from "react";
import React from "react";
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Select = ({ children, onValueChange, defaultValue, value, ...props }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    value || defaultValue || ""
  );

  const handleSelect = (value) => {
    setSelectedValue(value);
    setOpen(false);
    if (onValueChange) onValueChange(value);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      >
        <span className={selectedValue ? "" : "text-muted-foreground"}>
          {selectedValue
            ? React.Children.toArray(children).find(
                (child) => child.props.value === selectedValue
              )?.props.children || "Select an option"
            : "Select an option"}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 opacity-50"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md">
          <div className="p-1">
            {React.Children.map(children, (child) =>
              React.cloneElement(child, {
                onSelect: () => handleSelect(child.props.value),
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
