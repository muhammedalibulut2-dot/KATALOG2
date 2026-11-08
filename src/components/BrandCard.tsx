import React from 'react';
import { Brand } from '../types/catalog';
import { ArrowRight, FolderKanban, Globe, ChevronRight, Layers, FileText, CheckCircle2 } from 'lucide-react';

interface BrandCardProps {
  brand: Brand;
  onSelect: (brand: Brand) => void;
}

export const BrandCard: React.FC<BrandCardProps> = ({ brand, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(brand)}
      className="group relative cursor-pointer rounded-2xl p-[1px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.99]"
    >
      {/* 30% Krem Çerçeve Vurgusu & Hoverda Mor Işıma */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-cream-300/30 via-cream-300/10 to-cream-300/25 opacity-70 group-hover:opacity-100 group-hover:from-action-500/50 group-hover:to-action-600/50 transition-all duration-300 blur-[0.5px]" />
      
      {/* %60 Zümrüt Kart İç Gövdesi */}
      <div className="relative h-full rounded-2xl bg-gradient-to-b from-forest-850 to-forest-900 p-6 sm:p-7 flex flex-col justify-between overflow-hidden border border-cream-300/20 group-hover:border-action-500/40">
        
        {/* Arka Plan Logo Damgası */}
        <div className="absolute -right-6 -bottom-6 text-7xl sm:text-8xl font-black font-cinzel text-forest-950/40 select-none pointer-events-none group-hover:text-action-500/10 transition-colors duration-300">
          {brand.slug === 'atalay' ? 'AT' : brand.slug === 'empero' ? 'EM' : 'ÖZ'}
        </div>

        {/* Üst Kısım: Rozet & Kaynak Tipi */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-cream-300/10 text-cream-200 border border-cream-300/30 flex items-center space-x-1.5 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-cream-300" />
              <span>{brand.badge}</span>
            </span>

            <span className="flex items-center space-x-1 text-[11px] font-medium text-cream-300/80 bg-forest-950/80 px-2.5 py-1 rounded-md border border-forest-800">
              {brand.sourceType === 'Google Drive' ? (
                <>
                  <FolderKanban className="w-3 h-3 text-cream-300" />
                  <span>Google Drive Arşivi</span>
                </>
              ) : (
                <>
                  <Globe className="w-3 h-3 text-cream-300" />
                  <span>Resmi Parça Portalı</span>
                </>
              )}
            </span>
          </div>

          {/* Marka İsmi ve Slogan (%30 Krem) */}
          <div className="mt-2">
            <h3 className="font-cinzel text-2xl sm:text-3xl font-black tracking-wider text-cream-100 group-hover:text-white transition-colors">
              {brand.name}
            </h3>
            <p className="text-xs font-semibold text-cream-300/90 mt-1">
              {brand.tagline}
            </p>
          </div>

          {/* Açıklama */}
          <p className="mt-4 text-xs sm:text-sm text-cream-400/80 leading-relaxed font-normal">
            {brand.description}
          </p>

          {/* İstatistikler Paneli (%60 & %30 dengesi) */}
          <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-cream-300/15">
            <div className="bg-forest-950/80 p-3 rounded-xl border border-forest-800">
              <div className="flex items-center space-x-1.5 text-cream-400 text-xs mb-1">
                <Layers className="w-3.5 h-3.5 text-cream-300" />
                <span>Kayıtlı Cihaz</span>
              </div>
              <p className="text-lg font-bold font-mono text-cream-100">
                {brand.deviceCount} <span className="text-[10px] font-normal text-cream-400">Model</span>
              </p>
            </div>

            <div className="bg-forest-950/80 p-3 rounded-xl border border-forest-800">
              <div className="flex items-center space-x-1.5 text-cream-400 text-xs mb-1">
                <FileText className="w-3.5 h-3.5 text-cream-300" />
                <span>Patlatılmış Şema</span>
              </div>
              <p className="text-lg font-bold font-mono text-cream-200">
                {brand.diagramCount}+ <span className="text-[10px] font-normal text-cream-400">Çizim</span>
              </p>
            </div>
          </div>
        </div>

        {/* Alt Aksiyon Butonu - %10 SADECE TIKLANABİLİR MOR BUTON (#8b5cf6) */}
        <div className="mt-7 pt-4 border-t border-cream-300/15 flex items-center justify-between">
          <div className="text-[11px] text-cream-400/80">
            Kuruluş: <span className="font-semibold text-cream-200">{brand.established}</span> • {brand.origin}
          </div>

          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-action-500 group-hover:bg-action-600 text-white shadow-[0_2px_10px_rgba(139,92,246,0.4)] transition-all">
            <span>KATALOĞA GİR</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

      </div>
    </div>
  );
};
