import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const Won = ({ isOpen, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="popup-title"
      className="flex items-center justify-center"
    >
      <div className="bg-[#141414] text-white rounded-md p-6 w-50 mx-auto outline-none text-center">
        <div className='modal flex flex-col items-center justify-center'>
        <h1 id="popup-title" className="disclaimer text-4xl">You've Won!</h1>
        <p className="paragraph">
        Congratulations! You've won $10.
        </p>
        <img className="items-center justify-center" src="/won.gif" alt="Winner GIF" />
        </div>
        <button
          onClick={onClose}
          className="mt-2 mb-2 px-4 py-2 bg-[#F86939] rounded"
        >
            Play More
        </button>
      </div>
    </Modal>
  );
};

export default Won;
