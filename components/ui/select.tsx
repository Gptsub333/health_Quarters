"use client";

import React, { useState, ReactNode, ReactElement } from "react";

// Define Props for Select
interface SelectProps {
  children: ReactNode;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  value?: string;
}

const Select: React.FC<SelectProps> = ({ children, onValueChange, defaultValue, value }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>(value || defaultValue || "");

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setOpen(false);
    if (onValueChange) onValueChange(value);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm bg-white"
      >
        <span className={selectedValue ? "" : "text-gray-500"}>
          {selectedValue
            ? React.Children.toArray(children)
                .filter((child): child is ReactElement => React.isValidElement(child))
                .find((child) => child.props.value === selectedValue)?.props.children || "Select an option"
            : "Select an option"}
        </span>
        <svg
          className="h-4 w-4 opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-md">
          <div className="p-1">
            {React.Children.map(children, (child) =>
              React.isValidElement(child)
                ? React.cloneElement(child as ReactElement, {
                    onClick: () => handleSelect(child.props.value),
                  })
                : null
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Define Props for SelectItem
interface SelectItemProps {
  value: string;
  children: ReactNode;
  onClick?: () => void;
}

export const SelectItem: React.FC<SelectItemProps> = ({ value, children, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer px-4 py-2 hover:bg-gray-200 rounded-md"
    data-value={value}
  >
    {children}
  </div>
);

export default Select;
