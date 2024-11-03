import React from 'react';
import { Calendar, MapPin, Music } from 'lucide-react';

const EventDetails = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-serif mb-16 text-gray-800 text-center">Join Us</h2>
        <div className="grid md:grid-cols-3 gap-12 px-4">
          <DetailCard
            icon={<Calendar className="w-8 h-8 text-gray-700" />}
            title="Ceremony"
            details={["Two o'clock in the afternoon", "November 17, 2024"]}
          />
          <DetailCard
            icon={<Music className="w-8 h-8 text-gray-700" />}
            title="The Party"
            details={["Eight-thirty in the evening", "Dance the night away!"]}
          />
          <DetailCard
            icon={<MapPin className="w-8 h-8 text-gray-700" />}
            title="Venue"
            details={["66 Weber St E", "Kitchener, Ontario"]}
          />          
        </div>
      </div>
    </section>
  );
};

const DetailCard = ({ icon, title, details, button, onClick }) => (
  <div className="text-center space-y-4">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-2xl font-serif text-gray-700">{title}</h3>
    {details.map((detail, i) => (
      <p key={i} className="text-gray-600">{detail}</p>
    ))}
    {button && (
      <button 
        onClick={onClick}
        className="mt-4 bg-transparent border-2 border-gray-800 text-gray-800 px-6 py-2 hover:bg-gray-800 hover:text-white transition-colors duration-300"
      >
        {button}
      </button>
    )}
  </div>
);

export default EventDetails;