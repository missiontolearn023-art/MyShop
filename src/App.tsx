import { useState } from 'react';
import { Header } from '@/components/Header';
import { CategoryNav } from '@/components/CategoryNav';
import { ProductCard } from '@/components/ProductCard';
import { CartDrawer } from '@/components/CartDrawer';
import { useCart } from '@/hooks/useCart';
import { products, categories } from '@/data/products';
import { Store } from 'lucide-react';

function App() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const cart = useCart();

  const filteredProducts = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  const activeCategoryName = categories.find((c) => c.id === activeCategory)?.name ?? 'All Products';

  const cartIds = new Set(cart.items.map((i) => i.id));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header totalItems={cart.totalItems} onCartClick={() => setCartOpen(true)} />
      <CategoryNav activeCategory={activeCategory} onSelect={setActiveCategory} />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-5">
        <div className="flex items-center gap-2 mb-4">
          <Store className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base font-bold text-gray-800">{activeCategoryName}</h2>
          <span className="text-sm text-gray-400">
            ({filteredProducts.length} items)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              inCart={cartIds.has(product.id)}
              onAddToCart={() =>
                cart.addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  unit: product.unit,
                })
              }
            />
          ))}
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white py-4">
        <p className="text-center text-xs text-gray-400">
          Sri Balaji Grocery — Fresh & Quality Products
        </p>
      </footer>

      <CartDrawer
        open={cartOpen}
        items={cart.items}
        totalPrice={cart.totalPrice}
        onClose={() => setCartOpen(false)}
        onIncrease={cart.increaseQty}
        onDecrease={cart.decreaseQty}
        onRemove={cart.removeItem}
      />
    </div>
  );
}

export default App;
