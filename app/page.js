import Game from "./components/Game";
import Layer from "./components/Layer";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="bg-[#090739] h-screen flex items-center justify-center">
      <div
        className="bg-cover bg-center bg-fixed w-full h-full"
        style={{ backgroundImage: "url('/background.png')" }}
      >
        <Navbar />
        <Layer />
        <Game />
      </div>
    </div>
  );
}
