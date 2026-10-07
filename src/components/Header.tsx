import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  totalItems: number;
  onCartClick: () => void;
}

export function Header({ totalItems, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-bold text-emerald-700 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="hidden sm:inline">Sri Balaji Grocery</span>
          <span className="sm:hidden">Grocery</span>
        </h1>

        <button
          onClick={onCartClick}
          className="relative flex items-center gap-2 bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 active:scale-95 transition-all text-sm font-medium"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
