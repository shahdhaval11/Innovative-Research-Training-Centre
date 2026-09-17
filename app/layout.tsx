import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";
import ToastProvider from "@/components/layout/ToastProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NanoNova Research Training Centre",
    template: "%s | NanoNova Research Training Centre",
  },
  description:
    "Industry-oriented training, research guidance and hands-on laboratory experience in Microbiology, Biotechnology, Bioinformatics, Medical Laboratory Science and more.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <SiteShell>{children}</SiteShell>
        <ToastProvider />
      </body>
    </html>
  );
}
