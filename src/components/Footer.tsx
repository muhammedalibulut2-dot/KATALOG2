import React from 'react';
import { Shield, Lock, Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-cream-300/15 bg-forest-950/90 backdrop-blur-sm py-8 text-cream-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-8 h-8 rounded-xl bg-forest-900 border border-cream-300/30 flex items-center justify-center text-cream-200 font-bold font-cinzel">
              ÇT
            </div>
            <div>
              <p className="font-semibold text-cream-200">
                ÇAĞ TEKNİK ENDÜSTRİYEL MUTFAK SERVİS SİSTEMLERİ
              </p>
              <p className="text-[11px] text-cream-400/70">
                Özel İç Ağ Yedek Parça & Teknik Şema Otomasyonu
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-[11px]">
            <div className="flex items-center space-x-1.5 text-cream-300">
              <Shield className="w-3.5 h-3.5 text-cream-400" />
              <span>Personel Özel Ağ Erişimi</span>
            </div>
            <div className="flex items-center space-x-1.5 text-cream-300">
              <Lock className="w-3.5 h-3.5 text-cream-400" />
              <span>Supabase RLS Korumalı</span>
            </div>
            <div className="flex items-center space-x-1.5 text-cream-300">
              <Layers className="w-3.5 h-3.5 text-cream-400" />
              <span>Atalay • Empero • Öztiryakiler</span>
            </div>
          </div>

        </div>

        <div className="mt-6 pt-6 border-t border-forest-900 text-center md:flex md:justify-between text-[10px] text-cream-400/60">
          <p>© {new Date().getFullYear()} Çağ Teknik. Bu sistem yalnızca yetkili servis teknisyenlerinin kullanımı içindir. İzinsiz erişim kayıt altına alınır.</p>
          <p className="mt-2 md:mt-0 font-mono">v1.0.0-PROD • React + TS + Supabase</p>
        </div>
      </div>
    </footer>
  );
};
