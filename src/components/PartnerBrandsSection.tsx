'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Brand {
  id: number;
  name: string;
  logo_url: string;
  alt_text: string;
}

export default function PartnerBrandsSection() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      const { data, error } = await supabase
        .from('partner_brands')
        .select('id, name, logo_url, alt_text')
        .order('order_index', { ascending: true });

      if (data && !error) {
        setBrands(data);
      }
      setLoading(false);
    };

    fetchBrands();
  }, []);

  if (loading) return null;

  return (
    // ✅ تغییر ۱: پس‌زمینه متمایز (خاکستری خیلی روشن) برای جداسازی بصری
    <section className="py-20 bg-gray-50/80 relative overflow-hidden" aria-label="برندهای معتبر همکار">
      
      {/* المان تزئینی پس‌زمینه برای زیبایی بیشتر */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
         <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
         <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            برندهای معتبر همکار با <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">فروشگاه چهره آپ</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            ما در چهره آپ افتخار داریم که نمایندگی رسمی و مستقیم معتبرترین برندهای آرایشی و بهداشتی را برای شما فراهم کرده‌ایم.
          </p>
        </div>
        
        {/* ✅ تغییر ۲: گرید با فاصله بیشتر و کارت‌های بزرگتر */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center justify-items-center">
          {brands.map((brand) => (
            <div 
              key={brand.id}
              // ✅ تغییر : کارت‌های سفید با سایه نرم و هاور جذاب
              className="group relative flex flex-col items-center justify-center w-full h-36 p-6 rounded-2xl bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >
              <img
                src={brand.logo_url}
                alt={brand.alt_text || `لوگوی برند ${brand.name}`}
                width={140} // کمی عریض‌تر برای خوانایی بهتر
                height={70}
                loading="lazy"
                // ✅ افکت: سیاه و سفید بودن در حالت عادی، رنگی و بزرگنمایی در هاور
                className="max-h-16 w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 ease-out"
              />
              
              {/* نام برند زیر لوگو (اختیاری - اگر لوگو ناخوانا بود کمک میکنه) */}
              <span className="mt-3 text-xs font-bold text-gray-400 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
