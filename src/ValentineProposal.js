import React, { useState, useEffect } from 'react';

const ValentineProposal = () => {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Handle both mouse and touch events
    const handlePointerMove = (e) => {
      // Get coordinates whether it's touch or mouse
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      
      setPointerPosition({ x, y });
      
      const noButton = document.getElementById('noButton');
      if (noButton) {
        const rect = noButton.getBoundingClientRect();
        const buttonCenter = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
        
        // Calculate distance between pointer and button
        const distance = Math.sqrt(
          Math.pow(x - buttonCenter.x, 2) +
          Math.pow(y - buttonCenter.y, 2)
        );
        
        // Increased detection radius for better mobile experience
        const threshold = window.innerWidth < 768 ? 150 : 100;
        
        // If pointer is within threshold of the button, move it
        if (distance < threshold) {
          // Calculate new position based on screen size
          const maxX = window.innerWidth - 100;
          const maxY = window.innerHeight - 100;
          const newX = Math.random() * maxX;
          const newY = Math.random() * maxY;
          
          // Ensure button stays within viewport
          setNoPosition({
            x: Math.max(0, Math.min(newX, maxX)),
            y: Math.max(0, Math.min(newY, maxY))
          });
        }
      }
    };

    // Add both mouse and touch event listeners
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [pointerPosition]);

  if (hasAccepted) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-pink-100 p-4">
        <div className="text-2xl md:text-4xl text-pink-600 font-bold animate-bounce text-center">
          I love you MonkeyPook
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-pink-100 relative p-4">
      <div className="text-2xl md:text-4xl text-pink-600 font-bold mb-8 text-center">
        Will you be my Valentine?
      </div>
      <div className="space-y-4 md:space-y-0 md:space-x-4">
        <button
          onClick={() => setHasAccepted(true)}
          className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg md:text-xl shadow-lg transform hover:scale-105 transition-transform"
        >
          Yes
        </button>
        <button
          id="noButton"
          style={{
            position: 'absolute',
            left: `${noPosition.x}px`,
            top: `${noPosition.y}px`,
            transition: 'all 0.2s ease-out',
            touchAction: 'none'
          }}
          className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg md:text-xl shadow-lg"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ValentineProposal;