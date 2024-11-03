import React from 'react';
import ResponsiveNav from './components/ResponsiveNav';
import Header from './components/Header';
import OurStory from './components/OurStory';
import EventDetails from './components/EventDetails';
import PreWeddingGallery from './components/PreWeddingGallery';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ResponsiveNav />
      
      <main>
        <div id="home">
          <Header />
        </div>
        {/* Add scroll-mt-16 to offset the fixed navbar height */}
        <section id="story" className="scroll-mt-16">
          <OurStory />
        </section>
        <section id="gallery" className="scroll-mt-16">
          <PreWeddingGallery />
        </section>
        <section id="details" className="scroll-mt-16">
          <EventDetails />
        </section>

        <Footer />
      </main>

    </div>
  );
}

export default App;