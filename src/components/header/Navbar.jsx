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
    gsap.set('.nav-menu-item', {
      yPercent:-100,
      // opacity:1,
    })
    const ctx= gsap.context(() => {
      gsap.fromTo('.nav-menu-item-first', {
        yPercent:-100,
      }, {
        yPercent:0,
        delay:0.5,
          ease:'power2.out',
          duration:0.4,
      })
      gsap.fromTo('.nav-menu-item', {
          yPercent:-100,
          
      },
      {
        yPercent:0,
        stagger:0.2,
          duration: 0.7,
        ease:'power2.out',
        delay:1,
      })
    })
    return () => ctx.revert();
  },[])


  useEffect(() => {
    if (!lenis) return;

    if (menuOpen || projectOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [menuOpen, projectOpen]);

  const projectOverlayRef = useRef(null);
  const projectWrapperRef = useRef(null);
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

  // Increased right side movement
  const bottomLeftX = 5 + easedX * 75; // increased from 61.25 to 75 for more right movement
  const leftY = 5 + easedX * 89; // increased from 70.25 to 85 for more vertical movement

  // Left side movement
  const leftX = easedX * 8;

  return `polygon(100% 0%, 100% 4.75%, ${bottomLeftX}% 100%, ${leftX}% 100%, ${leftX}% ${leftY}%, 92.5% 0%)`;
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
  const wrapper = projectWrapperRef.current;
  
  if (!wrapper) return;

  const closedClip = "circle(0% at 100% 0%)";
  const openClip = "circle(160% at 100% 0%)";

  if (projectOpen) {
    // Set initial clip path on the inner overlay
    gsap.set(projectOverlayRef.current, {
      clipPath:
        "polygon(100% 0%, 100% 4.75%, 66.25% 100%, 0% 100%, 0% 75.25%, 92.5% 0%)",
      borderBottomLeftRadius: "5vw",
    });

    // Animate wrapper with circle clip-path
    gsap.fromTo(
      wrapper,
      { clipPath: closedClip },
      {
        clipPath: openClip,
        duration: 0.8,
        ease: "power1.inOut",
      }
    );
  } else {
    // Animate OUT
    gsap.to(wrapper, {
      clipPath: closedClip,
      duration: 0.8,
      ease: "power1.inOut",
    });
  }
}, [projectOpen]);

  useEffect(() => {
  const overlay = menuOverlayRef.current;
  if (!overlay) return;

  const closedClip = "circle(0% at 0% 0%)";
  const openClip = "circle(160% at 0% 0%)"; 
  // 160% so circle fully covers 128vw x 125vh

  if (menuOpen) {
    gsap.fromTo(
      overlay,
      { clipPath: closedClip },
      {
        clipPath: openClip,
        duration: 0.8,
        ease: "power1.inOut",
      }
    );
  } else {
    gsap.to(overlay, {
      clipPath: closedClip,
      duration: 0.8,
      ease: "power1.inOut",
    });
  }
}, [menuOpen]);



  const handleMenuHover = () => {
    if (!hasAnimated) {
      setHasAnimated(true);
      setTimeout(() => setHasAnimated(false), 500);
    }
    gsap.fromTo('.menu-below-text', {
      y:'1vw',
      opacity:0,
    }, {
      y:'0vw',
      opacity:1,
      duration:0.3,
    })
    gsap.to('.menu-top-text', {
      y:'-1vw',
      duration:0.3,
    })
  };

  const leaveNav = () => {
      gsap.to('.menu-top-text', { y: '0vw', duration: 0, ease: "linear" });
      gsap.to('.menu-below-text', { y: '1vw', duration: 0, ease: "linear" });
    };

    const handleProjectEnter = () => {
    
    gsap.fromTo('.project-below-text', {
      y:'2vw',
      opacity:0,
    }, {
      y:'0vw',
      opacity:1,
      duration:0.3,
    })
    gsap.to('.project-top-text', {
      y:'-2vw',
      duration:0.3,
    })
  };

  const LeaveProjectHover = () => {
      gsap.to('.project-top-text', { y: '0vw', duration: 0, ease: "linear" });
      gsap.to('.project-below-text', { y: '2vw', duration: 0, ease: "linear" });
    };

  return (

    <div id='navbar-over' className="space-y-0" >

      <div className="w-full flex  origin-top nav-menu-item-first justify-center fixed top-0 z-9999 pt-[1vw] h-[2vw] mix-blend-exclusion invert">
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
        onClick={() => {
    if (projectOpen) setProjectOpen(false); 
    setMenuOpen(!menuOpen);
  }}
        onMouseEnter={handleMenuHover}
        onMouseLeave={leaveNav}
        className="flex  overflow-hidden  nav-menu-item items-center group gap-[1.5vw] cursor-pointer outline-none bg-yellow px-[2vw] h-full py-[1vw] rounded-br-[1vw]  z-10000 relative"
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
       <div className="h-[1vw] relative group overflow-hidden">

  <div
    className="
      w-full h-[2vw]
      transition-none
      group-hover:transition-all group-hover:duration-300
      group-hover:translate-y-[-1vw]
      flex flex-col items-start justify-end
    "
  >
    <span className="text-[0.7vw] menu-top font-body font-semibold">
      {menuOpen ? "CLOSE" : "MENU"}
    </span>

    <span className="text-[0.7vw] menu-below- font-semibold font-body">
      {menuOpen ? "CLOSE" : "MENU"}
    </span>
  </div>

</div>

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
        disabled={menuOpen}
      onMouseEnter={handleProjectEnter}
      onMouseLeave={LeaveProjectHover}
onClick={() => {
    if (menuOpen) setMenuOpen(false); 
    setProjectOpen(!projectOpen);
  }}
          className={`relative nav-menu-item  flex items-center overflow-hidden justify-center  cursor-pointer outline-none bg-yellow px-[1vw] h-full py-[1vw] rounded-bl-[1vw]  group ${menuOpen? 'z-9995': 'z-10002'}`}
      >
        
        <div className="relative w-[7vw] h-[1vw] flex items-center justify-center overflow-hidden">
          <div className="absolute project-top-text w-full h-full flex items-center justify-center overflow-hidden">

          <span
  className={`
    absolute font-body text-[0.7vw] font-semibold
    ${projectOpen 
      ? "transition-all duration-300 opacity-0 translate-y-[-100%]" 
      : "transition-none translate-y-0 opacity-100"
    }
  `}
>
  GOT A PROJECT?
</span>

<span
  className={`
    absolute font-body text-[0.7vw] font-semibold
    ${projectOpen
      ? "transition-all duration-300 translate-y-0 opacity-100 delay-200"
      : "transition-none translate-y-full opacity-0"
    }
  `}
>
  CLOSE
</span>

            </div>
           <div className="absolute project-below-text w-[7vw] h-[1vw] flex items-center justify-center overflow-hidden">
          <span
  className={`
    absolute font-body text-[0.7vw] font-semibold
    ${projectOpen
      ? "transition-all duration-300 translate-y-[-100%] opacity-0"
      : "transition-none translate-y-0 opacity-100"
    }
  `}
>
  GOT A PROJECT?
</span>

<span
  className={`
    absolute font-body text-[0.7vw] font-semibold
    ${projectOpen
      ? "transition-all duration-300 translate-y-0 opacity-100 delay-200"
      : "transition-none translate-y-full opacity-0"
    }
  `}
>
  CLOSE
</span>

        </div>
        </div>
        <div className={`w-fit flex justify-center items-center absolute duration-300 ease-in-out right-[20%] ${projectOpen?"rotate-[135deg] opacity-100":"opacity-0 rotate-45 delay-200"}`}>
          <span className="w-[0.5vw] h-[1px] bg-black"/>
          <span className="w-[0.5vw] h-[1px] bg-black rotate-90 absolute"/>
        </div>

       
      </button>
      

      {/* MENU OVERLAY */}

      <div
        ref={menuOverlayRef}
        className="fixed top-0 left-0 z-[9999] w-[128vw] h-[125vh] rounded-br-full overflow-hidden "
          style={{ clipPath: "circle(0% at 0% 0%)" }}
      > <div
        className={` w-full h-full navbar-clip-path transition-all duration-700 ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        } origin-top-left`}
        
      >
        <div
          className={`flex flex-col items-end justify-end origin-left mr-[29vw] pb-[15vw] h-full text-center space-y-6  ${
            menuOpen ? "opacity-100 delay" : "opacity-100"
          }`}
        >
          <ul className="font-medium">
            {navItems.map((item, i) => (
              <li
                key={i}
                className={`leading-none w-fit h-fit  text-right transition-opacity ease-in-out duration-300 ${
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
      <div 
        ref={projectWrapperRef}
        className="fixed top-0 right-0 z-10001 w-[130vw] h-[135vh] rounded-bl-full overflow-hidden"
        style={{
          clipPath: "circle(0% at 100% 0%)",
        }}
      >

      <div
        ref={projectOverlayRef}
        className={` bg-yellow w-full h-full ${
          projectOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onMouseMove={handleProjectHover}
        
        >
       
        <div className="h-[70%] w-full px-[2vw] flex ">
          <div className="w-[55%] flex flex-col items-end justify-center">
            <div className="w-[40%] cursor-pointer">
              <p className="text-[1.8vw]  leading-[1.2]]  font-display pb-[2vw]">
                Get a Quote
              </p>

              <div className="w-[28vw] space-y-[2vw]">
                <div className="group">
                  <p className="text-[4vw]  relative tracking-tighter  leading-[1.1] font-third ">
                    Have an event
                    <span className="absolute bottom-0 scale-x-0 transition-all ease-out duration-1000 origin-left group-hover:scale-x-100 left-0 w-full h-[0.2px] bg-black"></span>
                  </p>
                  <p className="text-[4vw] tracking-tighter w-fit relative  leading-[1.1]  font-third ">
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
                  <p className="text-[4vw]  relative  leading-[1.1] tracking-tighter  font-third font ">
                    Got a big version ?
                    <span className="absolute bottom-0 scale-x-0 transition-all ease-in-out duration-400 origin-left group-hover:scale-x-100 left-0 w-full h-[0.2px] bg-black"></span>
                  </p>
                  <p className="text-[4vw] w-fit relative  leading-[1.1] tracking-tighter font-third ">
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