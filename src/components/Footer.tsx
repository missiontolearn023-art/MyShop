import { ShoppingBag, Phone, MessageCircle, MapPin, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { shopConfig, phoneCallLink, whatsappChatLink } from '../data/shopConfig';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-5">
          {/* Shop identity */}
          <div>
            <h3 className="text-sm font-bold text-emerald-700 flex items-center gap-1.5 mb-2">
              <ShoppingBag className="w-4 h-4" />
            Apni Dukaan
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Fresh & Quality Products
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
              Quick Links
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/" className="text-sm text-gray-500 hover:text-emerald-600 flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-500 hover:text-emerald-600 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
              Contact
            </h4>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-1.5 text-sm text-gray-500">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                <span>{shopConfig.address}</span>
              </li>
              <li>
                <a href={phoneCallLink} className="text-sm text-gray-500 hover:text-emerald-600 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  {shopConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappChatLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-emerald-600 flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <p className="text-center text-xs text-gray-400">
          Apni Dukaan — Fresh & Quality Products
          </p>
        </div>
      </div>
    </footer>
  );
}
