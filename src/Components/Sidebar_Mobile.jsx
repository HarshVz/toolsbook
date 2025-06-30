import React from 'react'

const Sidebar_Mobile = ({isSidebarOpen, Title, onClick}) => {
  return (
    <button
    onClick={() => onClick()}
    className="lg:hidden fixed right-5 bottom-5 shadow-lg rounded-full aspect-square h-16 w-16 flex justify-center items-center border-2 border-zinc-700/50 bg-zinc-900 z-[1000]">
<div

          className="text-zinc-400 hover:text-zinc-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isSidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </div>
      </button>
  )
}

export default Sidebar_Mobile
