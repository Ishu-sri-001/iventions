"use client";
import React, { useRef } from "react";
import Image from "next/image";

const IconButton = ({ icon, alt = "icon", size = "3vw", bg = "white" }) => {
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

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
    buttonRef.current.style.transition =
      "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
    buttonRef.current.style.transform = `
      perspective(600px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  };

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center p-1 cursor-pointer justify-center w-[3.5vw] h-[${size}] rounded-[0.5vw] shadow-lg`}
      style={{ backgroundColor: bg }}
    >
      <Image
        src={icon}
        alt={alt}
        width={100}
        height={100}
        className="w-[60%] h-[60%] object-contain"
      />
    </div>
  );
};

export default IconButton;
