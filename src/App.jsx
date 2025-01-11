import React from 'react';
import Header from './components/Header';
import OurStory from './components/OurStory';
import EventDetails from './components/EventDetails';
import PreWeddingGallery from './components/PreWeddingGallery';
import Footer from './components/Footer';
//import EventsRoadmap from './components/EventsRoadmap';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <OurStory />
      <PreWeddingGallery />
      <EventDetails />
      <Footer />
    </div>
  );
}

export default App;