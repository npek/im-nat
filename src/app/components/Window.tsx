"use client";
import { useWindowContext } from "../hooks/useWindowContext";
import Tab from "./Tab";
import Image from "next/image";

type WindowProps = {
  children: React.ReactNode;
};

const Window = ({ children }: WindowProps) => {
  const { currentPage, pageTitle } = useWindowContext();

  return (
    <main
      id="screen"
      className="flex min-h-[calc(100dvh)] min-w-screen max-h-[calc(100dvh)] max-w-screen overflow-y-scroll flex-col font-mono text-default border-2 border-default bg-dark"
    >
      {pageTitle && <title>{pageTitle}</title>}
      <div className="scanline z-[75]" />
      <div className="flex flex-col pr-1 fixed border-default border-y-2 w-full z-50">
        <div className="flex flex-row justify-end bg-default items-center space-x-2 p-1">
          <div className="flex items-end border-dark border-2 w-5 h-5 p-0.5">
            <Image
              src="/icons/minimize.svg"
              alt="fake minimize window button"
              width={80}
              height={80}
            />
          </div>
          <div className="flex p-0.5 border-dark border-2 w-5 h-5">
            <Image
              src="/icons/window.svg"
              alt="fake window button"
              width={80}
              height={80}
            />
          </div>
          <div className="border-dark border-2 w-5 h-5 p-0.5">
            <Image
              src="/icons/exit.svg"
              alt="fake exit button"
              width={80}
              height={80}
            />
          </div>
        </div>
        <div className="flex flex-row overflow-x-scroll divide-x-1 w-full bg-dark pt-1">
          <Tab type={"home"} page="/" isSelected={currentPage == "home"} />
          <Tab
            type={"resume"}
            page="/resume"
            isSelected={currentPage == "resume"}
          />
          <Tab
            type={"portfolio"}
            page="/portfolio"
            isSelected={currentPage == "portfolio"}
          />
          {/* <Tab
            type={"playground"}
            page="/playground"
            isSelected={currentPage == "playground"}
          /> */}
          <Tab
            type={"wikipedia"}
            page="/playground/wikipedia"
            isSelected={currentPage == "wikipedia"}
          />
        </div>
      </div>
      <div
        className={`flex flex-col top-0 shrink mt-12 sm:px-24 px-8 md:py-32 py-24 selection:bg-default selection:text-dark`}
      >
        {children}
      </div>
    </main>
  );
};

export default Window;
