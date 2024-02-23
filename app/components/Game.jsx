"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
const Game = () => {
  const [flip, setFlip] = useState(false);
  return (
    <div>
      <div className="flex justify-center items-center flex-col">
        <div className="flex flex-col items-center">
          <Image src="/coin.svg" width={130} height={200} className={flip ? "animate-spin":""} alt="hello"></Image>
          <button className="bg-[#F86939] text-white font-bold py-2 px-4 rounded-full mb-2" onClick={()=>{setFlip(!flip)}}>
            Flip Coin
          </button>
          <span className="text-[#C4C4C4]">Select outcome</span>
        </div>
        <div className="flex justify-center items-left mt-20">
          <button className="bg-white font-bold py-2 px-4 mr-4 rounded-full">
            Heads
          </button>
          <button className="bg-outline text-white ml-4 border-white border font-bold py-2 px-4 rounded-full">
            Tails
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-center items-center mt-10">
          <span className="text-[#C4C4C4]">Select Price</span>
        </div>
        <div className="flex	justify-center items-left mt-4">
          <button className="bg-white font-bold py-2 px-4 mr-4 rounded-full">
            .1BNB
          </button>
          <button className="bg-outline text-white ml-4 border-white border font-bold py-2 px-4 rounded-full">
            .5BNB
          </button>
          <button className="bg-white font-bold py-2 px-4 ml-8 rounded-full">
            1BNB
          </button>
          <button className="bg-outline text-white ml-8 border-white border font-bold py-2 px-4 rounded-full">
            Custom amount
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-center items-center mt-10">
          <span className="text-[#C4C4C4]">
            Select reward (More reward means more risk)
          </span>
        </div>
        <div className="flex	justify-center items-left mt-4">
          <button className="bg-white font-bold py-2 px-4 mr-4 rounded-full">
            2x
          </button>
          <button className="bg-outline text-white ml-4 border-white border font-bold py-2 px-4 rounded-full">
            5x
          </button>
          <button className="bg-white font-bold py-2 px-4 ml-8 rounded-full">
            10x
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
