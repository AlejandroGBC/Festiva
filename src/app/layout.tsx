import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import MobileShell from "@/shared/layouts/MobileShell";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
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
