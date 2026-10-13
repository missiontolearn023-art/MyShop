import { Plus, Check, X } from "lucide-react";

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

export function ProductCard({
  product,
  onAddToCart,
  inCart,
}: ProductCardProps) {
  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md">
      <div className="relative aspect-square bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`h-full w-full object-cover ${
            product.available ? "" : "grayscale opacity-60"
          }`}
        />

        <div className="absolute right-1.5 top-1.5 max-w-[calc(100%-12px)]">
          {product.available ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-1.5 py-1 text-[10px] font-semibold leading-tight text-emerald-700 sm:px-2 sm:text-xs">
              <Check className="h-3 w-3 shrink-0" />
              AVAILABLE
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-1.5 py-1 text-[10px] font-semibold leading-tight text-red-700 sm:px-2 sm:text-xs">
              <X className="h-3 w-3 shrink-0" />
              NOT AVAILABLE
            </span>
          )}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-2 sm:p-3">
        <h3 className="min-h-[2.5rem] break-words text-sm font-semibold leading-snug text-gray-800">
          {product.name}
        </h3>

        <p className="mt-1 break-words text-xs font-medium text-gray-500">
          {product.unit}
        </p>

        <div className="mt-auto flex min-w-0 flex-nowrap items-center justify-between gap-1 pt-3">
          <span className="min-w-0 truncate text-sm font-bold text-gray-900 sm:text-lg">
            Rs. {product.price}
          </span>

          {product.available ? (
            <button
              onClick={onAddToCart}
              className={`inline-flex shrink-0 items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-all active:scale-95 sm:px-3 sm:text-sm ${
                inCart
                  ? "border border-emerald-300 bg-emerald-100 text-emerald-700"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              <Plus className="h-4 w-4" />
              {inCart ? "Added" : "Add"}
            </button>
          ) : (
            <button
              disabled
              className="inline-flex shrink-0 cursor-not-allowed items-center justify-center gap-1 rounded-lg bg-gray-100 px-2 py-1.5 text-xs font-medium text-gray-400 sm:px-3 sm:text-sm"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
