import React, { useState, useEffect } from 'react';
import { Lock, Mail, User } from 'lucide-react';
import { signup } from '../Backend/auth';
import {useNavigate, Link} from 'react-router-dom'
import {Loader} from '../Pages'

export default function SignUp() {

        useEffect(() => {
            if(localStorage.getItem('token')){
                navigate('/');
            }
        }, [])

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loadingState, setLoadingState] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    const register = async() => {
        try {
            setLoadingState(true);
            const response = await signup(name, username, email, password);
            console.log("Signup: ", response);
            navigate('/login');
            setLoadingState(false);
        } catch (error) {
            console.error(error);
            alert('Failed to signup. Please try again.');
            setLoadingState(false);
            return error
        }
    }

    if(name && username && email && password) {
        const response = register();
        if(response){
            setName('');
            setUsername('');
            setEmail('');
            setPassword('');
        }
    }
  };

  return (
    <>

{loadingState ? (
            <div className="Loading w-full h-full bg-zinc-800/90 fixed z- inset-0 rounded-md text-zinc-400 flex justify-center items-center"
            style={{zIndex: 1000}}>

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

    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-zinc-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-zinc-100 text-center mb-8">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label className="block text-zinc-400 text-sm font-medium mb-2">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-5 w-5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-700 text-zinc-100 border border-zinc-600 rounded-lg py-2 px-10 focus:outline-none focus:border-zinc-500"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-zinc-400 text-sm font-medium mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-5 w-5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-zinc-700 text-zinc-100 border border-zinc-600 rounded-lg py-2 px-10 focus:outline-none focus:border-zinc-500"
                placeholder="Enter Username..."
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-zinc-400 text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-5 w-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-700 text-zinc-100 border border-zinc-600 rounded-lg py-2 px-10 focus:outline-none focus:border-zinc-500"
                placeholder="Enter your email"
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
                className="w-full bg-zinc-700 text-zinc-100 border border-zinc-600 rounded-lg py-2 px-10 focus:outline-none focus:border-zinc-500"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-zinc-600 hover:bg-zinc-500 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Create Account
          </button>
          <p className="text-center text-zinc-400 text-sm">
            Don't have an account?
            <Link to="/login" className='text-blue-400 underline px-1'>Login </Link>
          </p>
        </form>
      </div>
    </div>

    </>
  );
}
