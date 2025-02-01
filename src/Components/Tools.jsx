import React, { useState } from 'react'
import { collection } from '../store/ideas'
import { useRecoilState } from 'recoil'
import { Modal } from './'
import deleteData from '../Backend/deleteData';
import { Link, CircleX, Trash } from 'lucide-react';

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
        <div className="bg-zinc-950/50 rounded-3xl">
             <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
      {img && img != "None" && <img src={img} className='object-cover rounded-3xl mb-4 w-full h-52' alt={title} />}
      {img==="None" && <div className='mb-4 h-52 w-full rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 p-5 text-white text-3xl' >{title} </div>}
      {!img && <div className='mb-4 h-52 w-full rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 p-5 text-white text-3xl' >{title} </div>}
      {/* {img && img != "None" && <img src={img} className='object-cover w-full rounded mb-3 md:hidden' alt={title} />} */}
      <div className='mt-3 flex gap-3'>
        <div className="flex items-center justify-between">
        {
                                icon != "" ? (
                                    <div className="w-12 h-12 rounded-full">
                                        <img src={icon} alt="icon" className='w-full h-full object-cover hidden rounded-full' onLoad={() => setLoaded(true)} />
                                        {
                                            loaded ? (
                                                <img src={icon} alt="icon" className='w-full h-full object-cover rounded-full' />
                                            ) : (<div className="text-xs bg-green-500/20 text-green-400 rounded-full w-full h-full flex justify-center items-center">
                                                {title.trim().charAt(0).toUpperCase()}
                                            </div>
                                            )
                                        }

                                    </div>
                                ) : (
                                    <div className="w-12 h-12 rounded-full ">
                                        <div className="text-2xl bg-green-500/20 text-green-400 px-2 py-1 rounded-full w-full h-full flex justify-center items-center">
                                                {title.trim().charAt(0).toUpperCase()}
                                            </div>
                                    </div>
                                )
                            }
        </div>
            <div className='w-full'>
            <div className="flex justify-between items-center mb-1 w-full">
                <div className="text-zinc-200 text-sm w-4/5 line-clamp-1">{title}</div>
            </div>
            <div className="flex items-center justify-between w-full">
                <div className="flex justify-center items-center gap-3">
                    <span className={`text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded`}>{category}</span>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs bg-green-500/20 text-green-400 w-6 h-6 flex justify-center items-center rounded"><Link size={12}/></a>
                </div>
                {
                    (
                        <div className="flex  gap-3">
                            <button onClick={async () => deleteTool(title, id)}  className="text-xs bg-red-500/20 text-red-400 w-6 h-6 flex justify-center items-center rounded"><Trash size={12} /></button>
                        </div>
                    )
                }
                {/* <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-zinc-600"></div>
                    <div className="w-6 h-6 rounded-full bg-zinc-700"></div>
                </div> */}
            </div>
            </div>
            </div>
        </div>
    )
}

export default Tools
