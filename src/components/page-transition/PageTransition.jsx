"use client";
import { useEffect, useRef, useState, useContext } from "react";
import { gsap } from "gsap";
import { usePathname, useRouter } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function PageTransition({ children }) {
  const overlayRef = useRef(null);
  const circleOverlayRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const [isRouteFrozen, setIsRouteFrozen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const pendingPathRef = useRef(null);
  const [freezeContext, setFreezeContext] = useState(null);
  const scrollPositionRef = useRef(0);

  const currentContext = useContext(LayoutRouterContext);

  // Initialize overlays to their starting state
  useEffect(() => {
    gsap.set(circleOverlayRef.current, {
      clipPath: "circle(0% at 0% 0%)",
    });
    gsap.set(overlayRef.current, {
      clipPath: "polygon(0% 0%, 7.5% 0%, 100% 51.5%, 100% 100%, 76.75% 100%, 0% 7%)",
      autoAlpha: 0,
    });
  }, []);

  useEffect(() => {
    if (!isRouteFrozen) setFreezeContext(currentContext);
  }, [isRouteFrozen, currentContext]);

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
  
  const startEntryAnimation = () => {
    setIsAnimating(true);
    setIsRouteFrozen(true);

    const overlay = overlayRef.current;
    const circleOverlay = circleOverlayRef.current;

    // Reset to starting state before animation
    gsap.set(circleOverlay, {
      clipPath: "circle(0% at 0% 0%)",
    });
    
    gsap.set(overlay, {
      clipPath: "polygon(0% 0%, 7.5% 0%, 100% 51.5%, 100% 100%, 76.75% 100%, 0% 7%)",
      autoAlpha: 1,
    });

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        setIsRouteFrozen(false);
        
        if (pendingPathRef.current) {
          router.push(pendingPathRef.current);
          pendingPathRef.current = null;
        }
      },
    });

    tl.to(circleOverlay, {
      clipPath: 'circle(160% at 0% 0%)',
      duration: 0.5,
      ease: 'linear',
    })
    .to(overlay, {
      duration: 0.6,
      ease: 'linear',
      clipPath: "polygon(0% 0%, 7.5% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 7%)",
    }, "<0.5");
  };

  useEffect(() => {
    if (!isAnimating) return;
    
    const overlay = overlayRef.current;

    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          // RESET EVERYTHING BACK TO STARTING STATE
          gsap.set(circleOverlayRef.current, {
            clipPath: "circle(0% at 0% 0%)",
          });

          gsap.set(overlay, {
            clipPath: "polygon(0% 0%, 7.5% 0%, 100% 51.5%, 100% 100%, 76.75% 100%, 0% 7%)",
            autoAlpha: 0,
          });

          setIsAnimating(false);
        },
      });

      tl.set(overlay, {
        clipPath: "polygon(100% 100%, 0% 0%, 100% 100%, 0% 100%, 0% 0%, 100% 0%)",
      })
      .to(overlay, {
        duration: 1,
        clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 0% 100%, 0% 0%, 100% 0%)",
      })
      .to(overlay, {
        delay: 1,
        duration: 0.3,
        autoAlpha: 0,
      });
    }, 1150);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <LayoutRouterContext.Provider value={isRouteFrozen ? freezeContext : currentContext}>
      {children}
      
      <div
        ref={circleOverlayRef}
        className="fixed top-0 left-0 z-[9999] w-[128vw] h-[125vh] rounded-br-full overflow-hidden"
        style={{ 
          clipPath: "circle(0% at 0% 0%)",
          pointerEvents: isAnimating ? "auto" : "none"
        }}
      >
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
            transformOrigin: 'top left',
            pointerEvents: "none",
            clipPath: "polygon(0% 0%, 7.5% 0%, 100% 51.5%, 100% 100%, 76.75% 100%, 0% 7%)",
            opacity: 0,
            visibility: "hidden",
          }}
        />
      </div>
    </LayoutRouterContext.Provider>
  );
}