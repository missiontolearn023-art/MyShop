import { useState, useCallback, useMemo } from 'react';

export interface CartItem {
  id: string;
  name: string;
  unit: string;
  quantity: number;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback(
    (product: { id: string; name: string; unit: string }) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === product.id);

        if (existing) {
          return prev.map((i) =>
            i.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }

        return [...prev, { ...product, quantity: 1 }];
      });
    },
    []
  );

  const increaseQty = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  }, []);

  const decreaseQty = useCallback((id: string) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  return {
    items,
    addToCart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
    totalItems,
  };
}