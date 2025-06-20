import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, MessageCircle, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Calculate password strength
        if (name === 'password') {
            let strength = 0;
            if (value.length >= 8) strength++;
            if (/[A-Z]/.test(value)) strength++;
            if (/[a-z]/.test(value)) strength++;
            if (/\d/.test(value)) strength++;
            if (/[^A-Za-z0-9]/.test(value)) strength++;
            setPasswordStrength(strength);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreedToTerms) {
            alert('Please agree to the terms and conditions');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        setIsLoading(true);
        // Simulate signup process
        const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
        const response = await fetch(`${VITE_BACKEND_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if(response.ok) {
            const data = await response.json(); 
            console.log('Signup successful:', data);
            toast.success('Signup successful! Redirecting to login...');
            navigate('/login'); // Redirect to login page on success    
        } else {
            const errorData = await response.json();    
            console.error('Signup failed:', errorData);
            toast.error(`Signup failed: ${errorData.message || 'An error occurred'}`);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    const handleGoogleSignup = () => {
        // Google OAuth logic would go here
        console.log('Google signup clicked');
    };

    const getPasswordStrengthText = () => {
        switch (passwordStrength) {
            case 0:
            case 1: return { text: 'Weak', color: 'text-red-400' };
            case 2:
            case 3: return { text: 'Medium', color: 'text-yellow-400' };
            case 4:
            case 5: return { text: 'Strong', color: 'text-green-400' };
            default: return { text: '', color: '' };
        }
    };

    const getPasswordStrengthWidth = () => {
        return `${(passwordStrength / 5) * 100}%`;
    };

    return (
        <div className="min-h-screen bg-[#18181b] flex items-center justify-center p-4">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-32 h-32 bg-[#bd34fe]/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-32 right-20 w-24 h-24 bg-blue-500/20 rounded-full blur-lg animate-bounce"></div>
                <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-[#bd34fe]/15 rounded-full blur-md animate-ping"></div>
                <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-blue-500/10 rounded-full blur-lg animate-pulse"></div>
                <div className="absolute top-1/3 left-1/2 w-12 h-12 bg-[#bd34fe]/20 rounded-full blur-sm animate-bounce"></div>
            </div>

            {/* Signup Form */}
            <div className="relative z-10 w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-[#bd34fe] to-blue-500 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-2xl">
                        <MessageCircle className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-gray-400">Join us and start your journey today</p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
                    <div className="space-y-6">
                        {/* Full Name Field */}
                        <div className="space-y-2">
                            <label htmlFor="fullName" className="text-sm font-medium text-gray-300">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-gray-800/50 border border-gray-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-[#bd34fe] focus:outline-none focus:ring-2 focus:ring-[#bd34fe]/20 transition-all"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        {/* Username Field */}
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-sm font-medium text-gray-300">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-gray-800/50 border border-gray-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-[#bd34fe] focus:outline-none focus:ring-2 focus:ring-[#bd34fe]/20 transition-all"
                                    placeholder="Choose a username"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-300">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-gray-800/50 border border-gray-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-[#bd34fe] focus:outline-none focus:ring-2 focus:ring-[#bd34fe]/20 transition-all"
                                    placeholder="Enter your email address"
                                />
                            </div>
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-300">
                                Phone Number <span className="text-gray-500">(Optional)</span>
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-800/50 border border-gray-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-[#bd34fe] focus:outline-none focus:ring-2 focus:ring-[#bd34fe]/20 transition-all"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-gray-800/50 border border-gray-600 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:border-[#bd34fe] focus:outline-none focus:ring-2 focus:ring-[#bd34fe]/20 transition-all"
                                    placeholder="Create a strong password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-400">Password strength:</span>
                                        <span className={`text-xs font-medium ${getPasswordStrengthText().color}`}>
                                            {getPasswordStrengthText().text}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-[#bd34fe] to-blue-500 h-2 rounded-full transition-all duration-300"
                                            style={{ width: getPasswordStrengthWidth() }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-gray-800/50 border border-gray-600 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:border-[#bd34fe] focus:outline-none focus:ring-2 focus:ring-[#bd34fe]/20 transition-all"
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                <p className="text-red-400 text-xs">Passwords do not match</p>
                            )}
                            {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                <p className="text-green-400 text-xs flex items-center gap-1">
                                    <Check className="w-3 h-3" />
                                    Passwords match
                                </p>
                            )}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="space-y-4">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="w-5 h-5 text-[#bd34fe] bg-gray-800 border-gray-600 rounded focus:ring-[#bd34fe] focus:ring-2 mt-0.5"
                                />
                                <span className="text-sm text-gray-300 leading-relaxed">
                                    I agree to the{' '}
                                    <a href="#" className="text-[#bd34fe] hover:text-blue-400 transition-colors">
                                        Terms of Service
                                    </a>{' '}
                                    and{' '}
                                    <a href="#" className="text-[#bd34fe] hover:text-blue-400 transition-colors">
                                        Privacy Policy
                                    </a>
                                </span>
                            </label>
                        </div>

                        {/* Signup Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading || !agreedToTerms}
                            className="w-full bg-gradient-to-r from-[#bd34fe] to-blue-500 text-white font-semibold py-3 px-4 rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#bd34fe]/50 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                    Creating Account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </div>

                    

                    {/* Login Link */}
                    <p className="mt-6 text-center text-gray-400">
                        Already have an account?{' '}
                        <a href="/login" className="text-[#bd34fe] hover:text-blue-400 font-medium transition-colors">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;