"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const projectOverlayRef = useRef(null);
  const animationRef = useRef(null);

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

  const getClipPathFromPosition = (x, width) => {
    // Normalize x position to 0-1 range
    const normalizedX = x / width;
    
    // Both points move more extreme range
    // Bottom-left X: moves from 5% to 85%
    const bottomLeftX = 2 + (normalizedX * 80);
    
    // Left-side Y: moves from 20% to 95% (matching the 80% range)
    const leftY = 2 + (normalizedX * 75);
    
    return `polygon(100% 0%, 100% 6.7%, ${bottomLeftX}% 100%, 0% 100%, 0% ${leftY}%, 93.5% 0%)`;
  };

  const handleProjectHover = (e) => {
    if (!projectOpen || !projectOverlayRef.current) return;
    
    const x = e.clientX;
    const width = window.innerWidth;
    const newClipPath = getClipPathFromPosition(x, width);
    
    // Cancel any ongoing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }
    
    // Animate to new clip path with GSAP
    animationRef.current = gsap.to(projectOverlayRef.current, {
      clipPath: newClipPath,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true
    });
  };

  useEffect(() => {
    if (projectOpen && projectOverlayRef.current) {
      // Animate in from center
      const centerX = window.innerWidth / 2;
      const initialClipPath = getClipPathFromPosition(centerX, window.innerWidth);
      
      gsap.fromTo(
        projectOverlayRef.current,
        {
          clipPath: "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)",
          opacity: 0
        },
        {
          clipPath: initialClipPath,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        }
      );
    } else if (!projectOpen && projectOverlayRef.current) {
      gsap.to(projectOverlayRef.current, {
        clipPath: "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)",
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [projectOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 w-full h-[3vw] flex items-start justify-between z-50">
      {/* Left - Menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center group gap-[1.5vw] cursor-pointer outline-none bg-yellow px-[2vw] h-full py-[1vw] rounded-br-[1vw] transition-all z-[10000]"
      >
        <div className="flex flex-col w-[1.4vw] justify-start gap-[0.2vw] relative group cursor-pointer">
          {/* Line 1 */}
          <span
            className={`block h-px w-full bg-black transform origin-left ease-in-out transition-transform duration-500 group-hover:scale-x-0 ${
              menuOpen
                ? "rotate-45 translate-y-1.5"
                : "rotate-0 translate-y-0 scale-x-100"
            }`}
          ></span>

          {/* Line 2 */}
          <span
            className={`block h-px w-full bg-black transform origin-left ease-in-out transition-transform duration-500 delay-100 group-hover:scale-x-0 ${
              menuOpen
                ? "-rotate-45 translate-y-0.5"
                : "rotate-0 translate-y-0 scale-x-100"
            }`}
          ></span>
        </div>

        <span className="text-[0.7vw] font-body font-semibold">
          {menuOpen ? "CLOSE" : "MENU"}
        </span>
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
      <button
        onClick={() => setProjectOpen(!projectOpen)}
        className="flex items-center gap-[1.5vw] cursor-pointer outline-none bg-yellow px-[2vw] h-full py-[1vw] rounded-bl-[1vw] transition-all"
      >
        <span className="text-[0.7vw] font-body font-semibold">
          GOT A PROJECT?
        </span>
      </button>

      {/* MENU OVERLAY */}
      <div
        className={`fixed top-0 left-0 z-[9999] w-[105vw] h-screen navbar-clip-path transition-all duration-700 ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        } origin-top-left`}
        style={{
          transform: menuOpen ? "scale(1)" : "scale(0)",
        }}
      >
        {/* Menu Content */}
        <div
          className={`flex flex-col items-end justify-end origin-left mr-[7.5vw] pb-[2.5vw] h-full text-center space-y-6 transition-opacity duration-700 ${
            menuOpen ? "opacity-100 delay-500" : "opacity-0"
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
                  className="font-third text-[4vw] text-right cursor-pointer transition-colors duration-300"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* PROJECT OVERLAY */}
      <div
        ref={projectOverlayRef}
        className={`fixed top-0 left-0 z-[10000] w-[105vw] h-screen bg-yellow ${
          projectOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onMouseMove={handleProjectHover}
        style={{
          clipPath: "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)",
          opacity: 0
        }}
      ></div>
    </nav>
  );
}