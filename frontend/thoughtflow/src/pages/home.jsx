import React from 'react';
import { MessageCircle, Users, EyeOff, ArrowRight, Sparkles, Shield, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from '../components/footer';
import DevelopmentPopup from '../components/popup';

const Homepage = () => {
    const navigate = useNavigate();
   
    return (
        <>
        <DevelopmentPopup/>
        <div className="min-h-screen bg-[#18181b] text-white">

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#bd34fe]/10 via-transparent to-[#41d1ff]/10"></div>
                <div className="absolute top-20 left-10 w-96 h-96 bg-[#bd34fe]/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#41d1ff]/20 rounded-full blur-3xl"></div>

                <div className="relative z-10 px-6 py-20 text-center max-w-6xl mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Sparkles className="w-6 h-6 text-[#bd34fe]" />
                        <span className="text-gray-400 text-lg">Where Conversations Come Alive</span>
                        <Sparkles className="w-6 h-6 text-[#41d1ff]" />
                    </div>

                    <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-[#bd34fe] via-blue-400 to-[#41d1ff] bg-clip-text text-transparent">
                            Connect Beyond
                        </span>
                        <br />
                        <span className="text-white">Boundaries</span>
                    </h1>

                    <p className="text-2xl text-gray-300 mb-4 font-medium">
                        "Bridging Minds, Building Communities, Breaking Barriers"
                    </p>

                    <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Experience the future of communication with ThoughtFlow. Whether you're seeking intimate conversations,
                        vibrant group discussions, or anonymous feedback sessions, we've created the perfect space for every type of interaction.
                    </p>

                    <div className="flex gap-6 justify-center">
                        <button
                            onClick={() => {
                                if (localStorage.getItem("user")) {
                                    navigate('/chatoptions');
                                } else {
                                    navigate('/login');
                                }
                            }}
                            className="px-8 py-4 rounded-xl text-white font-semibold text-lg transition duration-300 hover:scale-105 flex items-center gap-2"
                            style={{
                                background: `
                                    radial-gradient(141.42% 141.42% at 100% 0%, #ffffff66, #ffffff00),
                                    radial-gradient(140.35% 140.35% at 100% 94.74%, #bd34fe, #bd34fe00),
                                    radial-gradient(89.94% 89.94% at 18.42% 15.79%, #41d1ff, #41d1ff00)
                                `,
                                boxShadow: '0 2px #ffffffbf inset, 0 8px 32px rgba(189, 52, 254, 0.3)',
                            }}
                        >
                            Start Chatting <ArrowRight className="w-5 h-5" />
                        </button>

                        <button className="px-8 py-4 rounded-xl border-2 border-gray-600 text-white font-semibold text-lg hover:border-[#41d1ff] hover:text-[#41d1ff] transition duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="px-6 py-20 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-[#bd34fe] to-[#41d1ff] bg-clip-text text-transparent">
                            Three Ways to Connect
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Choose your perfect conversation style and dive into meaningful interactions
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Personal Chat */}
                    <div className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-[#bd34fe]/50 transition duration-500 hover:scale-105">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#bd34fe]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#bd34fe] to-[#bd34fe]/70 rounded-xl flex items-center justify-center mb-6">
                                <MessageCircle className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-[#bd34fe]">Personal Chat</h3>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                Engage in intimate one-on-one conversations with friends, family, or new connections.
                                Share your thoughts, dreams, and daily moments in a secure, private environment designed for meaningful dialogue.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Heart className="w-4 h-4" />
                                <span>End-to-end encrypted</span>
                            </div>
                        </div>
                    </div>

                    {/* Group Chat */}
                    <div className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-[#41d1ff]/50 transition duration-500 hover:scale-105">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#41d1ff]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#41d1ff] to-[#41d1ff]/70 rounded-xl flex items-center justify-center mb-6">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-[#41d1ff]">Group Chat</h3>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                Join vibrant communities and participate in dynamic group discussions.
                                Whether it's planning events, sharing interests, or building professional networks,
                                connect with multiple people who share your passions.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Users className="w-4 h-4" />
                                <span>Up to 500 members</span>
                            </div>
                        </div>
                    </div>

                    {/* Dark Window */}
                    <div className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-purple-400/50 transition duration-500 hover:scale-105">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-400 rounded-xl flex items-center justify-center mb-6">
                                <EyeOff className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-purple-400">Dark Window</h3>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                Enter our anonymous sanctuary for honest feedback and doubt-solving sessions.
                                Ask sensitive questions, share concerns, or seek advice without revealing your identity.
                                Perfect for getting genuine perspectives and constructive criticism.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Shield className="w-4 h-4" />
                                <span>Complete anonymity</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="px-6 py-16 bg-gradient-to-r from-gray-900/30 to-gray-800/30">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-[#bd34fe] to-[#41d1ff] bg-clip-text text-transparent mb-2">10K+</div>
                            <div className="text-gray-400">Active Users</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-[#bd34fe] to-[#41d1ff] bg-clip-text text-transparent mb-2">500K+</div>
                            <div className="text-gray-400">Messages Sent</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-[#bd34fe] to-[#41d1ff] bg-clip-text text-transparent mb-2">1K+</div>
                            <div className="text-gray-400">Active Groups</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-[#bd34fe] to-[#41d1ff] bg-clip-text text-transparent mb-2">99.9%</div>
                            <div className="text-gray-400">Uptime</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="px-6 py-20 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-5xl font-bold mb-6">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-xl text-gray-400 mb-8">
                        Join thousands of users who have already discovered the power of thoughtful communication
                    </p>
                    <button
                        onClick={() => {
                            if (localStorage.getItem("user")) {
                                navigate('/chatoptions');
                            } else {
                                navigate('/login');
                            }
                        }}
                        className="px-12 py-4 rounded-xl text-white font-bold text-xl transition duration-300 hover:scale-105"
                        style={{
                            background: `
                                radial-gradient(141.42% 141.42% at 100% 0%, #ffffff66, #ffffff00),
                                radial-gradient(140.35% 140.35% at 100% 94.74%, #bd34fe, #bd34fe00),
                                radial-gradient(89.94% 89.94% at 18.42% 15.79%, #41d1ff, #41d1ff00)
                            `,
                            boxShadow: '0 2px #ffffffbf inset, 0 12px 40px rgba(189, 52, 254, 0.4)',
                        }}
                    >
                        Get Started Free
                    </button>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default Homepage;