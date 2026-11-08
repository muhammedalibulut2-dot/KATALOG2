import React from 'react';
import { useServiceCart } from '../context/ServiceCartContext';
import { X, Trash2, Send, Printer, Plus, Minus, ShoppingBag, ShieldCheck } from 'lucide-react';

interface ServiceCartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceCartModal: React.FC<ServiceCartModalProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, clearCart, totalItemsCount, generateWhatsAppText } = useServiceCart();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    const text = generateWhatsAppText();
    // Çağ Teknik merkez parça hattı
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/85 backdrop-blur-md text-cream-300">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-forest-900 border-2 border-cream-300/25 rounded-2xl shadow-card-dark flex flex-col overflow-hidden">
        
        {/* Üst Başlık */}
        <div className="p-5 border-b border-cream-300/15 flex items-center justify-between bg-forest-950/70">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-cream-300/15 border border-cream-300/30 flex items-center justify-center text-cream-200">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-cream-100">
                SERVİS YEDEK PARÇA TALEBİ
              </h3>
              <p className="text-xs text-cream-400/80">
                Seçilen Parçalar ({totalItemsCount} Kalem / Adet)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-cream-400 hover:text-action-400 bg-forest-900 border border-forest-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Parça Listesi */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {items.length === 0 ? (
            <div className="py-12 text-center text-cream-400 space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto text-forest-700" />
              <p className="text-sm font-semibold text-cream-200">Henüz parça eklenmedi</p>
              <p className="text-xs max-w-sm mx-auto text-cream-400/70">
                Patlatılmış şema üzerindeki numaralı pinlere tıklayarak yedek parçaları bu listeye ekleyebilirsiniz.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-forest-950 border border-forest-800 hover:border-cream-300/30 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <span className="w-7 h-7 rounded-lg bg-cream-300/15 border border-cream-300/30 text-cream-200 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                    #{item.itemNo}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-cream-100 truncate">
                      {item.partName}
                    </p>
                    <p className="text-[11px] text-cream-300 font-mono">
                      {item.partCode} • <span className="text-cream-400/80">{item.brandName} ({item.deviceModelCode})</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 flex-shrink-0">
                  {/* Miktar Kontrolleri */}
                  <div className="flex items-center space-x-1.5 bg-forest-900 rounded-lg border border-forest-800 p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-cream-400 hover:text-action-400 rounded transition-colors cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-mono font-bold text-cream-100">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-cream-400 hover:text-action-400 rounded transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Sil Butonu */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-cream-400/60 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Listeden Kaldır"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Alt Aksiyon Butonları */}
        {items.length > 0 && (
          <div className="p-5 border-t border-cream-300/15 bg-forest-950/80 space-y-3">
            <div className="flex items-center justify-between text-xs text-cream-400">
              <button
                onClick={clearCart}
                className="text-cream-400 hover:text-rose-400 underline transition-colors cursor-pointer"
              >
                Tüm Listeyi Temizle
              </button>
              <span className="font-semibold text-cream-200">
                Toplam: <strong className="text-cream-100 font-mono">{totalItemsCount}</strong> Parça
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* WhatsApp İle Siparişi İlet - %10 SADECE TIKLANABİLİR MOR BUTON (#8b5cf6) */}
              <button
                onClick={handleSendWhatsApp}
                className="py-2.5 px-4 rounded-xl text-xs font-bold bg-action-500 hover:bg-action-600 active:bg-action-700 text-white flex items-center justify-center space-x-2 transition-all shadow-[0_4px_14px_rgba(139,92,246,0.4)] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>WhatsApp İle Siparişi İlet</span>
              </button>

              <button
                onClick={handlePrint}
                className="py-2.5 px-4 rounded-xl text-xs font-bold bg-forest-900 hover:bg-forest-850 border border-action-500/40 hover:border-action-500 text-action-300 hover:text-white flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Servis Formu Olarak Yazdır</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
  );
};
