import React, { FC, MouseEventHandler } from "react";

interface IconEditProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const IconEdit: FC<IconEditProps> = ({
  className = "",
  onClick = () => {},
}) => {
  return (
    <div
      className={`flex items-center justify-center w-10 h-10 rounded bg-yellow-500 text-white text-sm ${className}`}
      onClick={onClick}
    >
      <i className="fa-solid fa-pen-to-square"></i>
    </div>
  );
};

export default IconEdit;
