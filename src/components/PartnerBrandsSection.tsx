export default function PartnerBrandsSection() {
  return (
    <section className="py-16 bg-white" aria-label="برندهای همکار فروشگاه چهره آپ">
      <div className="container mx-auto px-4">
        {/* ✅ استفاده از h2 برای ساختار معنایی و سئو */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">
          برندهای معتبر همکار با فروشگاه چهره آپ
        </h2>
        <p className="text-gray-600 text-center mb-12">
          ما فقط با برندهای معتبر و دارای مجوز همکاری می‌کنیم
        </p>
        
        {/* ✅ گرید برندها */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
          
          {/* Trust Smart */}
          <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-24 w-full hover:shadow-lg transition-shadow border border-gray-100">
            <img 
              src="/logos/trust-smart.png" // مسیر عکس رو باید درست کنی
              alt="لوگوی برند تراست اسمارت - Trust Smart" 
              width="120" 
              height="60"
              loading="lazy"
              className="max-h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>

          {/* Trust Pro */}
          <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-24 w-full hover:shadow-lg transition-shadow border border-gray-100">
            <img 
              src="/logos/trust-pro.png" 
              alt="لوگوی برند تراست پرو - Trust Pro" 
              width="120" 
              height="60"
              loading="lazy"
              className="max-h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>

          {/* Trust Slim */}
          <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-24 w-full hover:shadow-lg transition-shadow border border-gray-100">
            <img 
              src="/logos/trust-slim.png" 
              alt="لوگوی برند تراست اسلیم - Trust Slim" 
              width="120" 
              height="60"
              loading="lazy"
              className="max-h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>

          {/* Trust Aura */}
          <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-24 w-full hover:shadow-lg transition-shadow border border-gray-100">
            <img 
              src="/logos/trust-aura.png" 
              alt="لوگوی برند تراست آرا - Trust Aura" 
              width="120" 
              height="60"
              loading="lazy"
              className="max-h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>

          {/* Class1 */}
          <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-24 w-full hover:shadow-lg transition-shadow border border-gray-100">
            <img 
              src="/logos/class1.png" 
              alt="لوگوی برند کلاس وان - Class1" 
              width="120" 
              height="60"
              loading="lazy"
              className="max-h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>

          {/* LifeGuard */}
          <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-24 w-full hover:shadow-lg transition-shadow border border-gray-100">
            <img 
              src="/logos/lifeguard.png" 
              alt="لوگوی برند لایف گارد - LifeGuard" 
              width="120" 
              height="60"
              loading="lazy"
              className="max-h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>

          {/* Serje */}
          <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-24 w-full hover:shadow-lg transition-shadow border border-gray-100">
            <img 
              src="/logos/serje.png" 
              alt="لوگوی برند سرژه - Serje" 
              width="120" 
              height="60"
              loading="lazy"
              className="max-h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
