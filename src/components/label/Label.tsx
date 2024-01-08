import React, { HTMLProps } from "react";

interface LabelProps extends HTMLProps<HTMLLabelElement> {
  htmlFor?: string;
}

const Label: React.FC<LabelProps> = ({ htmlFor = "", children, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      {...props}
      className="mb-2 font-medium text-sm cursor-pointer"
    >
      {children}
    </label>
  );
};

export default Label;


