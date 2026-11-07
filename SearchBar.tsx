import React from 'react';
import { Search, SlidersHorizontal, X, FileText, Cpu, Flame, Sparkles } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  selectedBrandFilter: string;
  onSelectBrandFilter: (brandSlug: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  selectedBrandFilter,
  onSelectBrandFilter,
  placeholder = "Model kodu, cihaz adı, teknik seri no veya şema referansı arayın (Örn: EMP.1000, AKG-980, Fırın)..."
}) => {
  const quickFilters = [
    { label: 'Tüm Markalar', value: 'all' },
    { label: 'Atalay', value: 'atalay' },
    { label: 'Empero', value: 'empero' },
    { label: 'Öztiryakiler', value: 'oztiryakiler' },
  ];

  return (
    <div className="w-full">
      {/* Ana Arama Kapsayıcısı */}
      <div className="relative group">
        
        {/* Dış Altın Glow Efekti */}
        <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/20 via-gold-400/30 to-gold-600/20 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />

        <div className="relative flex items-center bg-dark-900 border-2 border-gold-500/30 group-hover:border-gold-500/60 rounded-2xl shadow-card-dark transition-all duration-300">
          
          {/* Sol Arama İkonu */}
          <div className="pl-5 pr-3 text-gold-400">
            <Search className="w-6 h-6 animate-pulse" />
          </div>

          {/* Giriş Alanı */}
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={placeholder}
            className="w-full py-4 sm:py-5 bg-transparent text-slate-100 placeholder:text-slate-500 text-sm sm:text-base font-medium outline-none focus:placeholder:text-slate-600"
          />

          {/* Temizle Butonu */}
          {query && (
            <button
              onClick={() => onQueryChange('')}
              className="p-2 mr-2 text-slate-400 hover:text-gold-400 transition-colors"
              title="Aramayı Temizle"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Sağ Kısayol Rozeti */}
          <div className="hidden sm:flex items-center space-x-2 pr-5">
            <span className="text-[11px] font-mono uppercase px-2 py-1 bg-dark-950 text-gold-400/80 rounded border border-gold-500/20">
              Şema & Model Arama
            </span>
          </div>

        </div>
      </div>

      {/* Hızlı Filtre Butonları */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-4 px-1">
        
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center space-x-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gold-400" />
            <span>Marka Filtresi:</span>
          </span>
          {quickFilters.map((filter) => {
            const isActive = selectedBrandFilter === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => onSelectBrandFilter(filter.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gold-500 text-dark-950 shadow-gold-glow font-bold'
                    : 'bg-dark-900 text-slate-300 hover:text-gold-300 hover:bg-dark-850 border border-slate-800'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Öneri Kısayolları */}
        <div className="hidden lg:flex items-center space-x-3 text-xs text-slate-400">
          <span>Popüler:</span>
          <button 
            onClick={() => onQueryChange('EMP.1000')}
            className="hover:text-gold-400 underline underline-offset-4 decoration-gold-500/40"
          >
            EMP.1000 Bulaşık
          </button>
          <span>•</span>
          <button 
            onClick={() => onQueryChange('AKG-980')}
            className="hover:text-gold-400 underline underline-offset-4 decoration-gold-500/40"
          >
            AKG-980 Kuzine
          </button>
          <span>•</span>
          <button 
            onClick={() => onQueryChange('OKF 101-E')}
            className="hover:text-gold-400 underline underline-offset-4 decoration-gold-500/40"
          >
            Öztiryakiler Kombi
          </button>
        </div>

      </div>
    </div>
  );
};
