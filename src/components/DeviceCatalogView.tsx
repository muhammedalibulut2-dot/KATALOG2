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
    <div className="space-y-8 animate-fadeIn">
      
      {/* Üst Navigasyon & Marka Başlık Başlığı */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gold-500/20">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-300 hover:text-gold-400 bg-dark-900 px-4 py-2 rounded-xl border border-gold-500/30 hover:border-gold-500 transition-all self-start shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-gold-400" />
          <span>FİRMA SEÇİMİNE DÖN</span>
        </button>

        <div className="flex items-center space-x-3">
          <a
            href={brand.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-dark-850 hover:bg-dark-800 text-gold-300 border border-gold-500/30 transition-all hover:border-gold-500"
            title="Orijinal Katalog Arşivi Linki"
          >
            <span>Orijinal Kaynak</span>
            <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
          </a>

          <button
            onClick={onOpenIngestionGuide}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 border border-gold-500/40 transition-all"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Katalog İçe Aktar</span>
          </button>
        </div>
      </div>

      {/* Marka Tanıtım Bandı */}
      <div className="relative rounded-2xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 p-6 sm:p-8 border border-gold-500/20 overflow-hidden shadow-card-dark">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="font-cinzel text-3xl sm:text-4xl font-black text-gold-gradient tracking-wider">
                {brand.name}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold-500/15 text-gold-300 border border-gold-500/30 font-bold uppercase">
                {brand.badge}
              </span>
            </div>
            <p className="text-sm text-slate-300 font-medium max-w-2xl">
              {brand.description}
            </p>
            <div className="flex items-center space-x-4 mt-3 text-xs text-slate-400 font-medium">
              <span>Menşei: <strong className="text-slate-200">{brand.origin}</strong></span>
              <span>•</span>
              <span>Kayıtlı Cihaz: <strong className="text-gold-400">{filteredDevices.length} Gösteriliyor</strong> ({brand.deviceCount} Toplam)</span>
            </div>
          </div>

          {/* Model İçi Hızlı Arama */}
          <div className="w-full md:w-80">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
              <input
                type="text"
                value={deviceSearch}
                onChange={(e) => setDeviceSearch(e.target.value)}
                placeholder={`${brand.name} model veya seri ara...`}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-950 border border-slate-700 focus:border-gold-500 text-slate-100 text-xs sm:text-sm outline-none transition-all placeholder:text-slate-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Kategori Sekmeleri */}
      <div>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-2 ${
              selectedCategory === 'all'
                ? 'bg-gold-500 text-dark-950 shadow-gold-glow'
                : 'bg-dark-900 text-slate-300 hover:text-gold-300 hover:bg-dark-850 border border-slate-800'
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
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-2 ${
                  isCatActive
                    ? 'bg-gold-500 text-dark-950 shadow-gold-glow'
                    : 'bg-dark-900 text-slate-300 hover:text-gold-300 hover:bg-dark-850 border border-slate-800'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  isCatActive ? 'bg-dark-950 text-gold-300' : 'bg-dark-950 text-slate-400'
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
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-dark-950 text-gold-400 font-bold border border-gold-500/30">
                  {device.modelCode}
                </span>

                <span className="flex items-center space-x-1 text-[11px] font-semibold text-slate-400 bg-dark-950/80 px-2 py-0.5 rounded border border-slate-800">
                  {device.energyType === 'Gaz' && <Flame className="w-3 h-3 text-amber-500" />}
                  {device.energyType === 'Elektrik' && <Zap className="w-3 h-3 text-gold-400" />}
                  <span>{device.energyType}</span>
                </span>
              </div>

              {/* Model Adı & Seri */}
              <h4 className="text-base font-bold text-slate-100 group-hover:text-gold-300 transition-colors">
                {device.modelName}
              </h4>
              <p className="text-xs text-gold-500/80 font-medium mt-1">
                {device.series} • <span className="text-slate-400">{device.yearRange}</span>
              </p>

              {/* Teknik Özellikler Özeti */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
                {device.specsSummary.map((spec, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500/60" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alt Şema Görüntüleme Butonu */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                {device.diagramsCount} Patlatılmış Şema
              </span>

              <button
                onClick={() => onSelectDevice(device)}
                className="gold-button px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 font-bold"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Şemayı Aç</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {filteredDevices.length === 0 && (
          <div className="col-span-full py-16 text-center bg-dark-900/60 rounded-2xl border border-slate-800">
            <Boxes className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h5 className="text-base font-semibold text-slate-300">Bu kategoride veya aramada cihaz bulunamadı</h5>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Arama kriterlerinizi değiştirebilir veya Google Drive / Empero kaynaklarından yeni şema içe aktarabilirsiniz.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setDeviceSearch(''); }}
              className="mt-4 px-4 py-2 rounded-lg bg-dark-850 text-gold-400 text-xs font-semibold border border-gold-500/30 hover:border-gold-500"
            >
              Filtreleri Sıfırla
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
