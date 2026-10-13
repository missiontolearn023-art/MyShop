import { useState } from 'react';
import type { ShopData } from '@/lib/shopData';
import { updateBanners, generateId } from '@/lib/shopData';
import type { Banner } from '@/lib/shopData';
import {
  Plus, Pencil, Trash2, X, Image as ImageIcon, AlertCircle, Save, Eye, Sparkles,
} from 'lucide-react';

interface BannersPageProps {
  data: ShopData;
  onDataChange: (data: ShopData) => void;
}

interface BannerFormData {
  title: string;
  subtitle: string;
  image: string;
  label: string;
  buttonText: string;
  enabled: boolean;
}

const emptyForm: BannerFormData = {
  title: '',
  subtitle: '',
  image: '',
  label: '',
  buttonText: '',
  enabled: true,
};

export function BannersPage({ data, onDataChange }: BannersPageProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<BannerFormData>(emptyForm);
  const [formError, setFormError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Banner | null>(null);

  const openAddForm = () => {
    setEditingId(null);
    setFormData({ ...emptyForm });
    setFormError('');
    setShowForm(true);
  };

  const openEditForm = (banner: Banner) => {
    setEditingId(banner.id);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      image: banner.image,
      label: banner.label,
      buttonText: banner.buttonText,
      enabled: banner.enabled,
    });
    setFormError('');
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
    setFormError('');
  };

 const validateAndSave = async () => {
  setFormError("");

  if (!formData.title.trim()) {
    setFormError("Banner title is required.");
    return;
  }

  if (!formData.image.trim()) {
    setFormError("Banner image URL is required.");
    return;
  }

  if (!formData.buttonText.trim()) {
    setFormError("Button text is required.");
    return;
  }

  let updated: Banner[];

  if (editingId) {
    updated = data.banners.map((b) =>
      b.id === editingId
        ? {
            ...b,
            title: formData.title.trim(),
            subtitle: formData.subtitle.trim(),
            image: formData.image.trim(),
            label: formData.label.trim(),
            buttonText: formData.buttonText.trim(),
            enabled: formData.enabled,
          }
        : b
    );
  } else {
    const newBanner: Banner = {
      id: generateId("banner"),
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim(),
      image: formData.image.trim(),
      label: formData.label.trim(),
      buttonText: formData.buttonText.trim(),
      enabled: formData.enabled,
    };

    updated = [...data.banners, newBanner];
  }

  try {
    await updateBanners(updated);
    onDataChange({ ...data, banners: updated });
    closeForm();
  } catch (error) {
    setFormError(
      error instanceof Error
        ? error.message
        : "Failed to save banner."
    );
  }
};

const toggleEnabled = async (banner: Banner) => {
  const updated = data.banners.map((b) =>
    b.id === banner.id
      ? { ...b, enabled: !b.enabled }
      : b
  );

  try {
    await updateBanners(updated);
    onDataChange({ ...data, banners: updated });
  } catch (error) {
    setFormError(
      error instanceof Error
        ? error.message
        : "Failed to update banner."
    );
  }
};
 const handleDelete = async () => {
  if (!deleteTarget) return;

  const updated = data.banners.filter(
    (b) => b.id !== deleteTarget.id
  );

  try {
    await updateBanners(updated);
    onDataChange({ ...data, banners: updated });
    setDeleteTarget(null);
  } catch (error) {
    setFormError(
      error instanceof Error
        ? error.message
        : "Failed to delete banner."
    );
  }
};

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Banner Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">{data.banners.length} banners total</p>
        </div>
        <button
          onClick={openAddForm}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Banner
        </button>
      </div>

      {/* Banners list */}
      {data.banners.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 text-center py-12">
          <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-400">No banners yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data.banners.map((banner) => (
            <div
              key={banner.id}
              className={`bg-white rounded-xl border overflow-hidden ${
                banner.enabled ? 'border-gray-200' : 'border-gray-200 opacity-60'
              }`}
            >
              {/* Banner preview */}
              <div className="relative h-40 bg-gray-100">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/70 to-yellow-700/50" />
                <div className="absolute inset-0 p-4 flex flex-col justify-center gap-1">
                  {banner.label && (
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                      <span className="text-yellow-200 text-xs font-semibold uppercase tracking-wider">
                        {banner.label}
                      </span>
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-white leading-tight">{banner.title}</h3>
                  {banner.subtitle && (
                    <p className="text-sm text-yellow-100">{banner.subtitle}</p>
                  )}
                  <button className="mt-1 inline-flex items-center gap-2 bg-white text-orange-700 font-semibold px-3 py-1.5 rounded-lg text-xs w-fit">
                    {banner.buttonText}
                  </button>
                </div>
              </div>

              {/* Banner controls */}
              <div className="p-3 flex items-center justify-between">
                <button
                  onClick={() => toggleEnabled(banner)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    banner.enabled ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                      banner.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-xs text-gray-500">
                  {banner.enabled ? 'Enabled' : 'Disabled'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditForm(banner)}
                    className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-emerald-600 transition-all"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(banner)}
                    className="p-1.5 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Banner form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeForm} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
              <h3 className="text-base font-bold text-gray-800">
                {editingId ? 'Edit Banner' : 'Add New Banner'}
              </h3>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Preview */}
              {formData.image && (
                <div className="relative h-32 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/70 to-yellow-700/50" />
                  <div className="absolute inset-0 p-3 flex flex-col justify-center gap-0.5">
                    {formData.label && (
                      <span className="text-yellow-200 text-xs font-semibold uppercase tracking-wider">
                        {formData.label}
                      </span>
                    )}
                    <h3 className="text-base font-bold text-white leading-tight">{formData.title || 'Banner Title'}</h3>
                    {formData.subtitle && (
                      <p className="text-xs text-yellow-100">{formData.subtitle}</p>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="🪔 Diwali Sale 🪔"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Special Festive Offers"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                  Image URL *
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                    Label
                  </label>
                  <input
                    type="text"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="Limited Time"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                    Button Text *
                  </label>
                  <input
                    type="text"
                    value={formData.buttonText}
                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                    placeholder="Shop Now"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, enabled: !formData.enabled })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.enabled ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                      formData.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-700">
                  {formData.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>

              {formError && (
                <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {formError}
                </div>
              )}
            </div>

            <div className="flex gap-3 px-5 py-4 border-t border-gray-200 sticky bottom-0 bg-white rounded-b-2xl">
              <button
                onClick={closeForm}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={validateAndSave}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-all"
              >
                <Save className="w-4 h-4" />
                {editingId ? 'Update' : 'Add Banner'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center gap-2 mb-3">
              <Trash2 className="w-5 h-5 text-red-600" />
              <h3 className="text-base font-bold text-gray-800">Delete Banner?</h3>
            </div>
            <p className="text-sm text-gray-500 mb-5">
              Are you sure you want to delete <span className="font-medium text-gray-700">{deleteTarget.title}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
