import React from "react";
import { useState } from "react";

const RadioGroup = ({ children, onValueChange, className }) => {
  const [value, setValue] = useState("");

  const handleChange = (newValue) => {
    setValue(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          checked: value === child.props.value,
          onChange: () => handleChange(child.props.value),
        })
      )}
    </div>
  );
};
export default RadioGroup;
