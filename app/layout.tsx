import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";

import "./globals.css";
const firaSans = Fira_Sans({ subsets: ["latin"], weight: ["400", "600"] });

export const metadata: Metadata = {
  title: "Labbies",
  description: "Labrador Retriever Welpen",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${firaSans.className} antialiased`}>{children}</body>
    </html>
  );
}
