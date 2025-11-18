"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Btn from "../button/Btn";
import IconButton from "../button/IconButton";
import TextAnim from "../text-animation/TextAnim";

gsap.registerPlugin(ScrollTrigger);

const categoriesData = [
  {
    id: "01",
    category: "Events",
    title: "Global Events, Brand Activations, Experience Content",
    backgroundColor: "bg-[#F7FFDC]",
    description:
      "From corporate summits to viral moments, we create experiences that fuel alignment and connection between audiences and business goals.",
    image: "/assets/img/about-bg-2.jpeg",
    cta: "See what we create",
  },
  {
    id: "02",
    category: "Exhibits",
    backgroundColor: "bg-[#D1F3F5]",
    title: "Digital Campaigns, Social Media, Influencer Marketing",
    description:
      "We craft compelling digital narratives that resonate across platforms, building authentic connections between brands and their communities.",
    image: "/assets/img/about-bg.jpeg",
    cta: "Explore our work",
  },
  {
    id: "03",
    category: "Congresses",
    backgroundColor: "bg-[#DDD9FF]",
    title: "Product Launches, Experiential Retail, Pop-Up Experiences",
    description:
      "Transform product introductions into memorable moments that generate buzz and drive consumer engagement through innovative retail experiences.",
    image: "/assets/img/about-bg-3.jpeg",
    cta: "View our launches",
  },
  {
    id: "04",
    category: "Sports",
    backgroundColor: "bg-[#FFDDCA]",
    title: "Conferences, Trade Shows, B2B Engagement",
    description:
      "Elevate your presence at industry events with immersive booth experiences and strategic activations that convert connections into opportunities.",
    image: "/assets/img/about-bg-4.jpeg",
    cta: "Discover more",
  },
];

const SliderCard = ({
  id,
  category,
  title,
  description,
  image,
  cta,
  backgroundColor,
}) => {
  return (
    <div
      className={`flex-shrink-0 w-full origin-center h-full justify-between flex items-stretch overflow-hidden ${backgroundColor}`}
    >
      <div className="w-[55%] h-[100%] flex flex-col justify-between py-[4vw] px-[2vw]">
        <div>
          <h2 className="text-[7vw] font-third f mb-[2vw]">{category}</h2>
        </div>

        <div className="flex justify-between gap-[12vw]">
          <div className="text-[8vw] w-fit font-third leading-none mb-[3vw]">
            {id}
          </div>

          <div className="flex-grow  flex flex-col justify-center space-y-[2vw]">
            <h3 className="text-[2.5vw] font-display leading-[1.2] ">
              {title}
            </h3>
            <p className="text-[1.4vw] text-gray-700 leading-[1.2]">
              {description}
            </p>

            <div className="flex gap-[1vw] items-center">

            {/* <TextAnim text={cta} textSize='text-[2.5vw] font-third text-neutral-800' /> */}

            <button
      className={`relative px-[1vw] group flex items-start justify-center overflow-hidden  cursor-pointer h-[3.5vw]  w-fit  font-body  text-black text-[0.7vw] font-semibold rounded-[2vw] ${backgroundColor}`}
    >

      <div className={` w-fit transition-none group-hover:transition-all group-hover:duration-300 group-hover:translate-y-[-3vw] flex flex-col items-start justify-end`}>
        <p className={`text-[2vw] `}>

          {cta}
        </p>
         <p className={`text-[2vw] `}>

          {cta}
        </p>
      </div>
    </button>
              

              <IconButton
                icon="/assets/icons/icon-arrow.svg"
                // height="5vw"
                pad="w-[4.2vw] h-[4.2vw]"
                />
           
                </div>

            {/* <Btn /> */}
          </div>
        </div>
      </div>

      <div className="w-[40%] h-[75%] my-auto p-[4vw]">
        <div className="h-full w-full overflow-hidden rounded-[2vw]">
          <Image
            width={1000}
            height={1000}
            src={image}
            alt={title}
            className="card-image w-full h-full rounded-[2vw] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const Categories = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      const numCards = cards.length;

    
        // SINGLE IMAGE SCALE SCROLLTRIGGER USING containerRef
      ScrollTrigger.create({
  trigger: containerRef.current,
  start: "top top",
  end: `+=${(numCards - 1) * 100}%`,
  scrub: true,
  // markers: true,
  onUpdate: (self) => {
    const p = self.progress; // 0 → 1

    cards.forEach((card, index) => {
      const img = card.querySelector(".card-image");
      if (!img) return;

      const segmentStart = (index - 1) / (numCards - 1);
      const segmentEnd = index / (numCards - 1);

      // Local progress of THIS card sliding in
      let local = (p - segmentStart) / (segmentEnd - segmentStart);
      local = gsap.utils.clamp(0, 1, local);

      // Scale during ONLY the slide-up moment
      const scale = 1.2 - local * 0.2; // 1.2 → 1.0

      gsap.to(img, {
        scale,
        overwrite: true,
        duration: 0.1,
      });
    });
  },
});




      // Initial setup
      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i === 0 ? 0 : 100,
          zIndex: i + 1,
          // transformOrigin: i % 2 === 0 ? "left center" : "right center",
          scale: 1,
          rotation: 0,
          borderRadius: 0,
        });
      });

      const firstImage = cards[0].querySelector(".card-image");
      if (firstImage) {
        gsap.fromTo(
          firstImage,
          {
            scale: 1.5,
          }, {
            scale:1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "50% bottom",
              end: "bottom 60%",
              scrub: true,
              // markers:true,
            },
          },
          0
        );
      }

      // Scroll-triggered timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${(numCards - 1) * 100}%`,
          scrub: true,
          // pin: true,
          // markers: true,
        },
      });

      // Animate the sliding + rotation combo
      for (let i = 1; i < numCards; i++) {
        const rotateDir = (i - 1) % 2 === 0 ? -5 : 5; // previous card direction

        // Move next card upward
        tl.to(
          cards[i],
          {
            yPercent: 0,
            ease: "none",
          },
          i - 1
        );

        const currentCardImage = cards[i].querySelector(".card-image");
        if (currentCardImage) {
          tl.fromTo(
            currentCardImage,
            {
              scale: 1.2,
            }, {
              scale:1,
              ease: "power2.out",
            },
            i - 1
          );
        }

        // Simultaneously rotate & scale down previous card
        tl.to(
          cards[i - 1],
          {
            // y: `4vw`,
            scale: 0.8,
            rotation: rotateDir,
            // z: -400, // moves card backward along Z-axis
            rotateX: 20,
            borderRadius: "3vw",
            // transformOrigin: "center center",
            ease: "linear",
          },
          i - 1
        ).to(
          cards[i - 1],
          {
            opacity: 0,
            ease: "none",
          },
          i - 0.5
        );
      }
    }, containerRef);

    

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-[380vh] w-full z-0">
      <div
        ref={containerRef}
        className="sticky top-0 w-screen h-screen bg-black overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        {categoriesData.map((category, i) => (
          <div
            key={category.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className="absolute inset-0 overflow-hidden"
          >
            <SliderCard {...category} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
