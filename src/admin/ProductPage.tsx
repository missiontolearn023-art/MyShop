import { useMemo, useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { ShopData } from "@/lib/shopData";
import type { Product, Category } from "@/data/products";
import { supabase } from "@/lib/supabase";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Package,
  AlertCircle,
  Save,
  LoaderCircle,
} from "lucide-react";

interface ProductsPageProps {
  data: ShopData;
  onDataChange: (data: ShopData) => void;
}

interface ProductFormData {
  name: string;
  image: string;
  price: string;
  unit: string;
  category: string;
  available: boolean;
}

const emptyForm: ProductFormData = {
  name: "",
  image: "",
  price: "",
  unit: "",
  category: "",
  available: true,
};

function mapProduct(row: any): Product {
  return {
    id: String(row.id),
    name: row.name ?? "",
    image: row.image_url ?? "",
    price: Number(row.price),
    unit: row.unit ?? "",
    category: row.category ?? "",
    available: Boolean(row.available),
    // description: row.description ?? '',
  };
}

export function ProductsPage({ data, onDataChange }: ProductsPageProps) {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(emptyForm);
  const [formError, setFormError] = useState("");
  const [pageError, setPageError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updatingAvailability, setUpdatingAvailability] = useState<
    string | null
  >(null);

  const categories: Category[] = data.categories ?? [];
  const products = data.products ?? [];

  useEffect(() => {
  }, [editingId]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory = filterCategory
        ? product.category === filterCategory
        : true;

      const matchesAvailability =
        filterAvailability === "available"
          ? product.available
          : filterAvailability === "unavailable"
            ? !product.available
            : true;

      return matchesSearch && matchesCategory && matchesAvailability;
    });
  }, [products, search, filterCategory, filterAvailability]);

  const getCategoryName = (categoryId: string) =>
    categories.find((category) => category.id === categoryId)?.name ??
    categoryId;

  const openAddForm = () => {
    setEditingId(null);
    setFormData({
      ...emptyForm,
      category: categories[0]?.id ?? "",
    });
    setFormError("");
    setPageError("");
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {

    setEditingId(product.id);

    setFormData({
      name: product.name ?? "",
      image: product.image ?? "",
      price: String(product.price ?? ""),
      unit: product.unit ?? "",
      category: product.category ?? "",
      available: product.available ?? true,
    });
    setFormError("");
    setPageError("");
    setShowForm(true);
  };

  const closeForm = () => {
    if (saving) return;
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
    setFormError("");
  };

  const validateAndSave = async (event?: FormEvent) => {
    event?.preventDefault();
    setFormError("");

    if (!formData.name.trim()) {
      setFormError("Product name is required.");
      return;
    }

    if (!formData.image.trim()) {
      setFormError("Product image URL is required.");
      return;
    }

    try {
      const imageUrl = new URL(formData.image.trim());

      if (!["http:", "https:"].includes(imageUrl.protocol)) {
        setFormError("Please enter a valid HTTP or HTTPS image URL.");
        return;
      }
    } catch {
      setFormError("Please enter a valid image URL.");
      return;
    }

    const price = Number(formData.price);

    if (formData.price.trim() === "" || !Number.isFinite(price) || price < 0) {
      setFormError("Price must be a valid non-negative number.");
      return;
    }

    if (!formData.unit.trim()) {
      setFormError("Unit is required, for example 500 g or 1 kg.");
      return;
    }

    if (!formData.category) {
      setFormError("Please select a category.");
      return;
    }

    setSaving(true);
    setPageError("");

    try {
      const payload = {
        name: formData.name.trim(),
        image_url: formData.image.trim(),
        price,
        unit: formData.unit.trim(),
        category: formData.category,
        available: formData.available,
      };

      if (editingId) {
       

        const { data: savedRow, error } = await supabase
          .from("products")
          .update({
            id: editingId,
            ...payload,
          })
          .eq("id", editingId)
          .select()
          .single();

        if (error) throw error;


        const savedProduct = mapProduct(savedRow);

        onDataChange({
          ...data,
          products: products.map((product) =>
            product.id === editingId ? savedProduct : product,
          ),
        });
      } else {
        // Let Supabase generate the new product ID.
        const { data: savedRow, error } = await supabase
          .from("products")
          .insert(payload)
          .select()
          .single();

        if (error) throw error;

        const newProduct = mapProduct(savedRow);

        onDataChange({
          ...data,
          products: [...products, newProduct],
        });
      }

      setShowForm(false);
      setEditingId(null);
      setFormData(emptyForm);
      setFormError("");
    } catch (error) {
      console.error("Failed to save product:", error);
      setFormError(
        error instanceof Error
          ? `Could not save product: ${error.message}`
          : "Could not save the product. Check your Supabase permissions.",
      );
    } finally {
      setSaving(false);
    }
  };
  const toggleAvailability = async (product: Product) => {
    if (updatingAvailability) return;
    
    setUpdatingAvailability(product.id);

    
    setPageError("");

    try {
      const nextAvailable = !product.available;

      const { data: savedRow, error } = await supabase
        .from("products")
        .update({ available: nextAvailable })
        .eq("id", product.id)
        .select("id, available")
        .single();

      if (error) throw error;


      onDataChange({
        ...data,
        products: products.map((item) =>
          item.id === product.id
            ? { ...item, available: savedRow.available }
            : item,
        ),
      });
    } catch (error) {
      console.error("Failed to update availability:", error);

      setPageError(
        error instanceof Error
          ? `Could not update availability: ${error.message}`
          : "Could not update product availability.",
      );
    } finally {
      setUpdatingAvailability(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget || deleting) return;

    setDeleting(true);
    setPageError("");

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", deleteTarget.id);

      if (error) throw error;

      onDataChange({
        ...data,
        products: products.filter((product) => product.id !== deleteTarget.id),
      });

      setDeleteTarget(null);
    } catch (error) {
      console.error("Failed to delete product:", error);
      setPageError(
        error instanceof Error
          ? `Could not delete product: ${error.message}`
          : "Could not delete the product. Check your Supabase permissions.",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Product Management
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">
            {products.length} products total
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      {/* Error message */}
      {pageError && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{pageError}</span>
          <button
            className="ml-auto"
            onClick={() => setPageError("")}
            aria-label="Dismiss error"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="mb-4 rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={filterCategory}
              onChange={(event) => setFilterCategory(event.target.value)}
              className="min-w-0 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={filterAvailability}
              onChange={(event) => setFilterAvailability(event.target.value)}
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">All Statuses</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {[
                "Product",
                "Category",
                "Price",
                "Unit",
                "Status",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 ${
                    heading === "Actions" ? "text-right" : ""
                  }`}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center">
                  <Package className="mx-auto mb-2 h-10 w-10 text-gray-300" />
                  <p className="text-sm text-gray-400">No products found</p>
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 shrink-0 rounded-lg bg-gray-100 object-cover"
                      />
                      <span className="text-sm font-medium text-gray-800">
                        {product.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-600">
                    {getCategoryName(product.category)}
                  </td>

                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                    ₹{product.price}
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-600">
                    {product.unit}
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() =>{
                    
                        
                         toggleAvailability(product)}}
                      disabled={updatingAvailability !== null}
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold transition-all disabled:opacity-50 ${
                        product.available
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                    >
                      {updatingAvailability === product.id ? (
                        <LoaderCircle className="h-3 w-3 animate-spin" />
                      ) : product.available ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                      {product.available ? "Available" : "Unavailable"}
                    </button>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEditForm(product)}
                        title="Edit product"
                        className="rounded-lg p-1.5 text-gray-500 transition-all hover:bg-gray-100 hover:text-emerald-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(product)}
                        title="Delete product"
                        className="rounded-lg p-1.5 text-gray-500 transition-all hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile product cards */}
      <div className="space-y-3 md:hidden">
        {filteredProducts.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white py-12 text-center">
            <Package className="mx-auto mb-2 h-10 w-10 text-gray-300" />
            <p className="text-sm text-gray-400">No products found</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-14 w-14 shrink-0 rounded-lg bg-gray-100 object-cover"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-800">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500">
                  {getCategoryName(product.category)} · {product.unit}
                </p>
                <p className="mt-1 text-sm font-bold text-gray-800">
                  ₹{product.price}
                </p>
                <button
                  onClick={() =>{        
                                
                    toggleAvailability(product)}
                  }
                  disabled={updatingAvailability !== null}
                  className={`mt-1 rounded-full px-2 py-0.5 text-xs font-semibold disabled:opacity-50 ${
                    product.available
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {updatingAvailability === product.id
                    ? "Updating..."
                    : product.available
                      ? "Available"
                      : "Unavailable"}
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <button
                  onClick={() => openEditForm(product)}
                  title="Edit product"
                  className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteTarget(product)}
                  title="Delete product"
                  className="rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit product modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close product form"
            className="absolute inset-0 bg-black/40"
            onClick={closeForm}
          />

          <form
            onSubmit={validateAndSave}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl"
          >
            <div className="sticky top-0 flex items-center justify-between rounded-t-2xl border-b border-gray-200 bg-white px-5 py-4">
              <h3 className="text-base font-bold text-gray-800">
                {editingId ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 p-5">
              {formData.image && (
                <div className="flex justify-center">
                  <img
                    src={formData.image}
                    alt="Product preview"
                    className="h-24 w-24 rounded-xl border border-gray-200 bg-gray-100 object-cover"
                    onError={(event) => {
                      event.currentTarget.style.visibility = "hidden";
                    }}
                    onLoad={(event) => {
                      event.currentTarget.style.visibility = "visible";
                    }}
                  />
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Product Name *
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData({ ...formData, name: event.target.value })
                  }
                  placeholder="e.g. Good Day Cashew"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Image URL *
                </label>
                <input
                  required
                  type="url"
                  value={formData.image}
                  onChange={(event) =>
                    setFormData({ ...formData, image: event.target.value })
                  }
                  placeholder="https://..."
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Price (₹) *
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(event) =>
                      setFormData({ ...formData, price: event.target.value })
                    }
                    placeholder="30"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Unit *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.unit}
                    onChange={(event) =>
                      setFormData({ ...formData, unit: event.target.value })
                    }
                    placeholder="500 g"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(event) =>
                    setFormData({ ...formData, category: event.target.value })
                  }
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  role="switch"
                  aria-checked={formData.available}
                  onClick={() =>{
                    
                    setFormData({
                      ...formData,
                      available: !formData.available,
                    })
                    }
                    
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.available ? "bg-emerald-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                      formData.available ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-700">
                  {formData.available ? "Available" : "Unavailable"}
                </span>
              </div>

              {formError && (
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 flex gap-3 rounded-b-2xl border-t border-gray-200 bg-white px-5 py-4">
              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-200 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-emerald-700 disabled:opacity-50"
              >
                {saving ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Product"
                    : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close delete confirmation"
            className="absolute inset-0 bg-black/40"
            onClick={() => {
              if (!deleting) setDeleteTarget(null);
            }}
          />

          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-3 flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-600" />
              <h3 className="text-base font-bold text-gray-800">
                Delete Product?
              </h3>
            </div>

            <p className="mb-5 text-sm text-gray-500">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-700">
                {deleteTarget.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting && <LoaderCircle className="h-4 w-4 animate-spin" />}
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
