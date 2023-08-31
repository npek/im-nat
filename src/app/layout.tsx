import "./globals.css";
import type { Metadata } from "next";
import { Anonymous_Pro, Silkscreen } from "next/font/google";

const anonymousPro = Anonymous_Pro({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-anonymous",
});
const silkscreen = Silkscreen({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-silkscreen",
});

export const metadata: Metadata = {
  title: "I'm Nat",
  description: "Natalie Pekker's personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anonymousPro.variable} ${silkscreen.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
