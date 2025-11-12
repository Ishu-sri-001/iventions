"use client";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitText from "gsap/dist/SplitText";
import IconButton from "../button/IconButton";
import Btn from "../button/Btn";

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
        start: "40% bottom",
        end: "140% bottom",
        scrub: true,
        ease: "none",
        // markers:true,
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#case-study",
        start: "25% bottom",
        end: "bottom 80%",
        scrub: true,
        ease: "none",
        // markers:true,
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
        duration: 2.5,
        ease: "none",
      }
    )
      .to(".overlay-layer", {
        clipPath:
          "polygon(100% 50%, 100% 100%, 0% 100%, 0% 49.5%, 0% 0%, 100% 0%)",
        duration: 2.5,
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

  // --- Smooth SplitText Animation ---
  const animateTextIn = () => {
  // create the SplitText instance for the .quote-text element(s)
  const split = new SplitText(".quote-text", {
    type: "lines",
    linesClass: "line",
    mask:'lines',
    // remove mask option; let GSAP handle line setup
  });

  // make sure only the newly created line elements start hidden and positioned
  gsap.set(split.lines, { opacity: 0, yPercent: 100 });

  // animate lines in
  gsap.to(split.lines, {
    yPercent: 0,
    opacity: 1,
    stagger: 0.05,
    ease: "power2.inOut",
    duration: 0.7,
    onComplete: () => {
      // cleanup split text DOM to avoid ghosts (optional)
      // split.revert(); // don't revert if you want the lines kept for later exit animation
    },
  });
};

 const animateSlideChange = (direction) => {
  if (isAnimating) return;
  setIsAnimating(true);

  // exit animation before content changes
  const oldSplit = new SplitText(".quote-text", {
    type: "lines",
    mask: "lines",
  });

  const tl = gsap.timeline({
    onComplete: () => {
      
      setCurrentSlide((prev) =>
          direction === "next"
            ? (prev + 1) % sliderData.length
            : (prev - 1 + sliderData.length) % sliderData.length
        );
    },
  });

  tl.to(oldSplit.lines, {
    yPercent: -100,
    stagger: 0.04,
    ease: "power2.inOut",
    duration: 0.5,
  });
};


 useEffect(() => {
  // Animate new text in after React re-renders instantly
  const ctx = gsap.context(() => {
    animateTextIn();
  });

  // mark animation done after entry anim
  const timeout = setTimeout(() => {
    setIsAnimating(false);
  }, 800);

  return () => {
    ctx.revert();
    clearTimeout(timeout);
  };
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
          <div className="w-full h-full flex flex-col justify-between px-[5%] py-10"
          key={currentData.id}>
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
                className="md:w-1/2 text-[1.5rem] leading-snug font-serif overflow-hidden"
              >
                <div className="quote-text">"{currentData.quote}"</div>
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
                <div onClick={() => animateSlideChange("prev")}>
                  <IconButton
                    icon="/assets/icons/prev-icon.svg"
                    pad="w-[3.5vw]"
                  />
                </div>
                <div onClick={() => animateSlideChange("next")}>
                  <IconButton
                    icon="/assets/icons/next-icon.svg"
                    pad="w-[3.5vw]"
                  />
                </div>
              </div>

              <div className="text-sm text-gray-500 flex gap-[0.3vw] tracking-widest">
                <span className="quote-text">
                  {String(currentSlide + 1).padStart(2, "0")}
                </span>
                <span>/ {String(sliderData.length).padStart(2, "0")}</span>
              </div>

              <div>
                <Btn text="SEE FULL CASE STUDY" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}