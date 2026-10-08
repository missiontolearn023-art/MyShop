import { Plus, Check, X } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    unit: string;
    available: boolean;
  };
  onAddToCart: () => void;
  inCart: boolean;
}

export function ProductCard({ product, onAddToCart, inCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="relative aspect-square bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-cover ${product.available ? '' : 'grayscale opacity-60'}`}
        />
        <div className="absolute top-2 right-2">
          {product.available ? (
            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full">
              <Check className="w-3 h-3" />
              AVAILABLE
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
              <X className="w-3 h-3" />
              NOT AVAILABLE
            </span>
          )}
        </div>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-gray-800 leading-snug min-h-[2.5rem]">
          {product.name}
        </h3>
        <p className="text-xs text-grat-500 font-medium mt-1">{product.unit}</p>

        <div className="mt-2 flex items-center justify-between gap-2 mt-auto pt-2">
          <span className="text-lg font-bold text-gray-900">
            {/* Rs.{product.price} */}
          </span>

          {product.available ? (
            <button
              onClick={onAddToCart}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                inCart
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              <Plus className="w-4 h-4" />
              {inCart ? 'Added' : 'Add'}
            </button>
          ) : (
            <button
              disabled
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
