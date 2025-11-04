"use client";
import React, {useEffect} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

export default function ClippedTextSection() {

  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.to('.moving-about', {
          yPercent:-100,
          scrollTrigger: {
            trigger: '#about',
            start: 'top bottom',
            end: 'bottom top',
            scrub:true,
            // markers:true,

          }
        })
    })
    return () => ctx.revert();
  })

  return (
    <section id='about' className="relative w-screen h-[300vh] bg-yellow text-black">
      {/* Sticky background image */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/img/about-bg-2.jpeg')", 
          }}
        ></div>

        {/* Moving text block */}
        <div className="absolute inset-0 flex flex-col moving-about justify-center bg-yellow items-center px-[10vw]">
          <div
            className="text-[7vw] font-bold leading-[1.1] text-center bg-cover bg-center bg-clip-text text-transparent"
            style={{
              backgroundImage: "url('/assets/img/about-bg-2.jpeg')",
            }}
          >
            Designed to be remembered.
            <br />
            We build experiences that audiences feel,
            <br />
            not just attend.
          </div>
        </div>
      </div>
    </section>
  );
}
