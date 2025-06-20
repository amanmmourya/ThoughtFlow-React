import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Icons from lucide-react (or replace with SVGs if not using it)
import { Link } from 'react-router-dom';
import Profile from './profile';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);
    const navLinks = ["/", "/chatarea", "/entergroup", "/enterdark"]
    const navigate=useNavigate();
    const handleNavigation=(idx)=>{
        if(idx==0){
            navigate('/');
            return;
        }
        if(localStorage.getItem("user")){
            navigate(navLinks[idx]);
        }else{
            alert("Login to use the features");
        }
    }
    return (
        <>
            {/* Main Navbar */}
            <div className="bg-black border-b-1 text-white w-full shadow-md px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#bd34fe] to-blue-500 bg-clip-text text-transparent">
                    ThoughtFlow
                </div>

                {/* Desktop Navigation */}

                <ul className="hidden md:flex items-center gap-8 text-lg font-medium">
                    {['Home', 'Duo Chat', 'Group Chat', 'Dark Window'].map((item, idx) => (
                        <li onClick={()=>{handleNavigation(idx)}}
                            key={idx}
                            className="cursor-pointer hover:text-blue-400 transition duration-300"
                        >
                            {item}
                        </li>
                    ))}
                    <Link to={'/login'}
                    style={{display:localStorage.getItem("user")?'none':'block'}}
                    className="px-4 py-1 rounded-xl border-2 border-gray-600 text-white font-semibold text-lg hover:border-[#41d1ff] hover:text-[#41d1ff] transition duration-300">
                        Login
                    </Link>
                    <Link to={'/signup'}
                        className="px-4 py-2 rounded-lg text-white font-semibold transition duration-300 hover:scale-105"
                        style={{
                            display:localStorage.getItem("user")?'none':'block',
                            position: 'relative',
                            background: `
                                radial-gradient(141.42% 141.42% at 100% 0%, #ffffff66, #ffffff00),
                                radial-gradient(140.35% 140.35% at 100% 94.74%, #bd34fe, #bd34fe00),
                                radial-gradient(89.94% 89.94% at 18.42% 15.79%, #41d1ff, #41d1ff00)
                            `,
                            boxShadow: '0 1px #ffffffbf inset',
                        }}
                    >
                        Signup
                    </Link>
                </ul>

                {/* Profile and Hamburger (Mobile) */}
                <div

                    className="flex items-center gap-4">

                    <img
                        onClick={() => {
                            setIsProfile(true);
                        }}
                        src="https://static.vecteezy.com/system/resources/previews/005/544/708/non_2x/profile-icon-design-free-vector.jpg"
                        alt="profile"
                        className="w-10 h-10 rounded-full border-2 border-blue-500 shadow-md cursor-pointer"
                    />
                    <div className="md:hidden cursor-pointer" onClick={toggleSidebar}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </div>
                </div>
            </div>
            {isProfile ? <Profile setIsProfile={setIsProfile} isProfile={isProfile} /> : <div></div>}

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-black text-white p-6 z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-[#bd34fe] to-blue-500 bg-clip-text text-transparent">
                        ThoughtFlow
                    </h2>
                    <X size={24} className="cursor-pointer" onClick={toggleSidebar} />
                </div>
                <ul className="flex flex-col gap-6 text-lg">
                    {['Home', 'Duo Chat', 'Group Chat', 'Dark Window'].map((item, idx) => (
                        <li 
                            onClick={()=>{handleNavigation(idx);toggleSidebar()}}
                            key={idx}
                            className="cursor-pointer hover:text-blue-400 transition duration-300"
                        >
                            {item}
                        </li>
                    ))}
                    <Link to={'/login'}
                    style={{display:localStorage.getItem("user")?'none':'block',}}
                    onClick={toggleSidebar} className="px-1 py-1 text-center  rounded-xl border-2 border-gray-600 text-white font-semibold hover:border-[#41d1ff] hover:text-[#41d1ff] transition duration-300">
                        Login
                    </Link>
                    <Link to={'/signup'}
                        
                        onClick={toggleSidebar}
                        className="px-1 py-1 rounded-lg text-center text-white font-semibold transition duration-300 hover:scale-105"
                        style={{
                            display:localStorage.getItem("user")?'none':'block',
                            position: 'relative',
                            background: `
                                radial-gradient(141.42% 141.42% at 100% 0%, #ffffff66, #ffffff00),
                                radial-gradient(140.35% 140.35% at 100% 94.74%, #bd34fe, #bd34fe00),
                                radial-gradient(89.94% 89.94% at 18.42% 15.79%, #41d1ff, #41d1ff00)
                            `,
                            boxShadow: '0 1px #ffffffbf inset',
                        }}
                    >
                        Signup
                    </Link>
                </ul>
            </div>

            {/* Backdrop for Sidebar */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
};

export default Navbar;
