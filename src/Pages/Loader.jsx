import React, { useEffect, useState } from 'react';
import {loading, error} from '../store/ideas'
import { useRecoilState } from 'recoil';

const Loader = () => {

  const [isLoading, setIsLoading] = useRecoilState(loading);
  const [errorState, setErrorState] = useRecoilState(error);


  return (
    <div className={`absolute inset-0 flex items-center justify-center z-[1000] min-h-screen h-full bg-zinc-950/90 backdrop-blur-sm w-full ${isLoading ? "block" : "hidden"}`}>
      <div className="w-full max-w-md">


        {isLoading ? (
/* From Uiverse.io by Javierrocadev */
        <div className='flex justify-center items-center w-full h-full flex-col gap-3'>
            <div className="flex flex-row gap-2 w-full justify-center items-center transition duration-300 ease-in">
  <div className="w-4 h-4 rounded-full bg-yellow-600 animate-bounce"></div>
  <div className="w-4 h-4 rounded-full bg-yellow-600 animate-bounce [animation-delay:-.3s]"></div>
  <div className="w-4 h-4 rounded-full bg-yellow-600 animate-bounce [animation-delay:-.5s]"></div>
</div>
{
 (
              <div className={`flex w-full justify-center items-center text-center text-red-600 dark:text-red-300 px-6 font-mono transition-all duration-100 ease-in-out ${errorState ? "scale-100 translate-x-0" : "scale-0  translate-x-12"}`}>
                <div
    role="alert"
    className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105"
  >
    <svg
      stroke="currentColor"
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5 flex-shrink-0 mr-2 text-red-600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      ></path>
    </svg>
    <p className="text-xs font-semibold">Error - Something went wrong.</p>
  </div>
              </div>
            )
        }
        </div>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-300">
            Not Loading
          </div>
        )}
      </div>
    </div>
  );
};

export default Loader;
