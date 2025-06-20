import React, { useState, useRef, useEffect, use } from 'react';
import { Send, Search, Plus, MessageCircle, User, Bot, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { set } from 'mongoose';
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const socket = io(VITE_BACKEND_URL);
const Chatarea = () => {

  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  const [chatWith, setChatWith] = useState(location.state?.chatWithUser?.name || ''); // Get chatWith from location state
  const [chatWithUser, setChatWithUser] = useState(location.state?.chatWithUser?.username || '');
  const chatWithUserRef = useRef(chatWithUser);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
  ]);
  const [recentChats, setRecentChats] = useState([
  ]);
  
  // Mobile sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  useEffect(() => {
    chatWithUserRef.current = chatWithUser;
  }, [chatWithUser]);
  useEffect(() => {
    const fetchMessages = async () => {
      const msg = await fetch(`${VITE_BACKEND_URL}/api/msg/getMessages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender: user.username || 'guest',
          receiver: chatWithUser || 'guest'
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
  }, [chatWithUser])
  useEffect(() => {
    socket.emit('register', user.username || 'guest');
    // setChatWith(location.state?.chatWithUser?.name || '')
    // setChatWithUser(location.state?.chatWithUser?.username || '');
    console.log('Location state:', location.state || 'No state provided');
    const fetchRecentChats = async () => {
      const response = await fetch(`${VITE_BACKEND_URL}/api/msg/getRecentChats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.username || 'guest' })
      });
      const recentChatsFromServer = await response.json();
      console.log('Recent chats:', recentChatsFromServer);
      recentChatsFromServer.map(chat => {
        const newRecentChat = {
          id: chat._id,
          username: chat.username,
          fullName: chat.fullName,
          title: chat.fullName || chat.username,
          lastMessage: chat.lastMessage,
          time: new Date(chat.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setRecentChats(prevChats => [...prevChats, newRecentChat]);
      });
    }
    fetchRecentChats();
    socket.on('messageReceived', (data) => {
      console.log('Message received:', data, "Printing curr chatwith user", chatWithUser);
      if (data.sender == chatWithUserRef.current) {
        console.log("inside set messages")
        setMessages(prevMessages => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            text: data.message,
            sender: data.sender,
            timestamp: new Date(data.timestamp)
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
  
  const handleRecentChatClick = (fullName, username) => {
    setChatWith(fullName)
    setChatWithUser(username)
    // Close mobile sidebar when chat is selected
    setIsMobileSidebarOpen(false)
    console.log("from the handler", username, chatWithUser)
  }
  
  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: user.username || 'guest',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    console.log(user.username);
    socket.emit('newMessageSent', {
      sender: user.username || 'guest',
      receiver: chatWithUserRef.current || 'guest',
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

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-screen bg-[#18181b] text-white">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div className={`
        w-80 bg-[#18181b] border-r border-gray-700 flex flex-col
        md:relative md:translate-x-0
        fixed left-0 top-0 h-full z-50 transition-transform duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:block
      `}>
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end p-4 border-b border-gray-700">
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-xl border border-gray-600 focus:border-[#bd34fe] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button onClick={() => { navigate('/chatoptions') }} className="w-full bg-gradient-to-r from-[#bd34fe] to-blue-500 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>

        {/* Recent Chats */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pb-2">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Recent Conversations</h3>
          </div>
          <div className="space-y-1 px-2">
            {recentChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => { handleRecentChatClick(chat.fullName, chat.username) }}
                className="p-3 mx-2 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#bd34fe] to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate">{chat.title}</h4>
                    <p className="text-xs text-gray-400 truncate mt-1">{chat.lastMessage}</p>
                    <span className="text-xs text-gray-500 mt-1">{chat.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#18181b] border-b border-gray-700 p-4">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-400" />
            </button>
            
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
                >
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

export default Chatarea;