"use client";
import Link from "next/link";
import { useGlitch } from "react-powerglitch";

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
  shouldGlitch = true,
}: DisplayLinkProps) => {
  const glitch = useGlitch({ timing: { duration: 5000, iterations: 1 } });

  return (
    <Link
      ref={shouldGlitch ? glitch.ref : null}
      href={href}
      className={`${
        className ?? ""
      } font-silkscreen w-fit decoration-3 underline md:text-${fontSize} text-${
        smallFontSize ?? fontSize
      }`}
    >
      {children}
    </Link>
  );
};

export default DisplayLink;
