"use client";
import { useEffect, useRef, useState, useContext } from "react";
import { gsap } from "gsap";
import { usePathname, useRouter } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function PageTransition({ children }) {
  const overlayRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const [isRouteFrozen, setIsRouteFrozen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const pendingPathRef = useRef(null);
  const [freezeContext, setFreezeContext] = useState(null);
  const scrollPositionRef = useRef(0);

  // Capture router context to "freeze" during transition
  const currentContext = useContext(LayoutRouterContext);

  useEffect(() => {
    if (!isRouteFrozen) setFreezeContext(currentContext);
  }, [isRouteFrozen, currentContext]);

  // Handle internal link clicks
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest("a");
      if (
        link &&
        link.href &&
        link.href.startsWith(window.location.origin) &&
        !link.target &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        const targetPath = new URL(link.href).pathname;
        if (targetPath === pathname || isAnimating) return;

        e.preventDefault();
        scrollPositionRef.current = window.scrollY;
        pendingPathRef.current = targetPath;
        startEntryAnimation();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname, isAnimating]);

  // Maintain scroll position during freeze
  useEffect(() => {
    if (isRouteFrozen) {
      const scrollY = scrollPositionRef.current;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [isRouteFrozen]);
  
  // ENTRY animation (freeze route until done)
  const startEntryAnimation = () => {
    setIsAnimating(true);
    setIsRouteFrozen(true);

    const overlay = overlayRef.current;

    // Reset clip-path and opacity to initial state before starting animation
    gsap.set(overlay, {
      autoAlpha: 1,
      clipPath:
        "polygon(0% 0%, 7.5% 0%, 100% 51.5%, 100% 100%, 76.75% 100%, 0% 7%)",
    });

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        // Unfreeze route immediately after entry animation
        setIsRouteFrozen(false);
        
        if (pendingPathRef.current) {
          router.push(pendingPathRef.current);
          pendingPathRef.current = null;
        }
      },
    });

    tl.to(overlay, {
      duration: 0.9,
      clipPath:
        "polygon(0% 0%, 7.5% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 7%)",
    });
  };

  // EXIT animation (after new page load)
  useEffect(() => {
    if (!isAnimating) return;
    const overlay = overlayRef.current;

    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => setIsAnimating(false),
      });

      tl.set(overlay, {
        autoAlpha: 1,
        clipPath:
          "polygon(100% 100%, 0% 0%, 100% 100%, 0% 100%, 0% 0%, 100% 0%)",
      })
        .to(overlay, {
          duration: 1,
          clipPath:
            "polygon(100% 0%, 0% 0%, 0% 100%, 0% 100%, 0% 0%, 100% 0%)",
        })
        .to(overlay, { 
          delay:1,
          duration: 0.3,
           autoAlpha: 0 });
    }, 900);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <LayoutRouterContext.Provider value={isRouteFrozen ? freezeContext : currentContext}>
      {children}
      {/* Yellow overlay */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#E0FF98",
          zIndex: 9999,
          origin:'top',
          pointerEvents: "none",
          opacity: 0,
          clipPath:
            "polygon(0% 0%, 7.5% 0%, 100% 51.5%, 100% 100%, 76.75% 100%, 0% 7%)",
        }}
      />
    </LayoutRouterContext.Provider>
  );
}