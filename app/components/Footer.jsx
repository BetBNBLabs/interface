"use client"
import React from 'react'
import Image from 'next/image'
import { useState } from 'react';
import DropUp from './DropUp';
const Footer = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
      };
      const sections = [
        {
          heading: "Player Flips",
          items: ["User69 just flipped and won 69 BNB", "User69 just flipped and won 69 BNB", "User69 just flipped and won 69 BNB"],
        },
        {
          heading: "User Flips",
          items: ["User69 just flipped and won 69 BNB", "User69 just flipped and won 69 BNB", "User69 just flipped and won 69 BNB"],
        },
      ];
  return (
    <div>
      <footer class="text-gray-600 body-font">
  
  <div class="bg-[#0f0921]">
    <div class="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
     
     
      <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
       
        
     <button onClick={toggleDropdown}>
     <Image src="/game.svg" height={40} width={40}/>
        
        </button> 
        {showDropdown && (
              <DropUp
                isOpen={showDropdown}
                toggleDropdown={toggleDropdown}
              />
            )}
      </span>
    </div>
  </div>
</footer>
    </div>
  )
}

export default Footer
