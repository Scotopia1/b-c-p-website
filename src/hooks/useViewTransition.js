"use client";
import { useTransitionRouter } from "next-view-transitions";
import { useMenu } from "@/context/MenuContext";

export const useViewTransition = () => {
  const router = useTransitionRouter();
  const { setIsPageLoading } = useMenu();

  function slideInOut() {
    try {
      document.documentElement.animate(
        [
          {
            opacity: 1,
            transform: "scale(1)",
          },
          {
            opacity: 0,
            transform: "scale(0.95)",
          },
        ],
        {
          duration: 800,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          fill: "forwards",
          pseudoElement: "::view-transition-old(root)",
        }
      );

      document.documentElement.animate(
        [
          {
            clipPath: "circle(0% at 50% 50%)",
          },
          {
            clipPath: "circle(100% at 50% 50%)",
          },
        ],
        {
          duration: 800,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    } catch (err) {
      // Gracefully handle animation errors
      console.warn("View transition animation failed:", err);
    }
  }

  const navigateWithTransition = (href, options = {}) => {
    const currentPath = window.location.pathname;
    if (currentPath === href) {
      return;
    }

    // Show loading screen
    setIsPageLoading(true);

    // Scroll to top before navigation
    window.scrollTo(0, 0);

    try {
      router.push(href, {
        onTransitionReady: slideInOut,
        ...options,
      });
    } catch (err) {
      // Fallback to regular navigation if transition fails
      console.warn("View transition failed, using fallback:", err);
      router.push(href);
    }
  };

  return { navigateWithTransition, router };
};
