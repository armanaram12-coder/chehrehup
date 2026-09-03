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
    console.log('Current Slug Value:', slug);

    if (!slug) {
      setError('Slug is missing. URL might be incorrect.');
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
          setError('Article not found in database.');
        }
      } catch (err) {
        console.error('Fetch Error:', err);
        setError('Network error occurred.');
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
          <div className="text-purple-600 font-bold text-xl">در حال بارگذاری...</div>
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
          <p className="text-gray-600 mb-2 font-mono bg-gray-100 px-3 py-1 rounded">Slug: {slug || 'N/A'}</p>
          <p className="text-gray-500 mb-6 max-w-lg">{error || 'مقاله یافت نشد.'}</p>
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
      <main className="min-h-screen bg-white py-12" dir="rtl">
        <div className="container mx-auto px-4 max-w-4xl">

          <div className="mb-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              بازگشت به آرشیو مقالات
            </Link>
          </div>

          {/* تصویر اصلی - سایز کامل و بدون برش */}
          <div className="w-full mb-10 rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
            <img
              src={article.image_url}
              alt={article.image_alt || article.title}
              className="w-full h-auto object-contain"
            />
          </div>

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

          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pr-6 [&>li]:mb-2"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

        </div>
      </main>
      <Footer />
    </>
  );
}
