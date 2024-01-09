import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "antd";

const Page404: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h2 className="text-4xl font-bold text-red-600">404 - Page Not Found</h2>
      <p className="text-xl mt-2 text-gray-400">
        Sorry, this page doesn't exist.
      </p>
      <NavLink to="/" className="mt-5">
        <Button
          type="primary"
          danger
          className=" flex items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 text-lg font-semibold shadow-lg"
        >
          Go back to the Homepage
        </Button>
      </NavLink>
    </div>
  );
};

export default Page404;
