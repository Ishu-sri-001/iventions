"use client";
import React, { useEffect, useState } from "react";
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
    quote:
      "You demonstrated great adaptability and flexibility in this UCL Final, as usual, with your incredible problem-solving skills and seamless handling of last-minute requests!",
    author: "Hospitality Production Manager",
    company: "UEFA",
  },
  {
    id: 2,
    participants: "8,500",
    industry: "Music",
    eventType: "Concert",
    location: "London, UK",
    quote:
      "An extraordinary production that exceeded all our expectations. The team's creativity and attention to detail were simply outstanding!",
    author: "Creative Director",
    company: "Warner Music",
  },
  {
    id: 3,
    participants: "15,000",
    industry: "Technology",
    eventType: "Conference",
    location: "San Francisco, USA",
    quote:
      "The execution was flawless from start to finish. Their innovative approach transformed our vision into an unforgettable experience!",
    author: "Event Manager",
    company: "Tech Summit",
  },
];

export default function PageReveal() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // --- Scroll Reveal Animation ---
  useEffect(() => {
    gsap.to(".case-section", {
      yPercent: 35,
      scrollTrigger: {
        trigger: "#case-study",
        start: "40% 72%",
        end: "140% bottom",
        scrub: true,
        ease: "none",
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#case-study",
        start: "50% 90%",
        end: "40% top",
        scrub: true,
        ease: "none",
      },
    });

    tl.fromTo(
      ".overlay-layer",
      {
        clipPath:
          "polygon(100% 50%, 0% 49.75%, 0% 49.75%, 0% 49.5%, 0% 49.75%, 0% 49.75%)",
      },
      {
        clipPath:
          "polygon(100% 50%, 0% 100%, 0% 100%, 0% 49.5%, 0% 0%, 0% 0%)",
        duration: 1.9,
        ease: "none",
      }
    )
      .to(".overlay-layer", {
        clipPath:
          "polygon(100% 50%, 100% 100%, 0% 100%, 0% 49.5%, 0% 0%, 100% 0%)",
        duration: 1.9,
        ease: "none",
      })
      .fromTo(
        ".background-layer",
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.4"
      );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  
  const animateTextIn = () => {
    

    const split = new SplitText('.quote-text', {
      type: "lines",
      linesClass: "line",
      mask: "lines",
    });

    gsap.fromTo(
      split.lines,
      { yPercent: 100 },
      { yPercent: 0, 
        stagger: 0.1, 
        ease: "power2.out", 
        // duration:1.5,
      }
    );
  };

  // --- Animate Slide Change ---
  const animateSlideChange = async (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);

    setCurrentSlide((prev) =>
      direction === "next"
        ? (prev + 1) % sliderData.length
        : (prev - 1 + sliderData.length) % sliderData.length
    );

    // wait for React to render the new quote
    await new Promise((resolve) => setTimeout(resolve, 100));

    // animateTextIn();
    setIsAnimating(false);
  };

  useEffect(() => {
    animateTextIn();
  }, [currentSlide]);

  const currentData = sliderData[currentSlide];

  return (
    <div className="relative z-[1] h-screen w-full overflow-hidden">
      <section
        id="case-study"
        className="case-section absolute h-screen top-[-35%] w-full overflow-hidden bg-[#9C93E8]"
      >
        <style jsx>{`
          .line {
            overflow: hidden;
          }
        `}</style>

        {/* Overlay Layer */}
        <div
          className="overlay-layer absolute inset-0 h-screen w-screen bg-[#F3EFEB] z-20"
          style={{
            clipPath:
              "polygon(100% 50%, 100% 49.75%, 100% 50%, 0% 50.3%, 100% 50%)",
          }}
        >
          <div className="w-full h-full flex flex-col justify-between px-[5%] py-10">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-8 text-sm uppercase tracking-wide">
              {["Participants", "Industry", "Event Type", "Location"].map(
                (label, i) => (
                  <div key={i}>
                    <p className="text-gray-500 font-medium ">{label}</p>
                    <p className="text-lg font-light quote-text">
                      {
                        [
                          currentData.participants,
                          currentData.industry,
                          currentData.eventType,
                          currentData.location,
                        ][i]
                      }
                    </p>
                  </div>
                )
              )}
            </div>

           
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mt-20">
              {/* Quote */}
              <div
                key={currentData.id}
                className="quote-text md:w-1/2 text-[1.5rem] leading-snug font-serif overflow-hidden"
              >
                  
                "{currentData.quote}"
              </div>

              {/* Author / Company */}
              <div className="md:w-1/3 flex flex-col items-center justify-center text-center">
                <p className="font-semibold quote-text">{currentData.author}</p>
                <p className="text-gray-500 quote-text text-sm mt-1">
                  {currentData.company}
                </p>
                <div className="mt-6">
                  <div className="w-20 h-20 bg-gray-300 rounded-lg flex items-center justify-center text-xs text-gray-600">
                    Logo
                  </div>
                </div>
              </div>

              {/* Image Placeholder */}
              <div className="md:w-1/5 flex justify-center">
                <div className="rounded-xl overflow-hidden shadow-md">
                  <div className="w-[150px] h-[150px] bg-gray-400 rounded-lg flex items-center justify-center text-xs text-gray-700">
                    Image
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-20">
              <div className="flex gap-2">
                <button
                  onClick={() => animateSlideChange("prev")}
                  disabled={isAnimating}
                  className="p-2 bg-white cursor-pointer rounded-md  transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => animateSlideChange("next")}
                  disabled={isAnimating}
                  className="p-2  rounded-md cursor-pointer bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>

              <div className="text-sm text-gray-500 tracking-widest">
                {String(currentSlide + 1).padStart(2, "0")} /{" "}
                {String(sliderData.length).padStart(2, "0")}
              </div>

             
            </div>
          </div>
        </div>

        {/* Static Background Layer */}
        {/* <div className="background-layer absolute inset-0 flex flex-col items-center justify-center text-white text-center px-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            Revealed Vision
          </h1>
          <p className="text-2xl max-w-2xl">
            Crafted through layers of creativity and precision. Watch the story
            unfold.
          </p>
        </div> */}
      </section>
    </div>
  );
}
