import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Plus, Folder, Globe, BookOpen, Menu } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { navLinks } from '../store/ideas';
import { CategoryModal, Modal, Modalv2 } from '../Components/index';
import { useDataFetching } from '../Hooks/useDataFetching';

// Modal configuration for easier management
const MODALS = {
  CATEGORY: 'category',
  URL: 'url',
  MANUAL: 'manual',
};

// Button types with icons mapped for visual consistency
const ACTION_BUTTONS = [
  { name: 'Category', type: MODALS.CATEGORY, icon: Folder },
  { name: 'URL', type: MODALS.URL, icon: Globe },
  { name: 'Manual', type: MODALS.MANUAL, icon: BookOpen },
];

const Sidebar_Desktop = ({ isSidebarOpen, Title }) => {
    const {clearCache} = useDataFetching();
  const location = useLocation();
  const navigate = useNavigate();
  const links = useRecoilValue(navLinks);

  // Single state object for modal management
  const [activeModal, setActiveModal] = useState(null);

  const username = localStorage.getItem('username') || "User";
  const userInitial = username.charAt(0).toUpperCase();

  const openModal = (modalType) => setActiveModal(modalType);
  const closeModal = () => setActiveModal(null);

  const handleLogout = () => {
    ['token', 'username', 'email', 'name'].forEach(item =>
      localStorage.removeItem(item)
    );
    clearCache(); // Clear any cached data on logout

    // Use a toast notification instead of alert in future
    alert("Logged Out!");
    navigate('/login');
  };

  const handleModalSubmit = (data) => {
    console.log('Form submitted:', data);
    closeModal();
  };

  return (
    <>
      {/* Modals - only render when active */}
      {activeModal === MODALS.URL && (
        <Modalv2
          isOpen={true}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
        />
      )}

      {activeModal === MODALS.MANUAL && (
        <Modal
          isOpen={true}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
        />
      )}

      {activeModal === MODALS.CATEGORY && (
        <CategoryModal
          isOpen={true}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
        />
      )}

      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          transform ${isSidebarOpen
            ? 'translate-x-0 translate-y-1/3 p-3 rounded-t-3xl w-full'
            : 'w-full md:w-64 md:-translate-x-full md:translate-y-0 translate-y-full backdrop:blur-sm'
          }
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          w-64 bg-zinc-900/95 lg:bg-zinc-900/20 backdrop-filter backdrop-blur-lg
          overflow-y-auto lg:block min-h-screen h-screen
          shadow-xl
        `}
      >
        <div
          className={`
            p-6 transition duration-500 ease-in-out
            ${isSidebarOpen ? 'justify-start flex flex-col gap-3' : 'justify-between flex flex-col h-full'}
          `}
        >
          <div className='h-full w-full'>
            {/* User Profile Section */}
            <div className="hidden lg:flex lg:items-center lg:gap-3 mb-8">
              <div className='w-12 h-12 bg-green-800 flex justify-center items-center rounded-full text-white shadow-lg font-medium text-lg'>
                {userInitial}
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs">Welcome back</span>
                <h1 className="text-white font-medium">{username}</h1>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1 mb-8">
              {links && links.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`
                    flex items-center px-4 py-3 rounded-xl transition-all duration-300 border hover:border-neutral-700
                    ${location.pathname.toLowerCase() === link.path.toLowerCase()
                      ? "bg-neutral-800/50 border-neutral-900 text-white font-medium"
                      : "text-gray-400 hover:text-white hover:bg-zinc-800/40 border-transparent"}
                  `}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Operations Section */}
            <div className="mb-6">
              <p className='text-gray-400 text-xs mb-3 font-medium tracking-wider uppercase'>
                Operations
              </p>

              <div className='space-y-2'>
                {/* Action Buttons */}
                {ACTION_BUTTONS.map(button => {
                  const ButtonIcon = button.icon;
                  return (
                    <button
                      key={button.type}
                      onClick={() => openModal(button.type)}
                      className="flex items-center px-4 py-3 rounded-xl hover:bg-indigo-500/20 hover:text-white bg-zinc-800/30 transition-all duration-300 text-gray-300 w-full"
                    >
                      <ButtonIcon size={18} className="mr-3 opacity-70" />
                      <span>{button.name}</span>
                      <Plus size={16} className="ml-auto" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Section - Login/Logout */}
          <div>
            {localStorage.getItem('token') ? (
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 mt-auto rounded-xl
                  bg-gradient-to-r from-red-500/20 to-red-700/20
                  text-red-300 hover:text-white hover:bg-red-500/30
                  transition-all duration-300 group"
              >
                <span>{username}</span>
                <LogOut size={18} className="ml-auto group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center w-full px-4 py-3 rounded-xl
                  bg-gradient-to-r from-indigo-500/20 to-indigo-700/20
                  text-indigo-300 hover:text-white hover:bg-indigo-500/30
                  transition-all duration-300 group"
              >
                <span>Login</span>
                <LogOut size={18} className="ml-auto group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar_Desktop;
