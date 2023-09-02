"use client";
import Tab, { TabType } from "./Tab";

type WindowProps = {
  children: React.ReactNode;
  currentPage: TabType;
};

const Window = ({ children, currentPage }: WindowProps) => {
  return (
    <main className="flex min-h-screen min-w-screen max-h-fit max-w-screen overflow-y-scroll flex-col space-y-12 font-mono text-nat-pink border-2 border-t-0 border-nat-pink bg-dark">
      <div className="flex flex-col divide-y-2 divide-nat-pink pr-1 fixed border-nat-pink border-y-2 w-full">
        <div className="flex flex-row justify-end bg-dark items-center space-x-2 p-1">
          <div className="flex items-end border-nat-pink border-2 w-5 h-5 p-0.5">
            <img src="/icons/minimize.svg" />
          </div>
          <div className="flex p-0.5 border-nat-pink border-2 w-5 h-5">
            <img src="/icons/window.svg" />
          </div>
          <div className="border-nat-pink border-2 w-5 h-5 p-0.5">
            <img src="/icons/exit.svg" />
          </div>
        </div>
        <div className="flex flex-row divide-x-1 w-full bg-dark">
          <Tab type={"home"} page="/" isSelected={currentPage == "home"} />
          <Tab
            type={"playground"}
            page="/playground"
            isSelected={currentPage == "playground"}
          />
          <Tab
            type={"resume"}
            page="/resume"
            isSelected={currentPage == "resume"}
          />
          <Tab
            type={"wikipedia"}
            page="/playground/wikipedia"
            isSelected={currentPage == "wikipedia"}
          />
        </div>
      </div>
      <div
        className={`flex flex-col sm:px-24 px-8 sm:py-32 py-20 selection:bg-nat-pink selection:text-dark`}
      >
        {children}
      </div>
    </main>
  );
};

export default Window;
