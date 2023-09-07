import "./globals.css";
import "./css/glitch.css";
import type { Metadata } from "next";
import { Anonymous_Pro, Silkscreen } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

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
      <head>
        <link rel="icon" href="/logo.svg" sizes="any" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GA_ID}');
          `,
          }}
        ></script>
        <link rel="apple-touch-icon" href="/nat-preview.png" />
        <meta property="og:image" content="/nat-preview.png"></meta>
      </head>
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
