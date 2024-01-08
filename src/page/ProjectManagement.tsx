import DashboardContent from "../module/dashboard/DashboardContent";
import DashboardMain from "../module/dashboard/DashboardMain";
import DashboardSidebar from "../module/dashboard/DashboardSidebar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN } from "../utils/varSetting";

const ProjectManagement: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (!token) {
      navigate("/register");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" min-h-screen flex justify-start">
      <DashboardSidebar></DashboardSidebar>
      <DashboardMain></DashboardMain>
      <DashboardContent></DashboardContent>
    </div>
  );
};

export default ProjectManagement;
