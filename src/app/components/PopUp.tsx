"use client";
import { useEffect, useState } from "react";
import { usePopUp } from "../hooks/usePopUp";

type PopUpProps = {
  title?: string;
  children: React.ReactNode;
};

const PopUp = ({ title, children }: PopUpProps) => {
  const { closePopUp } = usePopUp();

  const [position, setPosition] = useState({ top: 200, left: 200 });
  const [dragging, setDragging] = useState(false);
  const [initialPos, setInitialPos] = useState({ x: 200, y: 200 });

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const updateScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 640); // Tailwind's default breakpoint for sm:
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

      const newTopPosition = Math.max(80, position.top + deltaY); // Ensure the popup's top position is never less than 80 pixels
      const newLeftPosition = position.left + deltaX;

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
        isSmallScreen ? "w-full h-full top-0 left-0 pt-[74px]" : "min-w-[40%]"
      } bg-dark border-2 border-default overflow-y-scroll`}
      style={
        !isSmallScreen
          ? { top: `${position.top}px`, left: `${position.left}px` }
          : undefined
      }
    >
      <div
        id="popupNav"
        className={`flex items-center justify-center bg-default h-8 w-full`}
        onMouseDown={onMouseDown}
      >
        <label className="text-dark text-md font-bold place-self-center">
          {title}
        </label>
        <div className="flex flex-row space-x-1 pr-1 absolute w-full justify-end items-center">
          <div
            className="border-dark border-2 w-5 h-5 p-0.5"
            onClick={closePopUp}
            hidden={isSmallScreen}
          >
            <img src="/icons/exit.svg" />
          </div>
        </div>
      </div>
      <div className="flex flex-col p-8 justify-between space-y-8 h-full">
        {children}
        <div className="flex flex-col space-y-8 items-center">
          <button
            className="text-sm border-2 border-default p-2"
            onClick={closePopUp}
            hidden={!isSmallScreen}
          >
            exit
          </button>
          <label className="text-xs pb-4" hidden={!isSmallScreen}>
            Try this pop up on desktop!
          </label>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
