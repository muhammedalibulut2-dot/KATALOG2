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
        
        {/* Dış Işıma Efekti */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cream-300/10 via-action-500/20 to-cream-300/10 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-300" />

        <div className="relative flex items-center bg-forest-900 border-2 border-cream-300/25 group-hover:border-cream-300/50 rounded-2xl shadow-card-dark transition-all duration-300">
          
          {/* Sol Arama İkonu (%30 Krem) */}
          <div className="pl-5 pr-3 text-cream-300">
            <Search className="w-6 h-6" />
          </div>

          {/* Giriş Alanı */}
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={placeholder}
            className="w-full py-4 sm:py-5 bg-transparent text-cream-100 placeholder:text-cream-400/60 text-sm sm:text-base font-medium outline-none"
          />

          {/* Temizle Butonu - %10 Tıklanabilir (#8b5cf6) */}
          {query && (
            <button
              onClick={() => onQueryChange('')}
              className="p-2 mr-2 text-cream-400 hover:text-action-400 transition-colors cursor-pointer"
              title="Aramayı Temizle"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Sağ Kısayol Rozeti (%30 Krem) */}
          <div className="hidden sm:flex items-center space-x-2 pr-5">
            <span className="text-[11px] font-mono uppercase px-2 py-1 bg-forest-950 text-cream-300 rounded border border-cream-300/20">
              Şema & Model Arama
            </span>
          </div>

        </div>
      </div>

      {/* Hızlı Filtre Butonları */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-4 px-1">
        
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1 scrollbar-none">
          <span className="text-xs font-semibold text-cream-400 mr-2 flex items-center space-x-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-cream-300" />
            <span>Marka Filtresi:</span>
          </span>
          {quickFilters.map((filter) => {
            const isActive = selectedBrandFilter === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => onSelectBrandFilter(filter.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-action-500 text-white shadow-[0_2px_12px_rgba(139,92,246,0.45)] font-bold'
                    : 'bg-forest-900 text-cream-200 hover:text-white hover:bg-forest-850 hover:border-action-500/50 border border-forest-800'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Öneri Kısayolları (Tıklanabilir linkler) */}
        <div className="hidden lg:flex items-center space-x-3 text-xs text-cream-400">
          <span>Popüler:</span>
          <button 
            onClick={() => onQueryChange('EMP.1000')}
            className="hover:text-action-400 underline underline-offset-4 decoration-action-500/40 transition-colors cursor-pointer"
          >
            EMP.1000 Bulaşık
          </button>
          <span>•</span>
          <button 
            onClick={() => onQueryChange('AKG-980')}
            className="hover:text-action-400 underline underline-offset-4 decoration-action-500/40 transition-colors cursor-pointer"
          >
            AKG-980 Kuzine
          </button>
          <span>•</span>
          <button 
            onClick={() => onQueryChange('OKF 101-E')}
            className="hover:text-action-400 underline underline-offset-4 decoration-action-500/40 transition-colors cursor-pointer"
          >
            Öztiryakiler Kombi
          </button>
        </div>

      </div>
    </div>
  );
};
