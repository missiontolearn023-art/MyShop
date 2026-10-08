// =============================================================
//  SHOP & OWNER DETAILS — Edit everything here
// =============================================================

export const shopConfig = {
  // Owner details
  ownerName: 'Sahil Gupta',
  ownerPhoto: 'https://i.ibb.co/rfy7ZRYy/Chat-GPT-Image-Oct-8-2026-01-30-06-AM.png" alt="Chat-GPT-Image-Oct-8-2026-01-30-06-AM',

  // Shop introduction (short paragraph shown on About page)
  about: 'Welcome to our grocery shop. We have been serving the community with fresh groceries, daily essentials, and quality products at fair prices for many years. Your trust is our priority.',

  // Full shop address
  address: 'Gadra ,College Road,Jamshedpur,Jharkhand',

  // Phone number (with country code for the Call link, e.g. +919122468465)
  phone: '+919122468465',

  // WhatsApp number (with country code, no + or spaces, e.g. 919122468465)
  whatsapp: '919122468465',

  // Google Maps embed URL (the src= portion from Google Maps > Share > Embed a map)
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=YOUR_EMBED_URL_HERE',

  // Google Maps directions link (Google Maps > Share > Copy link)
  mapsUrl: 'https://maps.google.com/?q=Your+Shop+Address',
};

// Derived helper values
export const phoneDigits = shopConfig.phone.replace(/[^0-9]/g, '');
export const phoneCallLink = `tel:${shopConfig.phone}`;
export const whatsappChatLink = `https://wa.me/${shopConfig.whatsapp}`;
export const directionsLink = shopConfig.mapsUrl;
