import IconLock from "../../components/icon/IconLock";
import IconUser from "../../components/icon/IconUser";
import React from "react";
import { useController } from "react-hook-form";

interface InputProps {
  control: any;
  name?: string;
  type?: string;
  children?: React.ReactNode;
  kind?: string | null;
  className?: string;
  styles?: string;
}

const Input: React.FC<InputProps> = ({
  control,
  name = "",
  type = "text",
  children,
  kind = null,
  className = "",
  styles = "",
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div className="relative">
      <input
        {...field}
        {...props}
        type={type}
        id={name}
        name={name}
        className={`border border-gray-200 rounded w-full ${styles} ${
          children ? "p-4 pr-10" : "p-4"
        } ${kind === "icon" || kind === "lock" ? "p-4 px-10" : ""}`}
      ></input>
      {kind === "icon" ? (
        <IconUser className="absolute top-2/4 -translate-y-2/4 left-3 cursor-pointer text-gray-400"></IconUser>
      ) : kind === "lock" ? (
        <IconLock className="absolute top-2/4 -translate-y-2/4 left-3 cursor-pointer text-gray-400"></IconLock>
      ) : (
        ""
      )}
      {children && (
        <span
          className={`absolute right-6 top-2/4 -translate-y-2/4 cursor-pointer select-none ${className}`}
        >
          {children}
        </span>
      )}
    </div>
  );
};

export default Input;
