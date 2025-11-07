"use client";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitText from "gsap/dist/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function ClippedTextSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextSlideIndex, setNextSlideIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInSlider, setIsMouseInSlider] = useState(false);
  const textRef = useRef(null);
  const autoPlayTimerRef = useRef(null);
  const sectionRef = useRef(null);
  const maskRef = useRef(null);
  const cursorRef = useRef(null);

  //  Each slide has its own background + text
  const slides = [
    {
      image: "/assets/img/about-bg.jpeg",
      heading: "Turkish Airlines: Empowering connection and growth ",
      category: "Sports",
      country: "Dubai",
      description: "lorem ipsum 1",
      lines: [
        "Designed to be",
        "remembered.",
        "We build experiences",
        "that audiences feel,",
        "not just attend.",
      ],
    },
    {
      image: "/assets/img/about-bg-2.jpeg",
      heading: "Turkish Airlines-2",
      category: "Events",
      country: "Barcelone",
      description: "lorem ipsum 2",
      lines: [
        "Crafted for",
        "lasting impressions.",
        "Design that moves",
        "beyond pixels,",
        "into emotion.",
      ],
    },
    {
      image: "/assets/img/about-bg-3.jpeg",
      heading: "Turkish Airlines-3",
      category: "Sports",
      country: "America",
      description: "lorem ipsum 3",
      lines: [
        "Every idea",
        "is an experience.",
        "We make brands",
        "breathe life",
        "into stories.",
      ],
    },
    {
      image: "/assets/img/about-bg-4.jpeg",
      heading: "Turkish Airlines-4",
      category: "Events",
      country: "Barcelone",
      description: "lorem ipsum 4",
      lines: [
        "Inspire.",
        "Engage.",
        "Connect.",
        "Moments that",
        "resonate deeply.",
      ],
    },
    {
      image: "/assets/img/about-bg-5.jpeg",
      heading: "Turkish Airlines-5",
      category: "Sports-5",
      country: "Dubai",
      description: "lorem ipsum 5",
      lines: [
        "From concept",
        "to connection.",
        "We craft",
        "impactful stories",
        "that stay.",
      ],
    },
  ];

  // GSAP ScrollTrigger for mask animation
  useEffect(() => {
    if (!maskRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(maskRef.current, {
        yPercent: -120,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "50% top",
          scrub: true,
          // markers:true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const isSliderActive = scrollProgress >= 0.9;

  // Auto-play timer
  useEffect(() => {
    if (!isSliderActive || isTransitioning) return;

    // Clear existing timer
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }

    // Set new timer for 5 seconds
    autoPlayTimerRef.current = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [isSliderActive, currentSlide, isTransitioning]);

  // Animate text whenever slide changes (or when slider activates)
  useEffect(() => {
    if (!isSliderActive || !textRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      requestAnimationFrame(() => {
        const splitText = new SplitText(".about-slider-text", {
          type: "chars,lines",
          linesClass: "lines",
          mask: "lines",
        });

        tl.from(splitText.lines, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    }, textRef);

    return () => ctx.revert();
  }, [currentSlide, isSliderActive]);

  // Slide navigation with transition
  const changeSlide = (newIndex) => {
    if (isTransitioning) return;

    // Clear auto-play timer when manually changing slides
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }

    setIsTransitioning(true);
    setNextSlideIndex(newIndex);

    // Wait full animation duration (1.2s)
    setTimeout(() => {
      setCurrentSlide(newIndex);
      setIsTransitioning(false);
    }, 1200);
  };

  const nextSlide = () => changeSlide((currentSlide + 1) % slides.length);
  const prevSlide = () =>
    changeSlide((currentSlide - 1 + slides.length) % slides.length);

  // Handle mouse movement
  const handleMouseMove = (e) => {
    if (!isSliderActive) return;
    const x = e.clientX;
    const y = e.clientY;
    setMousePosition({ x, y });

    // Very smooth follow with GSAP
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: x,
        y: y,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
  };

  // Handle click on screen halves
  const handleScreenClick = (e) => {
    if (!isSliderActive || isTransitioning) return;

    const screenWidth = window.innerWidth;
    const clickX = e.clientX;

    if (clickX < screenWidth / 2) {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  // Get cursor text based on position
  const getCursorText = () => {
    if (!isSliderActive) return "";
    const screenWidth = window.innerWidth;
    return mousePosition.x < screenWidth / 2 ? "Previous" : "Next";
  };

  return (
    <section ref={sectionRef} id="about" className="relative w-screen h-[300vh]">
      <style jsx>{`
        @keyframes expandSingleV {
          0% {
            clip-path: polygon(
              100% 50%,
              100% 49.75%,
              100% 50%,
              0% 50.3%,
              100% 50%
            );
          }
          50% {
            /* Create the angled V shape diagonally */
            clip-path: polygon(
              100% 0%,
              100% 100%,
              100% 100%,
              0% 50.3%,
              99.81% 0.22%
            );
          }
          100% {
            clip-path: polygon(100% 0%, 100% 100%, 0% 100%, 0% 50.3%, 0% 0%);
          }
        }
      `}</style>

      <div
        className="fixed top-0 z-[-1] left-0 h-screen w-full bg-cover bg-center"
        style={{
          backgroundImage: `url('${slides[currentSlide].image}')`,
        }}
      />

      {/* Sticky container - everything is contained within this */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Image - positioned relative to sticky container */}
        {/* <div
          className="absolute top-0 left-0 h-full w-full bg-cover bg-center transition-opacity duration-700"
          style={{
            backgroundImage: `url('${slides[currentSlide].image}')`,
          }}
        /> */}

        {/* Clip Path Diagonal V-Shape Transition Overlay */}
        {isTransitioning && (
          <div
            className="absolute top-0 left-0 h-full w-full pointer-events-none overflow-hidden"
            style={{ zIndex: 10 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center origin-center"
              style={{
                backgroundImage: `url('${slides[nextSlideIndex].image}')`,
                clipPath: "polygon(45% 50%, 45% 50%, 45% 50%, 45% 50%)",
                animation: "expandSingleV 1s linear forwards",
              }}
            />
          </div>
        )}

        {/* Moving text mask layer */}
        <div
          ref={maskRef}
          className="absolute inset-0 moving-about z-5"
        >
          <svg
            viewBox="0 0 1512 823"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <mask id="text-mask" x="0" y="0" width="100%" height="100%">
                <rect width="100%" height="100%" fill="white" />
                <text
                  fontSize="113"
                  fontWeight="bold"
                  fill="black"
                  textAnchor="middle"
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  <tspan x="50%" y="184.7">
                    Designed to be{" "}
                  </tspan>
                  <tspan x="50%" y="298.1">
                    remembered.
                  </tspan>
                  <tspan x="50%" y="411.5">
                    We build experiences{" "}
                  </tspan>
                  <tspan x="50%" y="524.9">
                    that audiences feel,{" "}
                  </tspan>
                  <tspan x="50%" y="638.3">
                    not just attend.
                  </tspan>
                </text>
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="#E0FF98"
              mask="url(#text-mask)"
            />
          </svg>
        </div>

        <div className="w-full h-full bg-black/20 absolute inset-0" />

        {/* Clickable overlay for screen halves */}
        {isSliderActive && (
          <div
            className="absolute inset-0 "
            onClick={handleScreenClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsMouseInSlider(true)}
            onMouseLeave={() => setIsMouseInSlider(false)}
          />
        )}

        {/* Custom cursor text */}
        {isSliderActive && isMouseInSlider && (
          <div
            ref={cursorRef}
            className="absolute pointer-events-none z-50 text-black text-[0.7vw] font-semibold font-body bg-yellow backdrop-blur-sm h-[8vw] w-[8vw] rounded-full flex items-center justify-center uppercase"
            style={{
              left: 0,
              top: 0,
              transform: "translate(-50%, -50%)",
            }}
          >
            {getCursorText()}
          </div>
        )}

        {isSliderActive && (
          <div
            ref={textRef}
            className="absolute left-[35%] w-[60%] min-h-[20vw] top-[75%] -translate-y-1/2 flex flex-col justify-between gap-3 text-white pointer-events-none"
          >
            {/* Main Heading */}
            <div className="slide-line">
              <h2 className="text-[3.5vw] font-bold w-[90%] leading-[1.1] about-slider-text">
                {slides[currentSlide].heading}
              </h2>
            </div>

            {/* Description */}
            <div className="flex justify-between items-end">
              <p className="text-[2vw] font-display about-slider-text">
                {slides[currentSlide].category}
              </p>
              <p className="text-[2vw] font-display about-slider-text">
                {slides[currentSlide].country}
              </p>
              <p className="text-[1.3vw] text-gray-200 about-slider-text">
                {slides[currentSlide].description}
              </p>
            </div>
          </div>
        )}

        {isSliderActive && (
          <div className="absolute w-full h-px bg-white opacity-40 top-[50%]" />
        )}

         {/* Navigation */}
        {/* {isSliderActive && (
          <div className="absolute inset-0 flex items-center justify-between px-8 pointer-events-none">
            <button
              onClick={prevSlide}
              className="pointer-events-auto bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300"
              aria-label="Previous slide"
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30 36L18 24L30 12"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="pointer-events-auto bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300"
              aria-label="Next slide"
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 36L30 24L18 12"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )} */}

        {/* Indicators */}
        {/* {isSliderActive && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => changeSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-white w-8" : "bg-white/50"
                }`}
                disabled={isTransitioning}
              />
            ))}
          </div>
        )} */}
      </div>
    </section>
  );
}