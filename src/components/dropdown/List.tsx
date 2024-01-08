import React from "react";
import { useDropdown } from "./dropdown-context";

const List: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div className="absolute z-50 top-full left-0 w-full bg-white shadow-sm">
          {children}
        </div>
      )}
    </>
  );
};

export default List;