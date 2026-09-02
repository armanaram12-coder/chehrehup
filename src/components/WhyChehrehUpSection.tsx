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

  if (loading) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">
          چرا فروشگاه چهره آپ بهترین مرجع خرید محصولات آرایشی بهداشتی و تراست است؟
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-center mb-12">
          تفاوت ما در تعهد به اصالت کالا و ارائه مشاوره تخصصی رایگان برای تدوین روتین پوست و مو متناسب با نیاز شماست.
        </p>
        
        {/* ✅ گرید اصلاح شده با سایز یکسان */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {banners.map((banner) => (
            <div 
              key={banner.id} 
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 bg-white"
            >
              {/* کانتینر عکس با نسبت ابعاد ثابت */}
              <div className="aspect-[3/4] w-full overflow-hidden bg-gray-50">
                <img 
                  src={banner.image_url} 
                  alt={banner.title} // این alt برای سئو کافیه
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              {/*  لایه متنی حذف شد چون عکس‌ها خودشون متن دارن و شلوغ میشه */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
