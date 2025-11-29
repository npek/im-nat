import Link from "next/link";
import { FontSize } from "../utils/textUtils";

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
      } glitch h-fit font-silkscreen w-fit decoration-3 underline text-${
        smallFontSize ?? fontSize
      } sm:text-${fontSize}`}
      data-text={typeof children === "string" ? children : undefined}
    >
      {children}
    </Link>
  );
};

export default DisplayLink;
