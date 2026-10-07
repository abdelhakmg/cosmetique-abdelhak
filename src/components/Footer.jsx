import React from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, Mail, MapPin, Instagram, Facebook, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { settings } = useStore();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 px-4 font-sans text-right">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-800">
        
        {/* معلومات المتجر */}
        <div className="space-y-3">
          <h3 className="text-lg font-black text-rose-500">{settings.storeName || 'Cosmetique Abdelhak'}</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            متجركم المتخصص في توفير أفضل مستحضرات التجميل والعناية والهدايا الراقية بأسعار منافسة مع توصيل لـ 58 ولاية.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold pt-1">
            <ShieldCheck className="w-4 h-4" />
            <span>ضمان المعاينة والتأكد قبل الدفع</span>
          </div>
        </div>

        {/* معلومات التواصل */}
        <div className="space-y-3 text-xs text-gray-300">
          <h4 className="font-bold text-sm text-white">تواصل معنا</h4>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-rose-500" />
            <span>{settings.phone || '0550875580'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-rose-500" />
            <span>{settings.email || 'contact@cosmetique-abdelhak.dz'}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>الجزائر</span>
          </div>
        </div>

        {/* شبكات التواصل الاجتماعي */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-white">تابعنا على التواصل الاجتماعي</h4>
          <div className="flex items-center gap-3">
            {settings.instagram && (
              <a href={settings.instagram} target="_blank" rel="noreferrer" className="p-2.5 bg-gray-800 hover:bg-rose-600 rounded-xl transition">
                <Instagram className="w-5 h-5" />
              </a>
            )}
            <a href="#" className="p-2.5 bg-gray-800 hover:bg-rose-600 rounded-xl transition">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-6xl mx-auto pt-6 text-center text-xs text-gray-500">
        <p>جميع الحقوق محفوظة © Cosmetique Abdelhak 2026</p>
      </div>
    </footer>
  );
}
