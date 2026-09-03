// src/app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// این تابع سمت سرور اجرا میشه و params همیشه درسته
async function getArticle(slug: string) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true) // فیلتر فعال بودن حفظ شد
    .single();

  if (error || !data) return null;
  return data;
}

// متادیتا برای سئو
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  return {
    title: article ? `${article.title} | مجله چهره آپ` : 'مقاله یافت نشد',
    description: article?.summary || 'مقاله تخصصی مراقبت از پوست و مو',
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  // اگر مقاله پیدا نشد، صفحه 404 استاندارد نمایش داده میشه
  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white py-12" dir="rtl">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* دکمه بازگشت */}
          <div className="mb-8">
            <a href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              بازگشت به آرشیو مقالات
            </a>
          </div>

          {/* تصویر اصلی - سایز کامل و بدون برش */}
          <div className="w-full mb-10 rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
            <img 
              src={article.image_url} 
              alt={article.image_alt || article.title}
              className="w-full h-auto object-contain"
              width="800"
              height="600"
            />
          </div>

          {/* عنوان و اطلاعات */}
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

          {/* محتوای متنی مقاله */}
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
