import React from "react";
const RadioGroupItem = ({ children, checked, onChange, id }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={id}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
      />
      {children}
    </div>
  );
};
export default RadioGroupItem;
