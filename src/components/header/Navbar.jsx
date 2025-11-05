"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track hovered nav item

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

  return (
    <nav className="fixed top-0 left-0 right-0 w-full h-[3vw] flex items-start justify-between z-50">
      {/* Left - Menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-[1.5vw] cursor-pointer outline-none bg-yellow px-[2vw] h-full py-[1vw] rounded-br-[1vw] transition-all z-[10000]"
      >
        <div className="flex flex-col w-[1.4vw] justify-start gap-[0.2vw] relative">
          {/* Hamburger Lines */}
          <span
            className={`block h-px w-full bg-black transform ease-in-out transition-all duration-500 ${
              menuOpen ? "rotate-45 translate-y-1.5" : "rotate-0 translate-y-0"
            }`}
          ></span>
          <span
            className={`block h-px w-full bg-black transform ease-in-out transition-all duration-600 ${
              menuOpen ? "-rotate-45 translate-y-0.5" : "rotate-0 translate-y-0"
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
      <button className="flex items-center gap-[1.5vw] cursor-pointer outline-none bg-yellow px-[2vw] h-full py-[1vw] rounded-bl-[1vw] transition-all">
        <span className="text-[0.7vw] font-body font-semibold">
          GOT A PROJECT?
        </span>
      </button>

      {/* Overlay */}
      <div
        className={`fixed top-0 left-0 z-[9999] w-screen h-screen navbar-clip-path bg-[#dfff81] transition-transform duration-500 ${
          menuOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-0 opacity-0 pointer-events-none"
        } origin-top-left`}
      >
        {/* Menu Content */}
        <div className="flex flex-col items-end justify-end origin-left mr-[2.5vw] pb-[2.5vw] h-full text-center space-y-6">
          <ul className="font-medium">
            {navItems.map((item, i) => (
              <li
                key={i}
                className={`leading-none text-right transition-opacity duration-300 ${
                  hoveredIndex !== null && hoveredIndex !== i ? "opacity-50" : "opacity-100"
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
    </nav>
  );
}
