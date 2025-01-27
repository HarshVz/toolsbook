import React, {useEffect} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { navLinks } from '../store/ideas'
import { useRecoilValue } from 'recoil'
import getData from '../Backend/getData'


const Sidebar_Desktop = ({isSidebarOpen, Title}) => {
    const location = useLocation();
    // console.log(location.pathname)
    const navigate = useNavigate();
    // const {getCategories, getToolsByCategory } = getData();
    // const [category, setCategory] = useRecoilState(categories)
    const links = useRecoilValue(navLinks);

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

  return (
    <div className={`
        fixed lg:static inset-y-0 left-0 z-30
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-64 bg-zinc-900 border-r border-zinc-800
        overflow-y-auto lg:block min-h-screen
      `}>
        <div className="flex flex-col p-4 justify-between h-full">
            <div className='h-full w-full'>
                   <div className="hidden lg:block mb-6">
                        <h1 className="text-zinc-200 text-xl font-semibold mb-6 mt-4 mx-2">{Title}</h1>
                    </div>

                    <nav className="space-y-1">
                    {links && links.map(link => (
                        <Link key={link.name} to={link.path} className={`flex items-center px-3 py-2 rounded-lg hover:bg-zinc-800 transition duration-300 ${location.pathname.toLowerCase() == link.path.toLowerCase() ? "bg-zinc-800 text-zinc-200" : " text-zinc-400"}`}>
                        {link.name}
                    </Link>
                    ))}
                    </nav>
                    {/* {category && category.map(cat => (
                        <button key={cat.name} onClick={() => navigate(`/category/${cat.name}`)} className= {`flex w-full mt-2 pl-6 font-mono capitalize items-center px-3 py-2 rounded-lg hover:bg-zinc-800 transition duration-300 ${location.pathname.toLowerCase() == cat.name ? "bg-zinc-800 text-zinc-200" : " text-zinc-400"}`}>
                            {cat.name}
                        </button>
                    ))} */}
            </div>
            <div>
                    { localStorage.getItem('token') ?
<div className='gap-4 flex w-full flex-col'>
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
  )
}

export default Sidebar_Desktop
