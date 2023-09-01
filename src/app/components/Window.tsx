"use client";
import { useRouter } from "next/navigation";

type WindowProps = {
  hideNavigation?: Boolean;
  children: React.ReactNode;
};

const Window = ({ children, hideNavigation = false }: WindowProps) => {
  const router = useRouter();

  return (
    <main className="flex min-h-screen min-w-screen max-h-screen max-w-screen overflow-y-scroll flex-col space-y-12 font-mono text-nat-pink border-2 border-nat-pink bg-dark">
      <div className="flex flex-col divide-y-2 divide-nat-pink pr-1 fixed border-nat-pink border-b-2 w-full">
        <div className="flex flex-row bg-dark items-center pl-4 space-x-2 h-12">
          <div className="rounded-full border-nat-pink border-2 w-5 h-5" />
          <div className="rounded-full border-nat-pink border-2 w-5 h-5" />
          <div className="rounded-full border-nat-pink border-2 w-5 h-5" />
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
      <div className="flex flex-col sm:p-24 p-8 sm:pt-24 pt-16 selection:bg-nat-pink selection:text-dark">
        {children}
      </div>
    </main>
  );
};

export default Window;
