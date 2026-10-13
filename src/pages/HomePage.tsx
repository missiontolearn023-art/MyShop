// import { useState, useRef } from "react";
// import { Header } from "@/components/Header";
// import { CategoryNav } from "@/components/CategoryNav";
// import { ProductCard } from "@/components/ProductCard";
// import { CartDrawer } from "@/components/CartDrawer";
// import { Banner } from "../components/Banner";
// import { useCart } from "@/hooks/useCart";
// import { products, categories } from "@/data/products";
// import { Store, SearchX, Search, X } from "lucide-react";

// interface HomePageProps {
//   cart: ReturnType<typeof useCart>;
//   onCartOpen: () => void;
//   cartOpen: boolean;
//   onCartClose: () => void;
// }

// export function HomePage({
//   cart,
//   onCartOpen,
//   cartOpen,
//   onCartClose,
// }: HomePageProps) {
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);

//   // SEARCH
//   const [searchQuery, setSearchQuery] = useState("");

//   const productsRef = useRef<HTMLDivElement>(null);

//   // CATEGORY + SEARCH FILTER
//   const filteredProducts = products.filter((p) => {
//     const matchesCategory = activeCategory
//       ? p.category === activeCategory
//       : true;

//     const matchesSearch = searchQuery
//       ? p.name.toLowerCase().includes(searchQuery.toLowerCase())
//       : true;

//     return matchesCategory && matchesSearch;
//   });

//   const activeCategoryName =
//     categories.find((c) => c.id === activeCategory)?.name ?? "All Products";

//   const cartIds = new Set(cart.items.map((i) => i.id));

//   const scrollToProducts = () => {
//     productsRef.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };

//   return (
//     <>
//       <Header
//         totalItems={cart.totalItems}
//         onCartClick={onCartOpen}
//       />

//       {/* Search bar below header */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-6xl mx-auto px-4 py-3">
//           <div className="relative max-w-md mx-auto">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />

//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="सामान खोजें... / Search products"
//               className="w-full pl-9 pr-8 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//             />

//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery("")}
//                 className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-5 overflow-x-auto">

//         {/* Banner */}
//         <div className="w-full overflow-hidden">
//           <div className="banner-track">
//             <div className="banner-group">
//               <Banner
//                 onShopClick={scrollToProducts}
//                 title="घर की हर ज़रूरत, एक ही जगह"
//                 subtitle="रोज़मर्रा का सामान आसानी से खरीदें"
//                 label="आज की खरीदारी"
//                 buttonText="अभी खरीदें"
//                 imageUrl="https://images.pexels.com/photos/16723207/pexels-photo-16723207.jpeg?auto=compress&cs=tinysrgb&w=1200"
//               />

//               <Banner
//                 onShopClick={scrollToProducts}
//                 subtitle="WhatsApp पर मैसेज करें और सामान मंगाएँ"
//                 label="Order now"
//                 buttonText="WhatsApp करें"
//                 imageUrl="https://images.pexels.com/photos/8939510/pexels-photo-8939510.jpeg?auto=compress&cs=tinysrgb&w=1200"
//               />

//               <Banner
//                 onShopClick={scrollToProducts}
//                 title="मुफ़्त डिलीवरी 🚚"
//                 subtitle="₹200 से ऊपर की खरीदारी पर घर तक डिलीवरी"
//                 buttonText="अभी खरीदें"
//                 imageUrl="https://i.pinimg.com/736x/19/11/e4/1911e49f17abf9ef92121ad975c2d8be.jpg"
//               />
//             </div>

//             <div className="banner-group" aria-hidden="true">
//               <Banner
//                 onShopClick={scrollToProducts}
//                 title="घर की हर ज़रूरत, एक ही जगह"
//                 subtitle="रोज़मर्रा का सामान आसानी से खरीदें"
//                 label="आज की खरीदारी"
//                 buttonText="अभी खरीदें"
//                 imageUrl=""
//               />

//               <Banner
//                 onShopClick={scrollToProducts}
//                 subtitle="WhatsApp पर मैसेज करें और सामान मंगाएँ"
//                 label="आसान ऑर्डर"
//                 buttonText="WhatsApp करें"
//                 imageUrl="https://images.openai.com/static-rsc-4/ZoLy1TWvymQTWHnz1AZ1qoAqBHVypYcj0gEfOUxXQPUqSpOEmzas_z9PYcebG3kpd8iaxwrXIplLriIzbepGQtNt9Wpq7YHMaCH9l_rHuayBk1lRB-Aq1zmkGjBjcFRvDN3CNaNh3NQQEdvqBxzavQNm1v_cngOYy_jHUzond0FG-aIIXQhuycUy15ofY-pA?purpose=fullsize"
//               />

//               <Banner
//                 onShopClick={scrollToProducts}
//                 title="मुफ़्त डिलीवरी 🚚"
//                 subtitle="₹200 से ऊपर की खरीदारी पर घर तक डिलीवरी"
//                 buttonText="अभी खरीदें"
//                 imageUrl="https://images.pexels.com/photos/8939510/pexels-photo-8939510.jpeg"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Category + Products section */}
//         <div ref={productsRef}>
//           <CategoryNav
//             activeCategory={activeCategory}
//             onSelect={setActiveCategory}
//           />

//           <div className="flex items-center gap-2 mb-4 mt-4">
//             <Store className="w-5 h-5 text-emerald-600" />

//             <h2 className="text-base font-bold text-gray-800">
//               {activeCategoryName}
//             </h2>

//             <span className="text-sm text-gray-400">
//               ({filteredProducts.length} items)
//             </span>
//           </div>

//           {filteredProducts.length > 0 ? (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
//               {filteredProducts.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   inCart={cartIds.has(product.id)}
//                   onAddToCart={() =>
//                     cart.addToCart({
//                       id: product.id,
//                       name: product.name,
//                       unit: product.unit,
//                       price:product.price
//                     })
//                   }
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-3">
//               <SearchX className="w-12 h-12" />

//               <p className="text-lg font-medium text-gray-500">
//                 कोई सामान नहीं मिला
//               </p>

//               <p className="text-sm text-gray-400">
//                 Try a different search or category
//               </p>
//             </div>
//           )}
//         </div>
//       </main>

//       <CartDrawer
//           open={cartOpen}
//         items={cart.items}
//         totalPrice={cart.totalPrice}
//         onClose={onCartClose}
//         onIncrease={cart.increaseQty}
//         onDecrease={cart.decreaseQty}
//         onRemove={cart.removeItem}
//       />
//     </>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { CategoryNav } from "@/components/CategoryNav";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { Banner } from "../components/Banner";
import { useCart } from "@/hooks/useCart";
import { categories } from "@/data/products";
import { Store, SearchX, Search, X } from "lucide-react";
import { fetchProducts, Product } from "@/lib/product";
import { fetchBanners, type Banner as ShopBanner } from "@/lib/shopData";

interface HomePageProps {
  cart: ReturnType<typeof useCart>;
  onCartOpen: () => void;
  cartOpen: boolean;
  onCartClose: () => void;
}

export function HomePage({
  cart,
  onCartOpen,
  cartOpen,
  onCartClose,
}: HomePageProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // SEARCH
  const [searchQuery, setSearchQuery] = useState("");

  // SUPABASE PRODUCTS
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [banners, setBanners] = useState<ShopBanner[]>([]);
const [bannersLoading, setBannersLoading] = useState(true);
const [bannersError, setBannersError] = useState<string | null>(null);

  const productsRef = useRef<HTMLDivElement>(null);

  // Load products from Supabase
  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        setProductsLoading(true);
        setProductsError(null);
        

        const data = await fetchProducts();

        if (!cancelled) {
          setProducts(data);
        }
      } catch (error) {
        if (!cancelled) {
          setProductsError(
            error instanceof Error
              ? error.message
              : "Supabase से सामान लोड नहीं हो पाया",
          );
        }
      } finally {
        if (!cancelled) {
          setProductsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

useEffect(() => {
  let cancelled = false;

  async function loadBanners() {
    try {
      
      setBannersLoading(true);
      setBannersError(null);

      const banners = await fetchBanners();

      if (!cancelled) {
        setBanners(banners.filter((banner) => banner.enabled));
      }
    } catch (error) {
      if (!cancelled) {
        setBannersError(
          error instanceof Error
            ? error.message
            : "बैनर लोड नहीं हो पाए",
        );
      }
    } finally {
      if (!cancelled) {
        setBannersLoading(false);
      }
    }
  }

  void loadBanners();

  return () => {
    cancelled = true;
  };
}, []);

  // CATEGORY + SEARCH FILTER
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory
      ? p.category === activeCategory
      : true;

    const matchesSearch = searchQuery
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  const activeCategoryName =
    categories.find((c) => c.id === activeCategory)?.name ?? "All Products";

  const cartIds = new Set(cart.items.map((i) => i.id));

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <Header totalItems={cart.totalItems} onCartClick={onCartOpen} />

      {/* Search bar below header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="सामान खोजें... / Search products"
              className="w-full pl-9 pr-8 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-5 overflow-x-auto">
        {/* Original Banner design preserved */}
        {/* Banners fetched from Supabase */}
<div className="w-full overflow-hidden">
  <div className="banner-track">
    {bannersLoading ? (
      <div className="w-full py-10 text-center text-sm text-gray-500">
        बैनर लोड हो रहे हैं...
      </div>
    ) : bannersError ? (
      <div className="w-full py-6 text-center text-sm text-red-500">
        {bannersError}
      </div>
    ) : banners.length > 0 ? (
      <>
        <div className="banner-group">
          {banners.map((banner) => (
            <Banner
              key={banner.id}
              title={banner.title}
              subtitle={banner.subtitle}
              label={banner.label}
              buttonText={banner.buttonText}
              imageUrl={banner.image}
              onShopClick={scrollToProducts}
            />
          ))}
        </div>

        {/* Duplicate group for continuous scrolling animation */}
        <div className="banner-group" aria-hidden="true">
          {banners.map((banner) => (
            <Banner
              key={`duplicate-${banner.id}`}
              title={banner.title}
              subtitle={banner.subtitle}
              label={banner.label}
              buttonText={banner.buttonText}
              imageUrl={banner.image}
              onShopClick={scrollToProducts}
            />
          ))}
        </div>
      </>
    ) : (
      <div className="w-full py-10 text-center text-sm text-gray-500">
        अभी कोई ऑफर उपलब्ध नहीं है।
      </div>
    )}
  </div>
</div>
       

        {/* Original Category + Products section */}
        <div ref={productsRef}>
          <CategoryNav
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />

          <div className="flex items-center gap-2 mb-4 mt-4">
            <Store className="w-5 h-5 text-emerald-600" />

            <h2 className="text-base font-bold text-gray-800">
              {activeCategoryName}
            </h2>

            <span className="text-sm text-gray-400">
              ({productsLoading ? "..." : filteredProducts.length} items)
            </span>
          </div>

          {productsLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-3">
              <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm">सामान लोड हो रहा है...</p>
            </div>
          ) : productsError ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-3">
              <SearchX className="w-12 h-12" />
              <p className="text-lg font-medium text-gray-500">
                सामान लोड नहीं हो पाया
              </p>
              <p className="text-sm text-red-500 text-center break-words">
                {productsError}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="text-sm text-emerald-600 hover:underline"
              >
                फिर से कोशिश करें
              </button>
            </div>
          ) : filteredProducts.length > 0 ? (
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
                      unit: product.unit,
                      price: product.price,
                    })
                  }
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-3">
              <SearchX className="w-12 h-12" />

              <p className="text-lg font-medium text-gray-500">
                कोई सामान नहीं मिला
              </p>

              <p className="text-sm text-gray-400">
                Try a different search or category
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Your CartDrawer props preserved */}
      <CartDrawer
        open={cartOpen}
        items={cart.items}
        totalPrice={cart.totalPrice}
        onClose={onCartClose}
        onIncrease={cart.increaseQty}
        onDecrease={cart.decreaseQty}
        onRemove={cart.removeItem}
      />
    </>
  );
}

