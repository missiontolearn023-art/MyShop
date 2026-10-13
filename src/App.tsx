import { useState } from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { Footer } from '@/components/Footer';
import { useCart } from '@/hooks/useCart';
import { Analytics } from '@vercel/analytics/react';
import { AdminAuthProvider, useAdminAuth } from '@/admin/AdminAuthContext';
import { AdminLoginPage } from '@/admin/AdminLoginPage';
import { AdminDashboard } from '@/admin/AdminDashboard';


function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useCart();





  return ( 
    
<div>
  <Analytics/>
      <AdminAuthProvider>
      <Routes>
        {/* Customer routes */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <HomePage
                cart={cart}
                cartOpen={cartOpen}
                onCartOpen={() => setCartOpen(true)}
                onCartClose={() => setCartOpen(false)}
              />
              <Footer />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <AboutPage
                cart={cart}
                cartOpen={cartOpen}
                onCartOpen={() => setCartOpen(true)}
                onCartClose={() => setCartOpen(false)}
              />
              <Footer />
            </div>
          }
        />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route
          path="/admin/dashboard/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AdminAuthProvider>
</div>
  );
}

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (mounted) {
        setAuthenticated(!error && !!data.session);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (authenticated === null) {
    return <div className="p-6 text-center">Checking login...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}

export default App;