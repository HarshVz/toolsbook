import React, { useState } from 'react'
import {filteredCollection, searchValue, collection} from '../store/ideas'
import { useRecoilState, useRecoilValue } from 'recoil'

const SearchBar = ({isModalOpen, isModalOpen2}) => {
    const [search, setSearch] = useRecoilState(searchValue)
    const filteredCollections = useRecoilValue(filteredCollection)
    const [collections, setCollections] = useRecoilState(collection)

    const handleTaskInput = (value) => {
        setSearch(value)
        console.log(filteredCollections)
    }

  return (
    <div className={`w-full transition duration-300 ${isModalOpen ? "blur-md" : ""} ${isModalOpen2 ? "blur-md" : ""}`}>
        <div className='w-full flex justify-center flex-row items-center gap-3 mb-5'>
            <input
                type='text'
                placeholder='Search Collections ...'
                className='outline-none bg-zinc-800/50 text-gray-200 w-full px-6 py-4 rounded-xl text-main'
                value = {search}
                onChange={(e) => handleTaskInput(e.target.value)}
            />
            <button className='bg-main text-white py-2 px-4 rounded-md' onClick={() => setSearch("")}>Reset</button>
        </div>
    </div>
  )
}

export default SearchBar
