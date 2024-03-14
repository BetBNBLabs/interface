"use client"
import Game from "./components/Game";
import Layer from "./components/Layer";
import Navbar from "./components/Navbar";
import Disclaimer from "./components/Disclaimer";
import { useEffect, useState } from "react";
import Won from "./components/Won";
import Footer from "./components/Footer";
export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // This effect will run after the component mounts (site finishes loading)
    setIsPopupOpen(true); // Show the popup
  }, []);

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <div className="bg-[#080638] min-h-screen flex items-center justify-center">
      <div
        className="bg-cover bg-center bg-fixed w-full h-full"
        style={{ backgroundImage: "url('/background.png')" }}
      >
      <Disclaimer isOpen={isPopupOpen} onClose={closePopup} />
      <Won onClose={closePopup} />

        <Navbar />
        <Layer />
        <Game />
        <Footer/>
      </div>
    </div>
  );
}
