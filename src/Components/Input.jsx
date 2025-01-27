import React, {useState} from 'react'
import {SearchBar} from './'

const Input = () => {

    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");

    const handleTaskInput = (value) => {
        setTask(value);
    }

    const handleDescriptionInput = (value) => {
        setDescription(value)
    }

    const handleBtnSubmit = async () => {
        console.log("Submitted")
        console.log(task, description)
        setTask("")
        setDescription("")
    }


  return (
    <div className="flex justify-start items-start p-10 gap-6">
    <div className='w-full flex flex-col justify-center items-center gap-5 mx-auto bg-transparent max-w-xl rounded-3xl'>

        <input
            type='text'
            placeholder='Enter The Tasks'
            className='border-2 border-sub bg-subAlt w-full px-6 py-4 rounded-full text-main'
            value = {task}
            onChange={(e) => handleTaskInput(e.target.value)}
        />

        <textarea
            type='text'
            placeholder='Enter Description'
            className='border-2 border-sub bg-subAlt w-full px-6 py-4 rounded-3xl text-main'
            value = {description}
            rows='20'
            onChange={(e) => handleDescriptionInput(e.target.value)}
        />

        <button type='submit'
            onClick={() => handleBtnSubmit()}
            className='border-sub bg-main px-6 py-4 rounded-full text-base2 w-full'
        >Submit</button>
    </div>
    <ul className="w-full flex flex-col justify-start items-center gap-3 text-base">
        <SearchBar/>
    </ul>
</div>

  )
}

export default Input
