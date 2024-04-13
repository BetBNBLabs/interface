import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import styles from "./CoinFlip.module.css";
import { flipCoin } from "@/utils";

const Flip = ({ isOpen, onClose }) => {
  const [flipping, setFlipping] = useState(false);
  async function flipCoinCall() {
    console.log("flipping...");

    setFlipping(true);
    await flipCoin(inputs.multiplier, inputs.amount, inputs.coinSide);

    setFlipping(false);
    setTimeout(onClose, 1000);
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="popup-title"
      className="flex items-center justify-center"
    >
      <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg text-white rounded-2xl p-6 w-50 mx-auto outline-none text-center">
        <div className="modal flex flex-col items-center justify-center">
          <div className={`${styles.coinInner} ${styles.flipping}`}>
            <div className={`${styles.coinFace} ${styles.heads}`}></div>
            <div className={`${styles.coinFace} ${styles.tails}`}></div>
          </div>
        </div>
        {/* <button
          onClick={onClose}
          className="mt-2 mb-2 px-4 py-2 bg-[#F86939] rounded"
        >
          Play More
        </button> */}
      </div>
    </Modal>
  );
};

export default Flip;
