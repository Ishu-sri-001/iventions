"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import {useLenis} from 'lenis/react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const lenis = useLenis();


  useEffect(() => {
    if (!lenis) return;

    if (menuOpen || projectOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [menuOpen, projectOpen]);

  const projectOverlayRef = useRef(null);
  const animationRef = useRef(null);
  const menuOverlayRef = useRef(null);

  const navItems = [
    { title: "About", href: "/about" },
    { title: "Events", href: "/events" },
    { title: "Exhibits", href: "/exhibits" },
    { title: "Congresses", href: "/congresses" },
    { title: "Sports", href: "/sports" },
    { title: "Work", href: "/work" },
    { title: "Insights", href: "/insights" },
    { title: "Contact", href: "/contact" },
  ];

  // const getClipPathFromPosition = (x, width) => {
  //   const normalizedX = x / width;
  //   const bottomLeftX = 2 + normalizedX * 90;
  //   const leftY = 2 + normalizedX * 75;
  //   return `polygon(100% 0%, 100% 6.7%, ${bottomLeftX}% 100%, 0% 100%, 0% ${leftY}%, 90% 0%)`;
  // };

const getClipPathFromPosition = (x, width) => {
  const normalizedX = x / width;
  const easedX = 1 - Math.pow(1 - normalizedX, 2.2); // smooth near right

  // Right side expands more
  const bottomLeftX = 5 + easedX * 80;
  const leftY = 5 + easedX * 50;

  // NEW: Left side retracts as right expands
  const leftX = easedX * 4; // tweak 4 → controls how much left side moves inward

  return `polygon(100% 0%, 100% 9.7%, ${bottomLeftX}% 100%, ${leftX}% 100%, ${leftX}% ${leftY}%, 98% 0%)`;
};


  const handleProjectHover = (e) => {
    if (!projectOpen || !projectOverlayRef.current) return;
    const x = e.clientX;
    const width = window.innerWidth;
    const newClipPath = getClipPathFromPosition(x, width);

    // Smooth hover distortion
    animationRef.current = gsap.to(projectOverlayRef.current, {
      clipPath: newClipPath,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
    });
  };

  useEffect(() => {
  const overlay = projectOverlayRef.current;
  
  if (!overlay) return;

  if (projectOpen) {
    // Prepare for animation
    gsap.set(overlay, {
      clipPath:
        "polygon(100% 0%, 100% 9.7%, 66.25% 100%, 0% 100%, 0% 75.25%, 98% 0%)",
        
        borderBottomLeftRadius: "5vw",
       transformOrigin: "top right",
    });
    gsap.set('.projectt-overlay', {
      transformOrigin: "top right",
    })

    // Animate IN from top right
    gsap.fromTo(
      '.projectt-overlay',
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power3.inOut",
      }
    );
  } else {
    // Animate OUT in the same direction (toward top right)
    gsap.to('.projectt-overlay', {
        scale: 0,
      opacity: 0,
      transformOrigin: "top right",
      duration: 0.8,
      ease: "power3.inOut",
      
    });
  }
}, [projectOpen]);

  useEffect(() => {
    const overlay = menuOverlayRef.current;
    if (!overlay) return;

    // gsap.set(overlay, {
    //   transformOrigin: "top left",
    //   scale: 0,
    // });

    if (menuOpen) {
      gsap.to(overlay, {
        scale: 1,
        duration: 0.8,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(overlay, {
        scale: 0,
        duration: 0.8,
        ease: "power3.inOut",
      });
    }
  }, [menuOpen]);


  const handleMenuHover = () => {
    if (!hasAnimated) {
      setHasAnimated(true);
      setTimeout(() => setHasAnimated(false), 500);
    }
  };

  return (

    <div >

      <div className="w-full flex  justify-center fixed top-0 z-9999 pt-[1vw] h-[2vw] mix-blend-exclusion invert">
         <Image
          src="/assets/svg/icon-logo.svg"
          alt="logo"
          width={500}
          height={500}
          className="object-contain "
        />
        
      </div>

    <nav id="navv" className="fixed top-0 left-0 right-0 w-full h-[3vw] flex items-start justify-between z-9999">
      {/* Left - Menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        onMouseEnter={handleMenuHover}
        className="flex items-center group gap-[1.5vw] cursor-pointer outline-none bg-yellow px-[2vw] h-full py-[1vw] rounded-br-[1vw] transition-all z-10000"
      >
        <div className="flex flex-col w-[1.4vw] justify-start gap-[0.2vw] relative group cursor-pointer">
          <span
            className={`block h-px w-full bg-black transform origin-left ease-in-out transition-transform duration-500 ${
              hasAnimated ? "scale-x-0" : "scale-x-100"
            } ${
              menuOpen
                ? "rotate-45 translate-y-[-0.5vw]"
                : "rotate-0 translate-y-0"
            }`}
          ></span>

          <span
            className={`block h-px w-full bg-black transform origin-left ease-in-out transition-transform duration-500 delay-100 ${
              hasAnimated ? "scale-x-0" : "scale-x-100"
            } ${
              menuOpen
                ? "-rotate-45 translate-y-[0.2vw]"
                : "rotate-0 translate-y-0"
            }`}
          ></span>
        </div>

        <span className="text-[0.7vw] font-body font-semibold">
          {menuOpen ? "CLOSE" : "MENU"}
        </span>
      </button>

      {/* Center - Logo */}
      {/* <div className="flex w-[7%] justify-center items-center my-auto">
        <Image
          src="/assets/svg/icon-logo.svg"
          alt="logo"
          width={500}
          height={500}
          className="object-contain "
        />
      </div> */}

      {/* Right - Got a Project */}
      <button
        onClick={() => setProjectOpen(!projectOpen)}
        className={`relative flex items-center overflow-hidden justify-center z-[10002] cursor-pointer outline-none bg-yellow px-[1vw] h-full py-[1vw] rounded-bl-[1vw] transition-all group `}
      >
        
        <div className="relative w-[7vw] h-[1vw] flex items-center justify-center overflow-hidden">
          <span
            className={`absolute transition-all duration-300 ease-in-out font-body text-[0.7vw] font-semibold ${
              projectOpen ? "opacity-0 translate-y-[-100%]" : "translate-y-0 opacity-100"
            }`}
          >
            GOT A PROJECT?
          </span>
          <span
            className={`absolute transition-all duration-300 ease-in-out font-body text-[0.7vw] font-semibold ${
              projectOpen
                ? "translate-y-0 opacity-100 delay-200"
                : "translate-y-full opacity-0"
            }`}
          >
            CLOSE
          </span>
        </div>
        <div className={`w-fit flex justify-center items-center absolute duration-300 ease-in-out right-[20%] ${projectOpen?"rotate-[135deg] opacity-100":"opacity-0 rotate-45 delay-200"}`}>
          <span className="w-[0.5vw] h-[1px] bg-black"/>
          <span className="w-[0.5vw] h-[1px] bg-black rotate-90 absolute"/>
        </div>

        {/* <div
          className={`flex flex-col w-[0.4vw] justify-start gap-[0.2vw] relative transition-all duration-500 `}
        >
          <span
            className={`block h-px w-full bg-black transform origin-left ease-in-out transition-all duration-500 ${
              projectOpen
                ? "rotate-45 translate-y-[0.2vw] opacity-100"
                : "rotate-0 translate-y-0 opacity-0"
            }`}
          ></span>

          <span
            className={`block h-px w-full bg-black transform origin-left ease-in-out transition-all duration-500 ${
              projectOpen
                ? "-rotate-45 translate-y-[0.1vw] opacity-100"
                : "rotate-0 translate-y-2 opacity-0"
            }`}
          ></span>
        </div> */}
      </button>
      

      {/* MENU OVERLAY */}

      <div
        ref={menuOverlayRef}
        className="fixed top-0 left-0 z-[9999] w-[128vw] h-[125vh] rounded-br-full overflow-hidden "
        style={{ transformOrigin: "top left", scale: 0 }}
      > <div
        className={` w-full h-full navbar-clip-path transition-all duration-700 ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        } origin-top-left`}
        
      >
        <div
          className={`flex flex-col items-end justify-end origin-left mr-[29vw] pb-[15vw] h-full text-center space-y-6  ${
            menuOpen ? "opacity-100 delay-700" : "opacity-0"
          }`}
        >
          <ul className="font-medium">
            {navItems.map((item, i) => (
              <li
                key={i}
                className={`leading-none text-right transition-opacity duration-300 ${
                  hoveredIndex !== null && hoveredIndex !== i
                    ? "opacity-50"
                    : "opacity-100"
                }`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link
                  href={item.href}
                  className="font-third text-[4vw] text-right origin-right cursor-pointer transition-colors duration-300"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>

      {/* PROJECT OVERLAY */}
      <div className="fixed  top-[-5%] projectt-overlay z-10001  left-[-30%] w-[130vw] h-[135vh] rounded-bl-full overflow-hidden"
          style={{
          transformOrigin: "top right",
          transform: projectOpen ? "scale(1)" : "scale(0)",
        }}
      >

      <div
        ref={projectOverlayRef}
        className={` bg-yellow w-full h-full ${
          projectOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onMouseMove={handleProjectHover}
        
        >
       
        <div className="h-full w-full px-[2vw] flex ">
          <div className="w-[55%] flex flex-col items-end justify-center">
            <div className="w-[40%] cursor-pointer">
              <p className="text-[1.8vw]  leading-[1.2]]  font-display pb-[2vw]">
                Get a Quote
              </p>

              <div className="w-[28vw]   space-y-[2vw]">
                <div className="group">
                  <p className="text-[4vw]  relative  leading-[1.1]  font-third ">
                    Have an event
                    <span className="absolute bottom-0 scale-x-0 transition-all ease-out duration-1000 origin-left group-hover:scale-x-100 left-0 w-full h-[0.2px] bg-black"></span>
                  </p>
                  <p className="text-[4vw] w-fit relative  leading-[1.1]  font-third ">
                    in mind ?
                    <span className="absolute bottom-0 scale-x-0 transition-all ease-out duration-1000 origin-left group-hover:scale-x-100 left-0 w-full h-[0.2px] bg-black"></span>
                  </p>
                </div>
                <p className="text-[1.3vw] w-[80%] font-medium  leading-[1.3]">
                  Let's get you accurate numbers, strategic ideas, and a let's
                  co-create your event–today.
                </p>
              </div>
            </div>
          </div>

          <div className="w-[45%] flex flex-col items-end justify-center">
            <div className="w-[70%] cursor-pointer">
              <p className="text-[1.8vw] leading-none  font-display pb-[2vw]">
                Contact
              </p>

              <div className="w-[33vw]   space-y-[2vw]">
                <div className="group">
                  <p className="text-[4vw]  relative  leading-[1.1]  font-third ">
                    Got a big version ?
                    <span className="absolute bottom-0 scale-x-0 transition-all ease-in-out duration-400 origin-left group-hover:scale-x-100 left-0 w-full h-[0.2px] bg-black"></span>
                  </p>
                  <p className="text-[4vw] w-fit relative  leading-[1.1]  font-third ">
                    or a big idea ?
                    <span className="absolute bottom-0 scale-x-0 transition-all ease-in-out duration-400 origin-left group-hover:scale-x-100 left-0 w-full h-[0.2px] bg-black"></span>
                  </p>
                </div>
                <p className="text-[1.3vw] w-[80%] font-medium  leading-[1.3]">
                  We'll get you started or help you bigger dreams
                </p>
              </div>
            </div>
          </div>
        </div>
         </div>
      </div>

              {/* BLACK OVERLAY for MENU */}
      <div
        className={`fixed inset-0 bg-black  transition-opacity duration-700 ${
          menuOpen ? "opacity-60" : "opacity-0"
        } pointer-events-none z-[9998]`}
      ></div>

      
      {/* BLACK OVERLAY for PROJECT (higher z-index) */}
<div
  className={`fixed inset-0 bg-black transition-opacity duration-700 ${
    projectOpen ? "opacity-60 pointer-events-auto" : "opacity-0 pointer-events-none"
  } z-[10000]`}
></div>




    </nav>
        </div>

  );
}
