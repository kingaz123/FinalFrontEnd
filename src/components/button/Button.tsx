import React, { ReactNode } from "react";

interface ButtonProps {
  type?: string;
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  to?: string;
}

const Button = ({
  type = "button",
  children,
  className = "",
  isLoading = false,
  to = "/",
  ...rest
}: ButtonProps) => {
  let child = !!isLoading ? (
    <div className="w-8 h-8 rounded-full border-4 border-white border-t-4 border-t-transparent border-b-4 border-b-transparent animate-spin"></div>
  ) : (
    <>{children}</>
  );
  let defaultClassName =
    "p-4 text-base font-semibold rounded-md flex justify-center items-center h-[56px] w-[100px] lg:w-[150px]";
  return (
    <button
      {...rest}
      to={to}
      className={`${defaultClassName} ${className} ${
        !!isLoading ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {child}
    </button>
  );
};

export default Button;
