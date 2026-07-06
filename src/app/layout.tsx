import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CartBar from "@/components/CartBar";
import Header from "@/components/Header";
import AgeGate from "@/components/AgeGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Йошкар Маркет — продукты и напитки с доставкой",
  description: "Доставка продуктов, энергетиков и напитков по Йошкар-Оле",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Йошкар Маркет",
  },
  openGraph: {
    title: "Йошкар Маркет — продукты и напитки с доставкой",
    description: "Доставка продуктов, энергетиков и напитков по Йошкар-Оле",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ff7a1a",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        {children}
        <CartBar /> 
        {modal}
        <AgeGate />
      </body>
    </html>
  );
}
