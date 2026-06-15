export interface IBanner {
  _id?: string;
  title: string;
  subtitle?: string;
  image_desktop: string;
  image_mobile: string;
  cta_text?: string;
  cta_link?: string;
  order?: number;
  is_active?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ICategory {
  _id?: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  is_active?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IProduct {
  _id?: string;
  name: string;
  slug: string;
  images: string[];
  short_description: string;
  full_description?: string;
  specifications?: Record<string, string>;
  features?: string[];
  applications?: string[];
  category: string | ICategory; // Category ID (string) or Populated Category Document
  is_featured?: boolean;
  is_active?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ITestimonial {
  _id?: string;
  customer_name: string;
  location?: string;
  review: string;
  image?: string;
  order?: number;
  is_active?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IVideo {
  _id?: string;
  title: string;
  video_url: string;
  thumbnail?: string;
  order?: number;
  is_active?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IContactInfo {
  _id?: string;
  business_name: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  map_embed_url?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IContactMessage {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}


