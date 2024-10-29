"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "../public/logo.png";
import halloween from "../public/halloween.svg";

export default function Home() {
  const [joke, setJoke] = useState(null);
  const [totalTrickOrTreaters, setTotalTrickOrTreaters] = useState(0);
  const [buttonsVisible, setButtonsVisible] = useState(true);

  const handleTrickClick = async () => {
    try {
      const response = await fetch("/api/fetchTrick");
      if (response.ok) {
        setButtonsVisible(false);
        window.location.href = "https://oceanic.com.fj";
      }
    } catch (error) {
      console.error("Error with Trick:", error);
    }
  };

  const handleTreatClick = async () => {
    try {
      const response = await fetch("/api/fetchTreat");
      if (response.ok) {
        const data = await response.json();
        setJoke(data.joke);
        setButtonsVisible(false);
      }
    } catch (error) {
      console.error("Error with Treat:", error);
    }
  };

  useEffect(() => {
    const fetchTotalCount = async () => {
      const response = await fetch("/api/fetchTotalTrickOrTreaters");
      if (response.ok) {
        const data = await response.json();
        setTotalTrickOrTreaters(data.total);
      }
    };

    fetchTotalCount();
    const interval = setInterval(fetchTotalCount, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center min-h-[90vh] p-8 bg-cover bg-center">
      {/* Existing Content */}
      <div className="flex items-center mb-8 ">
        <Image src={halloween} alt="" />
      </div>

      {buttonsVisible && (
        <div className="flex gap-4 mb-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={handleTrickClick}
            className="btn creepster-regular mt-4 px-6 py-2 text-[#d66a27] text-4xl border-2 border-[#d66a278a] rounded-lg bg-opacity-80 bg-[#00000021] shadow-lg transition">
            Trick
          </button>
          <button
            onClick={handleTreatClick}
            className="btn creepster-regular mt-4 px-6 py-2 text-[#d66a27] text-4xl border-2 border-[#d66a278a] rounded-lg bg-opacity-80 bg-[#00000021] shadow-lg transition">
            Treat
          </button>
        </div>
      )}

      {joke && (
        <div className="mt-4 py-2 px-4 border-2 border-[#d66a278a] rounded-lg w-[80vw] bg-opacity-80 bg-[#00000021] shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 creepster-regular">
          <p className="text-lg text-center text-[#1a0d05]">{joke}</p>
        </div>
      )}

      <p className="text-2xl creepster-regular text-[#ffffff7c] self-start justify-self-end mt-8 absolute bottom-2 left-2 -z-10">
        Total Trick or Treaters:
        <span className="text-red-600"> {totalTrickOrTreaters}</span>
      </p>
      <div className="bg-[#ffffffee] p-1 rounded absolute bottom-2 right-2 -z-10">
        <Image src={logo} alt="logo" className="w-16" />
      </div>
      <div className="spider">
        <div className="spiderweb"></div>
        <div className="body">
          <div className="eye left"></div>
          <div className="eye right"></div>
        </div>
        <div className="legs left">
          <div className="leg"></div>
          <div className="leg"></div>
          <div className="leg"></div>
        </div>
        <div className="legs right">
          <div className="leg"></div>
          <div className="leg"></div>
          <div className="leg"></div>
        </div>
      </div>
    </div>
  );
}
