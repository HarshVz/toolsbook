import React, { useState, useEffect } from "react";
import { Sidebar_Desktop, Sidebar_Mobile } from "./";
import { Loader } from "../Pages";
import { useNavigate } from "react-router-dom";

const Container = ({ children }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const Title = "Toolsbook";
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Please Login Again!");
      navigate("/login");
    }
  }, []);

  return (
    <div className="h-screen flex flex-col bg-zinc-950">
      <Loader />

      {/* Mobile Header */}
      <Sidebar_Mobile
        isSidebarOpen={isSidebarOpen}
        onClick={toggleSidebar}
        Title={Title}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar_Desktop isSidebarOpen={isSidebarOpen} Title={Title} />

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content - Scrollable */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto h-full" id="container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Container;
