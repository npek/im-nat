"use client";
import { usePopUp } from "../hooks/usePopUp";

type PopUpProps = {
  title?: string;
  children: React.ReactNode;
};

const PopUp = ({ title, children }: PopUpProps) => {
  const { closePopUp } = usePopUp();

  return (
    <div className="absolute flex flex-col min-w-[50%] bg-dark border-2 border-default">
      <div className="flex items-center justify-center bg-default h-8 w-full">
        <label className="text-dark text-sm place-self-center">{title}</label>
        <div className="flex flex-row space-x-1 pr-1 absolute w-full justify-end">
          <div className="flex items-end border-dark border-2 w-5 h-5 p-0.5">
            <img src="/icons/minimize.svg" />
          </div>
          <div className="flex p-0.5 border-dark border-2 w-5 h-5">
            <img src="/icons/window.svg" />
          </div>
          <div
            className="border-dark border-2 w-5 h-5 p-0.5"
            onClick={closePopUp}
          >
            <img src="/icons/exit.svg" />
          </div>
        </div>
      </div>
      <div className="p-8">{children}</div>
    </div>
  );
};

export default PopUp;
