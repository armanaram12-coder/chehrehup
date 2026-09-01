import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import ScrollToTop from "@/components/ScrollToTop"; 

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "فروشگاه چهره آپ | نمایندگی رسمی محصولات تراست", // عنوان رو برگردوندیم به حالت عادی
  description: "خرید آنلاین اصل‌ترین محصولات آرایشی و بهداشتی...",
  // ... بقیه متادیتاها
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        {/* ✅ اضافه کردن متاتگ اینماد به صورت مستقیم و ثابت */}
        <meta name="enamad" content="59110863" />
      </head>
      <body className="min-h-full flex flex-col">
        <ScrollToTop /> 
        <JsonLd />
        <AuthProvider>{children}</AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
