import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoginScreen } from './components/LoginScreen';
import { SearchBar } from './components/SearchBar';
import { BrandCard } from './components/BrandCard';
import { DeviceCatalogView } from './components/DeviceCatalogView';
import { ExplodedDiagramViewer } from './components/ExplodedDiagramViewer';
import { DataIngestionGuideModal } from './components/DataIngestionGuideModal';
import { ServiceCartModal } from './components/ServiceCartModal';
import { BRANDS, CATEGORIES, DEVICE_MODELS, SAMPLE_DIAGRAM } from './data/mockCatalogData';
import { Brand, DeviceModel } from './types/catalog';
import { ShieldCheck, Sparkles, Building2, Layers, ChevronRight, Eye } from 'lucide-react';

export const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Navigasyon durumları
  const [currentView, setCurrentView] = useState<'home' | 'brand-catalog' | 'diagram-viewer'>('home');
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<DeviceModel | null>(null);
  
  // Arama ve filtre durumu
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [brandFilter, setBrandFilter] = useState<string>('all');
  
  // Modal durumları
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Oturum açılmamışsa doğrudan yetkili personel giriş ekranını göster
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  // Marka seçildiğinde katalog sayfasına geçiş
  const handleSelectBrand = (brand: Brand) => {
    setSelectedBrand(brand);
    setCurrentView('brand-catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cihaz seçildiğinde patlatılmış şema görüntüleyicisine geçiş
  const handleSelectDevice = (device: DeviceModel) => {
    setSelectedDevice(device);
    setCurrentView('diagram-viewer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    setSelectedBrand(null);
    setSelectedDevice(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Ana sayfada genel arama sonuçları
  const isSearching = searchQuery.trim().length > 0;
  const searchResults = isSearching
    ? DEVICE_MODELS.filter((device) => {
        const matchesBrand = brandFilter === 'all' || device.brandSlug === brandFilter;
        if (!matchesBrand) return false;
        const q = searchQuery.toLowerCase();
        return (
          device.modelCode.toLowerCase().includes(q) ||
          device.modelName.toLowerCase().includes(q) ||
          device.series.toLowerCase().includes(q) ||
          device.specsSummary.some(s => s.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-forest-950 text-cream-300 selection:bg-action-500 selection:text-white">
      
      {/* Üst Bar */}
      <Header
        onOpenIngestionGuide={() => setIsGuideOpen(true)}
        onOpenServiceCart={() => setIsCartOpen(true)}
        onNavigateHome={handleNavigateHome}
        currentBrand={selectedBrand?.name}
      />

      {/* Ana İçerik Gövdesi */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* ============================================================== */}
        {/* GÖRÜNÜM 1: ANA SAYFA (Arama Alanı + FİRMA SEÇ + Marka Kartları) */}
        {/* ============================================================== */}
        {currentView === 'home' && (
          <div className="space-y-12">
            
            {/* Karşılama ve Geniş Arama Alanı */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cream-300/10 border border-cream-300/25 text-cream-200 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-cream-300" />
                <span>Çağ Teknik Kurumsal Teknik Servis Terminali</span>
              </div>

              <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black tracking-wide text-gold-gradient">
                YEDEK PARÇA & ŞEMA SİSTEMİ
              </h2>

              <p className="text-sm sm:text-base text-cream-400/80 font-normal">
                Endüstriyel mutfak ekipmanlarının patlatılmış montaj resimlerine, teknik servis kılavuzlarına ve üretici parça referanslarına anında erişin.
              </p>

              {/* Geniş Arama Çubuğu */}
              <div className="pt-4">
                <SearchBar
                  query={searchQuery}
                  onQueryChange={setSearchQuery}
                  selectedBrandFilter={brandFilter}
                  onSelectBrandFilter={setBrandFilter}
                />
              </div>
            </div>

            {/* Arama Sonuçları Varsa Önce Onları Göster */}
            {isSearching && (
              <div className="p-6 rounded-2xl bg-forest-900 border border-cream-300/25 shadow-card-dark">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-cream-300/15">
                  <h3 className="text-sm font-bold text-cream-100 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-action-400" />
                    <span>Arama Sonuçları: "{searchQuery}" ({searchResults.length} Cihaz Bulundu)</span>
                  </h3>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-cream-400 hover:text-action-400 underline cursor-pointer"
                  >
                    Aramayı Kapat
                  </button>
                </div>

                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((device) => {
                      const brandObj = BRANDS.find(b => b.slug === device.brandSlug);
                      return (
                        <div
                          key={device.id}
                          className="p-4 rounded-xl bg-forest-950 border border-forest-800 hover:border-cream-300/40 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-mono text-xs px-2 py-0.5 rounded bg-forest-900 text-cream-200 font-bold border border-cream-300/20">
                                {device.modelCode}
                              </span>
                              <span className="text-[10px] uppercase font-bold text-cream-400">
                                {brandObj?.name}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-cream-100">{device.modelName}</h4>
                            <p className="text-xs text-cream-400/80 mt-1">{device.series}</p>
                          </div>

                          <button
                            onClick={() => {
                              setSelectedBrand(brandObj || BRANDS[0]);
                              handleSelectDevice(device);
                            }}
                            className="mt-4 bg-action-500 hover:bg-action-600 text-white py-2 px-3.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 font-bold shadow-[0_2px_10px_rgba(139,92,246,0.35)] transition-all cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Şemayı Aç</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-cream-400/70 text-center py-6">
                    Arama kriterine uygun model bulunamadı. Lütfen model kodunu veya kelimeyi kontrol edin.
                  </p>
                )}
              </div>
            )}

            {/* "FİRMA SEÇ" Başlığı ve 3 Marka Kartı */}
            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between border-b border-cream-300/15 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-forest-850 border border-cream-300/30 text-cream-300">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-cream-100">
                      FİRMA SEÇ
                    </h3>
                    <p className="text-xs text-cream-400/80 font-medium">
                      Katalog ve patlatılmış resimlerini incelemek istediğiniz üreticiyi seçiniz
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-block text-xs font-mono text-cream-300 px-3 py-1 bg-forest-900 rounded-lg border border-forest-800">
                  3 Yetkili Üretici
                </span>
              </div>

              {/* 3 Marka Kartı: Atalay, Empero, Öztiryakiler */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {BRANDS.map((brand) => (
                  <BrandCard
                    key={brand.id}
                    brand={brand}
                    onSelect={handleSelectBrand}
                  />
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* GÖRÜNÜM 2: CİHAZ KATALOG EKRANI (Seçilen Markanın Modelleri)  */}
        {/* ============================================================== */}
        {currentView === 'brand-catalog' && selectedBrand && (
          <DeviceCatalogView
            brand={selectedBrand}
            categories={CATEGORIES}
            devices={DEVICE_MODELS}
            onBack={handleNavigateHome}
            onSelectDevice={handleSelectDevice}
            onOpenIngestionGuide={() => setIsGuideOpen(true)}
          />
        )}

        {/* ============================================================== */}
        {/* GÖRÜNÜM 3: PATLATILMIŞ RESİM GÖRÜNTÜLEYİCİSİ                   */}
        {/* ============================================================== */}
        {currentView === 'diagram-viewer' && selectedDevice && (
          <ExplodedDiagramViewer
            device={selectedDevice}
            diagram={SAMPLE_DIAGRAM}
            brandName={selectedBrand?.name || 'Çağ Teknik'}
            onBack={() => {
              if (selectedBrand) {
                setCurrentView('brand-catalog');
              } else {
                setCurrentView('home');
              }
            }}
          />
        )}

      </main>

      {/* Alt Footer */}
      <Footer />

      {/* Veri Alma & Supabase Aktarım Kılavuzu Modalı */}
      <DataIngestionGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Servis Parça Talebi / Sepet Modalı */}
      <ServiceCartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

    </div>
  );
};
