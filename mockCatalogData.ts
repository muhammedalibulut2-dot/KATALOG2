import { Brand, Category, DeviceModel, ExplodedDiagram } from '../types/catalog';

export const BRANDS: Brand[] = [
  {
    id: 'b-atalay',
    slug: 'atalay',
    name: 'ATALAY',
    tagline: 'Endüstriyel Mutfak Ekipmanları & Pişirme Teknolojileri',
    established: '1890',
    origin: 'Türkiye / Çorlu',
    accentColor: '#D4AF37',
    badge: 'Yetkili Servis Kataloğu',
    description: 'Kuzineler, ızgaralar, fritözler, fırınlar ve set üstü endüstriyel pişirme üniteleri teknik şema arşivi.',
    sourceUrl: 'https://drive.google.com/drive/folders/1H9gFSeqvB43wXH6VoXbu3lBP6Bw5UGIR?usp=drive_link',
    sourceType: 'Google Drive',
    deviceCount: 148,
    diagramCount: 420
  },
  {
    id: 'b-empero',
    slug: 'empero',
    name: 'EMPERO',
    tagline: 'Gastronomi Çözümleri & Endüstriyel Mutfak Makineleri',
    established: '1983',
    origin: 'Türkiye / Konya',
    accentColor: '#E5C158',
    badge: 'Yedek Parça Portalı Entegre',
    description: 'Bulaşık makineleri, soğutucular, hazırlık makineleri ve döner ocakları resmi parça kataloğu.',
    sourceUrl: 'https://empero.com.tr/tr/yedekparca/',
    sourceType: 'Resmi Portal',
    deviceCount: 215,
    diagramCount: 680
  },
  {
    id: 'b-oztiryakiler',
    slug: 'oztiryakiler',
    name: 'ÖZTİRYAKİLER',
    tagline: 'Profesyonel Mutfak & Ağırlama Sanayii Ekipmanları',
    established: '1958',
    origin: 'Türkiye / İstanbul',
    accentColor: '#B89223',
    badge: 'Teknik Dokümantasyon',
    description: 'Kombine buharlı fırınlar, bulaşıkhane sistemleri, soğuk odalar ve tezgah dolapları patlatılmış resimleri.',
    sourceUrl: 'https://drive.google.com/drive/folders/1ajjE7NjO7i_tfXqER2f201d44xaOQFUr?usp=drive_link',
    sourceType: 'Google Drive',
    deviceCount: 310,
    diagramCount: 940
  }
];

export const CATEGORIES: Category[] = [
  // Atalay Kategorileri
  { id: 'cat-at-pisirme', brandSlug: 'atalay', name: 'Pişirme Grubu (Kuzine / Izgara / Fritöz)', iconName: 'Flame', itemCount: 64 },
  { id: 'cat-at-firin', brandSlug: 'atalay', name: 'Konveksiyonel & Pasta Fırınları', iconName: 'Boxes', itemCount: 38 },
  { id: 'cat-at-hazirlik', brandSlug: 'atalay', name: 'Gıda Hazırlık Ekipmanları', iconName: 'Cpu', itemCount: 26 },
  { id: 'cat-at-servis', brandSlug: 'atalay', name: 'Nötr & Isıtmalı Servis Hatları', iconName: 'Layers', itemCount: 20 },

  // Empero Kategorileri
  { id: 'cat-em-bulasik', brandSlug: 'empero', name: 'Bulaşıkhane Grubu (Giyotin / Konveyör)', iconName: 'Sparkles', itemCount: 52 },
  { id: 'cat-em-pisirme', brandSlug: 'empero', name: '700 & 900 Seri Pişirme Blokları', iconName: 'Flame', itemCount: 78 },
  { id: 'cat-em-sogutma', brandSlug: 'empero', name: 'Endüstriyel Soğutma Dolapları', iconName: 'Snowflake', itemCount: 45 },
  { id: 'cat-em-hazirlik', brandSlug: 'empero', name: 'Mikser, Kıyma & Sebze Doğrama', iconName: 'Cpu', itemCount: 40 },

  // Öztiryakiler Kategorileri
  { id: 'cat-oz-kombi', brandSlug: 'oztiryakiler', name: 'Kombili Buharlı Fırınlar (Öztiryakiler Fırın)', iconName: 'Boxes', itemCount: 86 },
  { id: 'cat-oz-bulasik', brandSlug: 'oztiryakiler', name: 'Bulaşık Yıkama Sistemleri', iconName: 'Sparkles', itemCount: 94 },
  { id: 'cat-oz-pisirme', brandSlug: 'oztiryakiler', name: '700/900 Seri Ağır Hizmet Pişirme', iconName: 'Flame', itemCount: 82 },
  { id: 'cat-oz-sogutma', brandSlug: 'oztiryakiler', name: 'Tezgah Tipi & Dik Tip Soğutucular', iconName: 'Snowflake', itemCount: 48 }
];

export const DEVICE_MODELS: DeviceModel[] = [
  // ATALAY
  {
    id: 'dev-at-kuzine-900',
    brandSlug: 'atalay',
    categoryId: 'cat-at-pisirme',
    categoryName: 'Pişirme Grubu (Kuzine / Izgara / Fritöz)',
    modelCode: 'AKG-980',
    modelName: '4 Ocaklı Gazlı Fırınlı Kuzine 900 Seri',
    series: 'Heavy Duty 900 Line',
    energyType: 'Gaz',
    yearRange: '2020 - 2026',
    diagramsCount: 4,
    specsSummary: ['4x 8.5 kW Brülör', 'Emniyet Ventilli Termokupl', 'GN 2/1 Gazlı Statik Fırın']
  },
  {
    id: 'dev-at-fritoz-700',
    brandSlug: 'atalay',
    categoryId: 'cat-at-pisirme',
    categoryName: 'Pişirme Grubu (Kuzine / Izgara / Fritöz)',
    modelCode: 'AEF-780',
    modelName: 'Çift Havuzlu Elektrikli Fritöz 2x14 Lt',
    series: 'Commercial 700 Line',
    energyType: 'Elektrik',
    yearRange: '2019 - 2025',
    diagramsCount: 3,
    specsSummary: ['2x 11 kW Isıtıcı Rezistans', 'EGO Termostat Grubu', 'Paslanmaz Tahliye Musluğu']
  },
  {
    id: 'dev-at-firin-10gn',
    brandSlug: 'atalay',
    categoryId: 'cat-at-firin',
    categoryName: 'Konveksiyonel & Pasta Fırınları',
    modelCode: 'AKF-10E',
    modelName: '10 GN 1/1 Konveksiyonel Elektrikli Fırın',
    series: 'Master Chef Line',
    energyType: 'Elektrik',
    yearRange: '2021 - 2026',
    diagramsCount: 5,
    specsSummary: ['Nemlendirme Sistemi', 'Çift Yönlü Fan Motoru', 'Dokunmatik Kontrol Paneli']
  },

  // EMPERO
  {
    id: 'dev-em-bulasik-1000',
    brandSlug: 'empero',
    categoryId: 'cat-em-bulasik',
    categoryName: 'Bulaşıkhane Grubu (Giyotin / Konveyör)',
    modelCode: 'EMP.1000',
    modelName: 'Giyotin Tip Bulaşık Yıkama Makinesi',
    series: 'Aqua Line Pro',
    energyType: 'Elektrik',
    yearRange: '2018 - 2026',
    diagramsCount: 6,
    specsSummary: ['Yıkama Pompası 0.75 kW', 'Boyler Rezistansı 9 kW', 'Manyetik Kapak Sensörü']
  },
  {
    id: 'dev-em-izgara-900',
    brandSlug: 'empero',
    categoryId: 'cat-em-pisirme',
    categoryName: '700 & 900 Seri Pişirme Blokları',
    modelCode: 'EMP.9IE010',
    modelName: 'Elektrikli Düz Pleyt Izgara 800 mm',
    series: 'Prime 900',
    energyType: 'Elektrik',
    yearRange: '2020 - 2025',
    diagramsCount: 2,
    specsSummary: ['Sert Krom Pleyt Yüzeyi', 'Bağımsız Çift Bölge Kontrolü', 'Yağ Tahliye Çekmecesi']
  },

  // ÖZTİRYAKİLER
  {
    id: 'dev-oz-kombi-10gn',
    brandSlug: 'oztiryakiler',
    categoryId: 'cat-oz-kombi',
    categoryName: 'Kombili Buharlı Fırınlar (Öztiryakiler Fırın)',
    modelCode: 'OKF 101-E',
    modelName: '10 Tepsi Akıllı Kombi Buharlı Fırın',
    series: 'Smart Touch Generation',
    energyType: 'Elektrik',
    yearRange: '2021 - 2026',
    diagramsCount: 7,
    specsSummary: ['Inverter Fan Motoru', 'Otomatik Yıkama Pompası', 'Kazanlı Buhar Jeneratörü']
  },
  {
    id: 'dev-oz-bulasik-obm1080',
    brandSlug: 'oztiryakiler',
    categoryId: 'cat-oz-bulasik',
    categoryName: 'Bulaşık Yıkama Sistemleri',
    modelCode: 'OBM 1080',
    modelName: 'Giyotin Tip Kaputlu Bulaşık Makinesi',
    series: 'Euro Pro Line',
    energyType: 'Elektrik',
    yearRange: '2019 - 2026',
    diagramsCount: 4,
    specsSummary: ['Durulama Takviye Pompası', 'Dijital Termometreli Kart', 'AISI 304 Şasi']
  }
];

// Örnek Patlatılmış Resim ve Şematik Veri Modeli
// DİKKAT: Gerçek katalog verileri henüz yüklenmediğinden,
// burada uydurma parça kodu yerine temiz şablon referansları kullanılmıştır.
export const SAMPLE_DIAGRAM: ExplodedDiagram = {
  id: 'diag-sample-01',
  deviceId: 'dev-em-bulasik-1000',
  sheetNo: 'ŞEMA-01/04',
  title: 'Yıkama Tankı, Durulama Boyleri ve Pompa Grubu',
  imageUrl: '', // Vektörel/SVG canvas ile çizilecek interaktif endüstriyel patlatılmış şema
  pdfManualUrl: '#',
  totalParts: 6,
  hotspots: [
    { id: 'hs-1', itemNo: 1, x: 28, y: 32, label: 'Poz 01: Yıkama Pompası Gövde Kiti' },
    { id: 'hs-2', itemNo: 2, x: 50, y: 22, label: 'Poz 02: Boyler Rezistansı Grubu' },
    { id: 'hs-3', itemNo: 3, x: 68, y: 44, label: 'Poz 03: Üst Döner Durulama Kolu Takımı' },
    { id: 'hs-4', itemNo: 4, x: 38, y: 64, label: 'Poz 04: Tank Emiş Filtresi & Süzgeç' },
    { id: 'hs-5', itemNo: 5, x: 74, y: 72, label: 'Poz 05: Drenaj / Tahliye Rekoru' },
    { id: 'hs-6', itemNo: 6, x: 18, y: 55, label: 'Poz 06: Emniyet Limit Termostatı' }
  ],
  parts: [
    {
      id: 'pt-1',
      diagramId: 'diag-sample-01',
      itemNo: 1,
      partCodePlaceholder: '[ŞEMA-REF-0101]',
      partName: 'Ana Sirkülasyon & Yıkama Pompası Grubu',
      description: 'Pompa salmastrası, fan pervanesi ve kondansatör montaj kiti.',
      unit: 'Adet',
      isWearPart: true,
      status: 'Katalog Bekleniyor'
    },
    {
      id: 'pt-2',
      diagramId: 'diag-sample-01',
      itemNo: 2,
      partCodePlaceholder: '[ŞEMA-REF-0102]',
      partName: 'Boyler Isıtıcı Rezistans Takımı (Termovell Flanşlı)',
      description: 'Flanş contası ve sabitleme somunları ile birlikte komple set.',
      unit: 'Takım',
      isWearPart: true,
      status: 'Katalog Bekleniyor'
    },
    {
      id: 'pt-3',
      diagramId: 'diag-sample-01',
      itemNo: 3,
      partCodePlaceholder: '[ŞEMA-REF-0103]',
      partName: 'Döner Yıkama / Durulama Kolu Komple Mekanizması',
      description: 'Paslanmaz nozullar, teflon yatak burçları ve mil montaj parçası.',
      unit: 'Adet',
      isWearPart: false,
      status: 'Katalog Bekleniyor'
    },
    {
      id: 'pt-4',
      diagramId: 'diag-sample-01',
      itemNo: 4,
      partCodePlaceholder: '[ŞEMA-REF-0104]',
      partName: 'Paslanmaz Tank Emiş Filtresi & Kaba Tortu Süzgeci',
      description: 'AISI 304 mikronize gözenekli çıkarılabilir filtre elemanı.',
      unit: 'Adet',
      isWearPart: false,
      status: 'Katalog Bekleniyor'
    },
    {
      id: 'pt-5',
      diagramId: 'diag-sample-01',
      itemNo: 5,
      partCodePlaceholder: '[ŞEMA-REF-0105]',
      partName: 'Drenaj Dirseği & EPDM Esnek Tahliye Hortum Rekoru',
      description: 'Isıya ve deterjana mukavim kelepçeli özel rakor bağlantısı.',
      unit: 'Adet',
      isWearPart: true,
      status: 'Katalog Bekleniyor'
    },
    {
      id: 'pt-6',
      diagramId: 'diag-sample-01',
      itemNo: 6,
      partCodePlaceholder: '[ŞEMA-REF-0106]',
      partName: 'Manuel Resetli Aşırı Sıcaklık Emniyet Termostatı',
      description: 'Kapiler borulu yüksek hassasiyetli güvenlik limit anahtarı.',
      unit: 'Adet',
      isWearPart: false,
      status: 'Katalog Bekleniyor'
    }
  ]
};
