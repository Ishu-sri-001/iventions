"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Btn from "../button/Btn";
import IconButton from "../button/IconButton";

gsap.registerPlugin(ScrollTrigger);

const categoriesData = [
  {
    id: "01",
    category: "Events",
    title: "Global Events, Brand Activations, Experience Content",
    backgroundColor: 'bg-[#F7FFDC]',
    description:
      "From corporate summits to viral moments, we create experiences that fuel alignment and connection between audiences and business goals.",
    image:
      "/assets/img/about-bg-2.jpeg",
    cta: "See what we create",
  },
  {
    id: "02",
    category: "Exhibits",
    backgroundColor: 'bg-[#D1F3F5]',
    title: "Digital Campaigns, Social Media, Influencer Marketing",
    description:
      "We craft compelling digital narratives that resonate across platforms, building authentic connections between brands and their communities.",
    image:"/assets/img/about-bg.jpeg",
    cta: "Explore our work",
  },
  {
    id: "03",
    category: "Congresses",
    backgroundColor: 'bg-[#DDD9FF]',
    title: "Product Launches, Experiential Retail, Pop-Up Experiences",
    description:
      "Transform product introductions into memorable moments that generate buzz and drive consumer engagement through innovative retail experiences.",
    image: "/assets/img/about-bg-3.jpeg",
    cta: "View our launches",
  },
  {
    id: "04",
    category: "Sports",
    backgroundColor: 'bg-[#FFDDCA]',
    title: "Conferences, Trade Shows, B2B Engagement",
    description:
      "Elevate your presence at industry events with immersive booth experiences and strategic activations that convert connections into opportunities.",
     image: "/assets/img/about-bg-4.jpeg",
    cta: "Discover more",
  },
];

const SliderCard = ({ id, category, title, description, image, cta, backgroundColor }) => {
  return (
    <div className={`flex-shrink-0 w-full origin-center h-full justify-between flex items-stretch overflow-hidden ${backgroundColor}`}>
      <div className="w-[55%] flex flex-col justify-between p-[4vw]">
        <div>
          <h2 className="text-[7vw] font-third f mb-[2vw]">{category}</h2>
         
        </div>

      <div className="flex justify-between gap-[12vw]">

        <div className="text-[8vw] w-fit font-third leading-none mb-[3vw]">{id}</div>
        
        <div className="flex-grow  flex flex-col justify-center space-y-[2vw]">
          <h3 className="text-[2.5vw] font-display leading-[1.2] ">
            {title}
          </h3>
          <p className="text-[1.4vw] text-gray-700 leading-[1.2]">
            {description}
          </p>
          <button className="flex items-center gap-[1vw] text-[2vw] font-semibold  transition-all">
            {cta}
            
            <IconButton icon='/assets/icons/arrow.svg' height='4vw' pad="w-[4.5vw]" />
          </button>

          {/* <Btn /> */}
        </div>
      </div>
      </div>

      <div className="w-[40%] h-[85%] my-auto p-[4vw]">

        <div className="h-full w-full overflow-hidden rounded-[2vw]">

       
        <Image width={1000} height={1000} src={image} alt={title} className="card-image w-full h-full rounded-[2vw] object-cover" />
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

      // Initial setup
      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i === 0 ? 0 : 100,
          zIndex: i + 1,
          // transformOrigin: i % 2 === 0 ? "left center" : "right center",
          scale: 1,
          rotation: 0,
        });
      });

  const firstImage = cards[0].querySelector('.card-image');
if (firstImage) {
  gsap.to(firstImage, {
    scale: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger:containerRef.current,
      start:'top bottom',
      end: 'bottom bottom',
      scrub:true,
      // markers:true,
    }
  }, 0);
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

        const currentCardImage = cards[i].querySelector('.card-image');
        if (currentCardImage) {
          tl.to(
            currentCardImage,
            {
              scale: 1.5,
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
    // transformOrigin: "center center",
    ease: "linear",
  },
  i - 1
)
.to(cards[i - 1], {
  opacity: 0,
  ease: "none",
}, i - 0.5);

      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-[380vh] w-full z-0">

    <div ref={containerRef} className="sticky top-0 w-screen h-screen bg-black overflow-hidden"
      style={{ perspective: "1200px" }}
      >
      {categoriesData.map((category, i) => (
        <div
        key={category.id}
        ref={(el) => (cardsRef.current[i] = el)}
        className="absolute inset-0"
        >
          <SliderCard {...category} />
        </div>
      ))}
    </div>
      </section>
  );
};

export default Categories;
