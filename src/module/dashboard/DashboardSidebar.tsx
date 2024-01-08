import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const DashboardSidebar: React.FC = () => {
  const navigate = useNavigate(); // This hook is used to navigate in React Router v6.

  const handleLogout = () => {
    // Clear the user's token and any other auth-related data from localStorage.
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");

    // Navigate to the login page after logging out.
    navigate("/login"); // Replace "/login" with your app's login route.
  };

  return (
    <div className="w-[150px] bg-green-800 flex flex-col justify-start flex-shrink-0">
      {/* ... other sidebar items ... */}
      <div className="text-center p-2 text-gray-200 hover:bg-green-700 transition-all cursor-pointer text-xl">
        <i className="fa-solid fa-bars"></i>
      </div>
      <div className="flex items-center gap-x-3 text-gray-200 p-3 cursor-pointer hover:bg-green-700 transition-all">
        <span>
          <i className="fa-solid fa-plus"></i>
        </span>
        <NavLink
          to="/createtask"
          className="hover:text-gray-100 transition-colors"
        >
          Create Task
        </NavLink>
      </div>
      <div className="flex items-center gap-x-3 text-gray-200 p-3 cursor-pointer hover:bg-green-700 transition-all">
        <span>
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
        <span className="hover:text-gray-100 transition-colors">Search</span>
      </div>
      {/* Logout button */}
      <div
        onClick={handleLogout}
        className="flex items-center gap-x-3 text-gray-200 p-3 cursor-pointer hover:bg-green-700 transition-all"
      >
        <span>
          <i className="fa-solid fa-right-from-bracket"></i>
        </span>
        <span className="hover:text-gray-100 transition-colors">Log Out</span>
      </div>
    </div>
  );
};

export default DashboardSidebar;
