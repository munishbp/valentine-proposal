import React, { useState, useEffect } from 'react';

const ValentineProposal = () => {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e) => {
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
        
        const distance = Math.sqrt(
          Math.pow(x - buttonCenter.x, 2) +
          Math.pow(y - buttonCenter.y, 2)
        );
        
        const threshold = window.innerWidth < 768 ? 150 : 100;
        
        if (distance < threshold) {
          const maxX = window.innerWidth - 100;
          const maxY = window.innerHeight - 100;
          const newX = Math.random() * maxX;
          const newY = Math.random() * maxY;
          
          setNoPosition({
            x: Math.max(0, Math.min(newX, maxX)),
            y: Math.max(0, Math.min(newY, maxY))
          });
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [pointerPosition]);

  if (hasAccepted) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-pink-200">
        <div className="text-4xl md:text-6xl text-pink-600 font-extrabold animate-bounce text-center px-4">
          I love you MonkeyPook
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-pink-200 relative p-4">
      <div className="text-4xl md:text-6xl text-pink-600 font-extrabold mb-12 text-center">
        Will you be my Valentine?
      </div>
      <div className="space-y-4 md:space-y-0 md:space-x-8">
        <button
          onClick={() => setHasAccepted(true)}
          className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-extrabold py-4 px-8 rounded-lg text-2xl md:text-3xl shadow-lg transform hover:scale-105 transition-transform"
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
          className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-extrabold py-4 px-8 rounded-lg text-2xl md:text-3xl shadow-lg"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ValentineProposal;