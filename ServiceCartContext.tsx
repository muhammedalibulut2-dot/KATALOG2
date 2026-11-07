import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceCartItem } from '../services/catalogService';

interface ServiceCartContextType {
  items: ServiceCartItem[];
  addToCart: (item: Omit<ServiceCartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  generateWhatsAppText: () => string;
}

const ServiceCartContext = createContext<ServiceCartContextType | undefined>(undefined);

export const ServiceCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ServiceCartItem[]>(() => {
    const saved = localStorage.getItem('cag_teknik_service_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cag_teknik_service_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (newItem: Omit<ServiceCartItem, 'id'>) => {
    setItems(prev => {
      const existing = prev.find(i => 
        i.deviceModelCode === newItem.deviceModelCode && 
        i.itemNo === newItem.itemNo
      );
      if (existing) {
        return prev.map(i => 
          i.id === existing.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [...prev, { ...newItem, id: 'cart-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4) }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // WhatsApp Servis Talebi Formatlayıcı
  const generateWhatsAppText = () => {
    if (items.length === 0) return '';
    let msg = `*ÇAĞ TEKNİK - YEDEK PARÇA SERVİS TALEBİ*\n`;
    msg += `Tarih: ${new Date().toLocaleDateString('tr-TR')} ${new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}\n\n`;
    
    items.forEach((item, index) => {
      msg += `*${index + 1}. [${item.brandName}] ${item.deviceModelCode}*\n`;
      msg += `  • Poz No: #${item.itemNo}\n`;
      msg += `  • Referans: ${item.partCode}\n`;
      msg += `  • Parça: ${item.partName}\n`;
      msg += `  • Miktar: ${item.quantity} Adet\n\n`;
    });

    msg += `_Çağ Teknik Saha Teknisyeni Otomasyon Sistemi İle Oluşturuldu._`;
    return encodeURIComponent(msg);
  };

  return (
    <ServiceCartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        generateWhatsAppText
      }}
    >
      {children}
    </ServiceCartContext.Provider>
  );
};

export const useServiceCart = () => {
  const context = useContext(ServiceCartContext);
  if (!context) {
    throw new Error('useServiceCart must be used within a ServiceCartProvider');
  }
  return context;
};
