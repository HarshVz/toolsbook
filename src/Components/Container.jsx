import React, { useState, useEffect } from "react";
import { Sidebar_Desktop, Sidebar_Mobile } from "./";
import { Loader } from "../Pages";
import { useNavigate } from "react-router-dom";
import {easeInOut, motion, stagger} from "framer-motion"

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

    // const containerVarients = {
    //     hidden: {
    //         opacity: 0,
    //         filter: "blur(4px)",
    //         y:20
    //     },
    //     show: {
    //         opacity: 1,
    //         filter: "blur(0px)",
    //         y: 0,
    //         transition: {
    //             ease: easeInOut,
    //             duration: 0.4,
    //             staggerChildren: 0.2,
    //         }
    //     }
    // }
        const containerVarients = {
        hidden: {
            opacity: 0,
            filter: "blur(4px)",
            y:20
        },
        show: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: {
                ease: easeInOut,
                duration: 0.4,
                staggerChildren: 0.2,
            }
        }
    }


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
        <motion.div
        variants={containerVarients}
        initial="hidden"
        animate="show"
        className="flex-1 p-4 lg:p-5 lg:px-6 overflow-y-auto h-full bg-zinc-950" id="container">
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default Container;
