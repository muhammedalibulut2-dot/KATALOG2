import React, { useState } from 'react';
import { Brand, DeviceModel, Category } from '../types/catalog';
import { 
  ArrowLeft, Search, SlidersHorizontal, Flame, Sparkles, Snowflake, Cpu, 
  Boxes, Layers, ExternalLink, Zap, Shield, FileSpreadsheet, Eye, ChevronRight 
} from 'lucide-react';

interface DeviceCatalogViewProps {
  brand: Brand;
  categories: Category[];
  devices: DeviceModel[];
  onBack: () => void;
  onSelectDevice: (device: DeviceModel) => void;
  onOpenIngestionGuide: () => void;
}

export const DeviceCatalogView: React.FC<DeviceCatalogViewProps> = ({
  brand,
  categories,
  devices,
  onBack,
  onSelectDevice,
  onOpenIngestionGuide
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [deviceSearch, setDeviceSearch] = useState<string>('');

  // İlgili markanın kategorileri
  const brandCategories = categories.filter(c => c.brandSlug === brand.slug);

  // Filtrelenmiş cihazlar
  const filteredDevices = devices.filter(d => {
    if (d.brandSlug !== brand.slug) return false;
    if (selectedCategory !== 'all' && d.categoryId !== selectedCategory) return false;
    if (deviceSearch.trim() !== '') {
      const q = deviceSearch.toLowerCase();
      const matchCode = d.modelCode.toLowerCase().includes(q);
      const matchName = d.modelName.toLowerCase().includes(q);
      const matchSeries = d.series.toLowerCase().includes(q);
      const matchSpecs = d.specsSummary.some(s => s.toLowerCase().includes(q));
      return matchCode || matchName || matchSeries || matchSpecs;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn text-cream-300">
      
      {/* Üst Navigasyon & Marka Başlık Başlığı */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cream-300/15">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-bold text-cream-100 hover:text-white bg-forest-900 px-4 py-2 rounded-xl border border-action-500/50 hover:border-action-500 hover:bg-forest-850 transition-all self-start shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-action-400" />
          <span>FİRMA SEÇİMİNE DÖN</span>
        </button>

        <div className="flex items-center space-x-3">
          <a
            href={brand.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-forest-850 hover:bg-forest-800 text-cream-200 border border-cream-300/25 transition-all hover:border-action-500 cursor-pointer"
            title="Orijinal Katalog Arşivi Linki"
          >
            <span>Orijinal Kaynak</span>
            <ExternalLink className="w-3.5 h-3.5 text-action-400" />
          </a>

          <button
            onClick={onOpenIngestionGuide}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-action-500/15 hover:bg-action-500/25 text-action-300 hover:text-white border border-action-500/40 hover:border-action-500 transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Katalog İçe Aktar</span>
          </button>
        </div>
      </div>

      {/* Marka Tanıtım Bandı */}
      <div className="relative rounded-2xl bg-gradient-to-r from-forest-900 via-forest-850 to-forest-900 p-6 sm:p-8 border border-cream-300/20 overflow-hidden shadow-card-dark">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 bg-action-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="font-cinzel text-3xl sm:text-4xl font-black text-gold-gradient tracking-wider">
                {brand.name}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cream-300/15 text-cream-200 border border-cream-300/30 font-bold uppercase">
                {brand.badge}
              </span>
            </div>
            <p className="text-sm text-cream-300 font-medium max-w-2xl">
              {brand.description}
            </p>
            <div className="flex items-center space-x-4 mt-3 text-xs text-cream-400 font-medium">
              <span>Menşei: <strong className="text-cream-200">{brand.origin}</strong></span>
              <span>•</span>
              <span>Kayıtlı Cihaz: <strong className="text-cream-200">{filteredDevices.length} Gösteriliyor</strong> ({brand.deviceCount} Toplam)</span>
            </div>
          </div>

          {/* Model İçi Hızlı Arama */}
          <div className="w-full md:w-80">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-300" />
              <input
                type="text"
                value={deviceSearch}
                onChange={(e) => setDeviceSearch(e.target.value)}
                placeholder={`${brand.name} model veya seri ara...`}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-forest-950 border border-cream-300/25 focus:border-action-500 text-cream-100 text-xs sm:text-sm outline-none transition-all placeholder:text-cream-400/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Kategori Sekmeleri - %10 Tıklanabilir Renk (#8b5cf6) */}
      <div>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-2 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-action-500 text-white shadow-[0_2px_12px_rgba(139,92,246,0.45)]'
                : 'bg-forest-900 text-cream-200 hover:text-white hover:bg-forest-850 hover:border-action-500/50 border border-forest-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Tüm Kategoriler ({brandCategories.reduce((acc, c) => acc + c.itemCount, 0)})</span>
          </button>

          {brandCategories.map((cat) => {
            const isCatActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-2 cursor-pointer ${
                  isCatActive
                    ? 'bg-action-500 text-white shadow-[0_2px_12px_rgba(139,92,246,0.45)]'
                    : 'bg-forest-900 text-cream-200 hover:text-white hover:bg-forest-850 hover:border-action-500/50 border border-forest-800'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  isCatActive ? 'bg-forest-950 text-cream-200' : 'bg-forest-950 text-cream-400'
                }`}>
                  {cat.itemCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cihaz Kartları Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.map((device) => (
          <div
            key={device.id}
            className="gold-glass-card rounded-2xl p-6 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              {/* Üst Model Kodu & Enerji Tipi */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-forest-950 text-cream-200 font-bold border border-cream-300/25">
                  {device.modelCode}
                </span>

                <span className="flex items-center space-x-1 text-[11px] font-semibold text-cream-400 bg-forest-950/80 px-2 py-0.5 rounded border border-forest-800">
                  {device.energyType === 'Gaz' && <Flame className="w-3 h-3 text-amber-500" />}
                  {device.energyType === 'Elektrik' && <Zap className="w-3 h-3 text-cream-300" />}
                  <span>{device.energyType}</span>
                </span>
              </div>

              {/* Model Adı & Seri */}
              <h4 className="text-base font-bold text-cream-100 group-hover:text-white transition-colors">
                {device.modelName}
              </h4>
              <p className="text-xs text-cream-300/90 font-medium mt-1">
                {device.series} • <span className="text-cream-400">{device.yearRange}</span>
              </p>

              {/* Teknik Özellikler Özeti */}
              <div className="mt-4 pt-3 border-t border-cream-300/15 space-y-1.5">
                {device.specsSummary.map((spec, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-cream-400/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-cream-300/50" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alt Şema Görüntüleme Butonu - %10 SADECE TIKLANABİLİR MOR BUTON (#8b5cf6) */}
            <div className="mt-6 pt-4 border-t border-cream-300/15 flex items-center justify-between">
              <span className="text-xs text-cream-400/80 font-mono">
                {device.diagramsCount} Patlatılmış Şema
              </span>

              <button
                onClick={() => onSelectDevice(device)}
                className="bg-action-500 hover:bg-action-600 active:bg-action-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-[0_2px_12px_rgba(139,92,246,0.38)] transition-all cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Şemayı Aç</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {filteredDevices.length === 0 && (
          <div className="col-span-full py-16 text-center bg-forest-900/60 rounded-2xl border border-cream-300/15">
            <Boxes className="w-12 h-12 text-cream-400/60 mx-auto mb-3" />
            <h5 className="text-base font-semibold text-cream-200">Bu kategoride veya aramada cihaz bulunamadı</h5>
            <p className="text-xs text-cream-400/70 mt-1 max-w-md mx-auto">
              Arama kriterlerinizi değiştirebilir veya Google Drive / Empero kaynaklarından yeni şema içe aktarabilirsiniz.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setDeviceSearch(''); }}
              className="mt-4 px-4 py-2 rounded-xl bg-action-500 hover:bg-action-600 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              Filtreleri Sıfırla
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
