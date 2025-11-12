"use client";
import Image from "next/image";
import React, {useEffect} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

const mids = ["270", "90%", "21", "31", "1.2K"];
const heading = [
  "Projects Delivered",
  "Loyal Client",
  "Team Nationalities",
  "Countries Reached",
  "Lightbulb Moments",
];
const content = [
  "Big stages, small details. Each one designed to leave a mark.",
  "Our clients love to come back, proof that true partnership lasts.",
  "One team. Twenty-one perspectives. Countless cultural insights.",
  "We don't just go global. We bring the world to every event.",
  "That's ideas, not coffee. Brilliant ones, brewed daily.",
];

const Stats = () => {

    useEffect(() => {
        const ctx= gsap.context(() => {
                gsap.to('.stats-container', {
                    yPercent:-88,
                    scrollTrigger: {
                        trigger:'#statz',
                        start:'top top',
                        end:'bottom top',
                        scrub: true
                    }
                })
        })
        return () => ctx.revert();
    })

  return (
    <section id='statz' className="w-full h-[200vw] relative ">
      <div className="w-full h-screen bg-black sticky top-0 overflow-hidden flex items-center justify-center">
        <div className="w-full h- bg-amber-400  overflow-y-scroll flex h-[10vw] items-start justify-between px-[4vw] py-[4vw] gap-[2vw]">

            <div className="w-full h-[50vw] bg-gray-400 stats-container flex justify-between items-center">

           
          {/* Headings Column */}
          <div className="flex-1 flex flex-col items-center justify-center gap-[3vw] space-y-[3vw]">
            {heading.map((title, i) => (
              <p key={i} className="text-black text-[3.4vw] leading-[1.2] font-bold">
                {title}
              </p>
            ))}
          </div>

          {/* Numbers Column */}
          <div className="flex-1 flex flex-col items-center justify-center gap-[3vw] space-y-[2vw]">
            {mids.map((mid, i) => (
              <p key={i} className="text-black text-[3.4vw] font-bold">
                {mid}
              </p>
            ))}
          </div>

          {/* Content Column */}
          <div className="flex-1 flex flex-col items-center justify-center gap-[3vw] space-y-[1vw]">
            {content.map((text, i) => (
              <p key={i} className="text-[2vw] text-black leading-[1.3]">
                {text}
              </p>
            ))}
          </div>

           </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;