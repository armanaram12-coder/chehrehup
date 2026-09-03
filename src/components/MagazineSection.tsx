import Link from 'next/link';

// داده‌های نمونه برای مقالات (اگر از دیتابیس می‌خونی، این بخش رو تغییر بده)
const articles = [
  {
    id: 1,
    title: 'چرا محصولات تراست (Trust) انتخاب اول است؟ | نمایندگی رسمی فروش در فروشگاه آینه',
    excerpt: 'آشنایی با تکنولوژی ساخت، استانداردهای آزمایشگاهی و فرمولاسیون منحصر‌به‌فرد محصولات آرایشی و بهداشتی تراست که آن را از سایر برندها متمایز می‌کند.',
    image: '/images/magazine/trust-brand.jpg', // مسیر عکس رو چک کن
    category: 'معرفی برند',
    slug: 'why-trust-products'
  },
  {
    id: 2,
    title: 'معجزه نیاسینامید تراست برای منافذ باز | خرید محصولات آرایشی و بهداشتی اصل از فروشگاه آینه',
    excerpt: 'نیاسینامید (ویتامین B3) موجود در سرم‌های تراست چگونه ترشح چربی را کنترل کرده و ظاهر منافذ باز پوست را به طرز چشمگیری کاهش می‌دهد؟',
    image: '/images/magazine/niacinamide.jpg',
    category: 'مراقبت پوست',
    slug: 'niacinamide-miracle'
  },
  {
    id: 3,
    title: 'تفاوت سرم و کرم تخصصی تراست | بهترین روتین پوست و مو در فروشگاه آینه',
    excerpt: 'آشنایی با تفاوت غلظت و سرعت جذب سرم‌ها و کرم‌های تراست. چگونه محصولات آرایشی و بهداشتی تراست را به ترتیب صحیح برای حداکثر اثربخاری استفاده کنیم؟',
    image: '/images/magazine/serum-vs-cream.jpg',
    category: 'آموزشی',
    slug: 'serum-vs-cream-difference'
  }
];

export default function MagazineSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            مجله چهره آپ - راهنمای تخصصی مراقبت از پوست و مو
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            جدیدترین مقالات آموزشی، معرفی محصولات تراست و نکات زیبایی
          </p>
        </div>

        {/* ✅ گرید با کارت‌های هم‌اندازه */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link 
              href={`/blog/${article.slug}`} 
              key={article.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
            >
              {/* ✅ کانتینر عکس با نسبت ابعاد ثابت (مهم‌ترین بخش برای هم‌اندازه شدن) */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* بج دسته‌بندی روی عکس */}
                <span className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {article.category}
                </span>
              </div>

              {/* محتوای متنی */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-relaxed group-hover:text-purple-700 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                  {article.excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
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
