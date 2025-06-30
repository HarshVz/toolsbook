import React, { useState } from 'react'
import { Search, X } from 'lucide-react'
import {filteredCollection, searchValue, collection} from '../store/ideas'
import { useRecoilState, useRecoilValue } from 'recoil'

const SearchBar = ({isModalOpen, isModalOpen2}) => {
    const [search, setSearch] = useRecoilState(searchValue)
    const filteredCollections = useRecoilValue(filteredCollection)
    const [collections, setCollections] = useRecoilState(collection)
    const [isFocused, setIsFocused] = useState(false)

    const handleTaskInput = (value) => {
        setSearch(value)
        console.log(filteredCollections)
    }

    const handleReset = () => {
        setSearch("")
    }

   return (
        <div className={`w-full transition-all duration-300 ${isModalOpen ? "blur-md" : ""} ${isModalOpen2 ? "blur-md" : ""}`}>
            <div className='w-full flex justify-center flex-row items-center gap-3 mb-4'>
                {/* Search Input Container */}
                <div className={`
                    relative w-full flex items-center
                    bg-neutral-900/60 border backdrop-blur-sm rounded-xl
                    transition-all duration-200 ease-out
                    ${isFocused
                        ? "border-neutral-600/60 bg-neutral-800/40 shadow-lg shadow-black/10"
                        : "border-neutral-800/50 hover:border-neutral-700/60 hover:bg-neutral-800/30"
                    }
                `}>
                    {/* Search Icon */}
                    <div className="absolute left-4 pointer-events-none">
                        <Search
                            size={18}
                            className={`transition-colors duration-200 ${
                                isFocused ? "text-neutral-400" : "text-neutral-500"
                            }`}
                        />
                    </div>

                    {/* Input Field */}
                    <input
                        type='text'
                        placeholder='Search bookmarks...'
                        className='
                            w-full pl-12 pr-12 py-4 bg-transparent text-neutral-200 placeholder-neutral-500
                            outline-none text-sm font-medium
                            transition-all duration-200
                        '
                        value={search}
                        onChange={(e) => handleTaskInput(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />

                    {/* Clear Button */}
                    {search && (
                        <button
                            onClick={handleReset}
                            className="
                                absolute right-4 p-1 rounded-full
                                text-neutral-500 hover:text-neutral-300 hover:bg-neutral-700/50
                                transition-all duration-200 ease-out
                                group
                            "
                        >
                            <X size={16} className="group-hover:rotate-90 transition-transform duration-200" />
                        </button>
                    )}
                </div>

                {/* Reset Button - Alternative Style */}
                {search && (
                    <button
                        className='
                            px-4 py-4 bg-neutral-800/60 hover:bg-neutral-700/60
                            border border-neutral-700/50 hover:border-neutral-600/60
                            text-neutral-300 hover:text-neutral-100 rounded-xl
                            transition-all duration-200 ease-out font-medium text-sm
                            backdrop-blur-sm hover:shadow-md hover:shadow-black/10
                        '
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                )}
            </div>

            {/* Search Results Counter */}
            {search && (
                <div className="text-center mb-4">
                    <p className="text-neutral-500 text-xs">
                        {filteredCollections.length} results found
                    </p>
                </div>
            )}
        </div>
   )
}

export default SearchBar
