import React, { useState } from 'react';
import { Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateDark = () => {
  const user=JSON.parse(localStorage.getItem("user"));
  const VITE_BACKEND_URL=import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  const navigate = useNavigate();
  const [groupIdentity, setGroupIdentity] = useState('');
  const [groupName, setGroupName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateGroup = async () => {
    if (groupIdentity.trim() === '') return;
    if(groupIdentity.length<6){
        toast.error('Minimum length allowed is 6');
        return;
    }
    
    setIsLoading(true);
    const response=await fetch(`${VITE_BACKEND_URL}/api/dark/createdark`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({darkName:groupName,darkIdentity:groupIdentity,createdBy:user.username})
    })
    const data=await response.json()
    if(!response.ok){
        toast.error(data.message || 'Failed to create Group');
    }else{
        toast.success('Dark Group created successfully');
        navigate('/enterdark');
    }
    
    setIsLoading(false)
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreateGroup();
    }
  };

  return (
    <div className="min-h-screen bg-[#18181b] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#bd34fe] to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Create a Dark Group</h1>
            <p className="text-gray-400 text-sm">Create group using dark identity</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Group Identity Input */}
            <div>
              <label htmlFor="groupIdentity" className="block text-sm font-medium text-gray-300 mb-2">
                Dark Group Name
              </label>
              <input
                id="groupName"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter group name..."
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-[#bd34fe] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="groupIdentity" className="block text-sm font-medium text-gray-300 mb-2">
                Dark Identity
              </label>
              <input
                id="groupIdentity"
                type="text"
                value={groupIdentity}
                onChange={(e) => setGroupIdentity(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter group's unique identity..."
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-[#bd34fe] focus:outline-none transition-colors"
              />
            </div>

            {/* Create Group Button */}
            <button
              onClick={handleCreateGroup}
              disabled={groupIdentity.trim() === '' || isLoading}
              className="w-full bg-gradient-to-r from-[#bd34fe] to-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Users className="w-4 h-4" />
                  Create Dark Group
                </>
              )}
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-gray-800 rounded-xl">
            <p className="text-xs text-gray-400 text-center">
              Press Enter to create dark group or click the button above
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDark;  