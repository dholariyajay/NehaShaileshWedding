// RSVP.jsx
import React, { useState } from 'react';

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-md mx-auto text-center px-4">
        <h2 className="text-4xl font-serif mb-8 text-gray-800">RSVP</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Your Name/s"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border-b-2 border-gray-300 focus:border-gray-800 outline-none bg-transparent transition-colors"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 border-b-2 border-gray-300 focus:border-gray-800 outline-none bg-transparent transition-colors"
          />          
          <button 
            type="submit"
            className="w-full bg-transparent border-2 border-gray-800 text-gray-800 py-3 text-lg hover:bg-gray-800 hover:text-white transition-colors duration-300 mt-8"
          >
            Send RSVP
          </button>
        </form>
      </div>
    </section>
  );
};

export default RSVP;