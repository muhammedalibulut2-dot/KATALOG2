import { Brand, DeviceModel, Category, ExplodedDiagram, PartItem, DiagramHotspot } from '../types/catalog';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { BRANDS, CATEGORIES, DEVICE_MODELS, SAMPLE_DIAGRAM } from '../data/mockCatalogData';

// Servis Sepeti / Talep Öğesi
export interface ServiceCartItem {
  id: string;
  deviceModelCode: string;
  deviceModelName: string;
  brandName: string;
  diagramSheetNo: string;
  itemNo: number;
  partCode: string;
  partName: string;
  quantity: number;
  notes?: string;
}

class CatalogService {
  private localDevices: DeviceModel[] = [...DEVICE_MODELS];
  private localDiagrams: ExplodedDiagram[] = [SAMPLE_DIAGRAM];

  // Markaları Getir
  async getBrands(): Promise<Brand[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('brands')
          .select('*')
          .eq('is_active', true);
        if (!error && data && data.length > 0) {
          return data as unknown as Brand[];
        }
      } catch (e) {
        console.warn('Supabase marka okuma hatası, yerel veriye dönüldü:', e);
      }
    }
    return BRANDS;
  }

  // Kategorileri Getir
  async getCategories(brandSlug?: string): Promise<Category[]> {
    if (brandSlug) {
      return CATEGORIES.filter(c => c.brandSlug === brandSlug);
    }
    return CATEGORIES;
  }

  // Cihazları Getir
  async getDevices(brandSlug?: string, categoryId?: string): Promise<DeviceModel[]> {
    let result = this.localDevices;
    if (brandSlug) {
      result = result.filter(d => d.brandSlug === brandSlug);
    }
    if (categoryId && categoryId !== 'all') {
      result = result.filter(d => d.categoryId === categoryId);
    }
    return result;
  }

  // Cihaza ait Şemaları Getir
  async getDiagramForDevice(deviceId: string): Promise<ExplodedDiagram | null> {
    const found = this.localDiagrams.find(d => d.deviceId === deviceId);
    if (found) return found;
    // Varsayılan olarak örnek şemayı o cihaza bağlayarak döndür
    return {
      ...SAMPLE_DIAGRAM,
      deviceId: deviceId,
      sheetNo: 'ŞEMA-01/01',
      title: 'Genel Montaj ve Yedek Parça Patlatılmış Şeması'
    };
  }

  // Yeni Hotspot (Pin) Ekleme / Güncelleme (Görsel Editör İçin)
  async addHotspotToDiagram(diagramId: string, hotspot: Omit<DiagramHotspot, 'id'>, partInfo?: Partial<PartItem>): Promise<ExplodedDiagram> {
    const diag = this.localDiagrams.find(d => d.id === diagramId) || SAMPLE_DIAGRAM;
    const newHotspot: DiagramHotspot = {
      ...hotspot,
      id: 'hs-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
    };

    diag.hotspots = [...diag.hotspots, newHotspot];

    if (partInfo && partInfo.partName) {
      const newPart: PartItem = {
        id: 'pt-' + Date.now(),
        diagramId: diag.id,
        itemNo: hotspot.itemNo,
        partCodePlaceholder: partInfo.partCodePlaceholder || `[ŞEMA-REF-${String(hotspot.itemNo).padStart(2, '0')}]`,
        partName: partInfo.partName,
        description: partInfo.description || 'Teknisyen tarafından eklenen parça tanımı.',
        unit: partInfo.unit || 'Adet',
        isWearPart: Boolean(partInfo.isWearPart),
        status: 'Katalog Bekleniyor'
      };
      diag.parts = [...diag.parts, newPart];
    }

    // Supabase bağlantısı aktifse buluta da yaz
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('diagram_hotspots').insert({
          diagram_id: diagramId,
          item_no: hotspot.itemNo,
          x_percent: hotspot.x,
          y_percent: hotspot.y,
          pin_label: hotspot.label
        });
      } catch (err) {
        console.warn('Supabase hotspot kayıt uyarısı:', err);
      }
    }

    return { ...diag };
  }

  // Yeni Cihaz Modeli Ekle (Admin Paneli İçin)
  async createDevice(newDevice: Omit<DeviceModel, 'id'>): Promise<DeviceModel> {
    const created: DeviceModel = {
      ...newDevice,
      id: 'dev-' + Date.now()
    };
    this.localDevices.push(created);
    return created;
  }
}

export const catalogService = new CatalogService();
