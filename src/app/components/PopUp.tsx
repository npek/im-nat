"use client";
import { useEffect, useRef, useState } from "react";
import { usePopUp } from "../hooks/usePopUp";

type PopUpProps = {
  title?: string;
  children: React.ReactNode;
};

const PopUp = ({ title, children }: PopUpProps) => {
  const { closePopUp } = usePopUp();

  const popupRef = useRef(null);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [wasSmallScreen, setWasSmallScreen] = useState(false);
  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [dragging, setDragging] = useState(false);
  const [initialPos, setInitialPos] = useState({ x: 100, y: 100 });

  const updateScreenSize = () => {
    const smallScreenStatus = window.innerWidth < 640;

    // Check if the popupRef is set and we can get the position
    if (popupRef.current) {
      const popupLeft = (
        popupRef.current as HTMLDivElement
      ).getBoundingClientRect().left;

      // Adjust this value as per your requirements; for instance, if popup's left is more than 80% of window width
      if (popupLeft / window.innerWidth > 0.8 || smallScreenStatus) {
        setPosition({ top: 0, left: 0 }); // Reset the position
        setIsSmallScreen(true);
        setWasSmallScreen(true); // Mark that it was small screen
        return;
      } else if (wasSmallScreen && !smallScreenStatus) {
        // If it was previously small screen and now it's big
        setPosition({ top: 100, left: 100 }); // Reset to default for big screen
        setWasSmallScreen(false);
      }
    }

    setIsSmallScreen(smallScreenStatus);
  };

  useEffect(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isSmallScreen) return; // Prevent dragging on small screens

    e.preventDefault();
    setDragging(true);
    setInitialPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    // Attach global event listeners
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      const deltaX = e.clientX - initialPos.x;
      const deltaY = e.clientY - initialPos.y;

      const newTopPosition = Math.max(80, position.top + deltaY); // Existing constraint for top position
      let newLeftPosition = position.left + deltaX;

      // Check if the popupRef is set and we can get the width
      if (popupRef.current) {
        const popupWidth = (popupRef.current as HTMLDivElement).offsetWidth;
        newLeftPosition = Math.max(
          0,
          Math.min(window.innerWidth - popupWidth, newLeftPosition)
        );
      }

      setPosition({
        top: newTopPosition,
        left: newLeftPosition,
      });
      setInitialPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      // Cleanup the global event listeners
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, initialPos.x, initialPos.y]);

  return (
    <div
      className={`absolute flex flex-col ${
        isSmallScreen ? "w-full h-full top-0 left-0 mt-[74px]" : "min-w-[40%]"
      } bg-dark border-2 border-default overflow-y-scroll`}
      style={
        !isSmallScreen
          ? { top: `${position.top}px`, left: `${position.left}px` }
          : undefined
      }
      ref={popupRef}
    >
      <div
        id="popupNav"
        className={`flex items-center justify-center bg-default h-8 w-full`}
        onMouseDown={onMouseDown}
      >
        <label className="text-dark text-md font-bold place-self-center">
          {title}
        </label>
        <div className="pointer-events-auto flex flex-row space-x-1 pr-1 absolute w-full justify-end items-center">
          <div
            className="border-dark border-2 w-5 h-5 p-0.5 cursor-pointer"
            onClick={closePopUp}
            hidden={isSmallScreen}
          >
            <img className="w-full h-full" src="/icons/exit.svg" />
          </div>
        </div>
      </div>
      <div className="flex flex-col p-8 justify-between space-y-8 h-full">
        {children}
        <div className="flex flex-col space-y-8 items-center">
          <button
            className="text-sm border-2 border-default p-2 rounded-none"
            onClick={closePopUp}
            hidden={!isSmallScreen}
          >
            exit
          </button>
          <label className="text-xs pb-8" hidden={!isSmallScreen}>
            Try this pop up on desktop!
          </label>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
