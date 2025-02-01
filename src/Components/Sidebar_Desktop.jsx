import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { navLinks } from '../store/ideas'
import { useRecoilValue } from 'recoil'
import { ListFilterPlus, Pin } from 'lucide-react'
import getData from '../Backend/getData'
import { CategoryModal, Modal, Modalv2 } from '../Components/index';


const Sidebar_Desktop = ({isSidebarOpen, Title}) => {
    const location = useLocation();
    // console.log(location.pathname)
    const navigate = useNavigate();
    // const {getCategories, getToolsByCategory } = getData();
    // const [category, setCategory] = useRecoilState(categories)

    const links = useRecoilValue(navLinks);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         const categories = await getCategories();
    //         console.log('Categories: ', categories); // To check what data you get
    //         setCategory(categories);
    //     };
    //     fetchCategories();
    // }, [])


    const LogOutMethod = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        alert("Logged Out!")
        navigate('/login');
    }


    const handleSubmit = (data) => {
        console.log('Form submitted:', data);
        setIsModalOpen(false);
    };

    const handleSubmit2 = (data) => {
        console.log('Form submitted:', data);
        setIsModalOpen(false);
    };

    const handleManualSubmit = (data) => {
        console.log('Form submitted:', data);
        setIsModalOpen2(false);
    };


  return (
    <>

                <Modalv2
                    isOpen={isModalOpen3}
                    onClose={() => setIsModalOpen3(false)}
                    onSubmit={handleSubmit2}
                />
                <Modal
                    isOpen={isModalOpen2}
                    onClose={() => setIsModalOpen2(false)}
                    onSubmit={handleManualSubmit}
                />

                <CategoryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSubmit}
                />

    <div className={`
        fixed lg:static inset-y-0 left-0 z-30
        transform ${isSidebarOpen ? 'translate-x-0 translate-y-1/3 p-3 rounded-t-3xl w-full' : 'w-full sm:w-64 sm:-translate-x-full sm:translate-y-0 translate-y-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-64 bg-zinc-950 border-r border-zinc-950
        overflow-y-auto lg:block min-h-screen h-screen
      `}>
        <div className={`p-4 transition duration-500 ease-in-out
            ${isSidebarOpen ? 'justify-start flex flex-col gap-3' : 'justify-between flex flex-col h-full'}`}>
            <div className='h-full w-full'>
                   <div className="hidden lg:block mb-6">
                        <div className='w-20 h-20 border-4 border-white text-3xl bg-green-800 mb-6 mt-4  flex justify-center items-center rounded-full text-white'>{localStorage.getItem('username') ?
                        localStorage.getItem('username').charAt(0).toUpperCase() : "U" }
                        </div>
                        <h1 className="text-zinc-200 text-xl mt-4 mx-2">Hello, {localStorage.getItem('username') ? localStorage.getItem('username') : "User"}</h1>
                    </div>

                    <nav className="space-y-1 mb-3">
                    {links && links.map(link => (
                        <Link key={link.name} to={link.path} className={`flex items-center px-3 py-2 rounded-lg hover:bg-zinc-800 transition duration-300 ${location.pathname.toLowerCase() == link.path.toLowerCase() ? "bg-zinc-900 text-zinc-200" : " text-zinc-400"}`}>
                        {link.name}
                    </Link>
                    ))}
                    </nav>

                    <p className='text-white text-xs px-5 flex justify-start gap-3 border-t-2 border-b-2 border-zinc-900 py-2 items-center font-mono'>📌 Operations</p>

                    <div className='mt-3 space-y-3'>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center px-3 py-2 rounded-lg hover:bg-yellow-900 bg-yellow-800 border-2 border-yellow-600 transition duration-300 text-yellow-100 hover:text-zinc-200 w-full gap-3 justify-between">
                        <p>Category</p>
                        <p>+</p>
                    </button>
            <button onClick={() => setIsModalOpen3(true)} className="flex items-center px-3 py-2 rounded-lg hover:bg-yellow-900 bg-yellow-800 border-2 border-yellow-600 transition duration-300 text-yellow-100 hover:text-zinc-200 w-full gap-3 justify-between">
                <p>URL</p>
                <p>+</p>
            </button>
            <button onClick={() => setIsModalOpen2(true)} className="flex items-center px-3 py-2 rounded-lg hover:bg-yellow-900 bg-yellow-800 border-2 border-yellow-600 transition duration-300 text-yellow-100 hover:text-zinc-200 w-full gap-3 justify-between">
                <p>Manual</p>
                <p>+</p>
            </button>

                    </div>
                    {/* {category && category.map(cat => (
                        <button key={cat.name} onClick={() => navigate(`/category/${cat.name}`)} className= {`flex w-full mt-2 pl-6 font-mono capitalize items-center px-3 py-2 rounded-lg hover:bg-zinc-800 transition duration-300 ${location.pathname.toLowerCase() == cat.name ? "bg-zinc-800 text-zinc-200" : " text-zinc-400"}`}>
                            {cat.name}
                        </button>
                    ))} */}
            </div>
            <div>
                    { localStorage.getItem('token') ?
<div className='gap-4 flex w-full flex-col mb-4 mt-5'>
<div className='flex items-center px-3 py-2 rounded-lg hover:bg-red-800 transition duration-300 bg-red-900 text-red-200 border-2 border-red-700 justify-between'>
    {/* <div className='w-6 h-6 text-xs bg-green-800 flex justify-center items-center rounded-full'>{localStorage.getItem('username').charAt(0).toUpperCase()}</div> */}
    <p>{(localStorage.getItem('username') || "User")}</p>
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
      </>
  )
}

export default Sidebar_Desktop
