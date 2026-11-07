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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-dark-900 border-2 border-gold-500/40 rounded-2xl shadow-gold-glow p-6 sm:p-8 text-slate-100">
        
        {/* Kapat Butonu */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-gold-400 bg-dark-950 border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Başlık */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 rounded-xl bg-gold-500/15 border border-gold-500/40 text-gold-400">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-cinzel text-xl font-bold text-gold-gradient">
              Katalog Verisi & Dosya Yükleme Altyapısı Planı
            </h3>
            <p className="text-xs text-slate-400">
              Atalay, Empero ve Öztiryakiler kaynaklarının Supabase'e güvenli aktarım mimarisi
            </p>
          </div>
        </div>

        {/* 3 Ana Kaynak Entegrasyon Planı */}
        <div className="space-y-4">
          
          {/* 1. ATALAY Drive Entegrasyonu */}
          <div className="p-4 rounded-xl bg-dark-950 border border-gold-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-gold-400 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-gold-500" />
                <span>1. ATALAY (Google Drive PDF / Şema Havuzu)</span>
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-dark-900 text-slate-400 border border-slate-800 font-mono">
                Klasör: 1H9gFSeqvB43w...
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Google Drive klasöründeki servis manueli PDF'leri; cihaz modeli, seri ve şema numaralarına göre klasörlenerek <strong>Supabase Storage ("catalogs-atalay" bucket)</strong> içerisine yüklenecektir. Her PDF'in patlatılmış şema sayfası yüksek çözünürlüklü WebP formatına dönüştürülüp <code>diagrams</code> tablosuna kaydedilir.
            </p>
          </div>

          {/* 2. ÖZTİRYAKİLER Drive Entegrasyonu */}
          <div className="p-4 rounded-xl bg-dark-950 border border-gold-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-gold-400 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-gold-500" />
                <span>2. ÖZTİRYAKİLER (Google Drive Teknik Dokümanlar)</span>
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-dark-900 text-slate-400 border border-slate-800 font-mono">
                Klasör: 1ajjE7NjO7i_...
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Öztiryakiler fırın, bulaşık ve pişirme serilerine ait parça listeleri ve patlatılmış çizim sayfaları OCR veya CSV eşleme yöntemiyle <code>devices</code> ve <code>parts</code> tablolarına otomatik bağlanır.
            </p>
          </div>

          {/* 3. EMPERO Web Portal Entegrasyonu */}
          <div className="p-4 rounded-xl bg-dark-950 border border-gold-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-gold-400 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-gold-500" />
                <span>3. EMPERO (Resmi Parça Portalı Senkronizasyonu)</span>
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-dark-900 text-slate-400 border border-slate-800 font-mono">
                empero.com.tr/tr/yedekparca/
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Empero resmi portalındaki model hiyerarşisi (Kategori &gt; Model &gt; Şema &gt; Parça No) için güvenli bir Node.js / Python veri aktarım betiği ile resmi veriler Supabase veritabanına periyodik olarak aktarılacaktır.
            </p>
          </div>

          {/* Veri Modeli ve Güvenlik Özeti */}
          <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/30">
            <h4 className="text-xs font-bold text-gold-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>Supabase Veri Modeli ve Güvenlik Altyapısı</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300 mt-2">
              <div className="bg-dark-950/80 p-2.5 rounded-lg border border-slate-800">
                <p className="font-bold text-gold-400">1. Tablolar & Şema</p>
                <p className="text-[11px] text-slate-400 mt-0.5"><code>supabase/schema.sql</code> içerisinde 7 ana ilişkisel tablo hazırlandı.</p>
              </div>
              <div className="bg-dark-950/80 p-2.5 rounded-lg border border-slate-800">
                <p className="font-bold text-gold-400">2. RLS Güvenlik Duvarı</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Sadece Çağ Teknik yetkili personeli okuma/sorgulama yapabilir.</p>
              </div>
              <div className="bg-dark-950/80 p-2.5 rounded-lg border border-slate-800">
                <p className="font-bold text-gold-400">3. Dosya Depolama</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Supabase Storage buckets: <code>diagrams</code>, <code>manuals</code>.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Kapat Aksiyonu */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="gold-button px-6 py-2.5 rounded-xl text-xs font-bold"
          >
            Anladım, Kataloğa Dön
          </button>
        </div>

      </div>
    </div>
  );
};
