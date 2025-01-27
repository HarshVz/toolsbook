import React, { useEffect, useState } from 'react';
import {Sidebar_Desktop, Sidebar_Mobile, SearchBar, Tools, Modal, Modalv2} from './index.js';
import { collection, filteredCollection } from '../store/ideas.jsx';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useData} from '../Hooks/useData.jsx'

const Board = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {getData} = useData();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const Title = "Toolsbook"
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [collections, setCollections] = useRecoilState(collection)
  const filteredCollections = useRecoilValue(filteredCollection)


  useEffect(() => {
    const fetchTools = async () => {
      const tools = await getData();
      console.log('Tools: ', tools); // To check what data you get
      setCollections(tools);
    };
    fetchTools();
  }, []);

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
    setIsModalOpen(false);
};

  return (
    <div className="min-h-screen bg-zinc-900">

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
        <div className="flex-1 p-4 lg:p-8">
                         <Modalv2
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSubmit}
                  />
          <div className="flex justify-between items-center mb-6">
                <h2 className="text-zinc-200 text-xl font-semibold">Tools</h2>
                <button onClick={() => setIsModalOpen(true)} className="text-xl hover:rotate-45 transition duration-300 bg-green-500/20 text-green-200 h-10 w-10 rounded-full">+</button>
            </div>
          <SearchBar />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
            filteredCollections && filteredCollections.map(tool => (
                            <Tools
                            key={tool.name}
                            title={tool.name}
                            tag={tool.tag}
                            icon={tool.icon}
                            category={tool.category}
                            // img={tool.img || ""}
                            />
            ))
        }
                        </div>

        </div>
      </div>
    </div>
  );
};

export default Board;
