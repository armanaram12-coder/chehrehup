export default function WhyChehrehUpSection() {
  const features = [
    {
      icon: '🛡️',
      title: 'ضمانت ۱۰۰٪ اصالت محصولات تراست',
      desc: 'تمامی کرم‌ها، سرم‌ها و لوازم آرایشی بهداشتی با ضمانت‌نامه معتبر و کد اصالت عرضه می‌شوند.'
    },
    {
      icon: '‍⚕️',
      title: 'مشاوره رایگان روتین پوست و مو',
      desc: 'تیم ما (با مدیریت آرام) قبل از خرید، بهترین ترکیب محصولات Trust را متناسب با نوع پوست شما پیشنهاد می‌دهد.'
    },
    {
      icon: '🚚',
      title: 'ارسال سریع و ایمن به سراسر ایران',
      desc: 'سفارشات لوازم آرایشی شما در بسته‌بندی مقاوم و در کوتاه‌ترین زمان ممکن ارسال می‌شود.'
    },
    {
      icon: '💎',
      title: 'قیمت منصفانه و رقابتی',
      desc: 'حذف واسطه‌ها به ما این امکان را می‌دهد تا بهترین قیمت را برای محصولات اورجینال آرایشی ارائه دهیم.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">
          چرا فروشگاه چهره آپ بهترین مرجع خرید محصولات آرایشی بهداشتی و تراست است؟
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-center mb-12">
          تفاوت ما در تعهد به اصالت کالا و ارائه مشاوره تخصصی رایگان برای تدوین روتین پوست و مو متناسب با نیاز شماست.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="bg-purple-50/50 rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-purple-100"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
