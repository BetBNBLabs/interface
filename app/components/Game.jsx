"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { flipCoin, approveToken, checkAllowance } from "@/utils";
import styles from "./CoinFlip.module.css";
import "react-toastify/dist/ReactToastify.css";
import { addressFactory } from "../../config";
import Won from "./Won";
import Lost from "./Lost";
import { WebSocketProvider, Contract } from "ethers";

const Game = () => {
    // const [result, setResult] = useState(null);
    const [flipping, setFlipping] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [customAmount, setCustomAmount] = useState("Custom Amount");
    const [allowanceN, setAllowanceN] = useState(); 

    const [inputs, setInputs] = useState({
        multiplier: "0",
        amount: "0.1",
        coinSide: "0",
    });

    useEffect(() => {
        fetchCheckAllowance()
    }, [])

    listenToResult();

    async function flipCoinCall() {
        console.log("flipping...");

        setFlipping(true);
        await flipCoin(inputs.multiplier, inputs.amount, inputs.coinSide);

        setFlipping(false);
        await listenToResult();
        await fetchCheckAllowance()
    }

    async function fetchCheckAllowance() {
        const result = await checkAllowance()
        setAllowanceN(result)
    }

    async function approveCall(_amount) {
        await approveToken(_amount)
        await fetchCheckAllowance()
    }

    async function listenToResult() {
        console.log("hearing flip...");
        const providerUrl =
            "wss://quiet-quick-wind.bsc-testnet.quiknode.pro/7593d9a56a9bf68b6e049a867416791b5e1bfdbb/";

        const eventABI = [
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "User",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "winStreak",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "bool",
                        name: "value",
                        type: "bool",
                    },
                ],
                name: "CoinStreak",
                type: "event",
            },
        ];

        const provider = new WebSocketProvider(providerUrl);

        const contract = new Contract(addressFactory, eventABI, provider);

        contract.on("CoinStreak", (User, winStreak, value) => {
            console.log(
                "result:",
                `${User} got ${value} and is on a streak of ${winStreak}`
            );
            // setResult(value);
            if (value == true) {
                setShowSuccess(true);
            } else {
                setShowFailure(true);
            }
        });
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

                    <div className="flex flex-col justify-center">
                        <button
                            className={`text-center bg-outline border-white border  hover:bg-white hover:text-black font-bold py-2 px-4 rounded-full ${
                                (inputs.amount !== "0.1" &&
                                    inputs.amount !== "0.5" &&
                                    inputs.amount !== "1") ||
                                inputs.amount === "Custom Amount"
                                    ? "bg-white text-black"
                                    : "text-white"
                            }`}
                            onClick={() => {
                                const customAmount = prompt(
                                    "Enter custom amount:"
                                );
                                if (customAmount !== null) {
                                    approveCall(customAmount);
                                }
                            }}
                        >
                            Custom Allowance
                        </button>
                        <h4 className="text-white text-center">Current Allowance: {allowanceN}</h4>
                    </div>

                    <button
                        className="bg-[#F86939] text-white py-2 px-4 rounded-full mb-2 font-extrabold"
                        onClick={flipCoinCall}
                        
                    >
                        <span className="tracking-widest font-extrabold">
                            Flip Coin
                        </span>
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
                        .1 BETBNB
                    </button>
                    <button
                        className={`bg-outline  ml-4 border-white border font-bold py-2 px-4 rounded-full ${
                            inputs.amount === "0.5"
                                ? "bg-white text-black"
                                : "text-white"
                        }`}
                        onClick={() => setInputs({ ...inputs, amount: "0.5" })}
                    >
                        .5 BETBNB
                    </button>
                    <button
                        className={`bg-outline border-white border font-bold py-2 px-4 ml-8 rounded-full ${
                            inputs.amount === "1"
                                ? "bg-white text-black"
                                : "text-white"
                        }`}
                        onClick={() => setInputs({ ...inputs, amount: "1" })}
                    >
                        1 BETBNB
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
                                setCustomAmount(customAmount + " BETBNB");
                            }
                        }}
                    >
                        {/* {inputs.amount === "0.1" ||
                        inputs.amount === "0.5" ||
                        inputs.amount === "1"
                            ? inputs.amount + " BETBNB"
                            : inputs.amount !== ""
                            ? inputs.amount + " BETBNB (Custom)"
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
            {showSuccess ? (
                <Won
                    isOpen={true}
                    onClose={() => {
                        setShowSuccess(false);
                    }}
                />
            ) : (
                <></>
            )}
            {showFailure ? (
                <Lost
                    isOpen={true}
                    onClose={() => {
                        setShowFailure(false);
                    }}
                />
            ) : (
                <></>
            )}
        </div>
    );
};

export default Game;
