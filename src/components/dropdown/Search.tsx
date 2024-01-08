import React from "react";
import { useDropdown } from "./dropdown-context";

interface SearchProps {
  placeholder: string;
}

const Search: React.FC<SearchProps> = ({ placeholder, ...props }) => {
  const { onChange } = useDropdown();
  return (
    <div className="p-2">
      <input
        type="text"
        placeholder={placeholder}
        className="p-4 outline-none w-full border border-gray-200 rounded"
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Search;


