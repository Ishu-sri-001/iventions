"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const Hero = () => {
  const videoRef = useRef(null);
  const clipRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      gsap.set(".hero-clip-path", {
        scale: 0,
        rotateZ: -180,
        clipPath:
          "polygon(62% 0%, 91% 0%, 54.5% 48%, 38.75% 100%, 7.25% 100%, 7.25% 100%, 52% 42%)",
        transformOrigin: "center center",
      });

      tl.to(".hero-clip-path", {
        opacity: 1,
        delay: 0.2,
      })

        .fromTo(
          ".hero-clip-path",
          {
            scale: 0,
          },
          {
            scale: 1,
            // delay: 0.2,
            ease: "none",
            duration: 0.5,
          },
          "<"
        )

        .to(".hero-clip-path", {
          duration: 0.7,
          ease: "linear",
          clipPath:
            "polygon(62% 0, 91% 0, 56% 49%, 59% 100%, 0 100%, 0 28%, 50% 39%)",
        })
        .to(
          ".hero-clip-path",
          {
            // delay: 0.2,
            rotateZ: 0,
            ease: "power1.out",
            duration: 0.3,
          }
        )
        .to(".hero-video", {
          opacity: 1,
        })
      // .to('.hero-video', {
      //   scale:3,
      // })
    });
    return () => ctx.revert();
  });

  const baseRotateX = 10;
  const baseRotateY = -8;

  const handleMouseMove = (e) => {
    const video = videoRef.current;
    const clip = clipRef.current;
    const hero = heroRef.current;
    if (!video || !clip || !hero) return;

    const { left, top, width, height } = hero.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Normalize mouse position (-1 to 1)
    const normX = (x - width / 2) / (width / 2);
    const normY = (y - height / 2) / (height / 2);

    // Video tilts following the mouse
    const videoRotateY = baseRotateY + normX * 10;
    const videoRotateX = baseRotateX - normY * 10;

    // Clip tilts opposite to mouse movement (anti-direction)
    const clipRotateY = baseRotateY - normX * 6;
    const clipRotateX = baseRotateX + normY * 6;

    video.style.transform = `perspective(800px) rotateX(${videoRotateX}deg) rotateY(${videoRotateY}deg) scale(1.05)`;
    clip.style.transform = `perspective(800px) rotateX(${clipRotateX}deg) rotateY(${clipRotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    const clip = clipRef.current;
    if (video && clip) {
      const reset = `perspective(800px) rotateX(${baseRotateX}deg) rotateY(${baseRotateY}deg) scale(1)`;
      video.style.transform = reset;
      clip.style.transform = reset;
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-screen h-screen relative flex items-center justify-center overflow-hidden"
    >
      {/* CLIP BACKGROUND LAYER */}
      <div
        ref={clipRef}
        className="absolute left-[-10%] clip-start opacity-0 scale-0  origin-center hero-clip-path w-[110vw] h-[105vh] mix-blend-multiply z-0  transition-all duration-500 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `perspective(800px) rotateX(${baseRotateX}deg) rotateY(${baseRotateY}deg)`,
        }}
      />

      {/* VIDEO BOX */}
      <div
        ref={videoRef}
        className="h-[20vw] w-[30vw]  hero-video opacity-0 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-40 rounded-[1.5vw] overflow-hidden transition-transform duration-300 ease-out shadow-2xl"
        style={{
          transformStyle: "preserve-3d",
          transform: `perspective(800px) rotateX(${baseRotateX}deg) rotateY(${baseRotateY}deg)`,
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

      {/* TEXT LAYER */}
      <div className="absolute inset-0 h-full w-full flex items-center text-[#101417] justify-between z-20 px-[3vw]">
        <p className="text-[2.5vw] font-third leading-none">
          Step into <br /> the Spotlight
        </p>
        <p className="w-[23%] text-[1.3vw] leading-normal">
          We craft world-class spaces & events memories, initiate conversations
          and elevate ambitions.
        </p>
      </div>

      {/* SVG DECORATION */}
      <Image
        width={1000}
        height={1000}
        src="/assets/svg/home-hero.svg"
        alt="text-svg"
        className="absolute bottom-5 w-full h-[29%] object-contain mix-blend-multiply z-10"
      />

      {/* LIGHT OVERLAY */}
      <div className="w-full h-full absolute inset-0 z-15 bg-black/5" />
    </section>
  );
};

export default Hero;
