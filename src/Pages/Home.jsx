import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
import getData from '../Backend/getData'
import deleteData from '../Backend/deleteData';
import { Trash2,X, ListFilterPlus, UserRoundPen } from 'lucide-react';

import { Tools, SearchBar, CategoryModal, Modal, Modalv2 } from '../Components';
import { collection, categories,filteredCollection, selectedCategory, filterByCat } from '../store/ideas';
import { useRecoilState, useRecoilValue } from 'recoil'
import {loading} from '../store/ideas'
import { Link } from 'react-router-dom';

const Home = () => {

    const [category, setCategory] = useRecoilState(categories)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {getTools, getCategories } = getData();
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [collections, setCollections] = useRecoilState(collection)
    const filteredTools = useRecoilValue(filterByCat)
    const {deleteCategory} = deleteData()
    const [selectCategory, setSelectCategory] = useRecoilState(selectedCategory)
    const [isLoading, setIsLoading] = useRecoilState(loading);

    const handleDeleteCategory = async (name, id) => {
        try {
            setIsLoading(true)
            await deleteCategory(name, id);
            console.log('Category deleted:', name);
            const updatedCategory = category.filter(category => category.name != name)
            setCategory(updatedCategory);
            setSelectCategory(category[0].name)
            setIsLoading(false)
        } catch (error) {
            console.error('Error deleting category:', error.message);
            alert('Failed to delete category');
            setIsLoading(false)
        }
    }

    const handleSubmit = (data) => {
        console.log('Form submitted:', data);
        setIsModalOpen(false);
    };

    console.log("filtredTools" ,filteredTools)
    useEffect(() => {
        const fetchTools = async () => {
            setIsLoading(true)
            const tools = await getTools();
            console.log('Tools: ', tools); // To check what data you get
            setCollections(tools);
            const categories = await getCategories()
            if(categories.length > 0) {
                setCategory(categories);
                setSelectCategory("all")
                // console.log("filtredTools" ,filteredTools)
            };
            setIsLoading(false)
        };
        fetchTools();

    }, []);

    const onClickHandler = async (name) => {
        setSelectCategory(name)
    }

    const handleSubmit2 = (data) => {
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
                isOpen={isModalOpen3}
                onClose={() => setIsModalOpen3(false)}
                onSubmit={handleSubmit2}
            />
            <Modal
                isOpen={isModalOpen2}
                onClose={() => setIsModalOpen2(false)}
                onSubmit={handleManualSubmit}
            />

            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />

    <div className='flex justify-between items-center mb-5 border-b border-b-zinc-600 sm:border-0 pb-3 sm:pb-0'>
            <h1 className='sm:block hidden text-white text-2xl h-full capitalize'>Hello {localStorage.getItem('username')
            ? localStorage.getItem('username')
            : "User"} 👋 </h1>
                        <h1 className='sm:hidden flex justify-center items-center gap-2 text-white text-lg h-full capitalize'>
                            <div className='w-6 h-6 text-xs bg-green-800 flex justify-center items-center rounded-full'>{localStorage.getItem('username')
            ? localStorage.getItem('username').charAt(0).toUpperCase()
            : ""}
        </div>
        {localStorage.getItem('username')
            ? localStorage.getItem('username')
            : "User"}
                        </h1>
        <div className='flex gap-3 text-white'>
         <Link to="/profile"> <UserRoundPen size={24} /> </Link>
        </div>
    </div>

    <SearchBar />

    <div className='w-full flex justify-start items-center gap-3 overflow-x-scroll' style={{
        width: '100%',
        overflow: 'auto',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
        boxShadow: '0 0 5px rgba(0,0,0,0.2)'
    }}>

<button className={`px-5 h-10 w-auto  whitespace-nowrap text-white rounded-3xl transition hover:bg-zinc-800 duration-300 capitalize flex justify-end gap-3 items-center border-2   ${selectCategory.toLowerCase() == "All".toLowerCase() ? "bg-zinc-800 text-zinc-200 border-zinc-700" : "text-zinc-500 border-zinc-950" } `}
            onClick={() => onClickHandler("all")}>
                All
                </button>

    {category && category.map(cat => {
        return (
            <button key={cat.id} className={`px-5 h-10 w-auto  whitespace-nowrap text-white rounded-3xl transition hover:bg-zinc-800 duration-300 capitalize flex justify-end gap-3 items-center  border-2  ${selectCategory.toLowerCase() == cat.name.toLowerCase() ? "bg-zinc-800 pr-3 text-zinc-200 border-zinc-700" : "text-zinc-500 border-zinc-950" } `}
            onClick={() => onClickHandler(cat.name)}>
                <h2>{cat.name} </h2>
                <button className={` flex justify-center transition-all duration-300 ease-linear items-center text-zinc-300 w-5 h-5 bg-zinc-900 border-2 border-zinc-600 rounded-full hover:rotate-90 hover:text-zinc-200 hover:bg-black
                    ${selectCategory.toLowerCase() == cat.name.toLowerCase() ? "visible" : "hidden" }
                    `}
                    onClick={() => handleDeleteCategory(cat.name, cat.id)}>
                    <X size={12}/></button>
            </button>
        )
    })
    }


    </div>

    <div className={`mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition duration-300`}>

        {
            filteredTools.length > 0 ?
            (
                filteredTools.map(tool => (
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
            ) : (
                <h2 className='text-white text-xl'>No Resource Found!</h2>
            )

        }

                {/* {
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
                } */}
            </div>

    {/* {tools && tools.map(tool => {
        return (
            <div key={tool.id} className='text-white'>
                <h2>{tool.name}</h2>
            </div>
        )
    })} */}
    </>
  )
}

export default Home
