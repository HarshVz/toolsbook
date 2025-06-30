import React, { useState } from 'react'
import { collection } from '../store/ideas'
import { useRecoilState } from 'recoil'
import { Modal } from './'
import deleteData from '../Backend/deleteData';
import { ExternalLink, Trash, Globe } from 'lucide-react';
import {motion} from "framer-motion"

const ImageGallary = ({id, title="", img = "", description = "", icon = "", url="", category }) => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const {deleteTool} = deleteData()
    const [imageLoaded, setImageLoaded] = useState(false);
    const [iconLoaded, setIconLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleSubmit = (data) => {
        console.log('Form submitted:', data);
        setIsModalOpen(false);
    };

    const onDelete = async () => {
        await deleteTool(title, id)
    }

    const [loaded, setLoaded] = useState(false)
    const [collections, setCollections] = useRecoilState(collection)

    // Extract domain from URL
    const getDomain = () => {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname.replace('www.', '');
        } catch {
            return 'Unknown';
        }
    };

    return (
        <motion.div

            className="group  overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-neutral-700/70 hover:bg-neutral-800/40 hover:shadow-lg hover:shadow-black/20"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />

            {/* Screenshot/Preview Section */}
            <div className="relative bg-gradient-to-br from-neutral-800/50 to-neutral-900/80 overflow-hidden">
                {img && img !== "None" ? (
                    <>
                        <img
                            src={img}
                            className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                            alt={title}
                            onLoad={() => setImageLoaded(true)}
                            loading="lazy"
                        />
                        {!imageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-neutral-600 border-t-neutral-400 rounded-full animate-spin"></div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center space-y-2">
                            <Globe className="w-6 h-6 text-neutral-500 mx-auto" />
                            <div className="text-neutral-400 text-xs font-medium">{getDomain()}</div>
                        </div>
                    </div>
                )}


            </div>
        </motion.div>
    )
}

export default ImageGallary
