import { supabase } from "@/lib/supabase";

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  unit: string;
  category: string;
  available: boolean;
  description?: string | null;
};

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, price, description, available, unit, image_url, category"
    )
    .order("name");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image_url ?? "",
    price: Number(item.price),
    unit: item.unit ?? "",
    category: item.category ?? "",
    available: item.available,
    description: item.description,
  }));
}