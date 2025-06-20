import React, { useState, useRef, useEffect, } from 'react';
import { Send, Search, Plus, MessageCircle, User, Bot, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const socket = io(VITE_BACKEND_URL);
const Dark = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const location = useLocation();
    const [chatWith, setChatWith] = useState(location.state?.darkName || ''); // Get chatWith from location state
    const [chatWithUser, setChatWithUser] = useState(location.state?.darkIdentity || '');
    const chatWithUserRef = useRef(chatWithUser);
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
    ]);

    useEffect(() => {
        chatWithUserRef.current = chatWithUser;
    }, [chatWithUser]);
    useEffect(() => {
        const fetchMessages = async () => {
            const msg = await fetch(`${VITE_BACKEND_URL}/api/dark/getMessages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sender: user.username || 'guest',
                    darkIdentity: chatWithUserRef.current || 'guest'
                })
            });
            let data = await msg.json();
            console.log('Fetched messages:', data);
            const formattedMessages = data.map(msg => ({
                id: msg._id,
                text: msg.message,
                sender: msg.sender,
                timestamp: new Date(msg.time)
            }));
            setMessages(formattedMessages);

        }
        fetchMessages();
    }, [])
    useEffect(() => {
        socket.emit('registerDarkUser', user.username || 'guest');
        // setChatWith(location.state?.chatWithUser?.name || '')
        // setChatWithUser(location.state?.chatWithUser?.username || '');
        console.log('Location state:', location.state || 'No state provided');

        socket.on('receiveMessageForDark', (darkIdentity, message) => {
            if (darkIdentity == location.state.darkIdentity) {
                console.log("inside set messages")
                setMessages(prevMessages => [
                    ...prevMessages,
                    {
                        id: prevMessages.length + 1,
                        text: message,
                        timestamp: Date.now()
                    }
                ]);
            }
        });

    }, [])
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);



    const handleSendMessage = async () => {
        if (inputText.trim() === '') return;
        console.log("sent message from frontend is :", inputText)
        const newMessage = {
            id: messages.length + 1,
            text: inputText,
            sender: user.username || 'guest',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        console.log(user.username);
        socket.emit('newMessageSentForDark', {
            sender: user.username || 'guest',
            darkIdentity: chatWithUserRef.current || 'guest',
            message: inputText
        });
        setInputText('');

    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp); // ✅ convert to Date object
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="flex h-screen bg-[#18181b] text-white">





            {/* Right Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-[#18181b] border-b border-gray-700 p-4">
                    <div className="flex items-center gap-3">


                        <div className="w-10 h-10 bg-gradient-to-br from-[#bd34fe] to-blue-500 rounded-full flex items-center justify-center">
                            <Bot className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">{chatWith}</h2>
                            <p className="text-sm text-gray-400">Online</p>
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => {
                        const isSender = message.sender === user.username;
                        console.log(user.username, message.sender);
                        return (
                            <div
                                key={message.id}
                                className={`flex gap-3 ${isSender ? 'justify-end' : 'justify-start'}`}
                            >
                                {/* Avatar */}
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isSender
                                        ? 'bg-gray-700'
                                        : 'bg-gradient-to-br from-[#bd34fe] to-blue-500'
                                        }`}
                                >
                                    <User className="w-4 h-4" />
                                </div>

                                {/* Message Bubble */}
                                <div
                                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${isSender
                                        ? 'bg-gradient-to-r from-[#bd34fe] to-blue-500 text-white'
                                        : 'bg-gray-800 text-white'
                                        }`}
                                >   <p className='text-sm text-gray-300'>Someone from {location.state.darkName}</p>
                                    <p className="text-sm">{message.text}</p>
                                    <p className="text-xs opacity-70 mt-1">
                                        {formatTime(message.timestamp)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex gap-3 justify-start">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#bd34fe] to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-gray-800 px-4 py-3 rounded-2xl">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>


                {/* Input Area */}
                <div className="border-t border-gray-700 p-4">
                    <div className="flex gap-3 items-end">
                        <div className="flex-1 relative">
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="w-full bg-gray-800 text-white px-4 py-3 pr-12 rounded-xl border border-gray-600 focus:border-[#bd34fe] focus:outline-none resize-none transition-colors"
                                rows="1"
                                style={{ minHeight: '48px', maxHeight: '120px' }}
                            />
                        </div>
                        <button
                            onClick={handleSendMessage}
                            disabled={inputText.trim() === ''}
                            className="w-12 h-12 bg-gradient-to-r from-[#bd34fe] to-blue-500 text-white rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">Press Enter to send, Shift + Enter for new line</p>
                </div>
            </div>
        </div>
    );
};

export default Dark;