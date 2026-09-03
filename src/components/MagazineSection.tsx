'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
// اگر کامپوننت یا هوک خاصی برای گرفتن مقالات داری اینجا ایمپورت کن
// مثلا: import { getArticles } from '@/lib/api'; 

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  slug: string;
}

export default function MagazineSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ اینجا باید تابعی که قبلاً مقالات رو می‌گرفت صدا بزنی
    // من فعلاً یه آرایه خالی گذاشتم تا ارور نده. 
    // اگر کد قبلیت رو داری، دقیقاً همون fetch رو اینجا بذار.
    
    // مثال فرضی:
    // const fetchArticles = async () => { ... };
    // fetchArticles();
    
    setLoading(false);
  }, []);

  if (loading) return <div className="py-16 text-center">در حال بارگذاری مجله...</div>;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* هدر بخش با دکمه مشاهده همه */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="text-center md:text-right">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              مجله چهره آپ - راهنمای تخصصی مراقبت از پوست و مو
            </h2>
            <p className="text-gray-600">جدیدترین مقالات آموزشی، معرفی محصولات تراست و نکات زیبایی</p>
          </div>
          
          {/* ✅ دکمه مشاهده همه مقالات */}
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-50 text-purple-700 font-bold rounded-xl hover:bg-purple-100 transition-colors border border-purple-100 whitespace-nowrap"
          >
            مشاهده همه مقالات مجله چهره آپ
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* گرید مقالات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.length > 0 ? (
            articles.map((article) => (
              <Link 
                href={`/blog/${article.slug}`} 
                key={article.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
              >
                {/* ✅ کانتینر عکس با نسبت ابعاد ثابت 4:3 */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <span className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm bg-opacity-90">
                    {article.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-relaxed group-hover:text-purple-700 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {article.excerpt}
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
            ))
          ) : (
            // ✅ حالت خالی بودن (اگر مقاله‌ای نبود یا هنوز لود نشده بود)
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500">هنوز مقاله‌ای در مجله منتشر نشده است.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
