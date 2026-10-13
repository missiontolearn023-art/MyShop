
import { supabase } from "@/lib/supabase";
import { categories as defaultCategories } from "@/data/products";
import type { Product, Category } from "@/data/products";

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  label: string;
  buttonText: string;
  enabled: boolean;
}

export interface ShopData {
  products: Product[];
  banners: Banner[];
  categories: Category[];
}

const SESSION_KEY = "apni_dukaan_admin_session";

export async function getShopData(): Promise<ShopData> {
  const [productsResult, bannersResult] = await Promise.all([
    supabase
      .from("products")
      .select(
        "id, name, price, description, available, unit, image_url, category"
      )
      .order("name"),
    supabase
      .from("banners")
      .select("id, title, subtitle, image, label, button_text, enabled"),
  ]);

  if (productsResult.error) {
    throw new Error(`Products: ${productsResult.error.message}`);
  }

  if (bannersResult.error) {
    throw new Error(`Banners: ${bannersResult.error.message}`);
  }

  const products = (productsResult.data ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    price: Number(item.price),
    description: item.description ?? "",
    available: item.available,
    unit: item.unit ?? "",
    image: item.image_url ?? "",
    category: item.category ?? "",
  })) as Product[];

  const banners: Banner[] = (bannersResult.data ?? []).map((item) => ({
    id: item.id,
    title: item.title ?? "",
    subtitle: item.subtitle ?? "",
    image: item.image ?? "",
    label: item.label ?? "",
    buttonText: item.button_text ?? "",
    enabled: item.enabled ?? true,
  }));

  return {
    products,
    banners,
    categories: [...defaultCategories],
  };
}

export async function saveShopData(data: ShopData): Promise<void> {
  await Promise.all([
    updateProducts(data.products),
    updateBanners(data.banners),
  ]);
}

export async function updateProducts(
  products: Product[]
): Promise<void> {

    
  if (products.length === 0) return;

  const rows = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    // description: product.description ?? "",
    available: product.available,
    unit: product.unit,
    image_url: product.image ?? "",
    category: product.category ?? "",
  }));

  const { error } = await supabase
    .from("products")
    .upsert(rows, { onConflict: "id" });

  if (error) {
    throw new Error(`Saving products: ${error.message}`);
  }
}

export async function updateBanners(
  banners: Banner[]
): Promise<void> {
  if (banners.length === 0) return;

  const rows = banners.map((banner) => ({
    id: banner.id,
    title: banner.title,
    subtitle: banner.subtitle,
    image: banner.image,
    label: banner.label,
    button_text: banner.buttonText,
    enabled: banner.enabled,
  }));

  const { error } = await supabase
    .from("banners")
    .upsert(rows, { onConflict: "id" });

  if (error) {
    throw new Error(`Saving banners: ${error.message}`);
  }
}

// Demo authentication only. Replace with Supabase Auth
// before using this dashboard in production.
export function isAdminLoggedIn(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

export function loginAdmin(
  username: string,
  password: string
): boolean {
  if (username === "admin" && password === "admin123") {
    sessionStorage.setItem(SESSION_KEY, "true");
    return true;
  }

  return false;
}

export function logoutAdmin(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}


export async function fetchBanners(): Promise<Banner[]> {
  const { data, error } = await supabase
    .from("banners")
    .select("id, title, subtitle, image, label, button_text, enabled")
    .order("id");

  if (error) {
    throw new Error(`Banners: ${error.message}`);
  }

  return (data ?? []).map((item) => ({
    id: item.id,
    title: item.title ?? "",
    subtitle: item.subtitle ?? "",
    image: item.image ?? "",
    label: item.label ?? "",
    buttonText: item.button_text ?? "",
    enabled: item.enabled ?? true,
  }));
}