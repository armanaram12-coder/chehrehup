// src/app/blog/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('Slug is missing.');
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .single();

        if (error) {
          console.error('Supabase Error:', error);
          setError(error.message);
        } else if (data) {
          setArticle(data);
        } else {
          setError('Article not found.');
        }
      } catch (err) {
        console.error('Fetch Error:', err);
        setError('Network error.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-white" dir="rtl">
          <div className="text-purple-600 font-bold text-xl animate-pulse">در حال بارگذاری مقاله...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !article) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-white" dir="rtl">
          <h2 className="text-2xl font-bold text-red-600 mb-4">خطا در نمایش مقاله</h2>
          <p className="text-gray-500 mb-6">{error || 'مقاله یافت نشد.'}</p>
          <Link href="/blog" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            بازگشت به مجله
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12" dir="rtl">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* دکمه بازگشت */}
          <div className="mb-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              بازگشت به آرشیو مقالات
            </Link>
          </div>

          {/* کارت اصلی مقاله */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            
            {/* تصویر اصلی - محدود شده به ارتفاع ۵۰۰ پیکسل */}
            <div className="w-full bg-gray-100 relative">
              <img
                src={article.image_url}
                alt={article.image_alt || article.title}
                className="w-full h-auto max-h-[500px] object-cover mx-auto"
              />
            </div>

            <div className="p-8 md:p-12">
              {/* هدر مقاله */}
              <header className="mb-10 text-center border-b border-gray-100 pb-8">
                <span className="inline-block bg-purple-50 text-purple-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-purple-100">
                  {article.category}
                </span>
                <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                  {article.title}
                </h1>
                <div className="text-gray-400 text-sm flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(article.created_at).toLocaleDateString('fa-IR')}
                </div>
              </header>

              {/* محتوای متنی */}
              <div 
                className="prose prose-lg prose-purple max-w-none text-gray-700 leading-loose [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-10 [&>h2]:mb-6 [&>p]:mb-6 [&>ul]:list-disc [&>ul]:pr-6 [&>li]:mb-3"
                dangerouslySetInnerHTML={{ __html: article.content }} 
              />

              {/* باکس CTA (متن ثابت پایین همه مقالات) */}
              <div className="mt-16 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-8 text-center shadow-sm">
                <h3 className="text-xl font-bold text-purple-900 mb-4">خرید مطمئن از فروشگاه آینه</h3>
                <p className="text-gray-700 leading-relaxed mb-6 text-base">
                  اگر به دنبال محصولات آرایشی و بهداشتی اصل، باکیفیت هستید، <span className="font-bold text-purple-700">فروشگاه همواره تخفیف آینه</span> بهترین انتخاب برای شماست.
                  ما با افتخار نماینده فروش برند تراست هستیم و تمامی محصولات تراست را با ضمانت‌نامه معتبر به دست شما می‌رسانیم.
                </p>
                <Link 
                  href="/dashboard" 
                  className="inline-flex items-center justify-center bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1"
                >
                  ورود به داشبورد و شروع خرید
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
