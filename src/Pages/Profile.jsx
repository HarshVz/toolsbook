import React from 'react';
import { Download } from 'lucide-react';
import { LogOut } from 'lucide-react'

const Profile = () => {
  return (
    <div className="text-white p-4 h-full flex justify-center items-center pt-0">
      <div className="max-w-md mx-auto bg-zinc-900 rounded-lg p-6 w-full">
        {
            localStorage.getItem('username') && localStorage.getItem('email') && localStorage.getItem('name') &&
            (
                <div className="flex flex-col items-center">
                {/* Profile Picture */}
                 <div className="w-24 h-24 flex justify-center items-center text-white bg-green-700 text-4xl rounded-full mb-4 border-2 border-green-100">
                    {localStorage.getItem('username').charAt(0).toUpperCase()}
                    </div>

                 {/* Basic Info */}
                 <div className="w-full space-y-4">
                   <div>
                     <label className="block text-zinc-400 text-sm mb-1">Name</label>
                     <div className="text-white">{localStorage.getItem('name')}</div>
                   </div>

                   <div>
                     <label className="block text-zinc-400 text-sm mb-1">Username</label>
                     <div className="text-white">@{localStorage.getItem('username')}</div>
                   </div>

                   <div>
                     <label className="block text-zinc-400 text-sm mb-1">Email</label>
                     <div className="text-white">{localStorage.getItem('email')}</div>
                   </div>

                   {/* Export Data Button */}
                   {/* <button className="w-full mt-6 bg-zinc-700 hover:bg-zinc-600 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors">
                     <Download className="w-4 h-4 mr-2" />
                     Export Data
                   </button> */}
                               <div>
                                       { localStorage.getItem('token') ?
                   <div className='gap-4 flex w-full flex-col mb-4 mt-5'>
                   <div className='flex items-center px-3 py-2 rounded-lg hover:bg-red-800 transition duration-300 bg-red-900 text-red-200 border-2 border-red-700 justify-between'>
                       {/* <div className='w-6 h-6 text-xs bg-green-800 flex justify-center items-center rounded-full'>{localStorage.getItem('username').charAt(0).toUpperCase()}</div> */}
                       <p>Switch Account?</p>
                       <button onClick={() => LogOutMethod()}> <LogOut size={20} /> </button>
                   </div>
                                       {/* <button className='flex items-center px-3 py-2 rounded-lg hover:bg-red-800 transition duration-300 bg-red-900 text-red-200 border-2 border-red-700'
                                       onClick={() => LogOut()}>
                                           Logout
                                       </button> */}
                   </div>



                                       : <>
                                           <div className='flex items-center px-3 py-2 rounded-lg hover:bg-zinc-800 transition duration-300 bg-zinc-800 text-zinc-200'>
                                               Login  <LogOut size={24} />
                                           </div>
                                       </>}
                               </div>
                 </div>
               </div>
            )
        }
      </div>
    </div>
  );
};

export default Profile;
