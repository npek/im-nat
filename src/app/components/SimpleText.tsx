import React, { PropsWithChildren } from "react";
import { FontSize, TextType } from "../utils/textUtils";

type DisplayLabelProps = PropsWithChildren<{
  className?: string;
  children: React.ReactNode;
  fontSize?: FontSize;
  center?: boolean;
}>;

const SimpleText = ({
  className,
  children,
  fontSize,
  center,
}: DisplayLabelProps) => {
  return (
    <span
      className={`${className ?? ""} w-fit ${
        fontSize ? `text-${fontSize}` : "text-xl"
      }`}
    >
      {children}
    </span>
  );
};

export default SimpleText;
