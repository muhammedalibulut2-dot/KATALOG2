import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, KeyRound, ArrowRight, Wrench, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginScreen: React.FC = () => {
  const { login, isLoading, isSupabaseActive } = useAuth();
  const [email, setEmail] = useState('teknik@cagteknik.com');
  const [password, setPassword] = useState('••••••••');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const success = await login(email, password);
    if (!success) {
      setErrorMsg('Giriş başarısız. Lütfen Çağ Teknik yetkili personel bilgilerinizi kontrol ediniz.');
    }
  };

  const handleQuickDemoLogin = async (roleType: 'technician' | 'manager') => {
    setErrorMsg(null);
    const demoEmail = roleType === 'manager' ? 'yonetici@cagteknik.com' : 'teknik@cagteknik.com';
    await login(demoEmail, 'demo1234');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-forest-950 overflow-hidden text-cream-300">
      
      {/* Arka plan %60 Zümrüt Işıltı Efektleri */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-forest-800/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-action-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* İnce Endüstriyel Izgara Dokusu */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(233,223,203,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        
        {/* Üst Marka Mührü */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center relative mb-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-forest-700 via-forest-800 to-forest-900 p-[2px] shadow-card-dark border border-cream-300/30">
              <div className="w-full h-full bg-forest-900 rounded-2xl flex flex-col items-center justify-center">
                <span className="font-cinzel text-3xl font-black text-cream-100 tracking-widest">ÇT</span>
                <span className="text-[8px] font-mono tracking-widest text-cream-400 uppercase">Teknik</span>
              </div>
            </div>
            <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-forest-950 border border-cream-300/40 text-[10px] font-bold text-cream-200 flex items-center space-x-1 shadow-sm">
              <ShieldCheck className="w-3 h-3 text-cream-300" />
              <span>YETKİLİ AĞ</span>
            </div>
          </div>

          <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold tracking-wider text-gold-gradient">
            ÇAĞ TEKNİK
          </h1>
          <p className="text-xs uppercase tracking-widest text-cream-400/80 mt-1 font-semibold">
            Endüstriyel Yedek Parça Kataloğu
          </p>
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-cream-300/40 to-transparent mx-auto mt-3" />
        </div>

        {/* Giriş Kartı */}
        <div className="gold-glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-card-dark">
          
          <div className="flex items-center justify-between pb-4 border-b border-cream-300/15 mb-6">
            <div className="flex items-center space-x-2">
              <Wrench className="w-4 h-4 text-cream-300" />
              <span className="text-sm font-semibold text-cream-100">Personel Giriş Terminali</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-forest-950 text-cream-300 border border-cream-300/20">
              V1.0 PRO
            </span>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-cream-200 mb-1.5">
                Kurumsal E-Posta / Personel Sicil
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-400/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="teknik@cagteknik.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-forest-950 border border-cream-300/25 focus:border-action-500 focus:ring-1 focus:ring-action-500 text-cream-100 text-sm outline-none transition-all placeholder:text-cream-400/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-cream-200 mb-1.5">
                Güvenlik Parolası
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-400/60" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-forest-950 border border-cream-300/25 focus:border-action-500 focus:ring-1 focus:ring-action-500 text-cream-100 text-sm outline-none transition-all placeholder:text-cream-400/50 font-mono"
                />
              </div>
            </div>

            {/* %10 SADECE TIKLANABİLİR MOR BUTON (#8b5cf6) */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-action-500 hover:bg-action-600 active:bg-action-700 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 text-sm mt-3 shadow-[0_4px_16px_rgba(139,92,246,0.4)] hover:shadow-[0_6px_22px_rgba(139,92,246,0.55)] transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span className="inline-block animate-pulse">Kimlik Doğrulanıyor...</span>
              ) : (
                <>
                  <span>GÜVENLİ GİRİŞ YAP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Hızlı Personel Giriş Seçenekleri - %10 Tıklanabilir Mor Çerçeve/Yazı */}
          <div className="mt-6 pt-5 border-t border-cream-300/15">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] text-cream-400 font-medium flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-action-400" />
                <span>Hızlı Personel Erişimi:</span>
              </span>
              <span className="text-[10px] text-cream-400/70">Doğrudan Test</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('technician')}
                className="px-3 py-2 rounded-xl bg-forest-950 hover:bg-action-500/15 border border-action-500/50 hover:border-action-500 text-[11px] font-semibold text-action-300 hover:text-white transition-all text-center flex flex-col items-center cursor-pointer shadow-sm"
              >
                <span>Saha Teknisyeni</span>
                <span className="text-[9px] text-cream-400/70 font-normal">Katalog Kullanıcısı</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('manager')}
                className="px-3 py-2 rounded-xl bg-forest-950 hover:bg-action-500/15 border border-action-500/50 hover:border-action-500 text-[11px] font-semibold text-action-300 hover:text-white transition-all text-center flex flex-col items-center cursor-pointer shadow-sm"
              >
                <span>Servis Yöneticisi</span>
                <span className="text-[9px] text-cream-400/70 font-normal">Tam Yetkili</span>
              </button>
            </div>
          </div>

          <div className="mt-5 text-center">
            <p className="text-[10px] text-cream-400/60 flex items-center justify-center space-x-1">
              <Lock className="w-3 h-3 text-cream-300/60" />
              <span>Bu sistem yalnızca Çağ Teknik iç ağına ve personeline tahsis edilmiştir.</span>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
