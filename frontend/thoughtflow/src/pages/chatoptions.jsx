import React from 'react';
import {
    Palette,
    Search,
    Users,
    Moon,
    Plus,
    Shield,
    MessageCircle,
    Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Chatoptions = () => {
    const options = [
        {
            id: 1,
            title: "Choose your chat style",
            description: "Customize your chat appearance and theme",
            icon: <Palette className="w-6 h-6" />,
            action: () => console.log("Chat style clicked")
        },
        {
            id: 2,
            title: "Search users to chat",
            description: "Find and connect with other users",
            icon: <Search className="w-6 h-6" />,
            action: () => console.log("Search users clicked")
        },
        {
            id: 3,
            title: "Enter a Group",
            description: "Join existing group conversations",
            icon: <Users className="w-6 h-6" />,
            action: () => console.log("Enter group clicked")
        },
        {
            id: 4,
            title: "Enter dark window",
            description: "Access private and secure chat mode",
            icon: <Moon className="w-6 h-6" />,
            action: () => console.log("Dark window clicked")
        },
        {
            id: 5,
            title: "Create group",
            description: "Start a new group conversation",
            icon: <Plus className="w-6 h-6" />,
            action: () => console.log("Create group clicked")
        },
        {
            id: 6,
            title: "Create dark window",
            description: "Create a new private chat session",
            icon: <Shield className="w-6 h-6" />,
            action: () => console.log("Create dark window clicked")
        }
    ];
    const navigate = useNavigate();
    const handleClick = (id) => {
        const selectedOption = options.find(option => option.id === id);
        switch (id) {
            case 1:
                
                break;
            case 2:
                navigate('/searchusers');
                break;
            case 3:
                navigate('/entergroup')
                break;
            case 4:
                navigate('/enterdark')
                break;
            case 5:
                navigate('/creategroup')
                break;
            case 6:
                navigate('/createdark')
                break;
            default:
                console.log("Invalid option");
        }
    }
    return (
        <div className="min-h-screen bg-[#18181b] text-white p-6">
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-12">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#bd34fe] to-blue-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Chat Options</h1>
                    <p className="text-gray-400">Choose how you want to connect and communicate</p>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => { handleClick(option.id) }}
                            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-[#bd34fe]/50 hover:bg-gray-800/50 transition-all duration-300 cursor-pointer group transform hover:scale-105"
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                {/* Icon */}
                                <div className="w-12 h-12 bg-gradient-to-r from-[#bd34fe] to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    {option.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-white group-hover:text-[#bd34fe] transition-colors duration-300">
                                    {option.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {option.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-full px-6 py-3">
                        <Settings className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">Need more options? Check your</span>
                        <button className="text-[#bd34fe] hover:text-blue-400 font-medium transition-colors">
                            Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatoptions;