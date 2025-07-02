import React, { useState } from 'react'
import { collection } from '../store/ideas'
import { useRecoilState } from 'recoil'
import { Modal } from './'
import deleteData from '../Backend/deleteData';
import { ExternalLink, Trash, Globe } from 'lucide-react';
import {motion} from "framer-motion"
import { Link } from 'react-router-dom';

const Tools = ({id, title="", img = "", description = "", icon = "", url="", category }) => {


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

            className="group bg-neutral-900/60 border border-neutral-800/50 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-neutral-700/70 hover:bg-neutral-800/40 hover:shadow-lg hover:shadow-black/20"
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
            <Link to={`/tools/${id}`} className="absolute inset-0 z-10 cursor-pointer w-full h-full">
                {/* Category Badge */}
                {category && (
                    <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-md backdrop-blur-sm">
                            {category}
                        </span>
                    </div>
                )}

                {/* Hover Overlay with Actions */}
                <div className={`absolute inset-0 backdrop-blur-[0.5px] flex items-center justify-center gap-2 transition-all duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    {/* <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white/90 hover:bg-white/20 hover:scale-110 transition-all duration-200"
                    >
                        <ExternalLink size={14} />
                    </a>
                    <button
                        onClick={onDelete}
                        className="flex items-center justify-center w-8 h-8 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 hover:scale-110 transition-all duration-200"
                    >
                        <Trash size={14} />
                    </button> */}
                </div>
                </Link>
            </div>

            {/* Content Section */}
            <div className="p-3 space-y-3">
                {/* Header with Favicon and Title */}
                <div className="flex items-start gap-3">
                    {/* Favicon */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg overflow-hidden bg-neutral-800/50">
                        {icon && icon !== "" ? (
                            <>
                                <img
                                    src={icon}
                                    alt="favicon"
                                    className={`w-full h-full object-cover transition-opacity duration-300 ${iconLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    onLoad={() => setIconLoaded(true)}
                                />
                                {!iconLoaded && (
                                    <div className="w-full h-full bg-neutral-700/50 flex items-center justify-center text-neutral-400 text-xs font-semibold">
                                        {title.trim().charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center text-neutral-300 text-sm font-semibold">
                                {title.trim().charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    {/* Title and Domain */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-neutral-200 text-sm font-medium leading-tight line-clamp-2 mb-1">
                            {title}
                        </h3>
                        <p className="text-neutral-500 text-xs font-mono">
                            {getDomain()}
                        </p>
                    </div>
                </div>

                {/* Description */}
                {description && description !== "None" && (
                    <p className="text-neutral-400 text-xs leading-relaxed line-clamp-2">
                        {description}
                    </p>
                )}

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md hover:bg-emerald-500/30 transition-colors duration-200"
                        >
                            <ExternalLink size={10} />
                            Visit
                        </a>
                    </div>

                    <button
                        onClick={onDelete}
                        className="inline-flex items-center justify-center w-6 h-6 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-all duration-200"
                    >
                        <Trash size={12} />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default Tools
