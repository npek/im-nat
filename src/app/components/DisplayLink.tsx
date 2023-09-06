import Link from "next/link";

type FontSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

type DisplayLinkProps = {
  className?: string;
  children: React.ReactNode;
  href: string;
  fontSize: FontSize;
  smallFontSize?: FontSize;
  shouldGlitch?: boolean;
};

const DisplayLink = ({
  className,
  children,
  href,
  fontSize,
  smallFontSize,
}: DisplayLinkProps) => {
  return (
    <Link
      href={href}
      className={`${
        className ?? ""
      } glitch h-fit font-silkscreen w-fit decoration-3 underline md:text-${fontSize} text-${
        smallFontSize ?? fontSize
      }`}
      data-text={typeof children === "string" ? children : undefined}
    >
      {children}
    </Link>
  );
};

export default DisplayLink;
