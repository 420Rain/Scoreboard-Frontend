import type { Metadata } from "next";
import { Lexend, Rubik, Poppins, Archivo } from "next/font/google";
import "./globals.css";

const LexendFont = Lexend({
  weight: "600",
  subsets: ["latin"],
  variable: "--font-lexend",
});

const RubikFont = Rubik({
  weight: "800",
  subsets: ["latin"],
  variable: "--font-rubik",
});

const PoppinsFont = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const ArchivoFont = Archivo({
  weight: "900",
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "LSCS Scoreboard",
  description: "A Scoreboard for LSCS Members. Earn Points by Engaging with the Organization's Activities!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${LexendFont.variable} 
          ${RubikFont.variable} 
          ${PoppinsFont.variable} 
          ${ArchivoFont.variable} 
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
