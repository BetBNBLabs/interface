"use client"
import { useState } from "react";
const DropUp = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="absolute md:left-[55%] lg:left-[80%] mt-4 text-left rotate-180">
       
  
   
          <div
            className="origin-top-right absolute bg-black glass-container right-0 mt-2 w-56 rounded-md shadow-lg s ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-1" role="none">
              <a href="#" className="block px-4 py-2" role="menuitem">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full rotate-180"
                    src="/crash.svg"
                    alt=""
                  />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 rotate-180">
                      Coming Soon
                    </p>
                    <p className="text-sm text-gray-500 rotate-180">Crash</p>
                  </div>
                </div>
              </a>
              <a href="#" className="block px-4 py-2" role="menuitem">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full rotate-180"
                    src="/spinwheel.svg"
                    alt=""
                  />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 rotate-180">
                      Coming Soon
                    </p>
                    <p className="text-sm text-gray-500 rotate-180">Spin the Wheel</p>
                  </div>
                </div>
              </a>
              <a href="#" className="block px-4 py-2" role="menuitem">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full rotate-180"
                    src="/coinflip.svg"
                    alt=""
                  />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 rotate-180">
                      Now Playing
                    </p>
                    <p className="text-sm text-gray-500 rotate-180">BETBNB</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
       
      </div>
    );
  };
  export default DropUp;