"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Btn from "../button/Btn";
import IconButton from "../button/IconButton";

const QuoteContact = () => {
  const leftClipRef = useRef(null);
  const rightClipRef = useRef(null);
  const containerRef = useRef(null);
  const leftTriggerRef = useRef(null);
  const rightTriggerRef = useRef(null);
  const [currentImage, setCurrentImage] = useState("/assets/img/party-1.jpeg");

  useEffect(() => {
    const leftClip = leftClipRef.current;
    const rightClip = rightClipRef.current;
    const leftTrigger = leftTriggerRef.current;
    const rightTrigger = rightTriggerRef.current;

    // Left clip animations
    const tlLeftEnter = gsap.timeline({ paused: true });
    tlLeftEnter.to(
      leftClip,
      {
        clipPath: "polygon(41% 0%, 61.5% 0%, 90.5% 100%, 12.25% 100%)",
        duration: 0.3,
        ease: "power2.out",
      },
      0
    );

    const tlLeftLeave = gsap.timeline({ paused: true });
    tlLeftLeave.to(
      leftClip,
      {
        clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
        duration: 0.5,
        ease: "power2.out",
      },
      0
    );

    // Right clip animations
    const tlRightEnter = gsap.timeline({ paused: true });
    tlRightEnter.to(
      rightClip,
      {
        clipPath: "polygon(41% 0%, 61.5% 0%, 90.5% 100%, 12.25% 100%)",
        duration: 0.5,
        ease: "power2.out",
      },
      0
    );

    const tlRightLeave = gsap.timeline({ paused: true });
    tlRightLeave.to(
      rightClip,
      {
        clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
        duration: 0.3,
        ease: "power2.inOut",
      },
      0
    );

    const onLeftEnter = () => {
      tlLeftEnter.play(0);
      setCurrentImage("/assets/img/arena.jpeg");
    };
    const onLeftLeave = () => {
      tlLeftLeave.play(0);
      setCurrentImage("/assets/img/party-1.jpeg");
    };
    const onRightEnter = () => {
      tlRightEnter.play(0);
      setCurrentImage("/assets/img/party-2.jpeg");
    };
    const onRightLeave = () => {
      tlRightLeave.play(0);
      setCurrentImage("/assets/img/party-1.jpeg");
    };

    leftTrigger.addEventListener("mouseenter", onLeftEnter);
    leftTrigger.addEventListener("mouseleave", onLeftLeave);
    rightTrigger.addEventListener("mouseenter", onRightEnter);
    rightTrigger.addEventListener("mouseleave", onRightLeave);

    return () => {
      leftTrigger.removeEventListener("mouseenter", onLeftEnter);
      leftTrigger.removeEventListener("mouseleave", onLeftLeave);
      rightTrigger.removeEventListener("mouseenter", onRightEnter);
      rightTrigger.removeEventListener("mouseleave", onRightLeave);
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full h-screen relative overflow-hidden">
      {/* Image */}
      <Image
        key={currentImage}
        src={currentImage}
        height={1000}
        width={1000}
        alt="contact-img"
        className="h-full w-full object-cover duration-300 ease-in-out  "
      />

      <div className="absolute font-third z-0 top-[35%] left-[15%] underline text-[6.5vw] text-yellow">
          Quote
      </div>
       <div className="underline absolute font-third z-0 top-[35%] right-[13%] text-[6.5vw] text-yellow">
          Contact
      </div>

      {/* Left Clip Path */}
      <div
        ref={leftClipRef}
        className="absolute flex flex-col cursor-pointer items-center py-[2vw] gap-[9.5vw] top-0 left-0 w-1/2 h-full bg-[#E0FF98] pointer-events-none"
        style={{
          clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
        }}
        
      >
        <p className="text-[1.8vw] leading-none text-center font-third w-[8vw]">Your spotlights waiting</p>

        <div className="w-[22vw]  space-y-[2vw]">

        <p className="text-[3.2vw] text-center leading-[1.2] font-bold font-display">Have an event in mind ?</p>
        <p className="text-[1.3vw] font-medium text-center leading-[1.3]">Let's get you accurate numbers, strategic ideas, and a let's co-create your event–today.</p>

        <div className="w-fit mx-auto flex items-center gap-[1vw]">
         <p className="text-[0.8vw] font-semibold font-display uppercase">Get a custom  quote</p>
         <IconButton icon='/assets/icons/arrow.svg' size="2vw" />
        </div>
        </div>

        
      </div>

      {/* Right Clip Path */}
      <div
        ref={rightClipRef}
        className="absolute flex flex-col cursor-pointer items-center gap-[9.5vw] py-[2vw] pl-[1.2vw] top-0 right-0 w-1/2 h-full bg-[#E0FF98] pointer-events-none"
        style={{
          clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
        }}
      >
         <p className="text-[1.8vw] leading-none text-center font-third w-[8vw]">Your spotlights waiting</p>

        <div className="w-[22vw]  space-y-[2vw]">

        <p className="text-[3.2vw] text-center leading-[1.2] font-bold font-display">Got questions ? A wild idea ?</p>
        <p className="text-[1.3vw] font-medium text-center leading-[1.3]">We'll get you started or help you dream bigger.</p>

        <div className="w-fit mx-auto flex items-center gap-[1vw]">
         <p className="text-[0.8vw] font-semibold font-display uppercase">Contact us</p>
         <IconButton icon='/assets/icons/arrow.svg' size="2vw" />
        </div>
        </div>
      </div>

      {/* Left Trigger Area */}
      <div
        ref={leftTriggerRef}
        className="absolute top-0 left-0 w-1/2 h-full z-10"
      ></div>

      {/* Right Trigger Area */}
      <div
        ref={rightTriggerRef}
        className="absolute top-0 right-0 w-1/2 h-full z-10"
      ></div>
    </section>
  );
};

export default QuoteContact;