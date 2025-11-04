"use client";
import React, { useRef } from "react";
import Image from "next/image";

const Hero = () => {
  const videoRef = useRef(null);

 
  const baseRotateX = 10; // tilt backward on top
  const baseRotateY = -8; // tilt backward to top-left

  const handleMouseMove = (e) => {
    const video = videoRef.current;
    if (!video) return;
    
    const { left, top, width, height } = video.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Add subtle rotation relative to base tilt
    const rotateY = baseRotateY + ((x - width / 2) / width) * 10;
    const rotateX = baseRotateX + ((height / 2 - y) / height) * 10;

    video.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (video) {
      // Return to base tilt, not flat
      video.style.transform = `perspective(800px) rotateX(${baseRotateX}deg) rotateY(${baseRotateY}deg) scale(1)`;
    }
  };

  return (
    <section
      id="hero"
      className="w-screen h-screen relative flex items-center justify-center"
    >
      <div
        ref={videoRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="h-[20vw] w-[30vw] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-50 rounded-[1.5vw] overflow-hidden transition-transform duration-300 ease-out shadow-2xl"
        style={{
          transformStyle: "preserve-3d",
          transform: `perspective(800px) rotateX(${baseRotateX}deg) rotateY(${baseRotateY}deg)`, // initial tilt
        }}
      >
        <video
          src="/assets/video/hero-vid.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 h-full w-full flex items-center text-[#101417] justify-between z-20 px-[3vw]">
        <p className="text-[2.5vw] font-third leading-none">
          Step into <br /> the Spotlight
        </p>
        <p className="w-[23%] text-[1.3vw] leading-normal">
          We craft world-class spaces & events memories, initiate conversations
          and elevate ambitions.
        </p>
      </div>

      <Image
        width={1000}
        height={1000}
        src="/assets/svg/home-hero.svg"
        alt="text-svg"
        className="absolute bottom-5 w-full h-[29%] object-contain mix-blend-multiply z-10"
      />

      <div className="absolute inset-0 clip-custom w-full h-full mix-blend-multiply z-0" />
      <div className="w-full h-full absolute inset-0 z-15 bg-black/5" />
    </section>
  );
};

export default Hero;
