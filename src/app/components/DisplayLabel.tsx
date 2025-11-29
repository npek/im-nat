import React, { PropsWithChildren } from "react";
import { FontSize, TextType } from "../utils/textUtils";

type DisplayLabelProps = PropsWithChildren<{
  className?: string;
  children: React.ReactNode;
  fontSize?: FontSize;
  smallFontSize?: FontSize;
  center?: boolean;
  textType?: TextType;
}>;

const DisplayLabel = ({
  className,
  children,
  fontSize,
  smallFontSize,
  center,
  textType = "body",
}: DisplayLabelProps) => {
  switch (textType) {
    case "h1":
      return (
        <h1
          className={`${className ?? ""} font-silkscreen w-fit ${
            fontSize && smallFontSize
              ? `sm:text-${smallFontSize}`
              : smallFontSize
              ? `sm:text-${smallFontSize}`
              : `text-5xl`
          } ${center && "text-center"}`}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={`${className ?? ""} font-silkscreen w-fit ${
            fontSize
              ? `sm:text-${fontSize} ${center && "text-center"}`
              : "text-3xl"
          }`}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={`${className ?? ""} w-fit ${
            fontSize ? `text-${fontSize}` : "text-2xl"
          } sm:text-${fontSize} ${center && "text-center"}`}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4
          className={`${className ?? ""} font-silkscreen w-fit text-${
            smallFontSize ?? fontSize
          } sm:text-${fontSize} ${center && "text-center"}`}
        >
          {children}
        </h4>
      );
    case "body":
    default:
      return (
        <label
          className={`${className ?? ""} w-fit text-${
            smallFontSize ?? fontSize
          } sm:text-${fontSize} ${center && "text-center"}`}
        >
          {children}
        </label>
      );
  }
};

export default DisplayLabel;
