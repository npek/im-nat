type FontSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

type DisplayLabelProps = {
  className?: string;
  children: string;
  fontSize: FontSize;
  smallFontSize?: FontSize;
  center?: boolean;
};

const DisplayLabel = ({
  className,
  children,
  fontSize,
  smallFontSize,
  center,
}: DisplayLabelProps) => {
  return (
    <label
      className={`${className ?? ""} font-silkscreen w-fit text-${
        smallFontSize ?? fontSize
      } sm:text-${fontSize} ${center && "text-center"}`}
    >
      {children}
    </label>
  );
};

export default DisplayLabel;
