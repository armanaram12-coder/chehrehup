'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Banner {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

export default function WhyChehrehUpSection() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      const { data, error } = await supabase
        .from('feature_banners')
        .select('*')
        .order('order_index', { ascending: true });

      if (data && !error) {
        setBanners(data);
      }
      setLoading(false);
    };

    fetchBanners();
  }, []);

  if (loading) return null; // یا یه اسکلتون لودینگ ساده

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">
          چرا فروشگاه چهره آپ بهترین مرجع خرید محصولات آرایشی بهداشتی و تراست است؟
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-center mb-12">
          تفاوت ما در تعهد به اصالت کالا و ارائه مشاوره رایگان برای تدوین روتین پوست و مو متناسب با نیاز شماست.
        </p>
        
        {/* ✅ گرید جدید برای نمایش عکس‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {banners.map((banner) => (
            <div 
              key={banner.id} 
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 bg-white"
            >
              {/* عکس بنر */}
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img 
                  src={banner.image_url} 
                  alt={banner.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* لایه متن روی عکس (اختیاری - اگر عکس‌ها خودشون متن دارن شاید لازم نباشه) */}
              {/* اگر عکس‌ها کامل هستن و متن دارن، می‌تونی این بخش پایین رو حذف کنی یا فقط برای SEO نگه داری */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <h3 className="font-bold text-lg mb-1">{banner.title}</h3>
                 <p className="text-xs leading-relaxed line-clamp-2">{banner.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
