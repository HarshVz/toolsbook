import React, { useEffect, useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { signin } from '../Backend/auth';
import {useNavigate} from 'react-router-dom'

export default function SignIn() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

    useEffect(() => {
        if(localStorage.getItem('token')){
            navigate('/');
        }
    }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = async() => {
        try {
            const response = await signin(username, password);
            console.log("Signup: ", response);
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Failed to signup. Please try again.');
            return false
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
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-zinc-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-zinc-100 text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-zinc-400 text-sm font-medium mb-2">Username</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-5 w-5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-zinc-700 text-zinc-100 border border-zinc-600 rounded-lg py-2 px-10 focus:outline-none focus:border-zinc-500"
                placeholder="Enter Username"
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
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
