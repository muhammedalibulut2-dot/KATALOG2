import React from 'react';
import { ShieldCheck, LogOut, Database, UserCheck, HardDriveDownload, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useServiceCart } from '../context/ServiceCartContext';

interface HeaderProps {
  onOpenIngestionGuide?: () => void;
  onNavigateHome?: () => void;
  onOpenServiceCart?: () => void;
  currentBrand?: string | null;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenIngestionGuide, 
  onNavigateHome,
  onOpenServiceCart,
  currentBrand 
}) => {
  const { user, logout, isSupabaseActive } = useAuth();
  const { totalItemsCount } = useServiceCart();

  return (
    <header className="sticky top-0 z-40 bg-dark-950/90 backdrop-blur-md border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo ve Kurumsal İsim */}
          <div 
            onClick={onNavigateHome}
            className="flex items-center space-x-4 cursor-pointer group select-none"
          >
            {/* Altın Mühür İkonu */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-gold-500/10 rounded-xl border border-gold-500/40 rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
              <div className="absolute inset-0 bg-dark-900 rounded-xl border border-gold-500/60 flex items-center justify-center shadow-gold-glow">
                <span className="font-cinzel text-lg font-black text-gold-500 tracking-wider">ÇT</span>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-cinzel text-xl sm:text-2xl font-black tracking-widest text-gold-gradient">
                  ÇAĞ TEKNİK
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-gold-500/10 text-gold-400 border border-gold-500/30 rounded">
                  Pro Katalog
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium tracking-wide">
                Endüstriyel Mutfak Yedek Parça & Şema Sistemi
              </p>
            </div>
          </div>

          {/* Aktif Navigasyon İpuçları & Kullanıcı Bilgisi */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Servis Parça Talebi / Sepet Butonu */}
            <button
              onClick={onOpenServiceCart}
              className="relative flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold bg-gold-500/15 hover:bg-gold-500/25 text-gold-300 border border-gold-500/40 transition-all shadow-sm"
              title="Seçilen Parçaları ve Servis Talebini Görüntüle"
            >
              <ShoppingBag className="w-4 h-4 text-gold-400" />
              <span className="hidden sm:inline">Servis Sepeti</span>
              {totalItemsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-gold-500 text-dark-950 font-mono text-[10px] font-black flex items-center justify-center shadow-gold-glow animate-pulse">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Veri Entegrasyon Kılavuzu Butonu */}
            <button
              onClick={onOpenIngestionGuide}
              className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold bg-dark-850 hover:bg-dark-800 text-gold-300 border border-gold-500/30 transition-all hover:border-gold-500/60 shadow-sm"
              title="Google Drive & Empero Katalog Aktarım Mimarisi"
            >
              <HardDriveDownload className="w-3.5 h-3.5 text-gold-400" />
              <span>Veri Yükleme</span>
            </button>

            {/* Supabase Bağlantı Rozeti */}
            <div 
              className={`hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                isSupabaseActive 
                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30' 
                  : 'bg-amber-950/40 text-amber-300 border-amber-500/30'
              }`}
              title={isSupabaseActive ? 'Supabase Bulut Veritabanı Aktif' : 'Yerel Personel Güvenli Oturum Modu Aktif'}
            >
              <Database className="w-3 h-3 text-gold-400" />
              <span>{isSupabaseActive ? 'Supabase Bağlı' : 'Güvenli Mod'}</span>
            </div>

            {/* Kullanıcı Profili */}
            {user && (
              <div className="flex items-center space-x-3 pl-3 sm:border-l sm:border-slate-800">
                <div className="hidden sm:block text-right">
                  <div className="flex items-center justify-end space-x-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-gold-400" />
                    <span className="text-xs font-semibold text-slate-200">
                      {user.fullName}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Sicil: {user.badgeNumber}
                  </span>
                </div>

                {/* Çıkış Butonu */}
                <button
                  onClick={logout}
                  className="p-2 sm:px-3 sm:py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-rose-400 hover:bg-rose-950/30 border border-slate-800 hover:border-rose-900/50 transition-all flex items-center space-x-1.5"
                  title="Güvenli Çıkış Yap"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Çıkış</span>
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
