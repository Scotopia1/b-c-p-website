"use client";
import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const toggleMenu = () => {
    if (!isAnimating && !isNavigating) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <MenuContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isAnimating,
        setIsAnimating,
        isNavigating,
        setIsNavigating,
        toggleMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
