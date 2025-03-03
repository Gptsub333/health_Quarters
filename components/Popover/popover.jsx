import React from "react";
import { useState } from "react";

const Popover = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          open,
          setOpen,
        })
      )}
    </div>
  );
};

const PopoverTrigger = ({ children, open, setOpen }) => {
  return React.cloneElement(children, {
    onClick: () => setOpen(!open),
  });
};

const PopoverContent = ({ children, className, open }) => {
  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute z-50 w-72 rounded-md border bg-popover p-4 shadow-md outline-none",
        className
      )}
    >
      {children}
    </div>
  );
};

module.exports = {
  Popover,
  PopoverTrigger,
  PopoverContent,
};
