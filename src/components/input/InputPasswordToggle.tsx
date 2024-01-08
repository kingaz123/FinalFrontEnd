import React, { useState } from "react";
import Input from "./Input";
import IconEyeOpen from "../../components/icon/iconEyeOpen";
import IconEyeClose from "../../components/icon/iconEyeClose";

interface InputPasswordToggleProps {
  control: any;
  name: string; // Add a name prop
}

const InputPasswordToggle: React.FC<InputPasswordToggleProps> = ({
  control,
  name, // Destructure name from props
}) => {
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  if (!control) return null;
  return (
    <Input
      name={name} // Use the name prop instead of hardcoding it
      type={togglePassword ? "text" : "password"}
      placeholder={
        name === "password" ? "Enter your password" : "Confirm your password"
      } // Set placeholder based on the field
      control={control}
    >
      {togglePassword ? (
        <IconEyeOpen onClick={() => setTogglePassword(false)} />
      ) : (
        <IconEyeClose onClick={() => setTogglePassword(true)} />
      )}
    </Input>
  );
};

export default InputPasswordToggle;
