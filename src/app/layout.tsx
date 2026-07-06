import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import MobileShell from "@/shared/layouts/MobileShell";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Festiva",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body
        className={`font-sans antialiased`}
      >
        <MobileShell>{children}</MobileShell>
      </body>
    </html>
  );
}
