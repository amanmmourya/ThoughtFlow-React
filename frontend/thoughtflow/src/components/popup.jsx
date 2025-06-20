import React, { useState, useEffect } from 'react';

const DevelopmentPopup = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible]);

  if (!isVisible) return null;

  const progressWidth = ((10 - timeLeft) / 10) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-md transform animate-pulse">
        {/* Main popup container */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 p-0.5 shadow-2xl">
          <div className="rounded-2xl bg-[#18181b] p-8 text-center">
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>

            {/* Title */}
            <h2 className="mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-2xl font-bold text-transparent">
              Thank You for visiting Thoughtflow
            </h2>

            {/* Message */}
            <p className="mb-6 text-gray-300">
              This site's backend is deployed on render and it may take some seconds to come in active mode from sleep when you first visit. Kindly cooperate with us.
            </p>

            {/* Countdown */}
            <div className="mb-6 text-sm text-gray-400">
              This message will disappear in {timeLeft} seconds
            </div>

            {/* Progress bar container */}
            <div className="relative h-2 overflow-hidden rounded-full bg-gray-700">
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000 ease-linear"
                style={{ width: `${progressWidth}%` }}
              />
            </div>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 opacity-30 blur-lg" />
      </div>
    </div>
  );
};

export default DevelopmentPopup;