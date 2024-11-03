import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import weddingImage from '../assets/images/preWedding/_SVG9173.jpg';  // Add this import

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <header className="relative h-screen flex items-center justify-center bg-cover bg-center overflow-hidden">
      <div className="absolute inset-0 bg-black/30" />
      <img 
        src={weddingImage}
        alt="Wedding couple" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className={`relative text-center text-white space-y-8 px-4 max-w-4xl transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="border-t border-b border-white/30 py-8 px-4">
          <h1 className="text-4xl md:text-7xl font-serif mb-4">Shailesh & Neha</h1>
          <div className="flex items-center justify-center space-x-3 text-xl">
            <span>November 17</span>
            <Heart className="w-4 h-4" />
            <span>2024</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;