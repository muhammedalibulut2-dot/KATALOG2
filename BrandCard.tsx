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
      className="group relative cursor-pointer rounded-2xl p-[1px] transition-all duration-500 hover:scale-[1.02] active:scale-[0.99]"
    >
      {/* 3D Altın Dış Çerçeve Efekti */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-gold-500/40 via-gold-500/10 to-gold-500/30 opacity-70 group-hover:opacity-100 group-hover:from-gold-400 group-hover:to-gold-600 transition-all duration-500 blur-[0.5px]" />
      
      {/* Kart İç Gövdesi */}
      <div className="relative h-full rounded-2xl bg-gradient-to-b from-dark-850 to-dark-900 p-6 sm:p-7 flex flex-col justify-between overflow-hidden border border-gold-500/15">
        
        {/* Arka Plan Logo Damgası Vurgusu */}
        <div className="absolute -right-6 -bottom-6 text-7xl sm:text-8xl font-black font-cinzel text-slate-800/15 select-none pointer-events-none group-hover:text-gold-500/10 transition-colors duration-500">
          {brand.slug === 'atalay' ? 'AT' : brand.slug === 'empero' ? 'EM' : 'ÖZ'}
        </div>

        {/* Üst Kısım: Rozet & Kaynak Tipi */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-gold-500/15 text-gold-300 border border-gold-500/30 flex items-center space-x-1.5 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
              <span>{brand.badge}</span>
            </span>

            <span className="flex items-center space-x-1 text-[11px] font-medium text-slate-400 bg-dark-950 px-2.5 py-1 rounded-md border border-slate-800">
              {brand.sourceType === 'Google Drive' ? (
                <>
                  <FolderKanban className="w-3 h-3 text-gold-400" />
                  <span>Google Drive Arşivi</span>
                </>
              ) : (
                <>
                  <Globe className="w-3 h-3 text-gold-400" />
                  <span>Resmi Parça Portalı</span>
                </>
              )}
            </span>
          </div>

          {/* Marka İsmi ve Slogan */}
          <div className="mt-2">
            <h3 className="font-cinzel text-2xl sm:text-3xl font-black tracking-wider text-slate-100 group-hover:text-gold-gradient transition-colors">
              {brand.name}
            </h3>
            <p className="text-xs font-semibold text-gold-400/90 mt-1">
              {brand.tagline}
            </p>
          </div>

          {/* Açıklama */}
          <p className="mt-4 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
            {brand.description}
          </p>

          {/* İstatistikler Paneli */}
          <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-slate-800/80">
            <div className="bg-dark-950/70 p-3 rounded-xl border border-slate-800/80 group-hover:border-gold-500/20 transition-colors">
              <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
                <Layers className="w-3.5 h-3.5 text-gold-400" />
                <span>Kayıtlı Cihaz</span>
              </div>
              <p className="text-lg font-bold font-mono text-slate-100">
                {brand.deviceCount} <span className="text-[10px] font-normal text-slate-400">Model</span>
              </p>
            </div>

            <div className="bg-dark-950/70 p-3 rounded-xl border border-slate-800/80 group-hover:border-gold-500/20 transition-colors">
              <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
                <FileText className="w-3.5 h-3.5 text-gold-400" />
                <span>Patlatılmış Şema</span>
              </div>
              <p className="text-lg font-bold font-mono text-gold-400">
                {brand.diagramCount}+ <span className="text-[10px] font-normal text-slate-400">Çizim</span>
              </p>
            </div>
          </div>
        </div>

        {/* Alt Aksiyon Butonu */}
        <div className="mt-7 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-[11px] text-slate-400">
            Kuruluş: <span className="font-semibold text-slate-300">{brand.established}</span> • {brand.origin}
          </div>

          <div className="flex items-center space-x-2 text-xs font-bold text-gold-400 group-hover:text-gold-300 group-hover:translate-x-1 transition-all">
            <span>KATALOĞA GİR</span>
            <ChevronRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>
    </div>
  );
};
