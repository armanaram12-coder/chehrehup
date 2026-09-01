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
  // ✅ تغییر موقت عنوان با اعداد فارسی برای تایید اینماد
  title: "۵۹۱۱۰۶۳", 
  description: "خرید آنلاین اصل‌ترین محصولات آرایشی و بهداشتی، سرم، کرم، ضد آفتاب و شوینده برند تراست (Trust). دریافت مشاوره تخصصی رایگان برای روتین پوست و مو با مدیریت آرمان آرام در فروشگاه اینترنتی چهره آپ.",
  keywords: [
    "تراست", "Trust", "محصولات تراست", "چهره آپ", "ChehrehUp",
    "لوازم آرایشی بهداشتی", "روتین پوست و مو", "سرم تراست", "کرم ضد آفتاب تراست",
    "خرید آنلاین لوازم آرایشی", "مشاوره پوست و مو", "نماینده تراست", "محصولات اصل آرایشی"
  ],
  authors: [{ name: "آرمان آرام - فروشگاه چهره آپ" }],
  openGraph: {
    title: "فروشگاه چهره آپ | مرجع تخصصی محصولات آرایشی بهداشتی و برند تراست",
    description: "بهترین قیمت محصولات Trust (تراست) با ضمانت اصالت کالا. مشاوره رایگان روتین پوستی و ارسال به سراسر ایران.",
    type: "website",
    locale: "fa_IR",
    siteName: "فروشگاه اینترنتی چهره آپ",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ScrollToTop /> 
        <JsonLd />
        <AuthProvider>{children}</AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
