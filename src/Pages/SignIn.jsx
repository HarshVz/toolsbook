import React, { useEffect, useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { signin } from '../Backend/auth';
import {useNavigate, Link} from 'react-router-dom'
import {Loader} from './index'
import { useRecoilState } from 'recoil'
import {loading} from '../store/ideas'

export default function SignIn() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loadingState, setLoadingState] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('token')){
            navigate('/');
        }
    }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = async() => {
        try {
            setLoadingState(true);
            const response = await signin(username, password);
            // console.log("Signup: ", response);
            navigate('/');
            setLoadingState(false);
        } catch (error) {
            console.error(error);
            setLoadingState(false);
        }
    }

    if(username && password) {
        const response = login()
        if(response){
            setUsername('');
            setPassword('');
        }
    }
  };

  return (
    <>

{loadingState ? (
            <div className="Loading w-full h-full bg-zinc-900/90 fixed z- inset-0 rounded-md text-zinc-400 flex justify-center items-center"
            style={{zIndex: 1000}}>

            <div className="flex justify-center items-center flex-col">
            <div className='flex flex-row gap-2 mb-2'>
                <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
                <div
                className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"
                ></div>
                <div
                className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]"
                ></div>
            </div>
            <p className='capitalize px-5'>Validating The User!</p>
          </div>

          </div>
        ) : ""}


<div className="h-screen bg-zinc-900 grid md:grid-cols-2">

<div className='w-full justify-center items-center md:block hidden'>
    <img src="/images/login_6.webp" alt="Signup Illustration" className='h-screen w-full object-cover' />
</div>

<div className=" w-full bg-neutral-900 rounded-lg shadow-lg p-8 flex flex-col justify-center items-center">

        <h2 className="text-3xl font-bold text-zinc-100 text-center mb-8">Sign In</h2>
        <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-6">
          <div>
            <label className="block text-zinc-400 text-sm font-medium mb-2">Username {`(case sensitive*)`}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-5 w-5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-zinc-700 text-zinc-100 border border-zinc-600 rounded-lg py-2 px-10 focus:outline-none focus:border-zinc-500 -z-10"
                placeholder="Enter Username"
                style={{zIndex: -10}}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-zinc-400 text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-5 w-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-700 text-zinc-100 border border-zinc-600 rounded-lg py-2 px-10 focus:outline-none focus:border-zinc-500 -z-10"
                placeholder="Enter your password"
                style={{zIndex: -10}}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-zinc-600 hover:bg-zinc-500 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Sign In
          </button>
          <p className="text-center text-zinc-400 text-sm">
            Don't have an account?
            <Link to="/signup" className='text-green-400 underline px-1'>Signup </Link>
          </p>
        </form>
      </div>
    </div>
    </>
  );
}
