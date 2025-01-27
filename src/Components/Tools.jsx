import React, { useState } from 'react'
import { collection } from '../store/ideas'
import { useRecoilState } from 'recoil'
import { Modal } from './'
import deleteData from '../Backend/deleteData';

const Tools = ({id, title="", img = "", description = "", icon = "", url="", category }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const {deleteTool} = deleteData()

    const handleSubmit = (data) => {
        console.log('Form submitted:', data);
        setIsModalOpen(false);
    };

    const onDelete = async () => {
        await deleteTool(title, id)
    }

    const [loaded, setLoaded] = useState(false)
    const [collections, setCollections] = useRecoilState(collection)

    return (
        <div className="bg-zinc-800 rounded-xl p-4">
             <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
      {/* {img && <img src={img} className='object-cover w-full rounded mb-3' alt={title} />} */}
      {img && img != "None" && <img src={img} className='object-cover w-full rounded mb-3 md:hidden' alt={title} />}
            <div className="flex justify-between items-center mb-3">
                <div className="text-zinc-200 text-sm mb-2 w-4/5 line-clamp-1">{title}</div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex justify-center items-center gap-3">
                    <span className={`text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded`}>{category}</span>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Source</a>
                </div>
                {
                    (
                        <div className="flex  gap-3">
                            <button onClick={async () => deleteTool(title, id)}  className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded">Delete</button>
                            {
                                icon != "" ? (
                                    <div className="w-6 h-6 rounded-full">
                                        <img src={icon} alt="icon" className='w-full h-full object-cover hidden rounded-full' onLoad={() => setLoaded(true)} />
                                        {
                                            loaded ? (
                                                <img src={icon} alt="icon" className='w-full h-full object-cover rounded-full' />
                                            ) : (<div className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full w-full h-full flex justify-center items-center">
                                                {title.trim().charAt(0).toUpperCase()}
                                            </div>
                                            )
                                        }

                                    </div>
                                ) : (
                                    <div className="w-6 h-6 rounded-full ">
                                        <div className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full w-full h-full flex justify-center items-center">
                                                {title.trim().charAt(0).toUpperCase()}
                                            </div>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
                {/* <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-zinc-600"></div>
                    <div className="w-6 h-6 rounded-full bg-zinc-700"></div>
                </div> */}
            </div>
        </div>
    )
}

export default Tools
