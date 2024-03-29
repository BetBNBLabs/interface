"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { createAccount, isExistingUser, flipACoin } from "@/utils";
import styles from "./CoinFlip.module.css"; // Import CSS module for styling
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addressFactory,
  abiFactory,
  addressCustomToken,
  abiApproveFunction,
  jsonRPC,
  RPCKey
} from "../../config";
import Won from "./Won";
import Lost from "./Lost";

const Game = () => {
    const [result, setResult] = useState(null);
    const [flipping, setFlipping] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
   const [customAmount, setCustomAmount] = useState("Custom Amount")

    const [inputs, setInputs] = useState({
        multiplier: "0",
        amount: "0.1",
        coinSide: "0",
    });

    // console.log(inputs);

    async function listenToResult() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(
          addressFactory,
          abiFactory,
          provider
      );
      contract.on("CoinStreak", (address, streak, results) => {
          let info = {
              address: address,
              streak: streak,
              results: results
          }
          console.log("results:", info.results)
          // console.log("results info:", info.value.toString())
          setResult(info.results)
          if (info.results == true){
            setShowSuccess(true) 
          }
          else{
            setShowFailure(true)
          }
      }) 
      
  }
  
  listenToResult()

    async function flipCoinCall() {
      console.log("called")
        setFlipping(true);
        // setLoading(true);
        const isExisting = await isExistingUser();
        if (isExisting.toString() == "0x0000000000000000000000000000000000000000") {
            await createAccount();
        }
        const result = await flipACoin(
            inputs.multiplier,
            inputs.amount,
            inputs.coinSide
        );
        setResult(result);
        setFlipping(false);
    }
   
  

 
    return (
        <div className="flex flex-col justify-center items-center min-h-[80vh] gap-[10%]">
            <div className="flex justify-center items-center flex-col">
                <div className="flex flex-col items-center">
                    <div
                        className={`${styles.coinInner} ${
                            flipping ? styles.flipping : ""
                        }`}
                    >
                        <div
                            className={`${styles.coinFace} ${styles.heads}`}
                        ></div>
                        <div
                            className={`${styles.coinFace} ${styles.tails}`}
                        ></div>
                    </div>

                    <button
                        className="bg-[#F86939] text-white py-2 px-4 rounded-full mb-2 font-extrabold"
                        onClick={flipCoinCall}
                        // onClick={() => {flipCoin()}}
                    >
                        <span className="tracking-widest font-extrabold">Flip Coin</span>
                    </button>
                </div>
            </div>

            <div>
                <div className="flex justify-center items-left flex-col">
                    <span className="text-[#C4C4C4] text-center">
                        Select outcome
                    </span>
                    <div className="flex justify-center items-left mt-5">
                        <button
                            className={`bg-outline border ${
                                inputs.coinSide === "0"
                                    ? "bg-white text-black"
                                    : "text-white"
                            } font-bold py-2 px-4 mr-4 rounded-full hover:text-black hover:bg-white`}
                            onClick={() =>
                                setInputs({ ...inputs, coinSide: "0" })
                            }
                        >
                            Heads
                        </button>
                        <button
                            className={`bg-outline border ${
                                inputs.coinSide === "1"
                                    ? "bg-white text-black"
                                    : "text-white"
                            } font-bold py-2 px-4 rounded-full hover:bg-white hover:text-black`}
                            onClick={() =>
                                setInputs({ ...inputs, coinSide: "1" })
                            }
                        >
                            Tails
                        </button>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-2">
                    <span className="text-[#C4C4C4]">Select Price</span>
                </div>
                <div className="flex justify-center items-left mt-4">
                    <button
                        className={`bg-outline  ml-4 border-white border font-bold py-2 px-4 mr-4 rounded-full ${
                            inputs.amount === "0.1"
                                ? "bg-white text-black"
                                : "text-white"
                        }`}
                        onClick={() => setInputs({ ...inputs, amount: "0.1" })}
                    >
                        .1 BNB
                    </button>
                    <button
                        className={`bg-outline  ml-4 border-white border font-bold py-2 px-4 rounded-full ${
                            inputs.amount === "0.5"
                                ? "bg-white text-black"
                                : "text-white"
                        }`}
                        onClick={() => setInputs({ ...inputs, amount: "0.5" })}
                    >
                        .5 BNB
                    </button>
                    <button
                        className={`bg-outline border-white border font-bold py-2 px-4 ml-8 rounded-full ${
                            inputs.amount === "1"
                                ? "bg-white text-black"
                                : "text-white"
                        }`}
                        onClick={() => setInputs({ ...inputs, amount: "1" })}
                    >
                        1 BNB
                    </button>
                    <button
                        className={`bg-outline border-white border  hover:bg-white hover:text-black font-bold py-2 px-4 ml-8 rounded-full ${
                            (inputs.amount !== "0.1" &&
                            inputs.amount !== "0.5" &&
                            inputs.amount !== "1") || 
                            inputs.amount === "Custom Amount"
                                ? "bg-white text-black"
                                : "text-white"
                        }`}
                        onClick={() => {
                            const customAmount = prompt("Enter custom amount:");
                            if (customAmount !== null) {
                                setInputs({ ...inputs, amount: customAmount });
                                setCustomAmount(customAmount + " BNB")
                            }
                        }}
                    >

                      
                        {/* {inputs.amount === "0.1" ||
                        inputs.amount === "0.5" ||
                        inputs.amount === "1"
                            ? inputs.amount + " BNB"
                            : inputs.amount !== ""
                            ? inputs.amount + " BNB (Custom)"
                            : "Custom amount"} */}

                            {customAmount}
                    </button>
                </div>

                <div>
                    <div className="flex justify-center items-center mt-10">
                        <span className="text-[#C4C4C4] text-sm md:text-base">
                            Select reward (More reward means more risk)
                        </span>
                    </div>
                    <div className="flex	justify-center items-left mt-4">
                        <button
                            className={`bg-outline border border-white  font-bold py-2 px-4 mr-4 rounded-full hover:bg-white hover:text-black ${
                                inputs.multiplier === "0"
                                    ? "bg-white text-black"
                                    : "text-white"
                            }`}
                            onClick={() =>
                                setInputs({ ...inputs, multiplier: "0" })
                            }
                        >
                            1x
                        </button>
                        <button
                            className={`bg-outline  ml-4 border-white border font-bold py-2 px-4 rounded-full hover:bg-white hover:text-black ${
                                inputs.multiplier === "1"
                                    ? "bg-white text-black"
                                    : "text-white"
                            }`}
                            onClick={() =>
                                setInputs({ ...inputs, multiplier: "1" })
                            }
                        >
                            5x
                        </button>
                        <button
                            className={`bg-outline border border-white  font-bold py-2 px-4 ml-8 rounded-full hover:text-black hover:bg-white ${
                                inputs.multiplier === "2"
                                    ? "bg-white text-black"
                                    : "text-white"
                            }`}
                            onClick={() =>
                                setInputs({ ...inputs, multiplier: "2" })
                            }
                        >
                            10x
                        </button>
                    </div>
                </div>
            </div>
            {showSuccess ? <Won isOpen={true} onClose={()=>{
              setShowSuccess(false)
            }}/> : <></>}
            {showFailure ? <Lost isOpen={true} onClose={()=>{
              setShowFailure(false)
            }}/> : <></>}

        </div>
    );
};

export default Game;
