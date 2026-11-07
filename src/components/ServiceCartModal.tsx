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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-dark-900 border-2 border-gold-500/40 rounded-2xl shadow-gold-glow flex flex-col overflow-hidden">
        
        {/* Üst Başlık */}
        <div className="p-5 border-b border-gold-500/20 flex items-center justify-between bg-dark-950/60">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gold-500/15 border border-gold-500/40 flex items-center justify-center text-gold-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-gold-gradient">
                SERVİS YEDEK PARÇA TALEBİ
              </h3>
              <p className="text-xs text-slate-400">
                Seçilen Parçalar ({totalItemsCount} Kalem / Adet)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-gold-400 bg-dark-900 border border-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Parça Listesi */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {items.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto text-slate-700" />
              <p className="text-sm font-semibold text-slate-400">Henüz parça eklenmedi</p>
              <p className="text-xs max-w-sm mx-auto text-slate-500">
                Patlatılmış şema üzerindeki numaralı pinlere tıklayarak yedek parçaları bu listeye ekleyebilirsiniz.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-dark-950 border border-slate-800 hover:border-gold-500/30 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <span className="w-7 h-7 rounded-lg bg-gold-500/15 border border-gold-500/30 text-gold-400 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                    #{item.itemNo}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-200 truncate">
                      {item.partName}
                    </p>
                    <p className="text-[11px] text-gold-500/80 font-mono">
                      {item.partCode} • <span className="text-slate-400">{item.brandName} ({item.deviceModelCode})</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 flex-shrink-0">
                  {/* Miktar Kontrolleri */}
                  <div className="flex items-center space-x-1.5 bg-dark-900 rounded-lg border border-slate-800 p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-slate-400 hover:text-gold-400 rounded transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-mono font-bold text-gold-400">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-slate-400 hover:text-gold-400 rounded transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Sil Butonu */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
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
          <div className="p-5 border-t border-slate-800 bg-dark-950/80 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <button
                onClick={clearCart}
                className="text-slate-500 hover:text-rose-400 underline transition-colors"
              >
                Tüm Listeyi Temizle
              </button>
              <span className="font-semibold text-slate-300">
                Toplam: <strong className="text-gold-400 font-mono">{totalItemsCount}</strong> Parça
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                onClick={handleSendWhatsApp}
                className="py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>WhatsApp İle Siparişi İlet</span>
              </button>

              <button
                onClick={handlePrint}
                className="py-2.5 px-4 rounded-xl text-xs font-bold dark-outline-button flex items-center justify-center space-x-2"
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
};
