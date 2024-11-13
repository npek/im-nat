"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";
import PopUp from "../components/PopUp";
import va from "@vercel/analytics";

type PopUpContextType = {
  showPopUp: (content: ReactNode, title?: string) => void;
  closePopUp: () => void;
  popUpIsShowing: boolean;
};

const PopUpContext = createContext<PopUpContextType | undefined>(undefined);

export const usePopUp = () => {
  const context = useContext(PopUpContext);
  if (!context) {
    va.track("usePopUp used outside of a PopUpProvider");
    throw new Error("usePopUp must be used within a PopUpProvider");
  }
  return context;
};

type PopUpProviderProps = {
  children: ReactNode;
};

export const PopUpProvider: React.FC<PopUpProviderProps> = ({ children }) => {
  const [popUpContent, setPopUpContent] = useState<ReactNode | null>(null);
  const [popUpTitle, setPopUpTitle] = useState<string | undefined>();

  const showPopUp = (content: ReactNode, title?: string) => {
    setPopUpContent(content);
    setPopUpTitle(title);
    va.track("Popup shown", { title: title ?? "" });
  };

  const closePopUp = () => {
    setPopUpContent(null);
  };

  const popUpIsShowing = popUpContent !== null;

  return (
    <PopUpContext.Provider value={{ showPopUp, closePopUp, popUpIsShowing }}>
      {children}
      {popUpContent && <PopUp title={popUpTitle}>{popUpContent}</PopUp>}
    </PopUpContext.Provider>
  );
};
