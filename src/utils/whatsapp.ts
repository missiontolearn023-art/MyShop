import { WHATSAPP_NUMBER } from '@/data/products';
import type { CartItem } from '@/hooks/useCart';

export function buildWhatsAppMessage(items: CartItem[]): string {
  const lines = items.map(
    (item, idx) =>
      `${idx + 1}. ${item.name} (${item.unit})\n   Qty: ${item.quantity} `
  );

return (
  `*New Order*\n\n` +
  `${lines.join('\n\n')}\n\n` +
  `Please confirm my order. Thank you!`
);

}

export function sendWhatsAppOrder(items: CartItem[]): void {
  const message = buildWhatsAppMessage(items);
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
}
