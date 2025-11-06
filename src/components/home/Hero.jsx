"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const videoRef = useRef(null);
  const clipRef = useRef(null);
  const heroRef = useRef(null);
  const [isFullyScaled, setIsFullyScaled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      gsap.to('.hero-video', {
        scale: 3.0,
        rotateX: 0,
        rotateY: 0,
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom 50%',
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            // Disable mouse effects only when scroll is complete
            setIsFullyScaled(self.progress >= 0.99);
          },
        }
      });

      gsap.set(".hero-clip-path", {
        scale: 0,
        rotateZ: -180,
        clipPath:
          "polygon(59.15% 0%, 53.34% 51.47%, 15.75% 100%, 15.75% 100%, 46.32% 100%, 55.56% 53.75%, 90.6% 0%)",
        transformOrigin: "center center",
      });

      tl.to(".hero-clip-path", {
        opacity: 1,
        duration: 0.2,
      })

        .fromTo(
          ".hero-clip-path",
          {
            scale: 0,
          },
          {
            scale: 1,
            ease: "linear",
            duration: 1,
          }
        )

        .to(
          ".hero-clip-path",
          {
            delay: 0.5,
            rotateZ: 0,
            ease: "power1.out",
            duration: 1,
          }
        )

        .to(".hero-clip-path", {
          duration: 1.5,
          ease: "linear",
          clipPath:
            "polygon(59.15% 0%, 53.34% 51.47%, 0% 27.43%, 0% 100%, 62.32% 100%, 55.68% 55.08%, 90.6% 0%)",
        })
        
        .to(videoRef.current, {
          opacity: 1,
        });
      
    });
    return () => ctx.revert();
  }, []);

  const baseRotateX = 10;
  const baseRotateY = -8;

  const handleMouseMove = (e) => {
    // Disable mouse effects after video is fully scaled
    if (isFullyScaled) return;

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

    gsap.to(video, {
      rotateX: videoRotateX,
      rotateY: videoRotateY,
      // scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(clip, {
      rotateX: clipRotateX,
      rotateY: clipRotateY,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    // Disable mouse effects after video is fully scaled
    if (isFullyScaled) return;

    const video = videoRef.current;
    const clip = clipRef.current;
    if (video && clip) {
      gsap.to(video, {
        rotateX: baseRotateX,
        rotateY: baseRotateY,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(clip, {
        rotateX: baseRotateX,
        rotateY: baseRotateY,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
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
      <div
        ref={videoRef}
        className="h-[20vw] w-[34vw] opacity-0 hero-video relative z-40 rounded-[1.5vw] overflow-hidden shadow-2xl origin-center"
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
      {/* CLIP BACKGROUND LAYER */}
      <div
        ref={clipRef}
        className="absolute left-[-30%] bottom-[-30%] clip-start opacity-0 scale-0 origin-center hero-clip-path w-[150vw] h-[155vh] mix-blend-multiply z-0"
      />

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