import { useState, useEffect } from 'react';
import { getShopData } from '@/lib/shopData';
import type { ShopData } from '@/lib/shopData';

export function useShopData(): ShopData | null {
  const [data, setData] = useState<ShopData | null>(null);

  useEffect(() => {
    setData(getShopData());

    const handleStorage = () => setData(getShopData());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return data;
}
