import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const Disclaimer = ({ isOpen, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="popup-title"
      className="flex items-center justify-center"
    >
      <div className="bg-[#141414] text-white rounded-md p-6 w-50 mx-auto outline-none text-center">
        <h1 id="popup-title" className="disclaimer text-4xl">Disclaimer</h1>
        <p className="paragraph">
        By clicking on the button below you agree that you are above 18 years. Not that we care about it but it’ll
 be nice if you don’t lie.
        </p>
        <button
          onClick={onClose}
          className="mt-2 mb-2 px-4 py-2 bg-[#F86939] rounded"
        >
          I swear I am above 18
        </button>
      </div>
    </Modal>
  );
};

export default Disclaimer;
