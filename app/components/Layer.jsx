"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Dropdown from "./DropDown";
import DropUp from './DropUp';
import Menu from "./Menu";

const Layer = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);


  const toggleDropdown2 = () => {
    setShowDropdown2(!showDropdown2);
  };
  const toggleDropdown1 = () => {
      setShowDropdown1(!showDropdown1);
    };
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setTimeout(() => {
      setIsOpen(isOpen);
    }, 5000);
  };

  const handleClick = () => {
    setToggle(!Toggle);
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
      <header class=" body-font">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            {/* <span class="ml-3 text-xl">No wallet selected</span> */}
            <ConnectButton chainStatus="icon" accountStatus="avatar" />
          </a>
          <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center"></nav>
          <div dir="ltr">
            <button class="inline-flex items-center rounded-s-lg bg-[#F86939] border-0 text-white text-sm py-1 px-3 focus:outline-none mt-4 md:mt-0 hidden md:block">
              Heads (54%)
            </button>
          </div>
          <div dir="rtl">
            <button class="inline-flex items-center rounded-s-lg bg-outline border border-white text-white py-1 px-3 text-sm mt-4 md:mt-0 hidden md:block">
              Tails (49%)
            </button>
          </div>
          <div className="ml-6 inline-flex">
            <button
              class="flex items-center bg-[#303030] border border-gray-300 text-white font-medium py-2 px-3 rounded-full focus:outline-none"
              onClick={toggleDropdown}
            >
              <span>Recent</span>
              <svg
                class="w-4 h-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {showDropdown && (
              <Dropdown
                sections={sections}
                isOpen={showDropdown}
                toggleDropdown={toggleDropdown}
              />
            )}
                <button className="ml-8" onClick={toggleDropdown1}>
     <Image src="/game.svg" height={40} width={40}/>
        
        </button> 
        {showDropdown1 && (
              <DropUp
                isOpen={showDropdown1}
                toggleDropdown1={toggleDropdown1}
              />
            )}
            
            <button className="ml-8" onClick={toggleDropdown2}>
     <Image src="/hamburger.png" height={30} width={30}/>
        
        </button> 

        {showDropdown2 && (
              <Menu
                isOpen={showDropdown2}
                toggleDropdown1={toggleDropdown2}
              />
            )}

               


          </div>

     
        </div>
      </header>
    </div>
  );
};

export default Layer;