import React, {useState, useEffect} from 'react'
import {Sidebar_Desktop, Sidebar_Mobile} from './';
import {Loader} from '../Pages'
import { useNavigate } from 'react-router-dom';

const Container = ({children}) => {

    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const Title = "Toolsbook"
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

            useEffect(() => {
                // if(!localStorage.getItem('token')){
                //     navigate('/login');
                // }
            }, [])

  return (
    <div className="min-h-screen bg-zinc-90 0">
        <Loader />
    {/* Mobile Header */}
    <Sidebar_Mobile
      isSidebarOpen={isSidebarOpen}
      onClick={toggleSidebar}
      Title={Title}
    />

    <div className="flex">
      {/* Sidebar */}
      <Sidebar_Desktop
          isSidebarOpen={isSidebarOpen}
          Title={Title}
      />

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8 overflow-hidden">
        {children}
        </div>
    </div>
</div>

  )
}

export default Container
