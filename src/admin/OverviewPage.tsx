
import { useMemo } from 'react';
import type { ShopData } from '@/lib/shopData';
import {
  Package,
  CheckCircle2,
  XCircle,
  Image,
  TrendingUp,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OverviewPageProps {
  data: ShopData;
  onDataChange: (data: ShopData) => void;
}

export function OverviewPage({ data }: OverviewPageProps) {
  const navigate = useNavigate();

const stats = useMemo(() => {
  const products = data?.products ?? [];
  const banners = data?.banners ?? [];

  const total = products.length;
  const available = products.filter((p) => p.available).length;
  const unavailable = total - available;
  const totalBanners = banners.length;

  return { total, available, unavailable, totalBanners };
}, [data]);


  const cards = [
    {
      label: 'Total Products',
      value: stats.total,
      icon: Package,
      color: 'bg-blue-50 text-blue-600',
      ring: 'ring-blue-100',
    },
    {
      label: 'Available',
      value: stats.available,
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-600',
      ring: 'ring-emerald-100',
    },
    {
      label: 'Unavailable',
      value: stats.unavailable,
      icon: XCircle,
      color: 'bg-red-50 text-red-600',
      ring: 'ring-red-100',
    },
    {
      label: 'Total Banners',
      value: stats.totalBanners,
      icon: Image,
      color: 'bg-amber-50 text-amber-600',
      ring: 'ring-amber-100',
    },
  ];

  return (
    <div>
      {/* Page heading */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Summary of your shop inventory
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 hover:shadow-sm transition-shadow"
            >
              <div
                className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-3`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <p className="text-2xl font-bold text-gray-800">
                {card.value}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {card.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm font-bold text-gray-800">
            Quick Actions
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate('/admin/dashboard/products')}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 text-emerald-700 font-medium text-sm hover:bg-emerald-100 transition-all"
          >
            <Package className="w-4 h-4" />
            Manage Products
          </button>

          <button
            onClick={() => navigate('/admin/dashboard/banners')}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-50 text-amber-700 font-medium text-sm hover:bg-amber-100 transition-all"
          >
            <Image className="w-4 h-4" />
            Manage Banners
          </button>
        </div>
      </div>
    </div>
  );
}
