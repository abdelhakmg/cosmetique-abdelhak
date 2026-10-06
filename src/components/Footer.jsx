import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-16 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Cos Abdelhak</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            متجركم المتخصص في أفضل مستحضرات التجميل، الإكسسوارات والهدايا الراقية بأسعار منافسة مع توصيل لـ 58 ولاية.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">تواصل معنا</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-pink-500" /> 06XXXXXXXX
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-pink-500" /> contact@cosabdelhak.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-pink-500" /> الجزائر
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">تابعنا على التواصل الاجتماعي</h4>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-gray-800 hover:bg-pink-600 rounded-full transition-colors text-white">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-gray-800 hover:bg-pink-600 rounded-full transition-colors text-white">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
        جميع الحقوق محفوظة © {new Date().getFullYear()} Cos Abdelhak
      </div>
    </footer>
  );
}
