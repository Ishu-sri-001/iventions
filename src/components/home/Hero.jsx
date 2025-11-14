"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/dist/SplitText";
import ClipPath from "../ClipPath";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
  const videoRef = useRef(null);
  const clipRef = useRef(null);
  const heroRef = useRef(null);
  const [isFullyScaled, setIsFullyScaled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      const splitHero = new SplitText(".hero-text", {
          type: "chars,lines",
          linesClass: "lines",
          mask: "lines",
        });

        gsap.set('.ivention-overlay', {
          opacity:0,
        })

        tl.from(splitHero.lines, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
          delay:1,
          ease: "power3.out",
        })

      gsap.to('.hero-video', {
        scale: 3.0,
        rotateX: 0,
        rotateY: 0,
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          // markers:true,
          onUpdate: (self) => {
            // Disable mouse effects only when scroll is complete
            setIsFullyScaled(self.progress >= 0.90);
          },
        }
      });

        
        tl.to(videoRef.current, {
          opacity: 1,
        }, '-=0.5');
      
    })
    return () => ctx.revert();
  }, []);

  const baseRotateX = 5;
  const baseRotateY = -5;

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
    const clipRotateY = baseRotateY - normX * 15;
    const clipRotateX = baseRotateX + normY * 15;

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
        // scale: 1,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(clip, {
        rotateX: baseRotateX,
        rotateY: baseRotateY,
        // scale: 1,
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
      className="w-screen h-[140vh] relative  "
    >
      <div className="fixed inset-0 bg-[#F3EFEB] pointer-events-none h-full w-full ivention-overlay z-10">

      </div>

      <div className="h-screen w-full sticky top-0 overflow-hidden flex justify-center items-center">

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
      {/* <div
        ref={clipRef}
        className="absolute left-[-30%] bottom-[-30%] clip-start opacity-0 scale-0 origin-center hero-clip-path w-[155vw] h-[155vh] mix-blend-multiply z-0"
      /> */}
<ClipPath clipRef={clipRef} />

      {/* TEXT LAYER */}
      <div className="absolute inset-0 h-full w-full flex items-center text-[#101417] justify-between z-20 px-[3vw]">
        <p className="text-[2.5vw] font-third leading-none hero-text">
          Step into <br /> the Spotlight
        </p>
        <p className="w-[23%] text-[1.3vw] leading-normal hero-text">
          We craft world-class spaces & events memories, initiate conversations
          and elevate ambitions.
        </p>
      </div>

      {/* SVG DECORATION */}
     <div className="absolute bottom-5 left-0 w-full h-[25%] px-[2vw]">
  <Image
    width={1000}
    height={1000}
    src="/assets/svg/home-hero.svg"c
    alt="text-svg"
    className="absolute bottom-5 left-0 w-full h-full object-contain mix-blend-color-burn opacity-90 z-10"
  />
  <Image
    width={1000}
    height={1000}
    src="/assets/svg/home-hero.svg"
    alt="text-svg"
    className="absolute bottom-5 left-0 w-full h-full object-contain mix-blend-color-burn opacity-90 z-10"
  />
</div>

      {/* LIGHT OVERLAY */}
      <div className="w-full h-full absolute inset-0 z-15 bg-black/5" />
            </div>

    </section>
  );
};

export default Hero;