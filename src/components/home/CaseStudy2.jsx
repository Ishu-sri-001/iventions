'use client'
import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitText from 'gsap/dist/SplitText'
import IconButton from '../button/IconButton'
import Btn from '../button/Btn'
gsap.registerPlugin(ScrollTrigger, SplitText)

const CaseStudy2 = () => {
  const slides = [
    {
      participants: '11,195',
      industry: 'Football',
      eventType: 'Live Event',
      location: 'Istanbul, Turkey',
      quote: `“You demonstrated great adaptability and flexibility in this UCL Final, as usual, with your incredible problem-solving skills and seamless handling of last-minute requests!”`,
      name: "Hospitality Production Manager",
      org: "UEFA",
      logo: "/assets/img/party-1.jpeg",
      image: "/assets/img/party-2.jpeg",
    },
    {
      participants: '8,720',
      industry: 'Football-2',
      eventType: 'Super Cup',
      location: 'Helsinki, Finland',
      quote: `“Your team went above and beyond to deliver flawless hospitality during the Super Cup — an outstanding performance under tight timelines!”`,
      name: "Event Operations Director",
      org: "UEFA",
      logo: "/assets/img/party-2.jpeg",
      image: "/assets/img/party-1.jpeg",
    },
    {
      participants: '12,500',
      industry: 'Football',
      eventType: 'Final Draw',
      location: 'Paris, France',
      quote: `“Exceptional organization and precision. The event logistics and guest experience were truly world-class!”`,
      name: "Head of Events",
      org: "UEFA",
      logo: "/assets/img/party-1.jpeg",
      image: "/assets/img/party-2.jpeg",
    },
  ]

  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {

        gsap.set('.case-study-container', {
        clipPath:
          'polygon(100% 50%, 0% 50%, 0% 50.25%, 0% 50%, 0% 50%, 0% 50%)',
        yPercent: -30,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#casee-study',
          start: 'top 60%',
          end: '35% 40%',
          scrub: true,
        },
      })

      tl.fromTo(
        '.case-study-container',
        { yPercent: -30 },
        { yPercent: 0, ease: 'linear', duration: 1 }
      )
        .to(
          '.case-study-container',
          {
            clipPath:
              'polygon(100% 50%, 0% 0%, 0% 0%, 0% 48.25%, 0% 100%, 0% 100%)',
            ease: 'linear',
            duration: 1,
          },
          '<'
        )
        .to('.case-study-container', {
          clipPath:
            'polygon(100% 50%, 100% 0%, 0% 0%, 0% 48.25%, 0% 100%, 100% 100%)',
          ease: 'linear',
          duration:1,
        })
    })
    return () => ctx.revert()
  }, [])

  // --- Animate text lines in ---
  const animateTextIn = () => {
    const split = new SplitText('.slider-content', {
      type: 'lines',
      linesClass: 'line',
      mask: 'lines',
    })
    gsap.set(split.lines, { yPercent: 100, opacity: 0 })
    gsap.to(split.lines, {
      yPercent: 0,
      opacity: 1,
      stagger: 0.04,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  // --- Animate slide change (exit → change → enter) ---
  const animateSlideChange = (direction) => {
    if (isAnimating) return
    setIsAnimating(true)

    const oldSplit = new SplitText('.slider-content', {
      type: 'lines',
      linesClass: 'line',
      mask: 'lines',
    })

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrent((prev) =>
          direction === 'next'
            ? (prev + 1) % slides.length
            : (prev - 1 + slides.length) % slides.length
        )
      },
    })

    tl.to(oldSplit.lines, {
      yPercent: -100,
      opacity: 0,
      stagger: 0.04,
      duration: 0.4,
      ease: 'power2.inOut',
    })
  }

  // --- Trigger text enter after re-render ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      animateTextIn()
    })
    const timeout = setTimeout(() => setIsAnimating(false), 800)
    return () => {
      ctx.revert()
      clearTimeout(timeout)
    }
  }, [current])

  return (
    <section id='casee-study' className='relative h-[200vh] z-0 bg-[#9C93E8]'>
      <style jsx>{`
        .line {
          overflow: hidden;
          display: block;
        }
      `}</style>

      <div className='sticky top-0 h-screen w-full overflow-hidden'>
        <div key={`quote-${current}`} className='case-study-container h-full w-full bg-[#F3EFEB] text-black flex flex-col justify-between px-[2vw] py-[4vh]'>

          {/* --- Header (labels fixed, values dynamic) --- */}
          <div className='grid grid-cols-4 gap-[3vw] text-[0.8vw] uppercase tracking-[0.1vw] mb-[4vh]'>
            <div>
              <p className='opacity-60'>Participants</p>
              <p className='text-[1vw] font-medium slider-content'>
                {slides[current].participants}
              </p>
            </div>
            <div>
              <p className='opacity-60'>Industry</p>
              <p className='text-[1vw] font-medium slider-content'>
                {slides[current].industry}
              </p>
            </div>
            <div>
              <p className='opacity-60'>Event Type</p>
              <p className='text-[1vw] font-medium slider-content'>
                {slides[current].eventType}
              </p>
            </div>
            <div>
              <p className='opacity-60'>Location</p>
              <p className='text-[1vw] font-medium slider-content'>
                {slides[current].location}
              </p>
            </div>
          </div>

          {/* --- Slider Content --- */}
          <div className=' flex justify-between items-center h-full'>
            {/* Quote Section */}
            <div className='w-[35%]  slider-content text-[2.5vw] leading-[1.1] font-display'>
              {slides[current].quote}
            </div>

            {/* Right Side */}
            <div className='flex  justify-between items-center gap-[4vw] w-[60%]'>
              <div className='text-center'>
                <p className='font-semibold slider-content text-[1vw]'>
                  {slides[current].name}
                </p>
                <p className='text-[0.9vw] slider-content opacity-70'>
                  {slides[current].org}
                </p>
              </div>

              <img
                src={slides[current].logo}
                alt='logo'
                className='w-[6vw] object-contain slider-content'
              />
              <img
                src={slides[current].image}
                alt='slide visual'
                className='w-[10vw] h-[10vw] object-cover rounded-[1vw] slider-content'
              />
              
            </div>
          </div>

          {/* --- Controls --- */}
          <div className='flex justify-between items-center mt-[3vh] text-[0.8vw]'>
            <div className='flex gap-[1vw]'>
              <div
                onClick={() => animateSlideChange('prev')}
                // className='border border-black px-[1.5vw] py-[0.6vh] rounded-[0.5vw] hover:bg-black hover:text-white transition-all'
              >
                     <IconButton icon='/assets/icons/prev-icon.svg'  pad='w-[3.5vw]' />

              </div>
              <div
                onClick={() => animateSlideChange('next')}
                // className='border border-black px-[1.5vw] py-[0.6vh] rounded-[0.5vw] hover:bg-black hover:text-white transition-all'
              >
                <IconButton icon='/assets/icons/next-icon.svg'  pad='w-[3.5vw]' />
              </div>
            </div>
            <div className="text-sm text-gray-500 flex gap-[0.3vw] font-display tracking-widest">
                <span className="slider-content">
                  {String(current + 1).padStart(2, "0")}
                </span>
                <span>/ {String(slides.length).padStart(2, "0")}</span>
              </div>

              <div>
                <Btn text='See full case study' />
              </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default CaseStudy2
