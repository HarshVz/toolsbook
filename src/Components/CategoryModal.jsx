import React from 'react';
import { X } from 'lucide-react';
import createData from '../Backend/createData';
import { categories } from '../store/ideas';
import { useRecoilState } from 'recoil'
import {loading} from '../store/ideas'


const CategoryModal = ({ isOpen, onClose, onSubmit }) => {

    const {addCategory} = createData()
    const [category, setCategory] = useRecoilState(categories)
    const [isLoading, setIsLoading] = useRecoilState(loading);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
    };
    onSubmit(data);
    setCategory([...category, data]);
    addCategory(data);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 w-full max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-200 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-medium mb-6 text-neutral-100">Add New Category</h2>

        {isLoading ? (
          <div className="absolute inset-0 bg-neutral-900 rounded-lg flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="flex gap-1 mb-3">
                <div className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:-.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:-.4s]"></div>
              </div>
              <p className="text-neutral-400 text-sm">Adding category</p>
            </div>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm text-neutral-300 mb-2">
              Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter category name"
              className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-neutral-50 hover:bg-neutral-200 text-neutral-900 font-medium py-2 px-4 rounded-md transition-colors"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
