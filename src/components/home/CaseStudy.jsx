"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitText from "gsap/dist/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const sliderData = [
  {
    id: 1,
    participants: "11,195",
    industry: "Football",
    eventType: "Live Event",
    location: "Istanbul, Turkey",
    quote: "You demonstrated great adaptability and flexibility in this UCL Final, as usual, with your incredible problem-solving skills and seamless handling of last-minute requests!",
    author: "Hospitality Production Manager",
    company: "UEFA",
    logo: "/champions-league-logo.png",
    image: "/ucl-image.jpg"
  },
  {
    id: 2,
    participants: "8,500",
    industry: "Music",
    eventType: "Concert",
    location: "London, UK",
    quote: "An extraordinary production that exceeded all our expectations. The team's creativity and attention to detail were simply outstanding!",
    author: "Creative Director",
    company: "Warner Music",
    logo: "/music-logo.png",
    image: "/concert-image.jpg"
  },
  {
    id: 3,
    participants: "15,000",
    industry: "Technology",
    eventType: "Conference",
    location: "San Francisco, USA",
    quote: "The execution was flawless from start to finish. Their innovative approach transformed our vision into an unforgettable experience!",
    author: "Event Manager",
    company: "Tech Summit",
    logo: "/tech-logo.png",
    image: "/tech-image.jpg"
  }
];

export default function PageReveal() {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const quoteRef = useRef(null);
  const authorRef = useRef(null);
  const companyRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#case-study',
        start: "top bottom",
        end: "40% top",
        scrub: true,
        // markers: true,
      },
    });

    tl.fromTo(
      overlay,
      {
        clipPath:
          "polygon(100% 50%, 0% 49.75%, 0% 49.75%, 0% 49.5%, 0% 49.75%, 0% 49.75%)",
      },
      {
        clipPath:
          "polygon(100% 50%, 0% 100%, 0% 100%, 0% 49.5%, 0% 0%, 0% 0%)",
        ease: "linear",
      }
    )
    .to(overlay, {
        clipPath:
        "polygon(100% 50%, 100% 100%, 0% 100%, 0% 49.5%, 0% 0%, 100% 0%)",
        ease:'linear',
    }
    )
    .fromTo(
      content,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.4"
    );

    return () => ScrollTrigger.kill();
  }, []);

  const animateSlideChange = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    // Animate out current content
    tl.to([quoteRef.current, authorRef.current, companyRef.current], {
      yPercent: -100,
      opacity: 0,
      duration: 0.4,
      ease: "power3.in",
      stagger: 0.05
    });

    tl.call(() => {
      // After content is hidden, split and animate new text
      gsap.set([quoteRef.current, authorRef.current, companyRef.current], {
        yPercent: 0,
        opacity: 1
      });

      const splitQuote = new SplitText(quoteRef.current, {
        type: "chars,lines",
        linesClass: "lines",
      });

      const splitAuthor = new SplitText(authorRef.current, {
        type: "chars,lines",
        linesClass: "lines",
      });

      const splitCompany = new SplitText(companyRef.current, {
        type: "chars,lines",
        linesClass: "lines",
      });

      gsap.set([splitQuote.lines, splitAuthor.lines, splitCompany.lines], {
        yPercent: 100,
        opacity: 0
      });

      gsap.to(splitQuote.lines, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(splitAuthor.lines, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
      });

      gsap.to(splitCompany.lines, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3
      });
    }, null, 0.4);
  };

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setCurrentSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
    animateSlideChange();
  };

  const handleNextSlide = () => {
    if (isAnimating) return;
    setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    animateSlideChange();
  };

  const currentData = sliderData[currentSlide];

  return (
    <section
        id='case-study'
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#9C93E8]"
    >
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
        .lines {
          overflow: hidden;
        }
      `}</style>

      {/* Red Overlay (clip path reveals this) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 h-screen w-screen bg-red-200 z-20"
        style={{
          clipPath:
            "polygon(100% 50%, 100% 49.75%, 100% 50%, 0% 50.3%, 100% 50%)",
        }}
      >

        <div className="w-full h-full flex flex-col justify-between px-[5%] py-10">
      {/* Top Stats Row */}
      <div className="grid grid-cols-4 gap-8 text-sm uppercase tracking-wide">
        <div>
          <p className="text-gray-500 font-medium">Participants</p>
          <p className="text-lg font-light">{currentData.participants}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Industry</p>
          <p className="text-lg font-light">{currentData.industry}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Event Type</p>
          <p className="text-lg font-light">{currentData.eventType}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Location</p>
          <p className="text-lg font-light">{currentData.location}</p>
        </div>
      </div>

      {/* Main Content Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mt-20">
        {/* Left Quote */}
        <div className="md:w-1/2 text-[1.5rem] leading-snug font-serif overflow-hidden">
          <p ref={quoteRef} className="about-slider-text">
            "{currentData.quote}"
          </p>
        </div>

        {/* Middle Info */}
        <div className="md:w-1/3 flex flex-col items-center justify-center text-center">
          <p ref={authorRef} className="font-semibold about-slider-text">
            {currentData.author}
          </p>
          <p ref={companyRef} className="text-gray-500 text-sm mt-1 about-slider-text">{currentData.company}</p>

          <div className="mt-6">
            <div className="w-20 h-20 bg-gray-300 rounded-lg flex items-center justify-center text-xs text-gray-600">
              Logo
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/5 flex justify-center">
          <div className="rounded-xl overflow-hidden shadow-md">
            <div className="w-[150px] h-[150px] bg-gray-400 rounded-lg flex items-center justify-center text-xs text-gray-700">
              Image
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center mt-20">
        {/* Arrows */}
        <div className="flex gap-2">
          <button 
            onClick={handlePrevSlide}
            disabled={isAnimating}
            className="p-2 border rounded-md hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
           <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor"
  className="w-5 h-5"
>
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>

          </button>
          <button 
            onClick={handleNextSlide}
            disabled={isAnimating}
            className="p-2 border rounded-md hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor"
  className="w-5 h-5"
>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>

          </button>
        </div>

        {/* Pagination */}
        <div className="text-sm text-gray-500 tracking-widest">
          {String(currentSlide + 1).padStart(2, '0')} / {String(sliderData.length).padStart(2, '0')}
        </div>

        {/* Case Study Button */}
        <button className="px-4 py-2 border rounded-md text-xs font-medium hover:bg-gray-100 transition">
          SEE FULL CASE STUDY
        </button>
      </div>
    </div>
        
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-8"
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-4">Revealed Vision</h1>
        <p className="text-2xl max-w-2xl">
          Crafted through layers of creativity and precision. Watch the story unfold.
        </p>
      </div>
    </section>
  );
}