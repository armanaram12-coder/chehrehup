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
        .limit(3); // فقط ۳ تا برای صفحه اصلی

      if (!error && data) setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  if (loading || articles.length === 0) return null; // اگر لودینگ بود یا مقاله‌ای نبود، چیزی نشون نده

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* عنوان ساده برای بخش در صفحه اصلی */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          آخرین مقالات مجله چهره آپ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link 
              href={`/blog/${article.slug}`} 
              key={article.id}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col h-full"
            >
              {/* ✅ کانتینر عکس مربعی/افقی ثابت */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                <img 
                  src={article.image_url} 
                  alt={article.image_alt || article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 right-3 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                  {article.category}
                </span>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 leading-relaxed group-hover:text-purple-700">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-grow">
                  {article.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
