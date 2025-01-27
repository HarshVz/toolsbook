import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
import getData from '../Backend/getData'
import deleteData from '../Backend/deleteData';
import { Trash2,X, ListFilterPlus } from 'lucide-react';

import { Tools, SearchBar, CategoryModal } from '../Components';
import { collection, categories,filteredCollection, selectedCategory, filterByCat } from '../store/ideas';
import { useRecoilState, useRecoilValue } from 'recoil'
import {loading} from '../store/ideas'

const Category = () => {

    const [category, setCategory] = useRecoilState(categories)
        const [isModalOpen, setIsModalOpen] = useState(false);
    const filteredCollections = useRecoilValue(filteredCollection)
    const {getTools, getCategories } = getData();
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
            const categories = await getCategories();
            setCategory(categories);
            setSelectCategory(categories[0].name)
            console.log("filtredTools" ,filteredTools)
            setIsLoading(false)
        };
        fetchTools();
    }, []);

    const onClickHandler = async (name) => {
        setSelectCategory(name)
    }
  return (
    <>
            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />

    <div className='flex justify-between items-center mb-5'>
        <h1 className='text-white text-3xl h-full'>Categories </h1>
        <button onClick={() => setIsModalOpen(true)} className="text-xl transition duration-300 bg-green-500/20 text-green-200 h-10 w-10 rounded-full flex justify-center items-center"><ListFilterPlus size={24}/></button>
    </div>

    <SearchBar />

    <div className='w-full flex justify-start items-center gap-3 overflow-x-scroll' style={{
        width: '100%',
        overflow: 'auto',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
        boxShadow: '0 0 5px rgba(0,0,0,0.2)'
    }}>


    {category && category.map(cat => {
        return (
            <button key={cat.id} className={`px-5 h-10 w-auto  whitespace-nowrap text-white rounded-3xl border-2 border-zinc-700 transition hover:bg-zinc-800 duration-300 capitalize flex justify-end gap-3 items-center  ${selectCategory.toLowerCase() == cat.name.toLowerCase() ? "bg-zinc-800 pr-3" : "" } `}
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
                        key={tool.id}
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

export default Category
