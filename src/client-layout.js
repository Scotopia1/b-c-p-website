"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { ReactLenis } from "lenis/react";
import { ViewTransitions } from "next-view-transitions";
import { MenuProvider, useMenu } from "@/context/MenuContext";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

function LayoutContent({ children, isMobile }) {
  const { isPageLoading, setIsPageLoading } = useMenu();
  const pathname = usePathname();

  // Hide loading screen when route changes (page loaded)
  useEffect(() => {
    setIsPageLoading(false);
  }, [pathname, setIsPageLoading]);

  const scrollSettings = isMobile
    ? {
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: true,
        touchMultiplier: 1.5,
        infinite: false,
        lerp: 0.09,
        wheelMultiplier: 1,
        orientation: "vertical",
        smoothWheel: true,
        syncTouch: true,
      }
    : {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
        lerp: 0.1,
        wheelMultiplier: 1,
        orientation: "vertical",
        smoothWheel: true,
        syncTouch: true,
      };

  return (
    <>
      <LoadingScreen isLoading={isPageLoading} />
      <ReactLenis root options={scrollSettings}>
        {children}
      </ReactLenis>
    </>
  );
}

export default function ClientLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <ViewTransitions>
      <MenuProvider>
        <LayoutContent isMobile={isMobile}>{children}</LayoutContent>
      </MenuProvider>
    </ViewTransitions>
  );
}
