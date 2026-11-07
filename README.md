# ÇAĞ TEKNİK | ENDÜSTRİYEL YEDEK PARÇA KATALOG SİSTEMİ

Çağ Teknik yetkili servis personeli için özel olarak geliştirilmiş; **Atalay**, **Empero** ve **Öztiryakiler** markalarına ait cihazların patlatılmış montaj resimlerini, teknik servis kılavuzlarını ve parça referanslarını sunan ultra premium web uygulaması.

---

## 🛠️ Teknoloji Altyapısı

- **Frontend:** React 18 + TypeScript + Vite
- **Tasarım Dili:** Özel Endüstriyel Lüks Koyu Tema (Obsidian Black, Titanyum Antrasit & Metalik Altın - `#D4AF37`)
- **Stil & İkon:** Tailwind CSS + Lucide Icons + Google Fonts (Cinzel, Plus Jakarta Sans, JetBrains Mono)
- **Veritabanı & Auth:** Supabase (PostgreSQL + Row Level Security + Storage)

---

## 📁 Oluşturulan Proje Dosyaları

```text
c:\Users\lokman\Documents\KATALOG
├── index.html                       # SEO & Kurumsal Başlık, Font Tanımları, SVG Mühür
├── package.json                     # Bağımlılıklar (React, TS, Vite, Supabase, Lucide)
├── tsconfig.json                    # TypeScript Derleme Yapılandırması
├── vite.config.ts                   # Vite Sunucu Ayarları (Port 3000)
├── tailwind.config.js               # Özel Altın & Antrasit Renk Paleti ve Gölgeler
├── postcss.config.js                # Tailwind CSS PostCSS Motoru
├── .env.example                     # Supabase Güvenli Ortam Değişkenleri Şablonu
├── supabase/
│   └── schema.sql                   # 7 İlişkisel Tablo + RLS Güvenlik Politikaları
└── src/
    ├── main.tsx                     # React DOM Giriş Noktası
    ├── App.tsx                      # Sayfa Durum Yönetimi & Navigasyon
    ├── index.css                    # Lüks Altın & Cam Efektleri (Glassmorphism)
    ├── types/
    │   └── catalog.ts               # Marka, Model, Şema, Parça ve Hotspot Tipleri
    ├── lib/
    │   └── supabaseClient.ts        # Güvenli Supabase İstemcisi & Fallback Modu
    ├── context/
    │   └── AuthContext.tsx          # Personel Oturum Yönetimi & Hızlı Giriş
    ├── data/
    │   └── mockCatalogData.ts       # Standartlaştırılmış Teknik Şablon Verisi
    └── components/
        ├── Header.tsx               # Üst Bar, ÇT Mührü, Personel Rozeti, Çıkış
        ├── Footer.tsx               # Kurumsal Bilgilendirme ve Güvenlik Bildirimi
        ├── LoginScreen.tsx          # Yetkili Personel Giriş Terminali (Altın Işıltılı)
        ├── SearchBar.tsx            # Geniş Model & Şema Arama Çubuğu + Filtreler
        ├── BrandCard.tsx            # Atalay, Empero, Öztiryakiler 3D Premium Kartları
        ├── DeviceCatalogView.tsx    # Cihaz Katalog Ekranı & Kategori Sekmeleri
        ├── ExplodedDiagramViewer.tsx # Patlatılmış Resim Görüntüleyicisi (Zoom/Pan/Hotspot)
        └── DataIngestionGuideModal.tsx # Drive & Empero Katalog Aktarım Planı Modalı
```

---

## 🚀 Çalıştırma Talimatları

Proje dizininde terminali açın:

```bash
# 1. Bağımlılıkları yükleyin:
npm install

# 2. Geliştirme sunucusunu başlatın:
npm run dev
```

Uygulama otomatik olarak tarayıcınızda açılacaktır (varsayılan: `http://localhost:3000`).

---

## 🔐 Personel Giriş Bilgileri (Geliştirme / Test Modu)

İlk aşamada Supabase bilgileri girilmemiş olsa dahi sistem kesintisiz test edilebilir:
- **Saha Teknisyeni Girişi:** Tek tıkla "Saha Teknisyeni" butonuna tıklayarak doğrudan girebilirsiniz.
- **E-Posta / Şifre:** `teknik@cagteknik.com` / `demo1234`

---

## 📡 Supabase Bağlantısı Nasıl Yapılır? (Sonraki Aşama)

1. [Supabase](https://supabase.com) üzerinde yeni bir proje oluşturun (`cag-teknik-katalog`).
2. Supabase SQL Editor'ü açın ve proje içerisindeki `supabase/schema.sql` dosyasının içeriğini yapıştırıp çalıştırın (**Run**). Bu işlem:
   - `profiles`, `brands`, `categories`, `devices`, `diagrams`, `parts`, `diagram_hotspots` tablolarını oluşturur.
   - Sadece Çağ Teknik yetkili personelinin verileri okuyabilmesini sağlayan **RLS (Row Level Security)** politikalarını devreye alır.
3. Proje dizininde `.env` adında bir dosya oluşturun:
   ```env
   VITE_SUPABASE_URL=https://proje-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
4. Uygulamayı yeniden başlattığınızda sağ üstteki rozet otomatik olarak **"Supabase Bağlı"** durumuna geçecektir.
