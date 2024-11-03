import React, { useState, useRef, useEffect } from 'react';
import { Users, Heart, Coffee, Camera, PartyPopper, Cake, UtensilsCrossed, ChevronLeft, ChevronRight } from 'lucide-react';

const EventsRoadmap = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const events = [
    {
      time: "3:00 PM",
      title: "Seating",
      icon: <Users className="w-5 h-5" />
    },
    {
      time: "3:30 PM",
      title: "Squad Entrance",
      icon: <Users className="w-5 h-5" />
    },
    {
      time: "4:00 PM",
      title: "Ceremony",
      icon: <Heart className="w-5 h-5" />
    },
    {
      time: "5:00 PM",
      title: "Refreshments",
      icon: <Coffee className="w-5 h-5" />
    },
    {
      time: "5:30 PM",
      title: "Photos & Toast",
      icon: <Camera className="w-5 h-5" />
    },
    {
      time: "6:30 PM",
      title: "Dance",
      icon: <PartyPopper className="w-5 h-5" />
    },
    {
      time: "7:30 PM",
      title: "Games",
      icon: <PartyPopper className="w-5 h-5" />
    },
    {
      time: "8:00 PM",
      title: "Cake Cutting",
      icon: <Cake className="w-5 h-5" />
    },
    {
      time: "9:00 PM",
      title: "Dinner",
      icon: <UtensilsCrossed className="w-5 h-5" />
    }
  ];

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = direction === 'left' ? -300 : 300;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-16">
      {/* Navigation Buttons */}
      {canScrollLeft && (
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2
                     hover:bg-gray-50 transition-colors duration-300"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-gray-400" />
        </button>
      )}
      
      {canScrollRight && (
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2
                     hover:bg-gray-50 transition-colors duration-300"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </button>
      )}

      {/* Timeline Container */}
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-none"
        onScroll={checkScroll}
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
      >
        <div className="relative min-w-max">
          {/* Timeline Line */}
          <div className="absolute top-20 left-0 w-full h-px bg-gray-200" />
          
          {/* Events */}
          <div className="flex">
            {events.map((event, index) => (
              <div key={index} className="flex flex-col items-center px-8 relative">
                {/* Time */}
                <div className="text-sm text-primary mb-2">
                  {event.time}
                </div>
                
                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-full border border-primary bg-white flex items-center justify-center
                               mb-2 transition-all duration-300 hover:bg-primary hover:text-white group z-10">
                  {event.icon}
                </div>
                
                {/* Title */}
                <div className="text-sm text-gray-600 whitespace-nowrap">
                  {event.title}
                </div>
                
                {/* Connector Line */}
                {index < events.length - 1 && (
                  <div className="absolute top-20 left-[calc(50%+24px)] w-[calc(100%-48px)] h-px bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsRoadmap;