import {
  Cookie,
  Wheat,
  Soup,
  Droplet,
  Flame,
  SprayCan,
  LayoutGrid,
  type LucideIcon,
} from 'lucide-react';
import { categories } from '@/data/products';

const iconMap: Record<string, LucideIcon> = {
  Cookie,
  Wheat,
  Soup,
  Droplet,
  Flame,
  SprayCan,
};

interface CategoryNavProps {
  activeCategory: string | null;
  onSelect: (categoryId: string | null) => void;
}

export function CategoryNav({ activeCategory, onSelect }: CategoryNavProps) {
  return (
    <nav className="sticky top-[57px] z-30 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
          <button
            onClick={() => onSelect(null)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
              activeCategory === null
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            All
          </button>

          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] ?? LayoutGrid;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
