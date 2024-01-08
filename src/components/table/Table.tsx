import React, { ReactNode } from "react";

const Table = ({ children }: { children: ReactNode }) => {
  return (
    <div className="overflow-x-auto bg-white">
      <table>{children}</table>
    </div>
  );
};

export default Table;
