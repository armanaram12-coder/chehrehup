'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Article {
  id: number;
  title: string;
  summary: string;
  image_url: string;
  image_alt?: string;
  category: string;
  slug: string;
}

export default function MagazineSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, summary, image_url, image_alt, category, slug')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (!error && data) setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  if (loading || articles.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        
        {/* عنوان بخش */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            مجله چهره آپ - راهنمای تخصصی مراقبت از پوست و مو
          </h2>
          <p className="text-gray-600">جدیدترین مقالات آموزشی و نکات طلایی زیبایی</p>
        </div>

        {/* گرید ۳ تایی با عکس‌های سایز اصلی (بدون کراپ) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {articles.map((article) => (
            <Link 
              href={`/blog/${article.slug}`} 
              key={article.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
            >
              {/* ✅ حذف aspect-ratio -> نمایش عکس با سایز اصلی و کامل */}
              <div className="relative w-full overflow-hidden bg-gray-100">
                <img 
                  src={article.image_url} 
                  alt={article.image_alt || article.title}
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-relaxed group-hover:text-purple-700 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                  {article.summary}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <span className="text-purple-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    مطالعه کامل مقاله
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ✅ دکمه مشاهده همه مقالات (دقیقاً زیر ۳ کارت) */}
        <div className="flex justify-center mt-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-purple-700 font-bold rounded-xl hover:bg-purple-50 transition-colors border border-purple-200 shadow-sm group"
          >
            مشاهده همه مقالات مجله چهره آپ
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
