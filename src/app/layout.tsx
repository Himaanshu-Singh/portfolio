import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Himanshu Singh | SDET & QA Automation Engineer",
  description: "Portfolio of Himanshu Singh — SDET / QA Automation Engineer with expertise in Selenium, Appium, TestNG, and AI-driven automation.",
  keywords: ["SDET", "QA Automation", "Selenium", "Appium", "TestNG", "Himanshu Singh"],
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
