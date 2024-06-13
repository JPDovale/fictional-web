import type { Metadata } from "next";
import {  Cinzel_Decorative, Roboto } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const cinzel = Cinzel_Decorative({ subsets: ["latin"], weight: '400', variable: '--font-cinzel' });
const robot = Roboto({ subsets: ["latin"], weight: '400', variable: '--font-roboto' });

export const metadata: Metadata = {
  title: "Fictional",
  description: "O lugar onde os sonhos se tornam realidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${robot.variable}`}>
        <Suspense>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
