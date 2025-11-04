"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 w-full h-[3vw] flex items-start justify-between z-50">
      {/* Left - Menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-[1.5vw] cursor-pointer outline-none bg-yellow px-[2vw] h-full py-[1vw]  rounded-br-[1vw]  transition-all"
      >
        <div className="flex flex-col w-[1.4vw] justify-start gap-[0.2vw]">
          <span className="bg-black w-full h-[1px]"></span>
          <span className="bg-black w-full h-[1px]"></span>
          
        </div>

        <span className="text-[0.7vw] font-body font-semibold">MENU</span>
      </button>

      {/* Center - Logo */}
      <div className="flex w-[7%] justify-center items-center my-auto">
        <Image
          src="/assets/svg/icon-logo.svg" 
          alt="logo"
          width={500}
          height={500}
          className="object-contain brightness-0"
        />
      </div>

      {/* Right - Got a Project */}
      <button className="flex items-center gap-[1.5vw] cursor-pointer outline-none bg-yellow px-[2vw] h-full py-[1vw]  rounded-bl-[1vw]  transition-all">
        <span className="text-[0.7vw] font-body font-semibold">
          GOT A PROJECT?
        </span>
      </button>


      <div
        className={`fixed top-0 left-0 z-9999 w-[20vw] h-[20vw] bg-[#dfff81] transition-all ease-in-out duration-700 ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-black font-bold text-lg"
        >
          ✕
        </button>

        {/* Menu Content */}
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
          <h1 className="text-4xl font-bold">Navigation</h1>
          <ul className="space-y-4 text-lg font-medium">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">About</li>
            <li className="hover:underline cursor-pointer">Work</li>
            <li className="hover:underline cursor-pointer">Contact</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}