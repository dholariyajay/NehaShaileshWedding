import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Grid, X, Heart, Camera } from 'lucide-react';

const PreWeddingGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullGalleryOpen, setIsFullGalleryOpen] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const importImages = async () => {
      try {
        const imageContext = require.context('../assets/images/preWedding', false, /\.(jpg|jpeg|png)$/);
        const imageList = imageContext.keys().map(key => ({
          src: imageContext(key),
          alt: `Pre-wedding photo ${key}`
        }));
        setImages(imageList);
      } catch (error) {
        console.error('Error loading images:', error);
        const fallbackImages = Array.from({ length: 12 }, (_, i) => ({
          src: `/api/placeholder/800/600`,
          alt: `Pre-wedding photo ${i + 1}`
        }));
        setImages(fallbackImages);
      }
    };

    importImages();
  }, []);

  useEffect(() => {
    let interval;
    if (autoplay && !isFullGalleryOpen && images.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [autoplay, images.length, isFullGalleryOpen]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setAutoplay(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setAutoplay(false);
  };

  // Handle modal close with preventing event propagation
  const handleModalClose = (e) => {
    e.stopPropagation();
    setIsFullGalleryOpen(false);
  };

  // Handle image selection with preventing event propagation
  const handleImageSelect = (e, image) => {
    e.stopPropagation();
    setSelectedImage(image);
  };

  if (images.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <h2 className="text-4xl font-serif text-gray-800 mb-4">Loading Our Memories...</h2>
            <Camera className="w-12 h-12 mx-auto text-primary" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-gray-800 mb-4">Our Love Story in Pictures</h2>
          <div className="flex items-center justify-center gap-2 text-primary">
            <Camera className="w-5 h-5" />
            <p className="text-gray-600">Capturing moments of joy and love</p>
          </div>
        </div>

        {/* Main Slideshow */}
        <div className="relative h-[600px] mb-8 group">
          <div className="absolute inset-0 bg-black/5 rounded-lg" />
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="w-full h-full object-cover rounded-lg shadow-xl"
            loading="lazy"
          />
          
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 text-gray-800 px-4 py-2 rounded-full font-medium">
            {currentIndex + 1} / {images.length}
          </div>

          <button
            onClick={() => setIsFullGalleryOpen(true)}
            className="absolute bottom-4 right-4 bg-primary text-white px-6 py-2 rounded-full flex items-center space-x-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary/80"
          >
            <Grid className="w-4 h-4" />
            <span>View Gallery</span>
          </button>

          <button
            onClick={() => setAutoplay(!autoplay)}
            className="absolute bottom-4 left-4 bg-white/90 px-6 py-2 rounded-full md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-secondary hover:text-gray-800"
          >
            {autoplay ? 'Pause' : 'Play'} Slideshow
          </button>
        </div>

        {/* Thumbnail Preview */}
        <div className="flex justify-center space-x-3 overflow-x-auto py-4 px-2 scrollbar-hide">
          {images.slice(Math.max(0, currentIndex - 2), currentIndex + 3).map((image, index) => (
            <button
              key={currentIndex - 2 + index}
              onClick={() => setCurrentIndex(currentIndex - 2 + index)}
              className={`relative flex-shrink-0 transition-all duration-300 ${
                currentIndex === (currentIndex - 2 + index) 
                  ? 'ring-2 ring-primary ring-offset-2' 
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-24 h-24 object-cover rounded-lg"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {/* Full Gallery Modal */}
        {isFullGalleryOpen && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 overflow-y-auto"
            onClick={handleModalClose}
          >
            <div className="min-h-screen p-4" onClick={e => e.stopPropagation()}>
              <button
                onClick={handleModalClose}
                className="fixed top-4 right-4 z-50 bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors text-white"
                style={{ touchAction: 'manipulation' }}
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="max-w-7xl mx-auto mt-20">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer"
                      onClick={(e) => handleImageSelect(e, image)}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full aspect-square object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Selected Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={e => e.stopPropagation()}
            />
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors text-white z-50"
              style={{ touchAction: 'manipulation' }}
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PreWeddingGallery;