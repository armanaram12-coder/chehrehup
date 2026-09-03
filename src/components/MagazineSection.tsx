'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

// ✅ تعریف اینترفیس دقیقاً مطابق ستون‌های دیتابیس تو
interface Article {
  id: number;
  title: string;
  summary: string; // تغییر نام از excerpt به summary
  image_url: string; // تغییر نام از image به image_url
  image_alt?: string;
  category: string;
  slug: string;
}

export default function MagazineSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      // ✅ انتخاب ستون‌های دقیق موجود در دیتابیس
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, summary, image_url, image_alt, category, slug')
        .eq('is_active', true) // فقط مقالات فعال رو بیاره
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching articles:', error);
      } else if (data) {
        setArticles(data);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  if (loading) return <div className="py-16 text-center text-gray-500">در حال بارگذاری مجله...</div>;

  return (
    <section className="py-16 bg-white" aria-label="مقالات آموزشی مجله چهره آپ">
      <div className="container mx-auto px-4">
        
        {/* هدر بخش + دکمه مشاهده همه */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              مجله چهره آپ - راهنمای تخصصی مراقبت از پوست و مو
            </h2>
            <p className="text-gray-600 max-w-xl">
              جدیدترین مقالات آموزشی، نقد و بررسی محصولات تراست و نکات طلایی زیبایی
            </p>
          </div>
          
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-50 text-purple-700 font-bold rounded-xl hover:bg-purple-100 transition-colors border border-purple-100 whitespace-nowrap group"
            aria-label="مشاهده آرشیو کامل مقالات مجله چهره آپ"
          >
            مشاهده همه مقالات
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* گرید مقالات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link 
              href={`/blog/${article.slug}`} 
              key={article.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
            >
              {/* ✅ کانتینر عکس با نسبت 4:3 ثابت */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img 
                  src={article.image_url} // ✅ استفاده از نام صحیح ستون
                  alt={article.image_alt || article.title} // ✅ سئو: اولویت با alt اختصاصی
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  width="400"
                  height="300"
                />
                <span className="absolute top-4 right-4 bg-purple-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-relaxed group-hover:text-purple-700 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                  {article.summary} // ✅ استفاده از نام صحیح ستون (summary)
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
      </div>
    </section>
  );
}
