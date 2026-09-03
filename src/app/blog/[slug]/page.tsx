'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
// اگر هدر و فوتر داری ایمپورت کن، اگر نه این دو خط رو حذف کن
// import Header from '@/components/Header'; 
// import Footer from '@/components/Footer';

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      // دریافت فقط همین یک مقاله بر اساس اسلاگ
      const { data, error } = await supabase
        .from('articles')
        .select('*') // تمام فیلدها شامل content را می‌گیرد
        .eq('slug', params.slug)
        .eq('is_active', true)
        .single();
      
      if (data && !error) {
        setArticle(data);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [params.slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">در حال بارگذاری مقاله...</div>;
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">مقاله مورد نظر یافت نشد</h2>
        <Link href="/blog" className="text-purple-600 hover:underline">بازگشت به مجله</Link>
      </div>
    );
  }

  return (
    <>
      {/* <Header /> */}
      <main className="min-h-screen bg-white py-12" dir="rtl">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* دکمه بازگشت */}
          <div className="mb-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              بازگشت به آرشیو مقالات
            </Link>
          </div>

          {/* تصویر اصلی مقاله - سایز اصلی و کامل (بدون تغییر) */}
          <div className="w-full mb-10 rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
            <img 
              src={article.image_url} 
              alt={article.image_alt || article.title}
              className="w-full h-auto object-contain" 
            />
          </div>

          {/* عنوان و دسته‌بندی */}
          <header className="mb-8 text-center">
            <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="text-gray-500 text-sm">
              منتشر شده در: {new Date(article.created_at).toLocaleDateString('fa-IR')}
            </div>
          </header>

          {/* ✅ محتوای متنی مقاله (این بخش قبلاً وجود نداشت یا اشتباه بود) */}
          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pr-6 [&>li]:mb-2"
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />

        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}
