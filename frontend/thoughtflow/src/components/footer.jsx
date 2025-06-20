import React from 'react';
import { Github, Twitter, Mail, Heart, Code, Shield, Users } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#bd34fe] to-blue-500 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold">Thoughtflow</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connect anonymously in secure dark groups. Your privacy is our priority.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Security</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">API</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Bug Reports</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Status</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#bd34fe]" />
              </div>
              <div>
                <h5 className="text-sm font-medium text-white">End-to-End Encrypted</h5>
                <p className="text-xs text-gray-400">Your messages are secure</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h5 className="text-sm font-medium text-white">Anonymous Groups</h5>
                <p className="text-xs text-gray-400">No personal data required</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                <Code className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h5 className="text-sm font-medium text-white">Open Source</h5>
                <p className="text-xs text-gray-400">Transparent and auditable</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>© 2025 Thoughtflow. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for privacy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;