import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/admin/DashboardLayout';
import { OverviewPage } from '@/admin/OverviewPage';
import { ProductsPage } from './ProductPage';
import { BannersPage } from '@/admin/BannersPage';
import { getShopData } from '@/lib/shopData';
import type { ShopData } from '@/lib/shopData';


export function AdminDashboard() {
  const [data, setData] = useState<ShopData | null>(null);
  const navigate = useNavigate();

useEffect(() => {
  let cancelled = false;

  async function loadData() {
    try {
      const shopData = await getShopData();

      if (!cancelled) {
        setData({
          products: shopData.products ?? [],
          banners: shopData.banners ?? [],
          categories: shopData.categories ?? [],
        });
      }
    } catch (error) {
      console.error('Failed to load Supabase data:', error);
    }
  }

  loadData();

  return () => {
    cancelled = true;
  };
}, []);
  if (!data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-3 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route
          index
          element={<OverviewPage data={data} onDataChange={setData} />}
        />
        <Route
          path="products"
          element={<ProductsPage data={data} onDataChange={setData} />}
        />
        <Route
          path="banners"
          element={<BannersPage data={data} onDataChange={setData} />}
        />
      </Routes>
    </DashboardLayout>
  );
}
