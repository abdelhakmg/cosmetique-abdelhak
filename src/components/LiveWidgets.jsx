import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, CheckCircle } from 'lucide-react';

const RECENT_PURCHASES = [
  { name: 'سارة', wilaya: 'وهران', product: 'سيروم العناية بالبشرة', time: 'منذ دقيقة واحدة' },
  { name: 'مريم', wilaya: 'الجزائر العاصمة', product: 'عطر نسائي فاخر', time: 'منذ 3 دقائق' },
  { name: 'إيمان', wilaya: 'الشلف', product: 'علبة هدية مخصصة', time: 'منذ 5 دقائق' },
  { name: 'أمينة', wilaya: 'قسنطينة', product: 'طقم التجميل المتكامل', time: 'منذ 8 دقائق' }
];

export default function LiveWidgets() {
  const { settings } = useStore();
  const [currentNotification, setCurrentNotification] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomPurchase = RECENT_PURCHASES[Math.floor(Math.random() * RECENT_PURCHASES.length)];
      setCurrentNotification(randomPurchase);

      setTimeout(() => {
        setCurrentNotification(null);
      }, 5000); // يختفي بعد 5 ثواني
    }, 12000); // يظهر إشعار كل 12 ثانية

    return () => clearInterval(interval);
  }, []);

  const whatsappNumber = settings.whatsapp || '213550875580';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('مرحباً، أود الاستفسار عن منتجات متجر ' + (settings.storeName || 'Cosmetique Abdelhak'))}`;

  return (
    <>
      {/* 1. زر الواتساب العائم المثبت بالأسفل */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        title="تواصل معنا مباشرة عبر الواتساب"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span className="absolute right-14 bg-gray-900 text-white text-xs font-bold py-1.5 px-3 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          تحدث معنا الآن 💬
        </span>
      </a>

      {/* 2. شريط الإشعارات الحية الثابت بالأسفل يسار الشاشة */}
      {currentNotification && (
        <div className="fixed bottom-5 left-5 z-50 bg-white border border-rose-100 shadow-2xl rounded-2xl p-3.5 max-w-xs flex items-center gap-3 animate-fade-in text-right font-sans">
          <div className="bg-rose-100 text-rose-600 p-2.5 rounded-xl shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">
              قام(ت) <span className="text-rose-600">{currentNotification.name}</span> من <span className="text-gray-700">{currentNotification.wilaya}</span>
            </p>
            <p className="text-[11px] text-gray-500 font-medium truncate max-w-[170px]">
              طلب(ت) {currentNotification.product}
            </p>
            <span className="text-[9px] text-gray-400 block mt-0.5 flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-500" /> {currentNotification.time}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
