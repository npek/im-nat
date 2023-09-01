import Link from "next/link";

type FontSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

type DisplayLinkProps = {
  className?: string;
  children: React.ReactNode;
  href: string;
  fontSize: FontSize;
  smallFontSize?: FontSize;
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
      } font-silkscreen w-fit decoration-3 underline sm:text-${fontSize} text-${
        smallFontSize ?? fontSize
      }`}
    >
      {children}
    </Link>
  );
};

export default DisplayLink;
