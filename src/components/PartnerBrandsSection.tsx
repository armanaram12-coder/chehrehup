export default function PartnerBrandsSection() {
  // ✅ لیست برندها - برای اضافه کردن برند جدید فقط کافیه اسمش رو اینجا بنویسی
  const brands = [
    'Trust Smart',
    'Trust Pro',
    'Trust Slim',
    'Trust Aura',
    'Class1',
    'LifeGuard',
    'Serje'
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">
          برندهای معتبر همکار با فروشگاه چهره آپ
        </h2>
        <p className="text-gray-600 text-center mb-12">
          ما فقط با برندهای معتبر و دارای مجوز همکاری می‌کنیم
        </p>
        
        {/* ✅ گرید برندها */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
          {brands.map((brand, idx) => (
            <div 
              key={idx} 
              className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-24 w-full hover:shadow-lg transition-shadow border border-gray-100"
            >
              {/* 
                نکته: الان از متن استفاده کردیم. 
                اگر لوگوی تصویری (PNG/SVG) داری، می‌تونی جای span از تگ img استفاده کنی 
              */}
              <span className="text-lg font-bold text-gray-700 text-center whitespace-nowrap">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
