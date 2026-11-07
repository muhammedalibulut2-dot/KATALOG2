import { createClient } from '@supabase/supabase-js';

// Güvenli ortam değişkenleri okuması
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

if (!isSupabaseConfigured) {
  console.info(
    '%c[ÇAĞ TEKNİK GÜVENLİK SİSTEMİ]%c Supabase ortam değişkenleri henüz yapılandırılmadı. Sistem yerel güvenli personel moduyla (Local Auth Fallback) çalışmaktadır.',
    'color: #D4AF37; font-weight: bold; background: #0B0E14; padding: 4px 8px; border-radius: 4px; border: 1px solid #D4AF37',
    'color: #94A3B8; padding-left: 8px;'
  );
}

// Supabase İstemcisi: Anonim anahtar ile oluşturulur (Service Role anahtarı frontend'de KULLANILMAZ)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
