"use client";
import { useWindowContext } from "../hooks/useWindowContext";
import Tab from "./Tab";

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
            <img src="/icons/minimize.svg" />
          </div>
          <div className="flex p-0.5 border-dark border-2 w-5 h-5">
            <img src="/icons/window.svg" />
          </div>
          <div className="border-dark border-2 w-5 h-5 p-0.5">
            <img src="/icons/exit.svg" />
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
            type={"playground"}
            page="/playground"
            isSelected={currentPage == "playground"}
          />
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
