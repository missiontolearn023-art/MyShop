import { X, Plus, Minus, Trash2, ShoppingBag, Send } from 'lucide-react';
import type { CartItem } from '@/hooks/useCart';
import { sendWhatsAppOrder } from '@/utils/whatsapp';

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  totalPrice: number;
  onClose: () => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

export function CartDrawer({
  open,
  items,
  totalPrice,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
}: CartDrawerProps) {
  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;
    sendWhatsAppOrder(items, totalPrice);
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-xl flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
            Your Cart
            {items.length > 0 && (
              <span className="text-sm font-normal text-gray-500">
                ({items.length})
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
              <ShoppingBag className="w-12 h-12" />
              <p className="text-sm">Your cart is empty</p>
              <p className="text-xs text-gray-300">Add products to get started</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 bg-gray-50 rounded-lg p-2.5"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.unit} — Rs.{item.price}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onDecrease(item.id)}
                      className="w-7 h-7 rounded-md bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:scale-90 transition-all"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-7 text-center text-sm font-semibold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onIncrease(item.id)}
                      className="w-7 h-7 rounded-md bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:scale-90 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line total + remove */}
                  <div className="flex flex-col items-end gap-1 w-16">
                    <span className="text-sm font-bold text-gray-900">
                      Rs.{item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-4 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Total Amount</span>
              <span className="text-xl font-bold text-emerald-700">
                Rs.{totalPrice}
              </span>
            </div>

            <button
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 active:scale-95 transition-all"
            >
              <Send className="w-5 h-5" />
              Send Order on WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
