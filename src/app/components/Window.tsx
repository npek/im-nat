"use client";
import { useRouter } from "next/navigation";

type WindowProps = {
  hideNavigation?: Boolean;
  children: React.ReactNode;
};

const Window = ({ children, hideNavigation = false }: WindowProps) => {
  const router = useRouter();

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
        {!hideNavigation && (
          <div className="flex flex-row divide-x-2 w-full bg-dark">
            <button
              onClick={() => router.push("/")}
              className="text-lg py-2 px-4 border-r-2 border-nat-pink"
            >
              Back
            </button>
          </div>
        )}
      </div>
      <div
        className={`flex flex-col sm:p-24 p-8 sm:pt-32 py-${
          hideNavigation ? 20 : 24
        } selection:bg-nat-pink selection:text-dark`}
      >
        {children}
      </div>
    </main>
  );
};

export default Window;
