"use client";
import React, { useRef } from "react";

const Btn = ({ text = "Get to know us" }) => {
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // increase tilt strength
    const maxTilt = 20;
    const rotateX = ((y - centerY) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    buttonRef.current.style.transition = "transform 0.15s linear";
    buttonRef.current.style.transform = `
      perspective(600px)
      rotateX(${-rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.08)
    `;
  };

  const handleMouseLeave = () => {
    buttonRef.current.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
    buttonRef.current.style.transform = `
      perspective(600px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative px-[2vw] py-[1vw] w-fit bg-white font-body uppercase text-black text-[0.8vw] font-semibold rounded-xl shadow-lg"
    >
      {text}
    </button>
  );
};

export default Btn;
