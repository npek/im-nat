"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";
import PopUp from "../components/PopUp";

type PopUpContextType = {
  showPopUp: (content: ReactNode, title?: string) => void;
  closePopUp: () => void;
};

const PopUpContext = createContext<PopUpContextType | undefined>(undefined);

export const usePopUp = () => {
  const context = useContext(PopUpContext);
  if (!context) {
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
  };

  const closePopUp = () => {
    setPopUpContent(null);
  };

  return (
    <PopUpContext.Provider value={{ showPopUp, closePopUp }}>
      {children}
      {popUpContent && <PopUp title={popUpTitle}>{popUpContent}</PopUp>}
    </PopUpContext.Provider>
  );
};
