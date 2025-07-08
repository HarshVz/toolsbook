import { useParams } from "react-router-dom"
import { useDataFetching } from "../Hooks/useDataFetching";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";

const View = () => {
    const id = useParams().id;
    const [iconLoaded, setIconLoaded] = useState(false);
    const [toolData, setToolData] = useState(null);
    const { fetchData } = useDataFetching();

    useEffect(() => {
        const fetchTools = async () => {
            const data = await fetchData();
            // console.log('Fetched Tools: ', data.data.tools); // To check what data you get
            const tool = data.data.tools.find(tool => tool.id === id);
            setToolData(tool);
        };
        fetchTools();
    }, [])

    if (!toolData) {
        return <div className="text-white">Tool not found</div>;
    }
    const { name, description, image, category, url, keywords, icon } = toolData;
    return (
        <div className="min-h-screen text-neutral-100">

            <div className="max-w-3xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex">
                    <Link to="/" className="flex justify-start items-center gap-3 bg-neutral-900 rounded-full py-3 px-5 mb-8 cursor-pointer hover:bg-neutral-900/50 transition-all duration-300 hover:scale-95 border-transparent hover:border-neutral-400 border"><ArrowLeft/> Go Back</Link>
                </div>
                <div className="mb-12">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="mt-1">
                            <img
                                src={icon}
                                alt="favicon"
                                className={`w-full h-full max-w-32 max-h-32 lg:max-w-16 rounded-xl lg:max-h-16 object-cover transition-opacity duration-300 ${iconLoaded ? 'block' : 'hidden'}`}
                                onLoad={() => setIconLoaded(true)}
                            />
                            {!iconLoaded && (
                                <div className="bg-neutral-700/50 flex items-center justify-center text-neutral-400 text-xs font-semibold h-10 w-10 rounded-full">
                                    {name.trim().charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-medium text-neutral-50 mb-1">{name}</h1>
                            <span className="text-neutral-400 text-sm">{category}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-8">
                    {/* Image */}
                    <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
                        <img
                            src={image || "https://i.pinimg.com/736x/33/fb/c8/33fbc8abbbe8d323117eb52098a8ebae.jpg"}
                            alt={name}
                            className="w-full h-auto rounded-md"
                            onError={(e) => {
                                e.target.src = 'https://i.pinimg.com/736x/9a/04/5e/9a045e25fe8e6199b9b543cfc0a73613.jpg';
                            }}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-lg font-medium text-neutral-200 mb-3">Description</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            {description || 'No description available.'}
                        </p>
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                        {/* URL */}
                        <div className="flex items-center justify-between py-3 border-b border-neutral-700">
                            <span className="text-neutral-400">Website</span>
                            <Link to={url}
                                href={url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-200 hover:text-neutral-50 transition-colors flex items-center gap-1"
                            >
                                <p className="line-clamp-1">{new URL(url).hostname.replace("www.", "")} </p>
                                <ExternalLink className="w-3 h-3" />
                            </Link>
                        </div>

                        {/* Keywords */}
                        {keywords && typeof keywords == "string" && keywords.trim() && (
                            <div className="py-3">
                                <span className="text-neutral-400 block mb-2">Keywords</span>
                                <div className="flex flex-wrap gap-2">
                                    {keywords.split(',').map((keyword, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-neutral-800 text-neutral-300 rounded text-sm"
                                        >
                                            {keyword.trim()}
                                        </span>
                                    ))}

                                </div>
                            </div>
                        )}

                        {Array.isArray(keywords) && (
                            <div className="py-3">
                                <span className="text-neutral-400 block mb-2">Keywords</span>
                                <div className="flex flex-wrap gap-2">
                                    {keywords.map((keyword, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-neutral-800 text-neutral-300 rounded text-sm"
                                        >
                                            {keyword.trim()}
                                        </span>
                                    ))}

                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Button */}
                    <div className="pt-6">
                        <Link to={`url`}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-neutral-50 hover:bg-neutral-200 text-neutral-900 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            Visit Website
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default View
