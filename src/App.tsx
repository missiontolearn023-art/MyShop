import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { Footer } from '@/components/Footer';
import { useCart } from '@/hooks/useCart';
import { Analytics } from '@vercel/analytics/react';


function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useCart();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Analytics/>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              cart={cart}
              cartOpen={cartOpen}
              onCartOpen={() => setCartOpen(true)}
              onCartClose={() => setCartOpen(false)}
            />
          }
        />
        <Route
          path="/about"
          element={
            <AboutPage
              cart={cart}
              cartOpen={cartOpen}
              onCartOpen={() => setCartOpen(true)}
              onCartClose={() => setCartOpen(false)}
            />
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
