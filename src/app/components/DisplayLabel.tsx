type FontSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

type DisplayLabelProps = {
  className?: string;
  children: React.ReactNode;
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
      className={`${className ?? ""} font-silkscreen text-${
        smallFontSize ?? fontSize
      } sm:text-${fontSize}`}
    >
      {children}
    </label>
  );
};

export default DisplayLabel;
