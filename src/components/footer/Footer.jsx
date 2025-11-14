'use client'
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animatedPos = useRef({ x: 0, y: 0 });
  const circleRef = useRef(null);
  const containerRef = useRef(null);

  const [hoveredIndex, setHoveredIndex] = useState(null); // For Explore menu hover effect

  const navItems = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Events", href: "/events" },
    { title: "Exhibits", href: "/exhibits" },
    { title: "Congresses", href: "/congresses" },
    { title: "Sports", href: "/sports" },
    { title: "Work", href: "/work" },
    { title: "Insights", href: "/insights" },
    { title: "Contact", href: "/contact" },
  ];

  const socialItems = [
    { title: "LinkedIn", href: "https://linkedin.com" },
    { title: "Instagram", href: "https://instagram.com" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.fromTo('#footer-wrapper', {
          yPercent:-50,
        }, {
          yPercent:0,
          ease:'none',
          scrollTrigger: {
            trigger:'#footer-wrapper',
             start: 'top bottom',
          end:'bottom 50%',
          scrub: true,
          // markers:true,
          }

        })
    })
    ScrollTrigger.refresh();
    return () => ctx.revert();
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      const initialX = containerWidth / 2;
      const initialY = containerHeight * 0.75;
      setMousePos({ x: initialX, y: initialY });
      animatedPos.current = { x: initialX, y: initialY };
    }
  }, []);

  useEffect(() => {
    gsap.to(animatedPos.current, {
      x: mousePos.x,
      y: mousePos.y,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        if (circleRef.current && containerRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const svgX = (animatedPos.current.x / containerWidth) * 1856;
          circleRef.current.setAttribute('x', svgX - 464);
        }
      }
    });
  }, [mousePos]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className='h-fit translate-y-[-50%] w-full relative z-5' id='footer-wrapper'>
    <footer 
      ref={containerRef}
      className='w-full h-screen mt-0 sticky top-0 bg-[#1E1E1E] flex flex-col items-stretch justify-between p-[2vw]'
      onMouseMove={handleMouseMove}
    >
      

      {/* TOP SECTION */}
      <div className="w-full h-[60%] bg-[#1E1E1E] flex justify-between items-start text-white">
        <div className="flex flex-col justify-between h-full">
          <div className="w-[4.5vw]">
            <Image
              src="/assets/img/great-place-to-work.png"
              width={500}
              height={500}
              alt="Great Place To Work"
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center h-full">
          <h1 className="text-[4vw] font-third leading-[1]">
            Step into the <br /> Spotlight
          </h1>
          <div className="text-[1vw] leading-[1.6vw] font-light text-gray-300 mt-auto">
            <p>Iventions International Events</p>
            <p>Av. Diagonal 433, 4-2</p>
            <p>Barcelona, Spain</p>
            <p className="mt-[1vw]">+34 933 028 640</p>
          </div>
        </div>

        {/* RIGHT SIDE MENU WITH ANIMATION */}
        <div className="flex justify-between opacity-90 h-full px-[4vw] w-[30vw]">
          {/* EXPLORE */}
          <div className="flex flex-col">
            <span className="uppercase text-[0.7vw] font-semibold mb-[1vw] tracking-[0.05em]">
              Explore
            </span>
            <ul className="font-display text-[2vw] leading-[1.4vw] space-y-[0.6vw]">
              {navItems.map((item, i) => (
                <li
                  key={i}
                  className={`leading-none transition-opacity duration-300 ${
                    hoveredIndex !== null && hoveredIndex !== i
                      ? "opacity-50"
                      : "opacity-100"
                  }`}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Link
                    href={item.href}
                    className=" cursor-pointer transition-colors duration-300 hover:text-[#E0FF98]"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONNECT */}
          <div className="flex flex-col">
            <span className="uppercase text-[0.7vw] font-semibold mb-[1vw] tracking-[0.05em]">
              Connect
            </span>
            <ul className="font-display text-[2vw] leading-[1.4vw] space-y-[0.6vw]">
              {socialItems.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    target="_blank"
                    className=" cursor-pointer transition-colors duration-300 hover:text-[#E0FF98]"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM SVG SECTION */}
      <div className='relative w-full h-[25%] bg-[#1E1E1E] overflow-hidden'>
        {/* BASE SVG */}
        <svg preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 1856 266" className="absolute inset-0">
          {/* Dark paths */}
          <g>
            <path d="M0 260V5H64V260H0Z" fill="#1E1E1E"></path>
            <path d="M239.476 260L324 6H254.491L195.483 199.872C192.591 210.384 179.615 209.216 179.615 199.872C179.615 190.527 181.517 6 181.517 6H75L157.398 260H239.447H239.476Z" fill="#1E1E1E"></path>
            <path d="M564 259.971V5H642.648L734.598 161.613C738.011 167.43 746.938 165.003 746.938 158.251V5.02921H811V260H732.352L640.402 103.387C636.989 97.5705 628.062 99.9966 628.062 106.749V259.971H564Z" fill="#1E1E1E"></path>
            <path d="M1381 259.971V5H1459.65L1551.6 161.613C1555.01 167.43 1563.94 165.003 1563.94 158.251V5.02921H1628V260H1549.35L1457.4 103.387C1453.99 97.5705 1445.06 99.9966 1445.06 106.749V259.971H1381Z" fill="#1E1E1E"></path>
            <path d="M895.744 259V66.3613C895.744 60.8648 891.326 56.4209 885.861 56.4209H822V4H1033V56.4209H969.488C964.023 56.4209 959.605 60.8648 959.605 66.3613V259H895.773H895.744Z" fill="#1E1E1E"></path>
            <path d="M1044 260V5H1108V260H1044Z" fill="#1E1E1E"></path>
            <path d="M1119 132.81C1119 56.2473 1164.19 0 1245 0C1325.81 0 1371 56.2765 1371 132.81C1371 209.344 1325.08 266 1245 266C1164.92 266 1119 209.724 1119 132.81ZM1305.48 132.81C1305.48 88.6472 1291.24 52.336 1244.97 52.336C1198.7 52.336 1184.47 88.6472 1184.47 132.81C1184.47 176.973 1198.35 213.635 1244.97 213.635C1291.59 213.635 1305.48 177.324 1305.48 132.81Z" fill="#1E1E1E"></path>
            <path d="M1639 173.782H1703.63C1703.63 203.353 1726.02 214.388 1754.78 214.388C1778.56 214.388 1790.64 204.784 1790.64 191.589C1790.64 169.87 1765.43 164.177 1730.27 153.493C1686.22 139.948 1646.8 122.87 1646.8 77.272C1646.8 21.7191 1690.12 0 1744.82 0C1804.12 0 1850.64 31.3525 1852.42 82.9645H1787.79C1784.94 63.3764 1769.33 51.612 1744.82 51.612C1725.64 51.612 1712.16 58.0342 1712.16 72.6304C1712.16 89.7371 1726.36 95.4296 1758.68 105.034C1806.63 119.28 1856 132.825 1856 185.517C1856 234.297 1819.06 266 1755.51 266C1691.95 266 1639.03 232.166 1639.03 173.752L1639 173.782Z" fill="#1E1E1E"></path>
            <path d="M552.474 145.638C553 141.535 553 134.435 553 127.597C553 48.9146 507.157 0 433.352 0C359.547 0 309 51.9117 309 132.253C309 212.594 357.794 265 433.352 265C492.548 265 535.06 234.097 549.961 180.178L552.007 172.816H492.84L491.701 177.152C489.977 183.612 479.137 215.911 434.316 215.911C406.968 215.911 375.004 200.139 369.131 156.666C368.693 153.524 371.176 150.701 374.361 150.701H551.861L552.503 145.609L552.474 145.638ZM493.132 103.038H375.267C371.906 103.038 369.335 99.8951 370.124 96.6361C377.166 67.7122 400.715 49.0892 431.95 49.0892C466.661 49.0892 490.619 70.5348 493.132 103.038Z" fill="#1E1E1E"></path>
          </g>
        </svg>

        {/* MASKED SVG */}
         <svg 
          preserveAspectRatio="none" 
          width="100%" 
          height="100%" 
          viewBox="0 0 1856 266"
          className="absolute inset-0"
        >
       
          <defs>
            <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="10%" stopColor="white" stopOpacity="0.3" />
              <stop offset="50%" stopColor="white" stopOpacity="1" />
              <stop offset="90%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="cursorMask">
              <rect width="100%" height="100%" fill="black" />
              <rect ref={circleRef} x="528" y="0" width="1300" height="266" fill="url(#fadeGradient)" />
            </mask>
          </defs>
        <g mask="url(#cursorMask)">

           <path d="M0 260V5H64V260H0Z" fill="#E0FF98"></path>
            <path d="M239.476 260L324 6H254.491L195.483 199.872C192.591 210.384 179.615 209.216 179.615 199.872C179.615 190.527 181.517 6 181.517 6H75L157.398 260H239.447H239.476Z" fill="#E0FF98"></path>
            <path d="M564 259.971V5H642.648L734.598 161.613C738.011 167.43 746.938 165.003 746.938 158.251V5.02921H811V260H732.352L640.402 103.387C636.989 97.5705 628.062 99.9966 628.062 106.749V259.971H564Z" fill="#E0FF98"></path>
            <path d="M1381 259.971V5H1459.65L1551.6 161.613C1555.01 167.43 1563.94 165.003 1563.94 158.251V5.02921H1628V260H1549.35L1457.4 103.387C1453.99 97.5705 1445.06 99.9966 1445.06 106.749V259.971H1381Z" fill="#E0FF98"></path>
            <path d="M895.744 259V66.3613C895.744 60.8648 891.326 56.4209 885.861 56.4209H822V4H1033V56.4209H969.488C964.023 56.4209 959.605 60.8648 959.605 66.3613V259H895.773H895.744Z" fill="#E0FF98"></path>
            <path d="M1044 260V5H1108V260H1044Z" fill="#E0FF98"></path>
            <path d="M1119 132.81C1119 56.2473 1164.19 0 1245 0C1325.81 0 1371 56.2765 1371 132.81C1371 209.344 1325.08 266 1245 266C1164.92 266 1119 209.724 1119 132.81ZM1305.48 132.81C1305.48 88.6472 1291.24 52.336 1244.97 52.336C1198.7 52.336 1184.47 88.6472 1184.47 132.81C1184.47 176.973 1198.35 213.635 1244.97 213.635C1291.59 213.635 1305.48 177.324 1305.48 132.81Z" fill="#E0FF98"></path>
            <path d="M1639 173.782H1703.63C1703.63 203.353 1726.02 214.388 1754.78 214.388C1778.56 214.388 1790.64 204.784 1790.64 191.589C1790.64 169.87 1765.43 164.177 1730.27 153.493C1686.22 139.948 1646.8 122.87 1646.8 77.272C1646.8 21.7191 1690.12 0 1744.82 0C1804.12 0 1850.64 31.3525 1852.42 82.9645H1787.79C1784.94 63.3764 1769.33 51.612 1744.82 51.612C1725.64 51.612 1712.16 58.0342 1712.16 72.6304C1712.16 89.7371 1726.36 95.4296 1758.68 105.034C1806.63 119.28 1856 132.825 1856 185.517C1856 234.297 1819.06 266 1755.51 266C1691.95 266 1639.03 232.166 1639.03 173.752L1639 173.782Z" fill="#E0FF98"></path>
            <path d="M552.474 145.638C553 141.535 553 134.435 553 127.597C553 48.9146 507.157 0 433.352 0C359.547 0 309 51.9117 309 132.253C309 212.594 357.794 265 433.352 265C492.548 265 535.06 234.097 549.961 180.178L552.007 172.816H492.84L491.701 177.152C489.977 183.612 479.137 215.911 434.316 215.911C406.968 215.911 375.004 200.139 369.131 156.666C368.693 153.524 371.176 150.701 374.361 150.701H551.861L552.503 145.609L552.474 145.638ZM493.132 103.038H375.267C371.906 103.038 369.335 99.8951 370.124 96.6361C377.166 67.7122 400.715 49.0892 431.95 49.0892C466.661 49.0892 490.619 70.5348 493.132 103.038Z" fill="#E0FF98"></path>
          </g>
        </svg>
      </div>
   

    </footer>
      </div>
  );
};

export default Footer;
