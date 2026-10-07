declare module '@/data/products' {
  export const WHATSAPP_NUMBER: string;

  export interface Category {
    id: string;
    name: string;
    icon: string;
  }

  export interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
    unit: string;
    category: string;
    available: boolean;
  }

  export const categories: Category[];
  export const products: Product[];
}
