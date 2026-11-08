import React from 'react';
import { X, HardDrive, Globe, Database, ArrowRight, CheckCircle2, ShieldCheck, FileSpreadsheet, Layers } from 'lucide-react';

interface DataIngestionGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataIngestionGuideModal: React.FC<DataIngestionGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/85 backdrop-blur-md text-cream-300">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-forest-900 border-2 border-cream-300/25 rounded-2xl shadow-card-dark p-6 sm:p-8">
        
        {/* Kapat Butonu */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-cream-400 hover:text-action-400 bg-forest-950 border border-forest-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Başlık */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 rounded-xl bg-cream-300/15 border border-cream-300/30 text-cream-200">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-cinzel text-xl font-bold text-cream-100">
              Katalog Verisi & Dosya Yükleme Altyapısı Planı
            </h3>
            <p className="text-xs text-cream-400/80">
              Atalay, Empero ve Öztiryakiler kaynaklarının Supabase'e güvenli aktarım mimarisi
            </p>
          </div>
        </div>

        {/* 3 Ana Kaynak Entegrasyon Planı */}
        <div className="space-y-4">
          
          {/* 1. ATALAY Drive Entegrasyonu */}
          <div className="p-4 rounded-xl bg-forest-950 border border-cream-300/15">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-cream-100 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-cream-300" />
                <span>1. ATALAY (Google Drive PDF / Şema Havuzu)</span>
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-forest-900 text-cream-300 border border-forest-800 font-mono">
                Klasör: 1H9gFSeqvB43w...
              </span>
            </div>
            <p className="text-xs text-cream-300/90 leading-relaxed">
              Google Drive klasöründeki servis manueli PDF'leri; cihaz modeli, seri ve şema numaralarına göre klasörlenerek <strong>Supabase Storage ("catalogs-atalay" bucket)</strong> içerisine yüklenecektir. Her PDF'in patlatılmış şema sayfası yüksek çözünürlüklü WebP formatına dönüştürülüp <code>diagrams</code> tablosuna kaydedilir.
            </p>
          </div>

          {/* 2. ÖZTİRYAKİLER Drive Entegrasyonu */}
          <div className="p-4 rounded-xl bg-forest-950 border border-cream-300/15">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-cream-100 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-cream-300" />
                <span>2. ÖZTİRYAKİLER (Google Drive Teknik Dokümanlar)</span>
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-forest-900 text-cream-300 border border-forest-800 font-mono">
                Klasör: 1ajjE7NjO7i_...
              </span>
            </div>
            <p className="text-xs text-cream-300/90 leading-relaxed">
              Öztiryakiler fırın, bulaşık ve pişirme serilerine ait parça listeleri ve patlatılmış çizim sayfaları OCR veya CSV eşleme yöntemiyle <code>devices</code> ve <code>parts</code> tablolarına otomatik bağlanır.
            </p>
          </div>

          {/* 3. EMPERO Web Portal Entegrasyonu */}
          <div className="p-4 rounded-xl bg-forest-950 border border-cream-300/15">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-cream-100 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-cream-300" />
                <span>3. EMPERO (Resmi Parça Portalı Senkronizasyonu)</span>
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-forest-900 text-cream-300 border border-forest-800 font-mono">
                empero.com.tr/tr/yedekparca/
              </span>
            </div>
            <p className="text-xs text-cream-300/90 leading-relaxed">
              Empero resmi portalındaki model hiyerarşisi (Kategori &gt; Model &gt; Şema &gt; Parça No) için güvenli bir Node.js / Python veri aktarım betiği ile resmi veriler Supabase veritabanına periyodik olarak aktarılacaktır.
            </p>
          </div>

          {/* Veri Modeli ve Güvenlik Özeti */}
          <div className="p-4 rounded-xl bg-forest-850/80 border border-cream-300/25">
            <h4 className="text-xs font-bold text-cream-200 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-cream-300" />
              <span>Supabase Veri Modeli ve Güvenlik Altyapısı</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-cream-300 mt-2">
              <div className="bg-forest-950/90 p-2.5 rounded-lg border border-forest-800">
                <p className="font-bold text-cream-100">1. Tablolar & Şema</p>
                <p className="text-[11px] text-cream-400 mt-0.5"><code>supabase/schema.sql</code> içerisinde 7 ana ilişkisel tablo hazırlandı.</p>
              </div>
              <div className="bg-forest-950/90 p-2.5 rounded-lg border border-forest-800">
                <p className="font-bold text-cream-100">2. RLS Güvenlik Duvarı</p>
                <p className="text-[11px] text-cream-400 mt-0.5">Sadece Çağ Teknik yetkili personeli okuma/sorgulama yapabilir.</p>
              </div>
              <div className="bg-forest-950/90 p-2.5 rounded-lg border border-forest-800">
                <p className="font-bold text-cream-100">3. Dosya Depolama</p>
                <p className="text-[11px] text-cream-400 mt-0.5">Supabase Storage buckets: <code>diagrams</code>, <code>manuals</code>.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Kapat Aksiyonu - %10 SADECE TIKLANABİLİR MOR BUTON (#8b5cf6) */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-action-500 hover:bg-action-600 active:bg-action-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-[0_4px_14px_rgba(139,92,246,0.4)] transition-all cursor-pointer"
          >
            Anladım, Kataloğa Dön
          </button>
        </div>

      </div>
    </div>
  );
  );
};
