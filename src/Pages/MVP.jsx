import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useDataFetching } from '../Hooks/useDataFetching'
import deleteData from '../Backend/deleteData'
import { X, RotateCcw } from 'lucide-react'
import ImageGallary from '../Components/ImageGallary'

import {
    Tools,
    SearchBar,
    CategoryModal,
    Modal,
    Modalv2
} from '../Components'
import {
    selectedCategory,
    filterByCat
} from '../store/ideas'
import { useRecoilState, useRecoilValue } from 'recoil'

const ITEMS_PER_PAGE = 10

const MVP = ({ page=true }) => {
    const {
        fetchData,
        refreshData,
        clearCache,
        getCacheInfo,
        isLoading,
        collections,
        categoryList
    } = useDataFetching()

    const [selectCategory, setSelectCategory] = useRecoilState(selectedCategory)
    const filteredTools = useRecoilValue(filterByCat)

    const [modals, setModals] = useState({ category: false, manual: false, v2: false })
    const [currentPage, setCurrentPage] = useState(1)

    const { deleteCategory } = deleteData()

    const totalPages = useMemo(() => Math.ceil(filteredTools.length / ITEMS_PER_PAGE), [filteredTools.length])
    const displayedTools = useMemo(() => filteredTools.slice(0, currentPage * ITEMS_PER_PAGE), [filteredTools, currentPage])
    const canLoadMore = useMemo(() => currentPage < totalPages, [currentPage, totalPages])

    const toggleModal = useCallback((modalType, isOpen = null) => {
        setModals(prev => ({
            ...prev,
            [modalType]: isOpen !== null ? isOpen : !prev[modalType]
        }))
    }, [])

    const handleModalSubmit = useCallback((modalType) => (data) => {
        console.log('Form submitted:', data)
        toggleModal(modalType, false)
    }, [toggleModal])

    const handleCategorySelect = useCallback((categoryName) => {
        setSelectCategory(categoryName)
        setCurrentPage(1)
    }, [setSelectCategory])

    const handleDeleteCategory = useCallback(async (name, id) => {
        if (!window.confirm(`Are you sure you want to delete "${name}" category?`)) return

        try {
            await deleteCategory(name, id)
            // `useDataFetching` updates categories, so you may want to call `fetchData` or update Recoil manually
            await refreshData()
            if (selectCategory.toLowerCase() === name.toLowerCase()) {
                setSelectCategory("all")
            }
        } catch (error) {
            console.error('Error deleting category:', error.message)
            alert('Failed to delete category')
        }
    }, [deleteCategory, selectCategory, setSelectCategory, refreshData])

    const handleLoadMore = useCallback(() => {
        if (canLoadMore) setCurrentPage(prev => prev + 1)
    }, [canLoadMore])

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [filteredTools.length])


    return (
        <>
            {/* Modals */}
            <Modalv2
                isOpen={modals.v2}
                onClose={() => toggleModal('v2', false)}
                onSubmit={handleModalSubmit('v2')}
            />
            <Modal
                isOpen={modals.manual}
                onClose={() => toggleModal('manual', false)}
                onSubmit={handleModalSubmit('manual')}
            />
            <CategoryModal
                isOpen={modals.category}
                onClose={() => toggleModal('category', false)}
                onSubmit={handleModalSubmit('category')}
            />

            {/* Header */}
            <div className='flex items-center justify-between w-full py-3 pb-8'>
                <h1 className='text-3xl font-bold tracking-tight text-white capitalize'>
                    {selectCategory || "All"} Space
                </h1>
                <button
                        className='flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors duration-200'
                        disabled={isLoading}
                                        onClick={() => {
                            clearCache()
                            refreshData()
                        }}>
                    <RotateCcw
                        size={20}
                        className={`text-neutral-400 hover:text-neutral-300 transition-colors duration-200 ${isLoading ? 'animate-spin' : ''}`}
                        disabled={isLoading}
                    />
                </button>
            </div>

            {/* Search Bar */}
            <SearchBar />

            {/* Category Filter */}
            <div className='flex items-center justify-start w-full gap-3 overflow-x-auto'
                style={{
                    scrollbarWidth: 'none',
                    WebkitOverflowScrolling: 'touch',
                    boxShadow: '0 0 5px rgba(0,0,0,0.2)'
                }}>
                <div className="flex flex-nowrap gap-2 bg-neutral-900/50 justify-center items-center rounded-full">
                    {/* All Button */}
                    <button
                        className={`
                            px-4 h-9 whitespace-nowrap rounded-full transition-all duration-200 ease-out
                            flex items-center gap-2 font-medium text-sm
                            ${selectCategory?.toLowerCase() === "all"
                                ? "bg-neutral-200 text-neutral-800 shadow-sm"
                                : "text-neutral-400 hover:bg-neutral-800/30 hover:text-neutral-300 hover:border-neutral-700/60"
                            }
                        `}
                        onClick={() => handleCategorySelect("all")}
                        disabled={isLoading}
                    >
                        All
                    </button>

                    {/* Category Buttons */}
                    {categoryList.map(cat => (
                        <div
                            key={cat.id}
                            className={`
                                px-4 h-9 whitespace-nowrap rounded-full transition-all duration-200 ease-out
                                flex items-center gap-2 font-medium text-sm group capitalize cursor-pointer
                                ${selectCategory?.toLowerCase() === cat.name.toLowerCase()
                                    ? "bg-neutral-200 text-neutral-800 border-neutral-700/60 shadow-sm pr-2"
                                    : "text-neutral-400 hover:bg-neutral-800/30 hover:text-neutral-300 "
                                }
                                ${isLoading ? 'opacity-50 pointer-events-none' : ''}
                            `}
                            onClick={() => handleCategorySelect(cat.name)}
                        >
                            {cat.name}

                            {/* Delete Button - only show for selected category */}
                            {selectCategory?.toLowerCase() === cat.name.toLowerCase() && (
                                <button
                                    className="
                                        flex items-center justify-center w-4 h-4 rounded-full
                                        bg-neutral-600 text-neutral-200
                                        hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400 hover:rotate-90
                                        transition-all duration-200 ease-out
                                    "
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleDeleteCategory(cat.name, cat.id)
                                    }}
                                    disabled={isLoading}
                                >
                                    <X size={10} strokeWidth={2} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Tools Grid */}
            <div className="mt-5 columns-1 md:columns-2 lg:columns-3 space-y-5 gap-6 transition duration-300">
                {displayedTools.length > 0 ? (
                    displayedTools.map((tool) => {
                        if (page) {
                            return (
                                <Tools
                                    key={tool.id}
                                    id={tool.id}
                                    title={tool.name}
                                    icon={tool.icon}
                                    category={tool.category}
                                    url={tool.url}
                                    img={tool.img || tool.image}
                                />
                            )
                        } else {
                            return(
                            <ImageGallary
                                key={`${tool.id}`} // Better key for uniqueness
                                id={tool.id}
                                title={tool.name}
                                icon={tool.icon}
                                category={tool.category}
                                url={tool.url}
                                img={tool.img || tool.image}
                            />
                            )
                        }
                    })
                ) : (
                    <div className="col-span-full px-2 py-4 w-full">
                        <h2 className="text-xl text-white">
                            {isLoading ? 'Loading...' : 'No Resources Found!'}
                        </h2>
                    </div>
                )}
            </div>

            {/* Load More Button */}
            {canLoadMore && displayedTools.length > 0 && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="
                            px-6 py-3 bg-neutral-800 text-white rounded-full
                            hover:scale-95 transition-all
                            hover:bg-neutral-700 duration-300
                            disabled:opacity-50 disabled:cursor-not-allowed
                        "
                    >
                        {isLoading ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )}
        </>
    )
}

export default MVP
