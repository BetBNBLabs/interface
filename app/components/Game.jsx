"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { createAccount, isExistingUser, flipCoin } from "@/utils";

const Game = () => {
  const [flip, setFlip] = useState(null);
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    multiplier: "0",
    amount: "0.1",
    coinSide: "0",
  });

  console.log(inputs);

  async function flipCall() {
    setFlip(!flip);
    setLoading(true);
    const isExisting = await isExistingUser();
    // if (isExisting.toString() == "0x0000000000000000000000000000000000000000") {
    //     await createAccount();
    // }
    await flipCoin(inputs.multiplier, inputs.amount, inputs.coinSide);
    setLoading(false);
    setFlip(null);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh] gap-[10%]">
      <div className="flex justify-center items-center flex-col">
        <div className="flex flex-col items-center">
          <Image
            src="/coin.svg"
            width={130}
            height={200}
            className={flip ? "animate-spin" : ""}
            alt="hello"
          ></Image>
          <button
            className="bg-[#F86939] text-white font-bold py-2 px-4 rounded-full mb-2"
            onClick={flipCall}
          >
            Flip Coin
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-center items-left flex-col">
          <span className="text-[#C4C4C4] text-center">Select outcome</span>
          <div className="flex justify-center items-left mt-5">
            <button
              className="bg-outline border border-white text-white font-bold py-2 px-4 mr-4 rounded-full hover:text-black hover:bg-white"
              onClick={() => setInputs({ ...inputs, coinSide: "0" })}
            >
              Heads
            </button>
            <button
              className="bg-outline text-white ml-4 border-white border font-bold py-2 px-4 rounded-full hover:bg-white hover:text-black"
              onClick={() => setInputs({ ...inputs, coinSide: "1" })}
            >
              Tails
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center mt-2">
          <span className="text-[#C4C4C4]">Select Price</span>
        </div>
        <div className="flex	justify-center items-left mt-4">
          <button
            className="bg-outline text-white ml-4 border-white border font-bold py-2 px-4 mr-4 rounded-full hover:text-black hover:bg-white"
            onClick={() => setInputs({ ...inputs, amount: "0.1" })}
          >
            .1BNB
          </button>
          <button
            className="bg-outline text-white ml-4 border-white border font-bold py-2 px-4 rounded-full hover:bg-white hover:text-black "
            onClick={() => setInputs({ ...inputs, amount: "0.5" })}
          >
            .5BNB
          </button>
          <button
            className="bg-outline border-white border text-white hover:text-black hover:bg-white font-bold py-2 px-4 ml-8 rounded-full"
            onClick={() => setInputs({ ...inputs, amount: "1" })}
          >
            1BNB
          </button>
          <button className="bg-outline text-white ml-8 border-white border font-bold py-2 px-4 rounded-full hover:text-black hover:bg-white">
            Custom amount
          </button>
        </div>

        <div>
          <div className="flex justify-center items-center mt-10">
            <span className="text-[#C4C4C4]">
              Select reward (More reward means more risk)
            </span>
          </div>
          <div className="flex	justify-center items-left mt-4">
            <button
              className="bg-outline border border-white text-white font-bold py-2 px-4 mr-4 rounded-full hover:bg-white hover:text-black"
              onClick={() => setInputs({ ...inputs, multiplier: "0" })}
            >
              1x
            </button>
            <button
              className="bg-outline text-white ml-4 border-white border font-bold py-2 px-4 rounded-full hover:bg-white hover:text-black"
              onClick={() => setInputs({ ...inputs, multiplier: "1" })}
            >
              5x
            </button>
            <button
              className="bg-outline border border-white text-white font-bold py-2 px-4 ml-8 rounded-full hover:text-black hover:bg-white"
              onClick={() => setInputs({ ...inputs, multiplier: "2" })}
            >
              10x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
