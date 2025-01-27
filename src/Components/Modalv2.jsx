import React from 'react';
import { X } from 'lucide-react';
import { collection, categories } from '../store/ideas';
import { useRecoilState } from 'recoil'
import createData from '../Backend/createData';
import {loading} from '../store/ideas'
import {Loader} from '../Pages'

const Modalv2 = ({ isOpen, onClose, onSubmit }) => {

    const [collections, setCollections] = useRecoilState(collection)
    const [category, setCategory] = useRecoilState(categories)
    const {createPost} = createData()
    const [isLoading, setIsLoading] = useRecoilState(loading);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const data = {
      title: formData.get('title'),
      url: formData.get('url'),
      category: formData.get('category'),
      description: "",
      keywords: formData.get('keywords').split(',').map(k => k.trim())
    };

    const response = await createPost(data);
    if (response) {
        console.log("Sucess");
    }
    setIsLoading(false);

    // setCollections([...collections, data]);
    // localStorage.setItem('tools', JSON.stringify([...collections, data]));
    // onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-800 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-200"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-zinc-100">Add New Item</h2>
        {isLoading ? (
            <div className="Loading w-full h-full bg-zinc-800 absolute inset-0 rounded-md text-zinc-400 flex justify-center items-center" >

            <div class="flex justify-center items-center flex-col">
            <div className='flex flex-row gap-2 mb-2'>
                <div class="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
                <div
                class="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"
                ></div>
                <div
                class="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]"
                ></div>
            </div>
            <p className='capitalize px-5'>Fetching the data!</p>
          </div>

          </div>
        ) : ""}
        <form onSubmit={handleSubmit} className="space-y-4 overflow-hidden">
        <div>
            <label htmlFor="keywords" className="block text-sm font-medium text-zinc-300 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder='Title (optional) for Youtube...'
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="iconUrl" className="block text-sm font-medium text-zinc-300 mb-1">
              URL
            </label>
            <input
              type="url"
              id="url"
              name="url"
              required
              placeholder='https://example.com'
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="tag" className="block text-sm font-medium text-zinc-300 mb-1">
              Category
            </label>
                <select id="category" name="category" required
                        className='w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize'>

                    {category.map((cat, index) => (
                        <option key={index} value={cat.name} className='capitalize'>{cat.name}</option>
                    ))}
                </select>
          </div>


          <div>
            <label htmlFor="keywords" className="block text-sm font-medium text-zinc-300 mb-1">
              Keywords (comma-separated)
            </label>
            <input
              type="text"
              id="keywords"
              name="keywords"
              required
              placeholder='e.g. javascript, react, node'
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modalv2;
