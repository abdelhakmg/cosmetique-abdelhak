import React from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, Mail, Instagram, Facebook, Sparkles } from 'lucide-react';

export default function Footer() {
  const { settings } = useStore();

  return (
    <footer className="bg-gray-900 text-gray-300 font-sans border-t border-gray-800 pt-12 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-right">
        
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-rose-500" />
            <span className="text-xl font-black text-white">{settings.storeName || 'Cosmetique Abdelhak'}</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            متجركم المتخصص في توفير أفضل مستحضرات التجميل، العطور، ومجموعات الهدايا الفاخرة بأعلى جودة مع شحن سريع لجميع الولايات.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-3">تواصلوا معنا</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-rose-500" />
              <span>{settings.phone}</span>
            </div>
            {settings.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-500" />
                <span>{settings.email}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-3">تابعونا على مواقع التواصل</h4>
          <div className="flex items-center gap-3">
            {settings.instagram && (
              <a href={settings.instagram} target="_blank" rel="noreferrer" className="bg-gray-800 p-2.5 rounded-xl text-rose-400 hover:bg-rose-600 hover:text-white transition">
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {settings.facebook && (
              <a href={settings.facebook} target="_blank" rel="noreferrer" className="bg-gray-800 p-2.5 rounded-xl text-rose-400 hover:bg-rose-600 hover:text-white transition">
                <Facebook className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

      </div>

      <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} {settings.storeName}. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
