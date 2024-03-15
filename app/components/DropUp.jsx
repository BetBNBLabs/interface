"use client"
import { useState } from "react";
const DropUp = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="absolute md:left-[55%] lg:left-[98%] mt-4 text-left ">
       
  
   
          <div
            className="origin-top-right absolute bg-black glass-container right-18 z-50 mt-2 w-56 rounded-md shadow-lg s ring-1 ring-black ring-opacity-5 md:right-0"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-1" role="none">
              <a href="#" className="block px-4 py-2" role="menuitem">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full "
                    src="/coinflip.svg"
                    alt=""
                  />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 ">
                      BETBNB
                    </p>
                    <p className="text-sm text-gray-500 ">Now playing</p>
                  </div>
                </div>
              </a>
              <a href="#" className="block px-4 py-2" role="menuitem">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full "
                    src="/spinwheel.svg"
                    alt=""
                  />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 ">
                      Spin Wheel
                    </p>
                    <p className="text-sm text-gray-500 ">Coming Soon</p>
                  </div>
                </div>
              </a>
              <a href="#" className="block px-4 py-2" role="menuitem">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full "
                    src="/crash.svg"
                    alt=""
                  />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 ">
                    Crash
                    </p>
                    <p className="text-sm text-gray-500 ">Coming Soon</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
       
      </div>
    );
  };
  export default DropUp;