import React, { useEffect } from "react";
import AuthenticationPage from "./AuthenticationPage";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import { Field } from "../components/field";
import { Input } from "../components/input";
import { useForm } from "react-hook-form";
import { Button } from "../components/button";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../redux/auth/auth-slice";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user);
  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
  });

  const handleLogin = async (values: { email: string; password: string }) => {
    if (values.email === "" || values.password === "") return;
    try {
      dispatch(authLogin(values));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <AuthenticationPage>
      <div className="flex items-center justify-start gap-x-5 min-h-screen">
        <div className="hidden lg:block h-[600px] w-2/4">
          <img
            src="/public/img/login.png"
            alt="img-register"
            className="h-full object-cover"
          />
        </div>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex-1 flex flex-col items-center justify-center"
        >
          <h1 className="text-3xl font-bold text-black mb-10">LOGIN</h1>
          <Field>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email"
              kind="icon"
            ></Input>
          </Field>
          <Field>
            <InputPasswordToggle
              control={control}
              name="password"
              placeholder="Enter your password"
            />
          </Field>
          <div className="flex items-center justify-center gap-x-[100px]">
            <Button
              type="submit"
              className="bg-green-700 w-[350px] lg:!w-[500px] text-white"
            >
              Login
            </Button>
          </div>
          <div className="flex items-center justify-center gap-x-5 mt-5">
            <div className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center cursor-pointer">
              <i className="fa-brands fa-facebook-f" />
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center cursor-pointer">
              <i className="fa-brands fa-twitter"></i>
            </div>
          </div>
        </form>
      </div>
    </AuthenticationPage>
  );
};

export default LoginPage;
