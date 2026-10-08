import { Header } from '@/components/Header';
import { CartDrawer } from '@/components/CartDrawer';
import { shopConfig, phoneCallLink, whatsappChatLink, directionsLink } from '../data/shopConfig';
import { Phone, MessageCircle, MapPin, Navigation, ShoppingBag, ArrowLeft, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AboutPageProps {
  cart: ReturnType<typeof import('@/hooks/useCart').useCart>;
  onCartOpen: () => void;
  cartOpen: boolean;
  onCartClose: () => void;
}

export function AboutPage({ cart, onCartOpen, cartOpen, onCartClose }: AboutPageProps) {
  return (
    <>
      <Header totalItems={cart.totalItems} onCartClick={onCartOpen} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        {/* Owner card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-6">
            {/* Owner photo */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-emerald-100 bg-gray-100 flex items-center justify-center">
                <img
                  src={shopConfig.ownerPhoto}
                  alt={shopConfig.ownerName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Owner info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <User className="w-4 h-4 text-emerald-600" />
                <h1 className="text-xl font-bold text-gray-800">{shopConfig.ownerName}</h1>
              </div>
              <p className="text-sm text-gray-500 mb-3">Shop Owner</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {shopConfig.about}
              </p>
            </div>
          </div>
        </div>

        {/* Contact section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <h2 className="text-base font-bold text-gray-800 mb-4">Contact & Location</h2>

          {/* Address */}
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                Address
              </p>
              <p className="text-sm text-gray-700">{shopConfig.address}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Phone className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                Phone
              </p>
              <p className="text-sm text-gray-700">{shopConfig.phone}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <a
              href={phoneCallLink}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white py-2.5 rounded-xl font-semibold hover:bg-emerald-700 active:scale-95 transition-all text-sm"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>

            <a
              href={whatsappChatLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2.5 rounded-xl font-semibold hover:bg-green-600 active:scale-95 transition-all text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>

            <a
              href={directionsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition-all text-sm"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </a>
          </div>
        </div>

        {/* Google Maps embed */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
          <div className="aspect-video w-full bg-gray-100">
            <iframe
              src={shopConfig.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shop Location"
            />
          </div>
        </div>

        {/* Back to shopping */}
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 active:scale-95 transition-all text-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          Continue Shopping
        </Link>
      </main>

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
