export interface ISubCategory {
  name: string;
  slug: string;
  categorySlug: string;
}

export interface IMainCategoryInfo {
  name: string;
  slug: string;
  description: string;
  imageFile: string; // fallback matching keyword
}

export const MAIN_CATEGORIES_INFO: IMainCategoryInfo[] = [
  {
    name: "Concrete Mixers",
    slug: "concrete-mixers",
    description: "Robust hand-operated, diesel, electric, and hydraulic concrete mixing machines built for heavy-duty construction sites.",
    imageFile: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Tractor Trolleys",
    slug: "tractor-trolleys",
    description: "High-capacity single-axle, double-axle, and hydraulic tipping cargo trolleys for farm transport and material transit.",
    imageFile: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Agricultural Plows",
    slug: "agricultural-plows",
    description: "Advanced disc plows, mouldboard plows, chisel plows, cultivators, and rotavators for precision soil preparation.",
    imageFile: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Threshers & Harvesters",
    slug: "threshers-harvesters",
    description: "Efficient multi-crop threshers, maize shellers, straw reapers, and mini harvesters engineered for high yield operations.",
    imageFile: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400"
  }
];

export const SUB_CATEGORIES: ISubCategory[] = [
  // Concrete Mixers
  { name: "Hand Operated Concrete Mixers", slug: "hand-operated-concrete-mixers", categorySlug: "concrete-mixers" },
  { name: "Diesel Concrete Mixers", slug: "diesel-concrete-mixers", categorySlug: "concrete-mixers" },
  { name: "Electric Concrete Mixers", slug: "electric-concrete-mixers", categorySlug: "concrete-mixers" },
  { name: "Hydraulic Concrete Mixers", slug: "hydraulic-concrete-mixers", categorySlug: "concrete-mixers" },
  { name: "Lift Type Concrete Mixers", slug: "lift-type-concrete-mixers", categorySlug: "concrete-mixers" },

  // Tractor Trolleys
  { name: "Hydraulic Tipping Trolleys", slug: "hydraulic-tipping-trolleys", categorySlug: "tractor-trolleys" },
  { name: "Non-Tipping Trolleys", slug: "non-tipping-trolleys", categorySlug: "tractor-trolleys" },
  { name: "Double Axle Trolleys", slug: "double-axle-trolleys", categorySlug: "tractor-trolleys" },
  { name: "Single Axle Trolleys", slug: "single-axle-trolleys", categorySlug: "tractor-trolleys" },

  // Agricultural Plows
  { name: "Disc Plows", slug: "disc-plows", categorySlug: "agricultural-plows" },
  { name: "Mouldboard Plows", slug: "mouldboard-plows", categorySlug: "agricultural-plows" },
  { name: "Chisel Plows", slug: "chisel-plows", categorySlug: "agricultural-plows" },
  { name: "Rotavators & Cultivators", slug: "rotavators-cultivators", categorySlug: "agricultural-plows" },

  // Threshers & Harvesters
  { name: "Multi-Crop Threshers", slug: "multi-crop-threshers", categorySlug: "threshers-harvesters" },
  { name: "Paddy Threshers", slug: "paddy-threshers", categorySlug: "threshers-harvesters" },
  { name: "Maize Shellers", slug: "maize-shellers", categorySlug: "threshers-harvesters" },
  { name: "Straw Reapers & Harvesters", slug: "straw-reapers-harvesters", categorySlug: "threshers-harvesters" }
];

export function getCategoryInfo(slug: string): IMainCategoryInfo | undefined {
  return MAIN_CATEGORIES_INFO.find(cat => cat.slug === slug);
}

export function getSubCategoriesOf(categorySlug: string): ISubCategory[] {
  return SUB_CATEGORIES.filter(sub => sub.categorySlug === categorySlug);
}

export function getSubCategoryInfo(categorySlug: string, subSlug: string): ISubCategory | undefined {
  return SUB_CATEGORIES.find(sub => sub.categorySlug === categorySlug && sub.slug === subSlug);
}
