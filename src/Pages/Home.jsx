import React, { useEffect, useState } from 'react';
import { Sidebar_Desktop, Sidebar_Mobile, SearchBar, Tools, Modal, Modalv2 } from '../Components/';
import { collection, filteredCollection, categories } from '../store/ideas.jsx';
import { useRecoilState, useRecoilValue } from 'recoil';
import getData from '../Backend/getData.jsx';
import {loading, error} from '../store/ideas'


const Home = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const {getTools, getCategories } = getData();
    const [isLoading, setIsLoading] = useRecoilState(loading)
    const [collections, setCollections] = useRecoilState(collection)
    const filteredCollections = useRecoilValue(filteredCollection)
    const [errorState, setErrorState] = useRecoilState(error)
    const [category, setCategory] = useRecoilState(categories)


    useEffect(() => {
        const fetchTools = async () => {
            try {
                setIsLoading(true)
                const tools = await getTools();
                console.log('Tools: ', tools); // To check what data you get
                setCollections(tools);
                const categories = await getCategories();
                setCategory(categories);
                setIsLoading(false)
            } catch (error) {
                setErrorState(true)
            }
        };
        fetchTools();
    }, []);

    const handleSubmit = (data) => {
        console.log('Form submitted:', data);
        setIsModalOpen(false);
    };

    const handleManualSubmit = (data) => {
        console.log('Form submitted:', data);
        setIsModalOpen2(false);
    };

    return (
        <>
            <Modalv2
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />
            <Modal
                isOpen={isModalOpen2}
                onClose={() => setIsModalOpen2(false)}
                onSubmit={handleManualSubmit}
            />
            <div className={`flex border-b border-b-zinc-600 justify-between items-center pb-3 mb-4 sm:pb-0 sm:border-0 sm:mb-6 transition duration-300 ${isModalOpen ? "blur-md" : ""} ${isModalOpen2 ? "blur-md" : ""}`}>
                <h1 className='sm:block hidden text-white text-2xl h-full capitalize'>Hello {localStorage.getItem('username')} 👋 </h1>
                <h1 className='sm:hidden flex justify-center items-center gap-2 text-white text-lg h-full capitalize'>
                    <div className='w-6 h-6 text-xs bg-green-800 flex justify-center items-center rounded-full'>{localStorage.getItem('username').charAt(0).toUpperCase()}</div>
                    {localStorage.getItem('username')}
                </h1>
                <div className='flex justify-center items-center gap-3'>
                <button onClick={() => setIsModalOpen2(true)} className="text-xs transition duration-300 bg-green-500/20 text-green-200 sm:px-3 px-2 h-8 sm:h-10  rounded-xl">Manual</button>
                    <button onClick={() => setIsModalOpen(true)} className="text-xl hover:rotate-45 transition duration-300 bg-green-500/20 text-green-200 h-8 w-8 sm:h-10 sm:w-10  rounded-full">+</button>
                </div>
            </div>
            <SearchBar
                isModalOpen = {isModalOpen}
                isModalOpen2 = {isModalOpen2}
            />


            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition duration-300 ${isModalOpen ? "blur-md" : ""} ${isModalOpen2 ? "blur-md" : ""}`}>
                {
                    filteredCollections && filteredCollections.map(tool => (
                        <Tools
                            id={tool.id}
                            key={tool.name}
                            title={tool.name}
                            icon={tool.icon}
                            category={tool.category}
                            url = {tool.url}
                            img={tool.img || tool.image}
                        />
                    ))
                }
            </div>
        </>
    );
};

export default Home;
