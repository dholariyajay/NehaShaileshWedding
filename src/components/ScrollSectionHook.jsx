import { useEffect } from 'react';

const useScrollSection = () => {
  useEffect(() => {
    // Get the hash from URL (if any)
    const hash = window.location.hash;
    if (hash) {
      // Remove the '#' symbol
      const sectionId = hash.slice(1);
      const element = document.getElementById(sectionId);
      
      if (element) {
        // Add a slight delay to ensure proper scrolling after page load
        setTimeout(() => {
          const navHeight = 64; // Height of your fixed navbar
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, []);
};

export default useScrollSection;