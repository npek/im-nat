"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { TabType } from "../components/Tab";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";

type WindowContextType = {
  currentPage: TabType | undefined;
  pageTitle: string | undefined;
  setPageTitle: (title: string) => void;
};

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const useWindowContext = () => {
  const context = useContext(WindowContext);
  if (!context) {
    track("Error: called useWindowContext outside of provider");
    throw new Error("useWindowContext must be used within a WindowProvider");
  }
  return context;
};

type WindowProviderProps = {
  children: ReactNode;
};

export const WindowProvider = ({ children }: WindowProviderProps) => {
  const [pageTitle, setPageTitle] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState<TabType | undefined>();

  const pathname = usePathname();
  useEffect(() => {
    let tempPage: TabType | undefined;
    switch (pathname) {
      case "/":
        tempPage = "home";
        setPageTitle("I'm Nat");
        break;
      case "/resume":
        tempPage = "resume";
        setPageTitle("Nat's Resume");
        break;
      case "/playground":
        tempPage = "playground";
        setPageTitle("Nat's Playground");
        break;
      case "/playground/wikipedia":
        tempPage = "wikipedia";
        setPageTitle("Nat's Wikipedia");
        break;
      case "/portfolio":
        tempPage = "portfolio";
        setPageTitle("Nat's Portfolio");
        break;
      default:
        tempPage = undefined;
        break;
    }
    setCurrentPage(tempPage);
  }, [pathname]);

  return (
    <WindowContext.Provider value={{ currentPage, pageTitle, setPageTitle }}>
      {children}
    </WindowContext.Provider>
  );
};
