"use client"

import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const filledColor = 'bg-[#F86939]';
    const outlinedColor = 'border border-white-500';
    const [numberOfCircles, setNumberOfCircles] = useState(0);
    const calculateNumberOfCircles = () => {
        const containerWidth = document.getElementById('navbar-container').offsetWidth;
        const circleWidth = 47; // Assuming each circle has a width of 20px
        const availableWidth = containerWidth - 32; // Assuming 16px padding on each side
        const newNumberOfCircles = Math.floor(availableWidth / circleWidth);
        setNumberOfCircles(newNumberOfCircles);
      };
    
      // Effect to update the number of circles when the component mounts or when the window is resized
      useEffect(() => {
        calculateNumberOfCircles();
        window.addEventListener('resize', calculateNumberOfCircles);
        return () => {
          window.removeEventListener('resize', calculateNumberOfCircles);
        };
      }, []);

  return (
    <div>
<nav className="h-16 flex items-center justify-between">
      <div id="navbar-container" className="flex items-center space-x-2 mx-4" style={{ width: '100%' }}>
        {/* Generate circles */}
        {[...Array(numberOfCircles)].map((_, index) => (
        //   <div
        //     key={index}
        //     className={`w-10 h-10 rounded-full ${index % 2 === 0 ? filledColor : outlinedColor}`}
            
        //   />
        <div
        key={index}
        className={`w-10 h-10 rounded-full flex items-center justify-center ${index % 2 === 0 ? filledColor : outlinedColor}`}
      >
        <span className="text-white font-semibold">{index % 2 === 0 ? 'T' : 'H'}</span>
      </div>

          
        ))}
      </div>
    </nav>

    </div>
  )
}

export default Navbar
