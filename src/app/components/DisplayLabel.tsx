type FontSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

type DisplayLabelProps = {
  className?: string;
  children: string;
  fontSize: FontSize;
  smallFontSize?: FontSize;
};

const DisplayLabel = ({
  className,
  children,
  fontSize,
  smallFontSize,
}: DisplayLabelProps) => {
  return (
    <label
      className={`${className ?? ""} font-silkscreen w-fit sm:text-${
        smallFontSize ?? fontSize
      } text-${fontSize}`}
    >
      {children}
    </label>
  );
};

export default DisplayLabel;
