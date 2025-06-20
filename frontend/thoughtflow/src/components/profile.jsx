import React, { useState } from 'react';
import { LogOut, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ setIsProfile,isProfile }) => {
    const navigate = useNavigate();
    const user=JSON.parse(localStorage.getItem("user"));
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (!isProfile) return null;

    return (
        <div className="fixed top-4 right-4 z-50">
            <div className="relative bg-gradient-to-br from-[#18181b]/80 to-[#1f1f25]/80 border border-gray-700 rounded-2xl p-4 shadow-lg backdrop-blur-md w-72 sm:w-64 text-white">
                
                {/* Close Button */}
                <button
                    onClick={() => setIsProfile(false)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-400 transition duration-200"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="mb-4 mt-2">
                    <h2 className="text-xl font-bold text-[#bd34fe]">{user?.fullName}</h2>
                    <p className="text-sm text-gray-400">{user?.username}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 mt-4 px-4 py-2 text-sm font-semibold text-white rounded-lg transition duration-300 hover:bg-[#bd34fe]/20 border border-gray-600 hover:border-[#bd34fe]"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
