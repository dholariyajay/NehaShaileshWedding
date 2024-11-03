import React from 'react';
import { Heart, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-8 px-4 mt-auto">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <Heart className="w-6 h-6 text-primary" />
          <h3 className="text-xl md:text-2xl font-serif">Shailesh & Neha</h3>
        </div>
        <p className="text-gray-400 text-sm md:text-base">
          Looking forward to celebrating with you!
        </p>
        <div className="mt-4 flex justify-center items-center space-x-2">
          <Mail className="w-4 h-4" />
          <p className="text-xs md:text-sm">contact@shaileshandneha.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;