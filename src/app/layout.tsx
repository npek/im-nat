import "./globals.css";
import "./css/glitch.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { PopUpProvider } from "./hooks/usePopUp";
import Window from "./components/Window";
import { WindowProvider } from "./hooks/useWindowContext";

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
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" sizes="any" />
        <link rel="apple-touch-icon" href="/nat-preview.png" />
        <meta property="og:image" content="/nat-preview.png"></meta>
        <meta name="twitter:card" content="I'm Nat" />
        <meta name="twitter:image" content="/twitter-preview.png" />
      </head>
      <body>
        <WindowProvider>
          <Window>
            <PopUpProvider>{children}</PopUpProvider>
          </Window>
        </WindowProvider>
      </body>
      <Analytics />
    </html>
  );
}
