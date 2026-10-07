import { WHATSAPP_NUMBER } from '@/data/products';
import type { CartItem } from '@/hooks/useCart';

export function buildWhatsAppMessage(items: CartItem[], total: number): string {
  const lines = items.map(
    (item, idx) =>
      `${idx + 1}. ${item.name} (${item.unit})\n   Qty: ${item.quantity} x Rs.${item.price} = Rs.${item.quantity * item.price}`
  );

  return (
    `*New Order*\n\n` +
    `${lines.join('\n\n')}\n\n` +
    `*Total Amount: Rs.${total}*\n\n` +
    `Please confirm my order. Thank you!`
  );
}

export function sendWhatsAppOrder(items: CartItem[], total: number): void {
  const message = buildWhatsAppMessage(items, total);
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
}
