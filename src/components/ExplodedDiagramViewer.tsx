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
    <div ref={containerRef} className="space-y-6 animate-fadeIn bg-forest-950 text-cream-300">
      
      {/* Üst Başlık & Kontroller */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-cream-300/15">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold text-cream-200 hover:text-white bg-forest-900 border border-action-500/50 hover:border-action-500 hover:bg-forest-850 transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-action-400" />
            <span className="hidden sm:inline">Modellere Dön</span>
          </button>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cream-300/15 text-cream-200 border border-cream-300/30">
                {device.modelCode}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-cream-100 font-cinzel">
                {device.modelName}
              </h2>
            </div>
            <p className="text-xs text-cream-300/90 font-medium mt-0.5">
              {currentDiagram.sheetNo}: {currentDiagram.title}
            </p>
          </div>
        </div>

        {/* Araç Çubuğu: Hotspot Editörü, Zoom, Tam Ekran */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          
          {/* Görsel Pin Ekleme Editör Butonu - %10 Mor Tıklanabilir (#8b5cf6) */}
          <button
            onClick={() => {
              setIsEditMode(!isEditMode);
              setPendingCoords(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border cursor-pointer ${
              isEditMode
                ? 'bg-action-600 text-white border-action-400 shadow-action-glow animate-pulse'
                : 'bg-forest-900 text-action-300 hover:text-white hover:bg-action-500/20 border-action-500/50 hover:border-action-500'
            }`}
            title="Şema üzerine fareyle tıklayarak yeni parça numarası ekleyin"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{isEditMode ? 'Pin Modu Açık (Tıklayın)' : '+ Yeni Pin Ekle'}</span>
          </button>

          <div className="flex items-center bg-forest-900 rounded-xl p-1 border border-cream-300/20">
            <button
              onClick={handleZoomOut}
              className="p-1.5 text-cream-300 hover:text-action-400 hover:bg-forest-850 rounded-lg transition-colors cursor-pointer"
              title="Uzaklaştır"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-mono font-semibold text-cream-200">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 text-cream-300 hover:text-action-400 hover:bg-forest-850 rounded-lg transition-colors cursor-pointer"
              title="Yakınlaştır"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 text-cream-300 hover:text-action-400 hover:bg-forest-850 rounded-lg transition-colors border-l border-forest-800 ml-1 cursor-pointer"
              title="Sıfırla"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={toggleFullScreen}
            className="p-2.5 rounded-xl bg-forest-900 border border-cream-300/20 text-cream-300 hover:text-action-400 hover:border-action-500 transition-all cursor-pointer"
            title="Tam Ekran Görüntüle"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pin Ekleme Modu Açıklama Bandı */}
      {isEditMode && (
        <div className="p-3 rounded-xl bg-forest-900 border border-action-500/50 text-cream-200 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-action-400 flex-shrink-0" />
            <span>
              <strong>Görsel Pin Editörü Aktif:</strong> Şema üzerinde yeni parça işaretlemek istediğiniz noktaya fareyle tıklayınız.
            </span>
          </div>
          <button
            onClick={() => { setIsEditMode(false); setPendingCoords(null); }}
            className="text-action-400 hover:underline font-bold cursor-pointer"
          >
            İptal
          </button>
        </div>
      )}

      {/* Ana Çizim ve Parça Detay Düzeni (2 Kolon) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* SOL: Patlatılmış Resim İnteraktif Canvas Alanı (%60 Ana Zümrüt Zemin) */}
        <div className="lg:col-span-8 bg-forest-900/90 rounded-2xl border-2 border-cream-300/20 p-4 relative overflow-hidden shadow-card-dark min-h-[480px] sm:min-h-[560px] flex items-center justify-center">
          
          {/* Arka Plan Milimetrik Kılavuz Çizgileri */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(31,77,58,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(31,77,58,0.35)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          {/* Blueprint Watermark */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <div className="px-3 py-1 rounded bg-forest-950/85 border border-cream-300/30 backdrop-blur-sm">
              <span className="text-[10px] font-mono font-bold text-cream-200 uppercase tracking-wider">
                Patlatılmış Montaj Planı • İnteraktif Görüntüleyici
              </span>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
            <span className="text-[11px] font-mono text-cream-400/80">
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
            {/* Vektörel Endüstriyel Teknik Şema Çizimi (%30 Krem Çizgiler) */}
            <svg 
              viewBox="0 0 600 450" 
              className="w-full h-full text-cream-300 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="metalGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1f4d3a" />
                  <stop offset="50%" stopColor="#17382a" />
                  <stop offset="100%" stopColor="#0b1c15" />
                </linearGradient>
                <pattern id="hatch2" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#e9dfcb" strokeWidth="1" opacity="0.25" />
                </pattern>
              </defs>

              <rect x="80" y="60" width="440" height="330" rx="16" fill="url(#metalGrad2)" stroke="#e9dfcb" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 4" />
              <rect x="100" y="80" width="400" height="290" rx="12" fill="#0b1c15" stroke="#1f4d3a" strokeWidth="2" />
              <rect x="140" y="140" width="320" height="180" rx="8" fill="url(#hatch2)" stroke="#e9dfcb" strokeWidth="1" opacity="0.5" />

              {/* Parça Sembolleri */}
              <circle cx="168" cy="144" r="38" fill="#11291f" stroke="#e9dfcb" strokeWidth="1.5" />
              <circle cx="168" cy="144" r="18" fill="#0b1c15" stroke="#398466" strokeWidth="1" />
              <line x1="168" y1="182" x2="168" y2="230" stroke="#e9dfcb" strokeWidth="2" strokeDasharray="2 2" />

              <path d="M 270 95 C 270 70, 330 70, 330 95 C 330 120, 290 120, 290 145" fill="none" stroke="#e9dfcb" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="260" y="145" width="80" height="18" rx="4" fill="#1f4d3a" stroke="#e9dfcb" strokeWidth="1" />

              <ellipse cx="408" cy="198" rx="65" ry="16" fill="#17382a" stroke="#e9dfcb" strokeWidth="1.5" />
              <circle cx="408" cy="198" r="6" fill="#e9dfcb" />
              <line x1="345" y1="198" x2="470" y2="198" stroke="#e9dfcb" strokeWidth="1.5" opacity="0.8" />

              <polygon points="210,290 246,290 236,330 220,330" fill="#17382a" stroke="#e9dfcb" strokeWidth="1.5" />
              <path d="M 420 310 L 460 310 L 460 350 L 430 350" fill="none" stroke="#e9dfcb" strokeWidth="2" />
              <rect x="95" y="235" width="28" height="32" rx="4" fill="#1f4d3a" stroke="#e9dfcb" strokeWidth="1.5" />
              <circle cx="109" cy="251" r="5" fill="#8b5cf6" />
            </svg>

            {/* %10 VURGU: İnteraktif Hotspot Pinleri (#8b5cf6 SADECE TIKLANABİLİR) */}
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
                  className={`absolute z-20 w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-action-500 text-white scale-125 ring-4 ring-action-400/50 shadow-action-glow-lg'
                      : isHovered
                      ? 'bg-action-600 text-white scale-110 shadow-action-glow'
                      : 'bg-forest-950 text-action-300 border-2 border-action-500 hover:border-action-400 hover:bg-action-500 hover:text-white shadow-[0_0_10px_rgba(139,92,246,0.35)]'
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
                className="absolute z-30 w-9 h-9 rounded-full bg-action-500 text-white font-mono font-bold text-xs flex items-center justify-center animate-bounce shadow-action-glow-lg border-2 border-white"
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
            <div className="gold-glass-card rounded-2xl p-5 border-2 border-action-500/60 shadow-action-glow animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-cream-300/15">
                <span className="text-xs font-bold text-action-300 flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>Yeni Parça Pini Ekle</span>
                </span>
                <button
                  onClick={() => setPendingCoords(null)}
                  className="text-cream-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-cream-200 mb-1">
                    Pozisyon / Sıra No:
                  </label>
                  <input
                    type="number"
                    value={newItemNo}
                    onChange={(e) => setNewItemNo(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-forest-950 border border-forest-800 text-action-300 font-mono font-bold text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-cream-200 mb-1">
                    Parça Adı (TR):
                  </label>
                  <input
                    type="text"
                    value={newPartName}
                    onChange={(e) => setNewPartName(e.target.value)}
                    placeholder="Örn: Su Giriş Ventili 3/4"
                    autoFocus
                    className="w-full px-3 py-2 rounded-lg bg-forest-950 border border-forest-800 focus:border-action-500 text-cream-100 text-xs outline-none"
                  />
                </div>

                <button
                  onClick={handleSaveNewHotspot}
                  disabled={!newPartName.trim()}
                  className="w-full bg-action-500 hover:bg-action-600 text-white py-2 rounded-xl text-xs font-bold mt-2 disabled:opacity-50 transition-all cursor-pointer shadow-md"
                >
                  Pini Şemaya Kaydet
                </button>
              </div>
            </div>
          )}

          {/* Aktif Parça Kartı */}
          {selectedPart && !pendingCoords && (
            <div className="gold-glass-card rounded-2xl p-5 border-2 border-cream-300/25 relative overflow-hidden shadow-card-dark">
              
              {/* Başarıyla Eklendi Uyarısı */}
              {addedAlert && (
                <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center space-x-1 animate-bounce">
                  <Check className="w-3.5 h-3.5" />
                  <span>Servis Listesine Eklendi!</span>
                </div>
              )}

              <div className="flex items-center justify-between pb-3 border-b border-cream-300/15">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-full bg-action-500 text-white font-mono font-bold text-xs flex items-center justify-center shadow-sm">
                    {selectedPart.itemNo}
                  </span>
                  <span className="text-xs font-semibold text-cream-200">
                    Seçilen Şema Pozisyonu
                  </span>
                </div>

                <span className="text-[10px] px-2 py-0.5 rounded bg-cream-300/10 text-cream-200 border border-cream-300/20 font-medium">
                  {selectedPart.status}
                </span>
              </div>

              <div className="mt-4">
                <h4 className="text-sm sm:text-base font-bold text-cream-100">
                  {selectedPart.partName}
                </h4>

                <div className="mt-3 p-3 rounded-xl bg-forest-950 border border-forest-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-cream-400">Şablon Referansı:</span>
                    <span className="font-mono font-bold text-cream-100">
                      {selectedPart.partCodePlaceholder}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-cream-400">Birim:</span>
                    <span className="text-cream-200">{selectedPart.unit}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-cream-400">Sarf / Aşınma Parçası:</span>
                    <span className={selectedPart.isWearPart ? 'text-amber-400 font-semibold' : 'text-cream-300'}>
                      {selectedPart.isWearPart ? 'Evet (Kritik)' : 'Standart'}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-xs text-cream-400/80 leading-relaxed">
                  {selectedPart.description}
                </p>

                {/* Servis Parça Talebine Ekle Butonu - %10 SADECE TIKLANABİLİR MOR (#8b5cf6) */}
                <button
                  onClick={handleAddPartToCart}
                  className="w-full mt-4 bg-action-500 hover:bg-action-600 active:bg-action-700 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 shadow-[0_4px_16px_rgba(139,92,246,0.4)] transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Servis Parça Listesine Ekle</span>
                </button>
              </div>
            </div>
          )}

          {/* Şema Parça Listesi */}
          <div className="gold-glass-card rounded-2xl p-4 shadow-card-dark">
            <div className="flex items-center justify-between pb-3 border-b border-cream-300/15 mb-3">
              <span className="text-xs font-bold text-cream-100 flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-cream-300" />
                <span>Şema Parça İndeksi ({currentDiagram.parts.length})</span>
              </span>
              <span className="text-[10px] text-cream-400 font-mono">Poz No</span>
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
                        ? 'bg-action-500/20 border border-action-500 text-white font-semibold shadow-sm'
                        : 'bg-forest-950 hover:bg-forest-850 hover:border-action-500/40 border border-forest-800 text-cream-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                        isSelected ? 'bg-action-500 text-white' : 'bg-forest-900 text-cream-300 border border-cream-300/20'
                      }`}>
                        {part.itemNo}
                      </span>
                      <span className="truncate">{part.partName}</span>
                    </div>

                    <span className="font-mono text-[10px] text-cream-400 ml-2">
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
