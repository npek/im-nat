import { Ref } from "react";

type FontSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

type DisplayLabelProps = {
  ref?: Ref<HTMLLabelElement> | undefined;
  className?: string;
  children: React.ReactNode;
  fontSize: FontSize;
  smallFontSize?: FontSize;
};

const DisplayLabel = ({
  ref,
  className,
  children,
  fontSize,
  smallFontSize,
}: DisplayLabelProps) => {
  return (
    <label
      ref={ref}
      className={`${className ?? ""} font-silkscreen w-fit sm:text-${
        smallFontSize ?? fontSize
      } text-${fontSize}`}
    >
      {children}
    </label>
  );
};

export default DisplayLabel;
