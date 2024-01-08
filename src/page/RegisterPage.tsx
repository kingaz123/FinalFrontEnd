import React from "react";
import AuthenticationPage from "./AuthenticationPage";
import { Field } from "../components/field";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { useForm } from "react-hook-form";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authRegister } from "../redux/auth/auth-slice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink } from "react-router-dom"; // Import NavLink for navigation

const RegisterPage: React.FC = () => {
  const schema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("This field is required"),
    password: yup
      .string()
      .required("This field is required")
      .min(8, "Password must be 8 characters"),
    phoneNumber: yup
      .string()
      .min(10, "Your number is invalid")
      .required("A phone number is required"),
    name: yup.string().required("This field is required").max(10),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("You need to confirm your password"),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (values: any) => {
    try {
      await dispatch(authRegister(values)).unwrap();
      reset();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthenticationPage heading="Sign Up">
      <div className="flex items-center justify-start gap-x-5">
        <div className="hidden lg:block h-[600px] w-2/4">
          <img
            src="/public/img/register.png"
            alt="img-register"
            className="w-full h-full rounded object-cover"
          />
        </div>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex-1 flex flex-col items-center justify-center"
        >
          <h1 className="text-3xl font-bold text-black my-10">Sign Up</h1>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email"
              error={errors}
            ></Input>
            {errors && (
              <span className="text-red-500 text-sm mt-3">
                {errors?.email?.message}
              </span>
            )}
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <InputPasswordToggle
              control={control}
              name="password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-red-500 text-sm mt-3">
                {errors.password.message}
              </span>
            )}
          </Field>
          <Field>
            <Label htmlFor="passwordConfirmation">Confirm Password</Label>
            <InputPasswordToggle
              control={control}
              name="passwordConfirmation"
              placeholder="Confirm your password"
            />
            {errors.passwordConfirmation && (
              <span className="text-red-500 text-sm mt-3">
                {errors.passwordConfirmation.message}
              </span>
            )}
          </Field>
          <Field>
            <Label htmlFor="phoneNumber">Phone number</Label>
            <Input
              control={control}
              name="phoneNumber"
              type="number"
              placeholder="Enter your phone"
            ></Input>
            {errors && (
              <span className="text-red-500 text-sm mt-3">
                {errors?.phoneNumber?.message}
              </span>
            )}
          </Field>
          <Field>
            <Label htmlFor="name">Enter your name</Label>
            <Input
              control={control}
              name="name"
              type="text"
              placeholder="Enter your name"
            ></Input>
            {errors && (
              <span className="text-red-500 text-sm mt-3">
                {errors?.name?.message}
              </span>
            )}
          </Field>
          <div className="flex flex-col items-center justify-center w-full">
            <Button
              type="submit"
              className="bg-purple-500 text-white w-full"
              isLoading={isSubmitting}
            >
              Register
            </Button>
            <p className="mt-4 text-gray-600">
              Already have an account?{" "}
              <NavLink to="/login" className="text-green-500 hover:underline">
                Login
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </AuthenticationPage>
  );
};

export default RegisterPage;
