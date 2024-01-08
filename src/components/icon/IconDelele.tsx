import React, { FC, MouseEventHandler } from "react";

interface IconDeleteProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const IconDelete: FC<IconDeleteProps> = ({
  className = "",
  onClick = () => {},
}) => {
  return (
    <div
      className={`flex items-center justify-center w-10 h-10 rounded bg-gray-900 text-white text-sm ${className}`}
      onClick={onClick}
    >
      <i className="fa-solid fa-trash"></i>
    </div>
  );
};

export default IconDelete;
