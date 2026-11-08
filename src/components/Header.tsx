import React from 'react';
import { LogOut, Database, UserCheck, HardDriveDownload, ShoppingBag, ShieldCheck } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-forest-900/95 border-b border-cream-300/15 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo ve Kurumsal İsim */}
          <div 
            onClick={onNavigateHome}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            {/* Profesyonel Mühür - 60% Zümrüt & 30% Krem */}
            <div className="w-10 h-10 rounded-xl bg-forest-800 border border-cream-300/30 flex items-center justify-center font-bold text-cream-300 text-sm group-hover:border-action-500 transition-colors">
              ÇT
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-cream-100">
                  ÇAĞ TEKNİK
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold tracking-wide bg-forest-850 text-cream-300 rounded border border-cream-300/20">
                  Katalog
                </span>
              </div>
              <p className="text-[11px] text-cream-400/80">
                Endüstriyel Yedek Parça Portalı
              </p>
            </div>
          </div>

          {/* Sağ Aksiyonlar & Kullanıcı Bilgisi */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            
            {/* Servis Parça Sepeti - %10 TIKLANABİLİR AKSİYON BUTONU (#8b5cf6) */}
            <button
              onClick={onOpenServiceCart}
              className="relative flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-action-500 hover:bg-action-600 text-white shadow-[0_2px_12px_rgba(139,92,246,0.35)] hover:shadow-[0_4px_18px_rgba(139,92,246,0.55)] transition-all active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">Servis Sepeti</span>
              {totalItemsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-cream-100 text-forest-950 font-mono text-[10px] font-extrabold shadow-sm">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Veri Yükleme - Tıklanabilir İkincil Aksiyon Butonu (#8b5cf6 border/hover) */}
            <button
              onClick={onOpenIngestionGuide}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-forest-850 hover:bg-forest-800 text-cream-200 border border-action-500/40 hover:border-action-500 hover:text-white transition-all cursor-pointer"
            >
              <HardDriveDownload className="w-3.5 h-3.5 text-action-400" />
              <span>Veri Yükleme</span>
            </button>

            {/* Supabase Durumu (Pasif Gösterge) */}
            <div 
              className={`hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border ${
                isSupabaseActive 
                  ? 'bg-forest-850 text-cream-200 border-forest-700/60' 
                  : 'bg-forest-950 text-cream-400 border-forest-850'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${isSupabaseActive ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span>{isSupabaseActive ? 'Supabase Bağlı' : 'Güvenli Çevrimdışı'}</span>
            </div>

            {/* Kullanıcı Profili */}
            {user && (
              <div className="flex items-center space-x-2.5 pl-2.5 sm:border-l sm:border-forest-800">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-semibold text-cream-200 leading-tight">
                    {user.fullName}
                  </p>
                  <p className="text-[10px] text-cream-400/70 font-mono">
                    {user.badgeNumber}
                  </p>
                </div>

                <button
                  onClick={logout}
                  className="p-1.5 rounded-xl text-cream-400 hover:text-rose-400 hover:bg-rose-950/30 border border-forest-800 hover:border-rose-800/40 transition-colors cursor-pointer"
                  title="Çıkış Yap"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
