"use client"
import { useState } from "react";
const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="absolute md:left-[55%] lg:left-[98%] mt-12 text-left ">
       
  
   
          <div
            className="origin-top-right absolute bg-black glass-container right-18 z-50 mt-2 w-56 rounded-md shadow-lg s ring-1 ring-black ring-opacity-5 md:right-0"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-1" role="none">
              <a target="_blank" href="https://drive.google.com/file/d/1qDkvJvn8Lkj2rauPrrlfo98IO6bWSCq6/view?usp=sharing" className="block px-4 py-2" role="menuitem">
                <div className="flex items-center">
                 
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 ">
                      Whitepaper
                    </p>
                  </div>
                </div>
              </a>
              <a target="_blank" href="https://drive.google.com/file/d/1dhHTWZFgFFUL6jj_zW13KQ6Z9KWB_fR4/view?usp=sharing" className="block px-4 py-2" role="menuitem">
                <div className="flex items-center">
                 
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 ">
                      Terms of Use
                    </p>
                  </div>
                </div>
              </a>
              <a target="_blank" href="https://drive.google.com/file/d/1w_LdYRBbd9k-aG1_7YZlt5pOBEGvlT7X/view?usp=sharing" className="block px-4 py-2" role="menuitem">
                <div className="flex items-center">
                 
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 ">
                    Privacy Policy
                    </p>
                  </div>
                </div>
              </a>
          {/* <a href="https://twitter.com/iknowspots">
            <img src="/twitter.png" alt="twitter" />
          </a>
          <a href="https://www.linkedin.com/company/iknowspots">
            <img src="/telegram.png" alt="linkedin" />
          </a> */}
                <div className="flex items-center"> 
                  <div className="ml-4 inline-flex">
                  <a className="ml-4" href="https://twitter.com/betbnb">
            <img src="/twitter.png" alt="twitter" />
          </a>
          <a href="https://t.me/bet_bnb">
            <img className="ml-4" src="/telegram.png" alt="telegram" />
          </a>
                   
                  </div>
                </div>

       

            </div>
          </div>
       
      </div>
    );
  };
  export default Menu;