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
    <section className="py-16 bg-white" aria-label="برندهای معتبر همکار">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">
          برندهای معتبر همکار با فروشگاه چهره آپ
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          ما در فروشگاه اینترنتی چهره آپ افتخار همکاری با برندهای اصل و دارای مجوز بهداشت را داریم.
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center justify-items-center">
          {brands.map((brand) => (
            <div 
              key={brand.id}
              className="group relative flex items-center justify-center w-full h-24 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <img
                src={brand.logo_url}
                alt={brand.alt_text || `لوگوی برند ${brand.name}`}
                width={120}
                height={60}
                loading="lazy"
                className="max-h-full w-auto object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
