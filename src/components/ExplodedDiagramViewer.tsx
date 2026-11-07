import React, { useState, useRef } from 'react';
import { ExplodedDiagram, PartItem, DeviceModel, DiagramHotspot } from '../types/catalog';
import { useServiceCart } from '../context/ServiceCartContext';
import { catalogService } from '../services/catalogService';
import { 
  ZoomIn, ZoomOut, RotateCcw, Maximize2, FileText, Download, 
  CheckCircle, AlertCircle, ArrowLeft, Layers, ShieldCheck, Tag, Info,
  PlusCircle, ShoppingBag, Check, MapPin, Sparkles, X
} from 'lucide-react';

interface ExplodedDiagramViewerProps {
  device: DeviceModel;
  diagram: ExplodedDiagram;
  onBack: () => void;
  brandName?: string;
}

export const ExplodedDiagramViewer: React.FC<ExplodedDiagramViewerProps> = ({
  device,
  diagram: initialDiagram,
  onBack,
  brandName = 'Çağ Teknik'
}) => {
  const [currentDiagram, setCurrentDiagram] = useState<ExplodedDiagram>(initialDiagram);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedItemNo, setSelectedItemNo] = useState<number | null>(1);
  const [hoveredItemNo, setHoveredItemNo] = useState<number | null>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [addedAlert, setAddedAlert] = useState<boolean>(false);

  // Pin (Hotspot) Ekleme Editör Modu
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [pendingCoords, setPendingCoords] = useState<{ x: number; y: number } | null>(null);
  const [newPartName, setNewPartName] = useState<string>('');
  const [newItemNo, setNewItemNo] = useState<number>(currentDiagram.hotspots.length + 1);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageCanvasRef = useRef<HTMLDivElement>(null);

  const { addToCart } = useServiceCart();

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  const selectedPart = currentDiagram.parts.find(p => p.itemNo === selectedItemNo);

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => console.warn('Tam ekran hatası:', err));
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const handleAddPartToCart = () => {
    if (!selectedPart) return;
    addToCart({
      deviceModelCode: device.modelCode,
      deviceModelName: device.modelName,
      brandName: brandName,
      diagramSheetNo: currentDiagram.sheetNo,
      itemNo: selectedPart.itemNo,
      partCode: selectedPart.partCodePlaceholder,
      partName: selectedPart.partName,
      quantity: 1
    });
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 2000);
  };

  // Şema üzerine tıklandığında (Hotspot Editörü)
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEditMode || !imageCanvasRef.current) return;
    const rect = imageCanvasRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    setPendingCoords({ x, y });
    setNewItemNo(currentDiagram.hotspots.length + 1);
  };

  const handleSaveNewHotspot = async () => {
    if (!pendingCoords || !newPartName.trim()) return;

    const updated = await catalogService.addHotspotToDiagram(
      currentDiagram.id,
      {
        itemNo: newItemNo,
        x: pendingCoords.x,
        y: pendingCoords.y,
        label: `Poz ${newItemNo}: ${newPartName}`
      },
      {
        partName: newPartName,
        partCodePlaceholder: `[REF-${device.modelCode}-${newItemNo}]`
      }
    );

    setCurrentDiagram(updated);
    setSelectedItemNo(newItemNo);
    setPendingCoords(null);
    setNewPartName('');
    setIsEditMode(false);
  };

  return (
    <div ref={containerRef} className="space-y-6 animate-fadeIn bg-dark-950 text-slate-100">
      
      {/* Üst Başlık & Kontroller */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gold-500/20">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-gold-400 bg-dark-900 border border-gold-500/30 hover:border-gold-500 transition-all flex items-center space-x-1.5"
          >
            <ArrowLeft className="w-4 h-4 text-gold-400" />
            <span className="hidden sm:inline">Modellere Dön</span>
          </button>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-gold-500/20 text-gold-400 border border-gold-500/30">
                {device.modelCode}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 font-cinzel">
                {device.modelName}
              </h2>
            </div>
            <p className="text-xs text-gold-400/90 font-medium mt-0.5">
              {currentDiagram.sheetNo}: {currentDiagram.title}
            </p>
          </div>
        </div>

        {/* Araç Çubuğu: Hotspot Editörü, Zoom, Tam Ekran */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          
          {/* Görsel Pin Ekleme Editör Butonu */}
          <button
            onClick={() => {
              setIsEditMode(!isEditMode);
              setPendingCoords(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border ${
              isEditMode
                ? 'bg-amber-500 text-dark-950 border-amber-400 shadow-md animate-pulse'
                : 'bg-dark-900 text-gold-400 border-gold-500/30 hover:border-gold-500'
            }`}
            title="Şema üzerine fareyle tıklayarak yeni parça numarası ekleyin"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{isEditMode ? 'Pin Modu Açık (Tıklayın)' : '+ Yeni Pin Ekle'}</span>
          </button>

          <div className="flex items-center bg-dark-900 rounded-xl p-1 border border-gold-500/25">
            <button
              onClick={handleZoomOut}
              className="p-1.5 text-slate-300 hover:text-gold-400 hover:bg-dark-800 rounded-lg transition-colors"
              title="Uzaklaştır"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-mono font-semibold text-gold-400">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 text-slate-300 hover:text-gold-400 hover:bg-dark-800 rounded-lg transition-colors"
              title="Yakınlaştır"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 text-slate-300 hover:text-gold-400 hover:bg-dark-800 rounded-lg transition-colors border-l border-slate-800 ml-1"
              title="Sıfırla"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={toggleFullScreen}
            className="p-2.5 rounded-xl bg-dark-900 border border-gold-500/25 text-slate-300 hover:text-gold-400 hover:border-gold-500 transition-all"
            title="Tam Ekran Görüntüle"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pin Ekleme Modu Açıklama Bandı */}
      {isEditMode && (
        <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/50 text-amber-200 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              <strong>Görsel Pin Editörü Aktif:</strong> Şema üzerinde yeni parça işaretlemek istediğiniz noktaya fareyle tıklayınız.
            </span>
          </div>
          <button
            onClick={() => { setIsEditMode(false); setPendingCoords(null); }}
            className="text-amber-400 hover:underline font-bold"
          >
            İptal
          </button>
        </div>
      )}

      {/* Ana Çizim ve Parça Detay Düzeni (2 Kolon) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* SOL: Patlatılmış Resim İnteraktif Canvas Alanı */}
        <div className="lg:col-span-8 bg-dark-900/90 rounded-2xl border-2 border-gold-500/25 p-4 relative overflow-hidden shadow-card-dark min-h-[480px] sm:min-h-[560px] flex items-center justify-center">
          
          {/* Arka Plan Milimetrik Kılavuz Çizgileri */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#161f2e_1px,transparent_1px),linear-gradient(to_bottom,#161f2e_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />

          {/* Blueprint Watermark */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <div className="px-3 py-1 rounded bg-dark-950/80 border border-gold-500/30 backdrop-blur-sm">
              <span className="text-[10px] font-mono font-bold text-gold-400 uppercase tracking-wider">
                Patlatılmış Montaj Planı • İnteraktif Görüntüleyici
              </span>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
            <span className="text-[11px] font-mono text-slate-500">
              {isEditMode ? 'Yeni pin için şema üzerine tıklayın' : 'Pin üzerine tıklayarak parçayı inceleyin'}
            </span>
          </div>

          {/* Yakınlaştırılabilir Çizim Kapsayıcısı */}
          <div 
            ref={imageCanvasRef}
            onClick={handleCanvasClick}
            style={{ 
              transform: `scale(${zoomLevel})`, 
              transformOrigin: 'center center',
              transition: 'transform 0.2s ease-out',
              cursor: isEditMode ? 'crosshair' : 'default'
            }}
            className="relative w-full max-w-[620px] aspect-[4/3] flex items-center justify-center select-none"
          >
            {/* Vektörel Endüstriyel Teknik Şema Çizimi (SVG Blueprint) */}
            <svg 
              viewBox="0 0 600 450" 
              className="w-full h-full text-slate-600 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="metalGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#263248" />
                  <stop offset="50%" stopColor="#161D2A" />
                  <stop offset="100%" stopColor="#0B0E14" />
                </linearGradient>
                <pattern id="hatch2" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#34455F" strokeWidth="1" opacity="0.3" />
                </pattern>
              </defs>

              <rect x="80" y="60" width="440" height="330" rx="16" fill="url(#metalGrad2)" stroke="#3C4D6B" strokeWidth="2" strokeDasharray="4 4" />
              <rect x="100" y="80" width="400" height="290" rx="12" fill="#0A0D13" stroke="#263248" strokeWidth="1.5" />
              <rect x="140" y="140" width="320" height="180" rx="8" fill="url(#hatch2)" stroke="#D4AF37" strokeWidth="1" opacity="0.4" />

              {/* Parça Sembolleri */}
              <circle cx="168" cy="144" r="38" fill="#131A26" stroke="#D4AF37" strokeWidth="1.5" />
              <circle cx="168" cy="144" r="18" fill="#0B0E14" stroke="#64748B" strokeWidth="1" />
              <line x1="168" y1="182" x2="168" y2="230" stroke="#D4AF37" strokeWidth="2" strokeDasharray="2 2" />

              <path d="M 270 95 C 270 70, 330 70, 330 95 C 330 120, 290 120, 290 145" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
              <rect x="260" y="145" width="80" height="18" rx="4" fill="#233045" stroke="#94A3B8" strokeWidth="1" />

              <ellipse cx="408" cy="198" rx="65" ry="16" fill="#161D2A" stroke="#D4AF37" strokeWidth="1.5" />
              <circle cx="408" cy="198" r="6" fill="#D4AF37" />
              <line x1="345" y1="198" x2="470" y2="198" stroke="#E2E8F0" strokeWidth="2" />

              <polygon points="210,290 246,290 236,330 220,330" fill="#1E293B" stroke="#D4AF37" strokeWidth="1.5" />
              <path d="M 420 310 L 460 310 L 460 350 L 430 350" fill="none" stroke="#D4AF37" strokeWidth="2" />
              <rect x="95" y="235" width="28" height="32" rx="4" fill="#1E293B" stroke="#D4AF37" strokeWidth="1.5" />
              <circle cx="109" cy="251" r="5" fill="#EF4444" />
            </svg>

            {/* İnteraktif Hotspot Pinleri */}
            {currentDiagram.hotspots.map((hs) => {
              const isSelected = selectedItemNo === hs.itemNo;
              const isHovered = hoveredItemNo === hs.itemNo;

              return (
                <button
                  key={hs.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItemNo(hs.itemNo);
                  }}
                  onMouseEnter={() => setHoveredItemNo(hs.itemNo)}
                  onMouseLeave={() => setHoveredItemNo(null)}
                  style={{
                    left: `${hs.x}%`,
                    top: `${hs.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className={`absolute z-20 w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 ${
                    isSelected
                      ? 'bg-gold-500 text-dark-950 scale-125 ring-4 ring-gold-400/50 shadow-gold-glow'
                      : isHovered
                      ? 'bg-gold-400 text-dark-950 scale-110 shadow-gold-glow'
                      : 'bg-dark-950 text-gold-400 border-2 border-gold-500/80 hover:border-gold-400 hover:text-gold-300'
                  }`}
                  title={hs.label || `Parça No: ${hs.itemNo}`}
                >
                  {hs.itemNo}
                </button>
              );
            })}

            {/* Yeni Eklenecek Geçici Pin */}
            {pendingCoords && (
              <div
                style={{
                  left: `${pendingCoords.x}%`,
                  top: `${pendingCoords.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute z-30 w-9 h-9 rounded-full bg-amber-400 text-dark-950 font-mono font-bold text-xs flex items-center justify-center animate-bounce shadow-gold-glow-lg border-2 border-white"
              >
                {newItemNo}
              </div>
            )}
          </div>

        </div>

        {/* SAĞ: Seçilen Parça Kartı ve Servis Talebi */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Yeni Pin Ekleme Formu Açıkken */}
          {pendingCoords && (
            <div className="gold-glass-card rounded-2xl p-5 border-2 border-amber-500/60 shadow-gold-glow animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-amber-400 flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>Yeni Parça Pini Ekle</span>
                </span>
                <button
                  onClick={() => setPendingCoords(null)}
                  className="text-slate-400 hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Pozisyon / Sıra No:
                  </label>
                  <input
                    type="number"
                    value={newItemNo}
                    onChange={(e) => setNewItemNo(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-gold-400 font-mono font-bold text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Parça Adı (TR):
                  </label>
                  <input
                    type="text"
                    value={newPartName}
                    onChange={(e) => setNewPartName(e.target.value)}
                    placeholder="Örn: Su Giriş Ventili 3/4"
                    autoFocus
                    className="w-full px-3 py-2 rounded-lg bg-dark-950 border border-slate-700 focus:border-gold-500 text-slate-100 text-xs outline-none"
                  />
                </div>

                <button
                  onClick={handleSaveNewHotspot}
                  disabled={!newPartName.trim()}
                  className="w-full gold-button py-2 rounded-xl text-xs font-bold mt-2 disabled:opacity-50"
                >
                  Pini Şemaya Kaydet
                </button>
              </div>
            </div>
          )}

          {/* Aktif Parça Kartı */}
          {selectedPart && !pendingCoords && (
            <div className="gold-glass-card rounded-2xl p-5 border-2 border-gold-500/40 relative overflow-hidden shadow-gold-glow">
              
              {/* Başarıyla Eklendi Uyarısı */}
              {addedAlert && (
                <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center space-x-1 animate-bounce">
                  <Check className="w-3.5 h-3.5" />
                  <span>Servis Listesine Eklendi!</span>
                </div>
              )}

              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-full bg-gold-500 text-dark-950 font-mono font-bold text-xs flex items-center justify-center">
                    {selectedPart.itemNo}
                  </span>
                  <span className="text-xs font-semibold text-gold-400">
                    Seçilen Şema Pozisyonu
                  </span>
                </div>

                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-medium">
                  {selectedPart.status}
                </span>
              </div>

              <div className="mt-4">
                <h4 className="text-sm sm:text-base font-bold text-slate-100">
                  {selectedPart.partName}
                </h4>

                <div className="mt-3 p-3 rounded-xl bg-dark-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Şablon Referansı:</span>
                    <span className="font-mono font-bold text-gold-400">
                      {selectedPart.partCodePlaceholder}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Birim:</span>
                    <span className="text-slate-200">{selectedPart.unit}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Sarf / Aşınma Parçası:</span>
                    <span className={selectedPart.isWearPart ? 'text-amber-400 font-semibold' : 'text-slate-400'}>
                      {selectedPart.isWearPart ? 'Evet (Kritik)' : 'Standart'}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                  {selectedPart.description}
                </p>

                {/* Servis Parça Talebine Ekle Butonu */}
                <button
                  onClick={handleAddPartToCart}
                  className="w-full mt-4 gold-button py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Servis Parça Listesine Ekle</span>
                </button>
              </div>
            </div>
          )}

          {/* Şema Parça Listesi */}
          <div className="gold-glass-card rounded-2xl p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <span className="text-xs font-bold text-slate-200 flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-gold-400" />
                <span>Şema Parça İndeksi ({currentDiagram.parts.length})</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Poz No</span>
            </div>

            <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
              {currentDiagram.parts.map((part) => {
                const isSelected = selectedItemNo === part.itemNo;
                return (
                  <div
                    key={part.id}
                    onClick={() => setSelectedItemNo(part.itemNo)}
                    onMouseEnter={() => setHoveredItemNo(part.itemNo)}
                    onMouseLeave={() => setHoveredItemNo(null)}
                    className={`p-2.5 rounded-xl cursor-pointer text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-gold-500/15 border border-gold-500 text-gold-300 font-semibold'
                        : 'bg-dark-900 hover:bg-dark-850 border border-slate-800/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                        isSelected ? 'bg-gold-500 text-dark-950' : 'bg-dark-950 text-gold-400'
                      }`}>
                        {part.itemNo}
                      </span>
                      <span className="truncate">{part.partName}</span>
                    </div>

                    <span className="font-mono text-[10px] text-slate-400 ml-2">
                      {part.partCodePlaceholder}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
