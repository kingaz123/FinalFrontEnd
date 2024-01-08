import React, { ReactNode } from "react";
import { DropdownProvider } from "./dropdown-context";

interface DropdownProps {
  children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ children, ...props }) => {
  return (
    <DropdownProvider {...props}>
      <div className="relative inline-block w-full">{children}</div>
    </DropdownProvider>
  );
};

export default Dropdown;

