"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Dropdown from "./DropDown";
const Layer = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
            <button class="inline-flex items-center rounded-s-lg bg-[#F86939] border-0 text-white text-sm py-1 px-3 focus:outline-none mt-4 md:mt-0 ">
              Heads (54%)
            </button>
          </div>
          <div dir="rtl">
            <button class="inline-flex items-center rounded-s-lg bg-outline border border-white text-white py-1 px-3 text-sm mt-4 md:mt-0">
              Tails (49%)
            </button>
          </div>
          <div className="ml-6">
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
          </div>
          <button onMouseEnter={handleToggle}>
          <Image
            className="ml-4 mt-2"
            src="/alert.svg"
            width={40}
            height={50}
          />
          </button>
          {isOpen && (
          <div className="absolute text-[0.8rem] left-[70%] mr-8 z-10 mt-2 py-2 bg-[#18181d] text-white rounded-xl border border-black/50 shadow-lg ">
            <div className="flex justify-center items-center px-4 gap-2">
              <p className="block py-2">More Games Coming Soon!</p>
              
            </div>
          </div>
        )}
        </div>
      </header>
    </div>
  );
};

export default Layer;