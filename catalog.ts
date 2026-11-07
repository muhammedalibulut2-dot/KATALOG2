export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: 'technician' | 'service_manager' | 'admin';
  badgeNumber: string;
  branch: string;
  lastLogin?: string;
}

export interface Brand {
  id: string;
  slug: 'atalay' | 'empero' | 'oztiryakiler';
  name: string;
  tagline: string;
  established: string;
  origin: string;
  accentColor: string;
  badge: string;
  description: string;
  sourceUrl: string;
  sourceType: 'Google Drive' | 'Resmi Portal';
  deviceCount: number;
  diagramCount: number;
}

export interface Category {
  id: string;
  brandSlug: string;
  name: string;
  iconName: string;
  itemCount: number;
}

export interface DeviceModel {
  id: string;
  brandSlug: 'atalay' | 'empero' | 'oztiryakiler';
  categoryId: string;
  categoryName: string;
  modelCode: string;
  modelName: string;
  series: string;
  energyType: 'Elektrik' | 'Gaz' | 'Hibrit' | 'Statik';
  yearRange: string;
  diagramsCount: number;
  specsSummary: string[];
  coverImage?: string;
}

export interface DiagramHotspot {
  id: string;
  itemNo: number; // Pozisyon no (1, 2, 3...)
  x: number; // 0-100%
  y: number; // 0-100%
  label?: string;
}

export interface PartItem {
  id: string;
  diagramId: string;
  itemNo: number; // Patlatılmış resimdeki sıra no
  partCodePlaceholder: string; // Gerçek kod yerine şematik referans alanı
  partName: string;
  description: string;
  unit: string;
  isWearPart: boolean; // Aşınma / sarf parça mı
  status: 'Katalog Bekleniyor' | 'Doğrulanmış' | 'Revizyonda';
}

export interface ExplodedDiagram {
  id: string;
  deviceId: string;
  sheetNo: string;
  title: string;
  imageUrl: string;
  pdfManualUrl?: string;
  totalParts: number;
  hotspots: DiagramHotspot[];
  parts: PartItem[];
}
