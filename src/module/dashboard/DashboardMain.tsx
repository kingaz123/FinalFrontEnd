import React from "react";
import { NavLink } from "react-router-dom";

const DashboardMain: React.FC = () => {
  return (
    <div className="w-[250px] bg-[#F4F5F7] h-full] backdrop-blur-lg h-screen flex flex-col items-center flex-shrink-0 shadow-xl">
      <div className="flex items-center justify-center gap-x-3 mt-5 mb-16 w-full">
        <NavLink
          to="/"
          className="hover:opacity-80 transition-opacity duration-200"
        >
          <img src="/img/Jira Light.png" alt="logo" className="w-14 h-14" />
        </NavLink>
        <div className="flex flex-col gap-y-1">
          <a
            className="text-lg font-bold text-black hover:text-gray-700"
            href="/"
            rel="noreferrer"
          >
            Jira Light
          </a>
          <span className="text-sm text-gray-600">Project Management</span>
        </div>
      </div>
      <div className="flex flex-col justify-start gap-y-1 w-full px-3">
        {/* Navigation items */}
        {/* Dashboard link */}
        <NavLink
          to="/dashboard"
          className="flex items-center gap-x-3 cursor-pointer p-3 rounded-md hover:bg-white/50 transition-colors duration-200"
        >
          <i className="fa-solid fa-credit-card text-gray-700"></i>
          <span className="text-gray-700 font-medium">Dashboard</span>
        </NavLink>
        {/* Project Management link */}
        <NavLink
          to="/"
          className="flex items-center gap-x-3 cursor-pointer p-3 rounded-md hover:bg-white/50 transition-colors duration-200"
        >
          <i className="fa-solid fa-gear text-gray-700"></i>
          <span className="font-semibold text-gray-800">
            Project Management
          </span>
        </NavLink>
        {/* Create Project link */}
        <NavLink
          to="/createproject"
          className="flex items-center gap-x-3 cursor-pointer p-3 rounded-md hover:bg-white/50 transition-colors duration-200 relative"
        >
          <i className="fa-solid fa-plus text-gray-700"></i>
          <span className="text-gray-700 font-medium">Create Project</span>
        </NavLink>
        {/* Separator for aesthetic purpose */}
        <hr className="border-t border-gray-200 my-4 w-full" />
        <div className="flex flex-col justify-start gap-y-1 w-full">
          {/* Additional navigational links */}
          <NavLink
            to="/releases"
            className="flex items-center gap-x-3 cursor-pointer p-3 rounded-md hover:bg-white/50 transition-colors duration-200"
          >
            <i className="fa-solid fa-truck text-gray-700"></i>
            <span className="text-gray-700 font-medium">Releases</span>
          </NavLink>
          <NavLink
            to="/issues"
            className="flex items-center gap-x-3 cursor-pointer p-3 rounded-md hover:bg-white/50 transition-colors duration-200"
          >
            <i className="fa-solid fa-bars-progress text-gray-700"></i>
            <span className="text-gray-700 font-medium">
              Issues and filters
            </span>
          </NavLink>
          <NavLink
            to="/pages"
            className="flex items-center gap-x-3 cursor-pointer p-3 rounded-md hover:bg-white/50 transition-colors duration-200"
          >
            <i className="fa-solid fa-file text-gray-700"></i>
            <span className="text-gray-700 font-medium">Pages</span>
          </NavLink>
          <NavLink
            to="/reports"
            className="flex items-center gap-x-3 cursor-pointer p-3 rounded-md hover:bg-white/50 transition-colors duration-200"
          >
            <i className="fa-solid fa-location-arrow text-gray-700"></i>
            <span className="text-gray-700 font-medium">Reports</span>
          </NavLink>
          <NavLink
            to="/components"
            className="flex items-center gap-x-3 cursor-pointer p-3 rounded-md hover:bg-white/50 transition-colors duration-200"
          >
            <i className="fa-solid fa-box text-gray-700"></i>
            <span className="text-gray-700 font-medium">Components</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
