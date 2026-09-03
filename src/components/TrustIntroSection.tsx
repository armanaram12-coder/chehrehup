// src/components/TrustIntroSection.tsx
import Link from 'next/link';

export default function TrustIntroSection() {
  // ✅ لینک دقیقاً مطابق FloatingContact.tsx
  const whatsappLink = "https://api.whatsapp.com/send?phone=989352225693&text=سلام،%20من%20برای%20مشاوره%20خرید%20پیام%20می‌دهم.";

  // مسیر عکس‌ها رو اینجا تنظیم کن
  const productImages = [
    "/images/trust/sunscreen.jpg", 
    "/images/trust/serums.jpg",    
    "/images/trust/perfume.jpg",   
    "/images/trust/wash.jpg"       
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-[#4c1d95] to-[#5b21b6] text-white relative overflow-hidden">
      {/* المان‌های تزئینی پس‌زمینه */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* بخش متنی و دکمه‌ها */}
          <div className="lg:w-1/2 text-right">
            <span className="inline-block bg-white/10 backdrop-blur-md text-purple-100 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/20">
              نمایندگی رسمی فروش برند Trust
            </span>
            
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
              راز درخشش پوست شما، در روتین مراقبتی تخصصی تراست است
            </h2>
            
            <p className="text-purple-100 leading-relaxed mb-8 text-lg text-justify">
              محصولات آرایشی و بهداشتی تراست (Trust) با فرمولاسیون پیشرفته، نیازهای مختلف پوستی از جمله آبرسانی، ضدچروک، روشن‌کنندگی و محافظت در برابر آفتاب را پوشش می‌دهند. ما در فروشگاه اینترنتی چهره آپ، نه تنها فروشنده، بلکه مشاور شما برای انتخاب صحیح سرم، کرم و شوینده تراست هستیم تا بیشترین بازدهی را برای روتین پوست و موی خود تجربه کنید.
            </p>

            <div className="flex flex-wrap gap-4">
              {/* ✅ دکمه واتس‌اپ هماهنگ با FloatingContact */}
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/30 flex items-center gap-2 transform hover:-translate-y-1"
              >
                {/* آیکون چت دقیقاً مثل دکمه شناور */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                درخواست مشاوره رایگان خرید
              </a>

              <Link 
                href="#products-section" 
                className="bg-white text-purple-900 px-6 py-3.5 rounded-xl font-bold hover:bg-purple-50 transition-colors shadow-lg flex items-center gap-2"
              >
                مشاهده و خرید محصولات تراست
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* بخش تصاویر - جایگزین کارت‌های متنی قبلی */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            {productImages.map((src, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl shadow-lg border border-white/10 bg-white/5 aspect-[4/3]">
                <img 
                  src={src} 
                  alt={`محصولات تراست ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.classList.add('bg-purple-800/50', 'flex', 'items-center', 'justify-center');
                    (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-4xl opacity-50">🧴</span>`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                   <span className="text-white font-bold text-sm">مشاهده محصولات</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
